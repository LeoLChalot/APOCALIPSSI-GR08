# Expression de besoin initiale â€” EduTutor IA

## 1. Contexte et enjeux

EduTutor IA est une plateforme web dÃ©veloppÃ©e par une startup edtech franÃ§aise, conÃ§ue pour transformer la maniÃ¨re dont les Ã©tudiants du supÃ©rieur rÃ©visent leurs cours. Le constat de dÃ©part est simple : la rÃ©vision active par auto-Ã©valuation (le *testing effect*) est l'une des mÃ©thodes d'apprentissage les plus efficaces selon la recherche en sciences cognitives, mais elle reste sous-exploitÃ©e parce que la crÃ©ation de questionnaires pertinents est chronophage. L'Ã©tudiant qui veut se tester doit soit trouver des banques de questions gÃ©nÃ©riques rarement alignÃ©es sur son cours rÃ©el, soit fabriquer ses propres QCM â€” un effort qu'il fournit rarement.

L'irruption des modÃ¨les de langage (LLM) lÃ¨ve ce verrou : il devient possible de gÃ©nÃ©rer automatiquement, Ã  partir du support de cours de l'Ã©tudiant lui-mÃªme, un quiz pertinent et contextualisÃ© en quelques secondes. C'est le pari d'EduTutor IA : l'Ã©tudiant dÃ©pose son cours (PDF ou texte), la plateforme produit dix questions Ã  choix multiples, l'Ã©tudiant se teste, obtient un score et rÃ©vise ses erreurs.

Le marchÃ© est dÃ©jÃ  animÃ© par plusieurs acteurs â€” Wilgo, Leo, Quizlet AI, Khanmigo, Notion AI â€” majoritairement adossÃ©s Ã  des API d'IA propriÃ©taires amÃ©ricaines. La proposition de valeur diffÃ©renciante d'EduTutor IA se construit sur trois axes :

- **Ancrage pÃ©dagogique rÃ©el** : des prompts mÃ©tier pensÃ©s avec et pour les enseignants, et non des questions gÃ©nÃ©riques.
- **ConformitÃ© RGPD by design** : l'IA tourne en **local** (Ollama / Llama 3.2 3B) par dÃ©faut, garantissant la souverainetÃ© des donnÃ©es et l'absence de transfert des cours dÃ©posÃ©s vers un tiers.
- **SouverainetÃ© et coÃ»t maÃ®trisÃ©** : le moteur local est gratuit Ã  l'usage, sans dÃ©pendance facturÃ©e Ã  un fournisseur externe.

L'enjeu stratÃ©gique dÃ©passe le simple outil de quiz : il s'agit de poser les fondations d'une plateforme d'apprentissage adaptatif crÃ©dible auprÃ¨s des Ã©tablissements, oÃ¹ la confiance (donnÃ©es, pÃ©dagogie) est le vÃ©ritable actif.

## 2. ProblÃ¨me adressÃ©

| ProblÃ¨me | ConsÃ©quence pour l'Ã©tudiant |
|---|---|
| La crÃ©ation manuelle de QCM alignÃ©s sur son propre cours est trop coÃ»teuse en temps. | L'auto-Ã©valuation, pourtant efficace, est dÃ©laissÃ©e. |
| Les banques de questions gÃ©nÃ©riques sont mal alignÃ©es sur le contenu rÃ©ellement enseignÃ©. | RÃ©vision peu pertinente, faux sentiment de maÃ®trise. |
| Les outils IA concurrents transfÃ¨rent les donnÃ©es vers des serveurs tiers. | Risque RGPD, perte de souverainetÃ© sur des contenus pÃ©dagogiques. |
| L'Ã©tudiant manque de visibilitÃ© sur sa progression et ses erreurs rÃ©currentes. | Pas de pilotage de la rÃ©vision, effort dispersÃ©. |

En synthÃ¨se, EduTutor IA rÃ©pond au besoin : *Â« transformer en quelques secondes n'importe quel support de cours en un dispositif d'auto-Ã©valuation pertinent, mesurable et respectueux des donnÃ©es Â»*.

## 3. Parties prenantes

| Acteur | RÃ´le | Attentes principales |
|---|---|---|
| Ã‰tudiant du supÃ©rieur (BTS / Licence / Master) | Utilisateur primaire : dÃ©pose ses cours, gÃ©nÃ¨re et passe les quiz, suit sa progression. | RapiditÃ© de gÃ©nÃ©ration, pertinence des questions, suivi clair de la progression, simplicitÃ© d'usage. |
| Enseignant (persona Â« Mme LefÃ¨vre Â») | Cible secondaire Ã©mergente : prescripteur, futur utilisateur de prompts mÃ©tier. | QualitÃ© pÃ©dagogique des questions, alignement sur les objectifs d'apprentissage, contrÃ´le du contenu. |
| Administrateur de la plateforme | Configure le fournisseur LLM et l'application, gÃ¨re les utilisateurs et les donnÃ©es. | ContrÃ´le de la configuration, sÃ©curitÃ©, capacitÃ© d'exploitation et de maintenance. |
| Startup edtech (porteur du projet) | Sponsor : finance et oriente le produit, vise l'adoption Ã©tablissements. | DiffÃ©renciation marchÃ©, conformitÃ© RGPD, maÃ®trise des coÃ»ts, crÃ©dibilitÃ© pÃ©dagogique. |
| DÃ©lÃ©guÃ© Ã  la protection des donnÃ©es (DPO) | Garant de la conformitÃ© rÃ©glementaire. | SouverainetÃ© des donnÃ©es, traitement local, droit Ã  l'effacement effectif. |
| Ã‰quipe de dÃ©veloppement | ConÃ§oit, livre et maintient la plateforme. | Stack maÃ®trisÃ©e, architecture Ã©volutive, exÃ©cution locale reproductible. |

Le diagramme ci-dessous synthÃ©tise les acteurs et les principaux cas d'utilisation de la plateforme.

[[DIAGRAMME: cas-utilisation.svg]]
*Figure 1 â€” Diagramme de cas d'utilisation : acteurs (Ã©tudiant, administrateur) et cas d'utilisation du MVP.*

## 4. Besoins fonctionnels (must-have F1â€“F6)

Les six besoins fonctionnels structurants du MVP sont exprimÃ©s ci-dessous comme des besoins mÃ©tier, priorisÃ©s selon la mÃ©thode MoSCoW. Ils constituent le socle minimal sans lequel la proposition de valeur ne tient pas : tous sont classÃ©s *Must have*.

| RÃ©f. | Besoin mÃ©tier | Description | PrioritÃ© MoSCoW |
|---|---|---|---|
| **F1** | S'authentifier de faÃ§on sÃ©curisÃ©e | L'Ã©tudiant crÃ©e un compte par email, valide son adresse (`Profile.email_verified`), se connecte et peut rÃ©initialiser son mot de passe. L'email est l'identifiant unique. | Must have |
| **F2** | DÃ©poser un support de cours | L'Ã©tudiant soumet son contenu, soit par fichier **PDF â‰¤ 5 Mo** (extraction via pypdf), soit par **texte brut â‰¥ 200 caractÃ¨res**, comme source de gÃ©nÃ©ration. | Must have |
| **F3** | GÃ©nÃ©rer un quiz de 10 QCM | Ã€ partir du cours dÃ©posÃ©, la plateforme gÃ©nÃ¨re via le LLM un quiz de **10 questions**, chacune avec **4 options** et une bonne rÃ©ponse, en moins de 60 secondes. | Must have |
| **F4** | Passer le quiz et Ãªtre corrigÃ© | L'Ã©tudiant rÃ©pond aux 10 questions ; la plateforme enregistre les rÃ©ponses sÃ©lectionnÃ©es et les confronte aux bonnes rÃ©ponses. | Must have |
| **F5** | Obtenir un score et le dÃ©tail | L'Ã©tudiant obtient un **score sur 10** et le dÃ©tail question par question (rÃ©ponse choisie vs. rÃ©ponse correcte) pour rÃ©viser ses erreurs. | Must have |
| **F6** | Consulter son historique | L'Ã©tudiant retrouve la liste de ses quiz passÃ©s, avec leurs scores et dates, pour piloter sa progression dans le temps. | Must have |

Au-delÃ  de ce socle, des besoins complÃ©mentaires sont identifiÃ©s mais classÃ©s en prioritÃ© infÃ©rieure pour les itÃ©rations suivantes : tableau de bord de progression et rÃ©vision ciblÃ©e des erreurs (*Should have*), gestion fine du profil et suppression de compte (*Should have*), mode sombre et confort d'usage (*Could have*), back-office d'administration avancÃ© â€” configuration LLM, gestion des utilisateurs, paramÃ¨tres applicatifs (*Should have*, partiellement requis pour l'exploitation).

## 5. Besoins non fonctionnels

| CatÃ©gorie | Exigence | CritÃ¨re / cible |
|---|---|---|
| **Performance** | GÃ©nÃ©ration d'un quiz dans un dÃ©lai acceptable malgrÃ© la latence d'un LLM local sur CPU. | GÃ©nÃ©ration complÃ¨te d'un quiz de 10 QCM en **moins de 60 secondes** sur un poste de 16 Go de RAM. |
| **SÃ©curitÃ©** | Authentification robuste, vÃ©rification d'email, gestion des rÃ´les et des sessions. | Mots de passe hachÃ©s, vÃ©rification d'email obligatoire (paramÃ©trable), comptes activables/dÃ©sactivables par l'administrateur. |
| **RGPD / SouverainetÃ©** | Traitement des donnÃ©es par dÃ©faut **en local**, sans transfert vers un tiers. | IA locale (Ollama) par dÃ©faut ; droit Ã  l'effacement (suppression de compte et donnÃ©es) ; minimisation des donnÃ©es collectÃ©es. |
| **Ergonomie** | Interface claire, parcours fluide, accessibilitÃ© du suivi de progression. | Parcours dÃ©pÃ´t â†’ quiz â†’ score en quelques clics ; mode sombre disponible ; retours visuels explicites. |
| **PortabilitÃ©** | DÃ©ploiement reproductible sur n'importe quel poste de dÃ©veloppement. | Lancement intÃ©gral par `docker compose up` (conteneurs postgres, ollama, backend, frontend) ; aucune dÃ©pendance hors conteneurs. |
| **MaintenabilitÃ© / Ã‰volutivitÃ©** | Architecture ouverte au changement de fournisseur d'IA. | Factory LLM multi-fournisseurs ; tout changement de fournisseur tracÃ© par un **ADR** ; documentation API via Swagger. |

## 6. PÃ©rimÃ¨tre

### Dans le pÃ©rimÃ¨tre (MVP)

- Authentification par email avec vÃ©rification et rÃ©initialisation de mot de passe.
- DÃ©pÃ´t de cours par PDF (â‰¤ 5 Mo) ou texte (â‰¥ 200 caractÃ¨res).
- GÃ©nÃ©ration d'un quiz de 10 QCM Ã  4 options via LLM local (Ollama / Llama 3.2 3B).
- Passage du quiz, correction automatique, score sur 10 et dÃ©tail des rÃ©ponses.
- Historique des quiz par utilisateur.
- Gestion du profil utilisateur (modification, suppression du compte).
- Back-office d'administration : configuration du fournisseur LLM et de l'application, gestion des utilisateurs et des donnÃ©es.
- ExÃ©cution conteneurisÃ©e locale via Docker Compose.

### Hors pÃ©rimÃ¨tre (MVP)

- GÃ©nÃ©ration de questions ouvertes ou d'autres formats que le QCM Ã  4 options.
- Quiz collaboratifs, classes, partage entre Ã©tudiants ou affectation par un enseignant.
- Application mobile native (iOS / Android).
- Module enseignant complet (crÃ©ation de prompts mÃ©tier, suivi de cohorte) â€” la cible enseignant reste Ã©mergente.
- Apprentissage adaptatif avancÃ© (rÃ©pÃ©tition espacÃ©e, recommandations personnalisÃ©es).
- IntÃ©gration avec des LMS / ENT externes.
- Recours par dÃ©faut Ã  des fournisseurs d'IA payants (OpenAI, Anthropic) : disponibles en option, non activÃ©s par dÃ©faut.

## 7. Contraintes

| Type | Contrainte |
|---|---|
| **Technique â€” matÃ©riel** | Cible d'exÃ©cution : poste laptop dotÃ© de **16 Go de RAM**, sans GPU dÃ©diÃ© garanti ; la latence d'un LLM local sur CPU est un enjeu de performance rÃ©el. |
| **Technique â€” stack** | Backend **Django 5 + DRF** (Python 3.11+) ; frontend **React 18 + Vite + TypeScript** ; base **PostgreSQL 16** ; IA via **Ollama (Llama 3.2 3B)** en local par dÃ©faut. |
| **Technique â€” dÃ©ploiement** | Lancement par un unique `docker compose up` (conteneurs `apocalipssi-2026-postgres`, `-ollama`, `-backend`, `-frontend`). |
| **Technique â€” architecture IA** | Architecture multi-fournisseurs (Ollama, Gemini, Groq, Cerebras, Mistral, OpenRouter, OpenAI, Anthropic, mock) ; tout changement de fournisseur formalisÃ© par un **ADR**. |
| **RÃ©glementaire** | ConformitÃ© RGPD by design ; traitement local des donnÃ©es ; droit Ã  l'effacement. |
| **DÃ©lais** | Livraison d'un MVP couvrant les besoins F1â€“F6 dans le cadre de la durÃ©e du projet (semaine immersive). |
| **Budget** | MaÃ®trise des coÃ»ts : moteur d'IA local gratuit par dÃ©faut ; recours aux API externes en free tier ou en option premium uniquement. |
| **Ouverture** | DÃ©pÃ´t de code hÃ©bergÃ© sur un **GitHub public** : exigence de propretÃ©, de documentation et de reproductibilitÃ©. |

## 8. Objectifs SMART

| # | Objectif SMART |
|---|---|
| **O1** | **Livrer le MVP F1â€“F6 fonctionnel** d'ici la fin de la semaine immersive : un utilisateur peut s'inscrire, dÃ©poser un cours, gÃ©nÃ©rer un quiz de 10 QCM, le passer et consulter son score et son historique. |
| **O2** | **GÃ©nÃ©rer un quiz de 10 QCM en moins de 60 secondes** sur un poste de 16 Go de RAM avec le moteur Ollama local, dans au moins 90 % des dÃ©pÃ´ts conformes (PDF â‰¤ 5 Mo ou texte â‰¥ 200 caractÃ¨res). |
| **O3** | **Garantir le traitement 100 % local des cours** par dÃ©faut (aucun transfert vers un fournisseur tiers sans activation explicite), dÃ©montrable par la configuration par dÃ©faut du conteneur `ollama`. |
| **O4** | **Assurer un dÃ©ploiement reproductible** : l'application complÃ¨te dÃ©marre via une unique commande `docker compose up`, sans Ã©tape manuelle supplÃ©mentaire, sur un poste de dÃ©veloppement standard. |
| **O5** | **SÃ©curiser l'accÃ¨s** : 100 % des comptes crÃ©Ã©s passent par une vÃ©rification d'email (lorsque l'option est activÃ©e) et toute donnÃ©e utilisateur est effaÃ§able sur demande, conformÃ©ment au RGPD. |
| **O6** | **Maintenir la traÃ§abilitÃ© des choix techniques** : tout changement de fournisseur LLM est documentÃ© par un ADR versionnÃ© dans le dÃ©pÃ´t GitHub public. |
