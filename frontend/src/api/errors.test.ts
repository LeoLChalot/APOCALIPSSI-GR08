import { describe, it, expect } from 'vitest';
import { AxiosError } from 'axios';
import { getApiErrorMessage } from './errors';

describe('getApiErrorMessage', () => {
  it('renvoie le message de repli pour une erreur non-Axios', () => {
    expect(getApiErrorMessage(new Error('boom'), 'Oups')).toBe('Oups');
    expect(getApiErrorMessage('pas une erreur', 'Oups')).toBe('Oups');
  });

  it('signale un serveur injoignable quand aucune réponse n’est reçue', () => {
    const err = new AxiosError('Network Error');
    expect(getApiErrorMessage(err, 'fallback')).toContain('joindre le serveur');
  });

  it('permet de traduire un message backend connu', () => {
    const err = new AxiosError('Request failed', '400', undefined, undefined, {
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config: {} as never,
      data: { non_field_errors: ['Email ou mot de passe invalide.'] },
    });

    expect(
      getApiErrorMessage(err, {
        fallback: 'Fallback',
        translations: {
          'Email ou mot de passe invalide.': 'Invalid credentials.',
        },
      }),
    ).toBe('Invalid credentials.');
  });
});
