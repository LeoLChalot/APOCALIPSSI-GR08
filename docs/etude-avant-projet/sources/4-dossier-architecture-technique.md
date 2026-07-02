# Dossier d'architecture technique â€” EduTutor IA

## 1. Objectifs et principes d'architecture

EduTutor IA est une plateforme web permettant Ã  un Ã©tudiant du supÃ©rieur de gÃ©nÃ©rer des quiz QCM Ã  partir de ses propres cours (PDF ou texte), de les passer, d'obtenir un score sur 10 et de suivre sa progression. Le prÃ©sent dossier consolide les dÃ©cisions d'architecture hÃ©ritÃ©es de la premiÃ¨re Ã©quipe et constitue la rÃ©fÃ©rence technique pour toute Ã©volution ultÃ©rieure.

L'architecture poursuit cinq objectifs structurants :

- **SouverainetÃ© et conformitÃ© RGPD by design** : l'infÃ©rence IA s'exÃ©cute par dÃ©faut en local (Ollama / Llama 3.2 3B), sans transfert de donnÃ©es vers un tiers. Les cours dÃ©posÃ©s et les quiz gÃ©nÃ©rÃ©s ne quittent jamais l'infrastructure de l'Ã©tablissement.
- **ReproductibilitÃ©** : l'ensemble du systÃ¨me dÃ©marre par un unique `docker compose up`, sur un poste de dÃ©veloppement standard (laptop 16 Go RAM), sans installation manuelle de dÃ©pendances.
- **DÃ©couplage frontend / backend** : une API REST stricte (DRF) sÃ©pare l'application React de la logique mÃ©tier Django, autorisant des Ã©volutions indÃ©pendantes.
- **Abstraction du fournisseur LLM** : la gÃ©nÃ©ration de quiz repose sur une *factory* multi-fournisseurs, isolant le cÅ“ur mÃ©tier des spÃ©cificitÃ©s de chaque moteur d'infÃ©rence.
- **Performance maÃ®trisÃ©e** : un objectif de gÃ©nÃ©ration d'un quiz en moins de 60 secondes encadre les choix techniques, la latence CPU d'un LLM local Ã©tant un enjeu rÃ©el.

Les principes directeurs sont la **simplicitÃ©** (un MVP F1-F6 must-have avant toute sophistication), la **traÃ§abilitÃ© des dÃ©cisions** (tout changement de fournisseur LLM passe par un ADR â€” Architecture Decision Record) et la **dÃ©fense en profondeur** (validation des entrÃ©es, durcissement contre l'injection de prompt, isolation des conteneurs).

## 2. Vue de contexte

La vue de contexte (niveau 1 du modÃ¨le C4) situe EduTutor IA parmi ses acteurs et systÃ¨mes externes. Deux acteurs humains interagissent avec la plateforme : l'**Ã©tudiant** (persona primaire, qui rÃ©vise ses cours) et l'**administrateur** (qui configure le fournisseur LLM et l'application). Une persona secondaire Ã©mergente, l'**enseignant** (Â« Mme LefÃ¨vre Â»), oriente la conception des prompts mÃ©tier mais ne dispose pas encore d'interface dÃ©diÃ©e.

[[DIAGRAMME: c4-contexte.svg]]
*Figure 1 â€” Vue de contexte C4 : acteurs et systÃ¨mes externes d'EduTutor IA.*

Les systÃ¨mes externes mobilisÃ©s sont le fournisseur d'infÃ©rence (Ollama local par dÃ©faut, ou un fournisseur cloud en option : Gemini, Groq, Cerebras, Mistral, OpenRouter, OpenAI, Anthropic) et le service d'envoi d'emails transactionnels (Brevo en SMTP, ou backend console en dÃ©veloppement). La proposition de valeur â€” ancrage pÃ©dagogique, prompts pensÃ©s pour les enseignants, donnÃ©es souveraines â€” se distingue des concurrents directs (Wilgo, Leo, Quizlet AI, Khanmigo, Notion AI) par le choix par dÃ©faut d'une IA locale.

## 3. Vue conteneurs

La vue conteneurs (niveau 2 C4) dÃ©crit les unitÃ©s dÃ©ployables et leurs protocoles d'Ã©change. Le systÃ¨me est composÃ© de quatre conteneurs orchestrÃ©s par Docker Compose.

[[DIAGRAMME: c4-conteneurs.svg]]
*Figure 2 â€” Vue conteneurs C4 : frontend, backend, base de donnÃ©es et moteur d'infÃ©rence.*

| Conteneur | RÃ´le | Technologie | Communication |
|-----------|------|-------------|---------------|
| `apocalipssi-2026-frontend` | SPA servie au navigateur | React 18 + Vite + TypeScript | HTTP/REST vers le backend |
| `apocalipssi-2026-backend` | API mÃ©tier, authentification, orchestration LLM | Django 5 + DRF (Python 3.11+) | HTTP vers Ollama, SQL vers PostgreSQL, SMTP vers Brevo |
| `apocalipssi-2026-postgres` | Persistance des donnÃ©es | PostgreSQL 16 | SQL (rÃ©seau interne) |
| `apocalipssi-2026-ollama` | InfÃ©rence LLM locale | Ollama (Llama 3.2 3B) | HTTP (API Ollama) |

Le frontend ne communique qu'avec le backend ; il ne dialogue jamais directement avec la base ni avec le moteur d'infÃ©rence. Le backend est le seul point d'orchestration : il valide les requÃªtes, applique les rÃ¨gles mÃ©tier, appelle le LLM via la *factory*, et persiste les rÃ©sultats.

## 4. Cas d'utilisation

Les cas d'utilisation se rÃ©partissent entre deux acteurs : l'Ã©tudiant et l'administrateur.

[[DIAGRAMME: cas-utilisation.svg]]
*Figure 3 â€” Diagramme des cas d'utilisation des deux acteurs.*

| Acteur | Cas d'utilisation |
|--------|-------------------|
| Ã‰tudiant | S'inscrire / se connecter par email ; valider son email ; rÃ©initialiser son mot de passe ; gÃ©rer son profil (modifier, supprimer le compte) ; dÃ©poser un cours (PDF â‰¤ 5 Mo ou texte â‰¥ 200 caractÃ¨res) ; gÃ©nÃ©rer un quiz de 10 QCM ; passer le quiz ; consulter son score /10 et le dÃ©tail ; consulter l'historique ; voir le tableau de bord de progression ; rÃ©viser ses erreurs ; basculer en mode sombre |
| Administrateur | Configurer le fournisseur LLM et l'application ; gÃ©rer les utilisateurs (activer/dÃ©sactiver, rÃ´le, supprimer) ; insÃ©rer / rÃ©initialiser des donnÃ©es |

Le pÃ©rimÃ¨tre MVP must-have couvre les fonctionnalitÃ©s F1 Ã  F6 : authentification, saisie de cours, gÃ©nÃ©ration de 10 QCM, correction, score et historique.

## 5. Vues dynamiques â€” sÃ©quences

Trois scÃ©narios critiques sont dÃ©taillÃ©s par des diagrammes de sÃ©quence.

### 5.1 Authentification par email

L'authentification repose sur l'email comme identifiant unique de l'utilisateur Django. Ã€ l'inscription, un `Profile` est crÃ©Ã© (OneToOne) avec `email_verified = false` ; un email de validation est envoyÃ© via Brevo. La connexion dÃ©livre un token d'authentification que le frontend joint aux requÃªtes ultÃ©rieures.

[[DIAGRAMME: sequence-authentification.svg]]
*Figure 4 â€” SÃ©quence d'authentification : inscription, validation d'email et connexion.*

### 5.2 GÃ©nÃ©ration d'un quiz

L'Ã©tudiant dÃ©pose un cours ; le backend extrait le texte (pypdf pour un PDF), construit le prompt mÃ©tier, appelle le fournisseur LLM via la *factory*, parse la rÃ©ponse en 10 objets `Question` et persiste le `Quiz`. L'objectif de latence est infÃ©rieur Ã  60 secondes.

[[DIAGRAMME: sequence-generation-quiz.svg]]
*Figure 5 â€” SÃ©quence de gÃ©nÃ©ration d'un quiz Ã  partir d'un cours.*

### 5.3 Soumission et correction

L'Ã©tudiant renseigne, pour chaque question, un `selected_index`. Le backend compare aux `correct_index`, calcule le score sur 10, le persiste sur le `Quiz` et renvoie le dÃ©tail question par question pour la rÃ©vision des erreurs.

[[DIAGRAMME: sequence-soumission-correction.svg]]
*Figure 6 â€” SÃ©quence de soumission et de correction d'un quiz.*

## 6. ModÃ¨le de donnÃ©es

Le modÃ¨le de donnÃ©es s'organise autour de l'utilisateur, de ses quiz et des questions associÃ©es, complÃ©tÃ© par deux singletons de configuration.

[[DIAGRAMME: classes-modele-donnees.svg]]
*Figure 7 â€” Diagramme de classes du modÃ¨le de donnÃ©es.*

[[DIAGRAMME: mcd-base-donnees.svg]]
*Figure 8 â€” ModÃ¨le conceptuel de donnÃ©es (MCD) de la base PostgreSQL.*

| EntitÃ© | Champ | Type / contrainte | Description |
|--------|-------|-------------------|-------------|
| **User** (Django) | email | unique, identifiant | Identifiant de connexion |
| | password | hash | Mot de passe hachÃ© |
| | is_active / is_staff | boolÃ©en | Statut et rÃ´le |
| **Profile** | user | OneToOne â†’ User | Profil Ã©tendu |
| | email_verified | boolÃ©en | Email validÃ© ou non |
| | created_at | datetime | Date de crÃ©ation |
| **Quiz** | user | FK â†’ User | PropriÃ©taire du quiz |
| | title | texte | Titre du quiz |
| | source_text | texte | Texte source du cours |
| | score | entier /10, nullable | Score obtenu (null avant passage) |
| | created_at / updated_at | datetime | Horodatage |
| **Question** | quiz | FK â†’ Quiz | Quiz parent |
| | index | entier 1..10 | NumÃ©ro de la question |
| | prompt | texte | Ã‰noncÃ© de la question |
| | options | JSON (4 chaÃ®nes) | Les quatre propositions |
| | correct_index | entier 0..3 | Indice de la bonne rÃ©ponse |
| | selected_index | entier 0..3, nullable | RÃ©ponse de l'Ã©tudiant |
| **LLMConfig** | (singleton) | â€” | Configuration du fournisseur |
| | backend / model | texte | Fournisseur et modÃ¨le actifs |
| | api_keys | JSON | ClÃ©s par fournisseur |
| | ollama_host / timeout | texte / entier | HÃ´te Ollama et dÃ©lai |
| **SiteConfig** | (singleton) | â€” | Configuration applicative |
| | app_name | texte | Nom de l'application |
| | allow_signups | boolÃ©en | Inscriptions ouvertes ou non |
| | require_email_verification | boolÃ©en | Validation d'email obligatoire |
| | banniÃ¨re | texte | Message d'information global |

Les cardinalitÃ©s principales : un `User` possÃ¨de un `Profile` (1:1) et plusieurs `Quiz` (1:N) ; un `Quiz` regroupe exactement 10 `Question` (1:N). `LLMConfig` et `SiteConfig` sont des singletons (une seule ligne en base).

## 7. Vue composants

Ã€ l'intÃ©rieur du conteneur backend, la logique est dÃ©coupÃ©e en quatre applications Django, chacune responsable d'un domaine fonctionnel cohÃ©rent.

[[DIAGRAMME: composants.svg]]
*Figure 9 â€” Vue des composants internes du backend Django.*

| Application | ResponsabilitÃ© | ModÃ¨les |
|-------------|----------------|---------|
| `accounts` | Authentification par email, profils, validation d'email, rÃ©initialisation de mot de passe | `Profile` (+ `User` Django) |
| `quizzes` | Cycle de vie des quiz : gÃ©nÃ©ration, passage, correction, historique | `Quiz`, `Question` |
| `llm` | Configuration et *factory* multi-fournisseurs, construction des prompts, parsing | `LLMConfig` |
| `administration` | Back-office : configuration applicative, gestion des utilisateurs et des donnÃ©es | `SiteConfig` |

L'application `quizzes` dÃ©pend de `llm` pour la gÃ©nÃ©ration mais ne connaÃ®t aucun dÃ©tail du fournisseur sous-jacent : elle invoque une interface unique fournie par la *factory*. La documentation de l'API est gÃ©nÃ©rÃ©e automatiquement (Swagger via drf-spectacular).

## 8. Vue de dÃ©ploiement

Le dÃ©ploiement cible est un poste de dÃ©veloppement unique (laptop 16 Go RAM), oÃ¹ Docker Compose orchestre les quatre conteneurs sur un rÃ©seau interne partagÃ©. Seuls les ports du frontend et du backend sont exposÃ©s Ã  l'hÃ´te ; PostgreSQL et Ollama restent confinÃ©s au rÃ©seau Docker.

[[DIAGRAMME: deploiement-docker.svg]]
*Figure 10 â€” Vue de dÃ©ploiement Docker Compose sur poste de dÃ©veloppement.*

La contrainte de 16 Go de RAM conditionne le choix de Llama 3.2 3B, modÃ¨le suffisamment compact pour tenir en mÃ©moire aux cÃ´tÃ©s des autres conteneurs tout en restant pertinent pour la gÃ©nÃ©ration de QCM. L'infÃ©rence s'exÃ©cute sur CPU par dÃ©faut, d'oÃ¹ l'enjeu de latence encadrÃ© par l'objectif de 60 secondes.

## 9. Flux d'activitÃ© â€” gÃ©nÃ©ration d'un quiz

Le flux de gÃ©nÃ©ration illustre les points de dÃ©cision et de validation appliquÃ©s entre le dÃ©pÃ´t du cours et la persistance du quiz.

[[DIAGRAMME: activite-generation-quiz.svg]]
*Figure 11 â€” Flux d'activitÃ© de la gÃ©nÃ©ration d'un quiz.*

Les contrÃ´les clÃ©s sont : validation du dÃ©pÃ´t (PDF â‰¤ 5 Mo **ou** texte â‰¥ 200 caractÃ¨res) ; extraction du texte par pypdf si nÃ©cessaire ; construction du prompt mÃ©tier ; appel LLM avec gestion du timeout ; validation structurelle de la rÃ©ponse (10 questions, 4 options, `correct_index` valide) ; persistance. En cas de rÃ©ponse malformÃ©e ou de dÃ©passement de dÃ©lai, une stratÃ©gie de repli renvoie une erreur exploitable Ã  l'utilisateur plutÃ´t qu'un quiz incomplet.

## 10. Choix technologiques justifiÃ©s

| Couche | Technologie retenue | Justification | Alternative Ã©cartÃ©e |
|--------|---------------------|---------------|---------------------|
| Backend | Django 5 + DRF (Python 3.11+) | Ã‰cosystÃ¨me mature, admin intÃ©grÃ©, ORM robuste, sÃ©rialisation REST native | FastAPI (moins d'outillage intÃ©grÃ©) |
| Frontend | React 18 + Vite + TypeScript | Typage fort, build rapide (Vite), large Ã©cosystÃ¨me | Vue (compÃ©tences Ã©quipe orientÃ©es React) |
| Base de donnÃ©es | PostgreSQL 16 | Robustesse, support JSON natif (champ `options`), transactions ACID | SQLite (insuffisant en concurrence) |
| Conteneurisation | Docker + Docker Compose | ReproductibilitÃ©, dÃ©marrage par une commande | Installation manuelle (non reproductible) |
| InfÃ©rence IA | Ollama / Llama 3.2 3B (local) | Gratuit, souverain, RGPD by design, tient en 16 Go | API cloud par dÃ©faut (fuite de donnÃ©es, coÃ»t) |
| Extraction PDF | pypdf | Pure Python, sans dÃ©pendance systÃ¨me lourde | Outils OCR (surdimensionnÃ©s pour PDF texte) |
| Emails | Brevo (SMTP) / console en dev | Transactionnel fiable, bascule console en local | Service propriÃ©taire opaque |
| Documentation API | Swagger (drf-spectacular) | GÃ©nÃ©ration automatique depuis le schÃ©ma DRF | Documentation manuelle (dÃ©rive) |

## 11. SÃ©curitÃ© et RGPD

La conformitÃ© RGPD est traitÃ©e *by design*, ancrÃ©e dans les choix d'architecture plutÃ´t qu'ajoutÃ©e a posteriori :

- **DonnÃ©es souveraines** : l'infÃ©rence par dÃ©faut sur Ollama local garantit que les cours dÃ©posÃ©s et les quiz gÃ©nÃ©rÃ©s ne sont transmis Ã  aucun tiers. Le recours Ã  un fournisseur cloud est un choix explicite, documentÃ© par ADR.
- **Authentification** : identifiant = email, mots de passe hachÃ©s par Django, validation d'email obligatoire pilotÃ©e par `Profile.email_verified` et `SiteConfig.require_email_verification`. Les requÃªtes API sont authentifiÃ©es par token.
- **Minimisation et droit Ã  l'effacement** : l'Ã©tudiant peut modifier son profil et supprimer son compte ; la suppression entraÃ®ne celle des quiz et questions associÃ©s (cascade).
- **DÃ©fense contre l'injection de prompt** : le texte du cours est traitÃ© comme une donnÃ©e non fiable. Le prompt mÃ©tier isole l'entrÃ©e utilisateur, des instructions systÃ¨me contraignent strictement le format de sortie attendu, et la rÃ©ponse du LLM est validÃ©e structurellement (10 questions, 4 options, indices valides) avant toute persistance. Une rÃ©ponse non conforme est rejetÃ©e plutÃ´t qu'enregistrÃ©e.
- **Isolation** : PostgreSQL et Ollama ne sont pas exposÃ©s hors du rÃ©seau Docker interne ; seuls le frontend et le backend ouvrent des ports.

## 12. Architecture multi-fournisseurs LLM et stratÃ©gie ADR

Le cÅ“ur du dÃ©couplage IA est une *factory* (application `llm`) qui instancie le client d'infÃ©rence Ã  partir de `LLMConfig`. Le code mÃ©tier de `quizzes` ne dÃ©pend que d'une interface unique de gÃ©nÃ©ration ; le fournisseur effectif est rÃ©solu Ã  l'exÃ©cution.

| CatÃ©gorie | Fournisseurs | Usage |
|-----------|-------------|-------|
| Local (dÃ©faut) | Ollama (Llama 3.2 3B) | Production souveraine, RGPD, gratuit |
| Free tier | Gemini, Groq, Cerebras, Mistral, OpenRouter | AccÃ©lÃ©ration / repli, Ã  coÃ»t nul |
| Premium | OpenAI, Anthropic | QualitÃ© supÃ©rieure, payant |
| Mock | â€” | Tests et dÃ©veloppement dÃ©terministes |

Tout changement de fournisseur est une dÃ©cision d'architecture : il est consignÃ© dans un **ADR** (Architecture Decision Record) documentant le contexte, les options envisagÃ©es, la dÃ©cision et ses consÃ©quences (notamment l'impact RGPD d'un passage vers un fournisseur cloud). Cette discipline garantit la traÃ§abilitÃ© des arbitrages souverainetÃ© / performance / coÃ»t et protÃ¨ge le principe par dÃ©faut d'IA locale d'une dÃ©rive non documentÃ©e.

## 13. Perspectives d'Ã©volution (Release 2)

Le MVP (F1-F6) une fois stabilisÃ©, plusieurs axes d'Ã©volution sont envisagÃ©s :

- **Interface enseignant** : matÃ©rialiser la persona Â« Mme LefÃ¨vre Â» par un espace dÃ©diÃ© (crÃ©ation de quiz pour une classe, suivi de cohorte), capitalisant sur les prompts mÃ©tier dÃ©jÃ  pensÃ©s pour les enseignants.
- **AccÃ©lÃ©ration de l'infÃ©rence** : support GPU optionnel, mise en cache des gÃ©nÃ©rations, ou bascule automatique vers un fournisseur free tier en cas de dÃ©passement de l'objectif de 60 secondes.
- **Enrichissement pÃ©dagogique** : niveaux de difficultÃ© paramÃ©trables, explications gÃ©nÃ©rÃ©es pour chaque rÃ©ponse, formats de questions complÃ©mentaires.
- **Analytique de progression** : tableaux de bord enrichis, recommandation des chapitres Ã  rÃ©viser, export des rÃ©sultats.
- **Industrialisation** : passage d'un dÃ©ploiement poste unique Ã  un environnement serveur, CI/CD, observabilitÃ© (journalisation, mÃ©triques de latence LLM).

Chaque Ã©volution touchant au fournisseur LLM ou au traitement des donnÃ©es personnelles devra faire l'objet d'un ADR, conformÃ©ment Ã  la stratÃ©gie dÃ©finie en section 12.
