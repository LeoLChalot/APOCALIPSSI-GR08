# ADR-0004 — Politique de rétention des données

| Champ         | Valeur                          |
|:------------- |:------------------------------- |
| **Statut**    | Accepté                         |
| **Date**      | 2026-07-01                      |
| **Auteurs**   | Équipe APOCAL'IPSSI             |
| **Contexte**  | Perturbation J3-bis — RGPD      |

---

## Contexte

Le RGPD impose que les données personnelles ne soient conservées que pour la durée nécessaire à la finalité du traitement (Art. 5.1.e — limitation de la conservation). Cette politique définit les durées de conservation par type de donnée et les procédures d'effacement.

---

## Finalité du traitement

EduTutor IA collecte des données personnelles dans le but exclusif de :
- Permettre à l'utilisateur de générer des quiz à partir de ses cours
- Conserver l'historique des quiz et scores pour le suivi pédagogique

Aucune donnée n'est utilisée à des fins commerciales, publicitaires ou de profilage.

---

## Durées de conservation

| Donnée                        | Durée de conservation                  | Justification                              |
|:----------------------------- |:-------------------------------------- |:------------------------------------------ |
| **Compte utilisateur**        | Durée de vie du compte                 | Nécessaire au fonctionnement du service    |
| **Profil (nom, email)**       | Durée de vie du compte                 | Identification de l'utilisateur            |
| **Quiz (titre, score, dates)**| Durée de vie du compte                 | Suivi pédagogique de l'utilisateur         |
| **Texte source des cours**    | Durée de vie du compte                 | Permet de régénérer ou consulter le quiz   |
| **Questions et réponses**     | Durée de vie du compte                 | Révision des erreurs (Lot 6)               |
| **Token d'authentification**  | Jusqu'à déconnexion ou changement de mot de passe | Sécurité de session         |
| **Logs serveur**              | 90 jours                               | Débogage et audit de sécurité              |
| **Logs RGPD (demandes SAR)**  | 3 ans                                  | Preuve de conformité en cas de contrôle    |

---

## Procédure d'effacement (Art. 17)

### Effacement à la demande de l'utilisateur
1. L'utilisateur appelle `DELETE /api/accounts/gdpr/erase/` avec son mot de passe
2. Le système supprime en CASCADE :
   - Le compte utilisateur (table `auth_user`)
   - Le profil (table `accounts_profile`)
   - Tous les quiz (table `quizzes_quiz`)
   - Toutes les questions associées (table `quizzes_question`)
   - Le token d'authentification (table `authtoken_token`)
3. Un log d'audit est créé (email + date de la demande)
4. La suppression est **immédiate et irréversible**

### Effacement automatique
- **Comptes inactifs** : pas de suppression automatique dans le MVP (Could — différé)
- **Tokens expirés** : supprimés à la déconnexion ou au changement de mot de passe

### Cas particulier : backend LLM cloud
Si un provider cloud (OpenAI, Gemini, Groq…) est utilisé, le texte du cours est envoyé à un serveur tiers pour la génération du quiz. Ce texte n'est pas stocké par le provider (usage API, pas d'entraînement), mais il transite hors du serveur. L'utilisateur doit en être informé. Le backend par défaut (Ollama) traite les données **localement**.

---

## Droit d'accès et portabilité (Art. 15 + 20)

- Endpoint : `GET /api/accounts/gdpr/export/`
- Format : JSON (machine-readable, conforme Art. 20)
- Délai : instantané (légal : 1 mois max)
- Contenu : profil complet + tous les quiz + toutes les questions/réponses

---

## Responsabilités

| Rôle                | Responsabilité                                              |
|:------------------- |:----------------------------------------------------------- |
| **Développeurs**    | Implémenter les endpoints, respecter le CASCADE, ne pas stocker de données hors schéma |
| **Admin (SiteConfig)** | Configurer le backend LLM (local vs cloud), informer les utilisateurs |
| **Utilisateur**     | Exercer ses droits via les endpoints RGPD                   |

---

## Conséquences

- Toute nouvelle table contenant des données utilisateur **doit** être liée au modèle `User` avec `on_delete=CASCADE`
- L'endpoint d'export **doit** être mis à jour si de nouvelles données personnelles sont ajoutées
- En cas de passage à un backend cloud, les CGU doivent mentionner le transfert de données
