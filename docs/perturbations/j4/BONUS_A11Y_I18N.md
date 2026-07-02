# Bonus J4 — Accessibilité / RGAA + i18n

## Implémenté dans le code

### Accessibilité / RGAA

- Focus visible global sur les éléments interactifs (`a`, `button`, `input`, `textarea`, `select`).
- Lien d’évitement `Aller au contenu principal` dans le layout.
- Quiz refondu en structure accessible `fieldset` + `legend` + `radio`.
- Messages d’erreur/succès annoncés avec `role="alert"` ou `role="status"` sur les formulaires clés.
- Labels reliés aux champs principaux (`htmlFor` / `id`) sur les pages d’authentification et de génération.
- Boutons de sélection de mode source avec `aria-pressed`.
- Correction du lien cookies sur la page de confidentialité vers la vraie route front.

### i18n

- `react-i18next` + `i18next` ajoutés côté frontend.
- Fichiers de langue :
  - `frontend/src/i18n/locales/fr.json`
  - `frontend/src/i18n/locales/en.json`
- Sélecteur de langue dans le header.
- Langue persistée en localStorage (`edututor-language`).
- Mise à jour de `document.documentElement.lang`.
- Langue transmise au backend lors de la génération du quiz (`lang=fr|en`).
- Prompt backend adapté pour imposer la langue du quiz.

## Pages à auditer avec Axe / Lighthouse

- `/login`
- `/signup`
- `/upload`
- `/quiz/:id`
- `/dashboard`
- `/legal/mentions-legales`
- `/legal/confidentialite`
- `/legal/cgu`
- `/legal/cookies`

## Preuves à conserver

### Captures “avant / après”

- Login — Axe ou Lighthouse
- Signup — Axe ou Lighthouse
- Upload — Axe ou Lighthouse
- Quiz — Axe ou Lighthouse
- Dashboard — Axe ou Lighthouse
- Pages légales — Axe ou Lighthouse

### Démo clavier

- `Tab` depuis le header jusqu’au contenu principal via le lien d’évitement
- Navigation clavier complète du formulaire d’upload
- Navigation clavier complète du quiz et sélection d’une réponse par radio

### Démo i18n

- Header en français
- Header en anglais
- Page d’upload en anglais
- Quiz généré en anglais
- Retour en français
- Quiz généré en français

## Vérifications manuelles recommandées

- Contraste du mode clair
- Contraste du mode sombre
- Ordre de tabulation cohérent
- Présence des labels sur les formulaires
- Lecture du quiz par lecteur d’écran
