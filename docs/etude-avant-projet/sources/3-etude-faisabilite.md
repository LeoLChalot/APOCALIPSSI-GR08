# Ã‰tude de faisabilitÃ© â€” EduTutor IA

## 1. Objet et pÃ©rimÃ¨tre du document

La prÃ©sente Ã©tude de faisabilitÃ© Ã©value la viabilitÃ© du projet **EduTutor IA**, plateforme web de rÃ©vision par quiz QCM gÃ©nÃ©rÃ©s par intelligence artificielle Ã  partir des cours dÃ©posÃ©s par l'Ã©tudiant (PDF ou texte). Elle examine quatre dimensions â€” technique, organisationnelle, Ã©conomique et risques â€” afin de fonder une recommandation argumentÃ©e avant le lancement de la phase de rÃ©alisation.

Le pÃ©rimÃ¨tre couvre le **MVP must-have F1-F6** : authentification par email, saisie de cours, gÃ©nÃ©ration de 10 QCM, correction, score sur 10 et historique. Les fonctionnalitÃ©s secondaires (tableau de bord de progression, mode sombre, back-office administrateur) sont prises en compte au titre des dÃ©pendances techniques mais ne conditionnent pas le go/no-go.

La cible primaire est l'**Ã©tudiant du supÃ©rieur** (BTS, Licence, Master) qui rÃ©vise ses propres cours ; une cible secondaire Ã©mergente est l'**enseignant** (persona Â« Mme LefÃ¨vre Â»). La proposition de valeur diffÃ©renciante repose sur des prompts mÃ©tier pensÃ©s pour les enseignants, un ancrage pÃ©dagogique rÃ©el et une **conformitÃ© RGPD by design** assurÃ©e par le recours Ã  une IA locale et des donnÃ©es souveraines, face Ã  des concurrents tels que Wilgo, Leo, Quizlet AI, Khanmigo ou Notion AI.

## 2. FaisabilitÃ© technique

### 2.1 Stack retenue

L'architecture cible est une application web dÃ©couplÃ©e, entiÃ¨rement conteneurisÃ©e, exÃ©cutable sur un poste de dÃ©veloppement standard via une seule commande `docker compose up`.

| Couche | Technologie | Version | Justification |
|---|---|---|---|
| Backend | Django + Django REST Framework | Django 5, Python 3.11+ | MaturitÃ©, ORM robuste, Ã©cosystÃ¨me, productivitÃ© sur le temps court |
| Frontend | React + Vite + TypeScript | React 18 | Typage statique, build rapide, DX moderne |
| Base de donnÃ©es | PostgreSQL | 16 | FiabilitÃ© transactionnelle, support natif du type JSON (options de QCM) |
| Conteneurisation | Docker + Docker Compose | â€” | ReproductibilitÃ©, isolation des services, lancement unifiÃ© |
| IA | Ollama (Llama 3.2 3B) | local | GratuitÃ©, souverainetÃ©, conformitÃ© RGPD |
| Extraction PDF | pypdf | â€” | Extraction texte pure Python, sans dÃ©pendance systÃ¨me lourde |
| Emails | Brevo (SMTP) / console en dev | â€” | VÃ©rification d'email, rÃ©initialisation de mot de passe |
| Documentation API | Swagger via drf-spectacular | â€” | Contrat d'API auto-documentÃ© |

Le backend est organisÃ© en quatre applications Django Ã  responsabilitÃ©s claires : `accounts` (authentification par email, modÃ¨le `Profile.email_verified`), `quizzes` (modÃ¨les `Quiz` et `Question`), `llm` (configuration et factory multi-fournisseurs) et `administration` (`SiteConfig`, back-office).

[[DIAGRAMME: composants.svg]]
*Figure 1 â€” Vue des composants applicatifs et de leurs interactions.*

### 2.2 Choix de l'IA : Ollama local par dÃ©faut vs cloud

Le cÅ“ur technique d'EduTutor IA est la gÃ©nÃ©ration de QCM. Deux options structurantes s'opposent : un LLM **local** (Ollama, Llama 3.2 3B) ou un LLM **cloud** (API tierces). Le choix retenu privilÃ©gie le local par dÃ©faut, pour trois raisons :

- **ConformitÃ© RGPD et souverainetÃ©** : aucun contenu de cours Ã©tudiant ne quitte le pÃ©rimÃ¨tre d'exÃ©cution. C'est l'argument diffÃ©renciant central de la proposition de valeur.
- **CoÃ»t** : Ollama est gratuit Ã  l'usage, ce qui supprime tout coÃ»t marginal par quiz gÃ©nÃ©rÃ©.
- **IndÃ©pendance** : pas de dÃ©pendance Ã  un fournisseur externe, pas de risque de coupure d'API ou de variation tarifaire.

Pour ne pas verrouiller le projet sur cette seule option, l'application `llm` implÃ©mente une **architecture multi-fournisseurs** via une factory : Ollama (dÃ©faut), Gemini, Groq, Cerebras, Mistral et OpenRouter en *free tier* ; OpenAI et Anthropic en mode *premium* payant ; un fournisseur *mock* pour les tests. La configuration est centralisÃ©e dans le singleton `LLMConfig` (champs `backend`, `model`, `api_keys` JSON, `ollama_host`, `timeout`). **Tout changement de fournisseur par dÃ©faut doit passer par un ADR** (Architecture Decision Record), notamment celui motivÃ© par la latence (cf. Â§5).

### 2.3 IntÃ©gration et flux de gÃ©nÃ©ration

L'orchestration s'appuie sur Docker Compose, qui instancie quatre conteneurs : `apocalipssi-2026-postgres`, `apocalipssi-2026-ollama`, `apocalipssi-2026-backend` et `apocalipssi-2026-frontend`. Le backend communique avec Ollama via HTTP (`ollama_host`) et persiste les quiz dans PostgreSQL.

[[DIAGRAMME: deploiement-docker.svg]]
*Figure 2 â€” Topologie de dÃ©ploiement Docker Compose des quatre conteneurs.*

Le flux nominal de gÃ©nÃ©ration de quiz enchaÃ®ne : extraction du texte source (pypdf si PDF, sinon texte saisi â‰¥ 200 caractÃ¨res), construction du prompt mÃ©tier, appel au LLM, parsing de la rÃ©ponse en 10 objets `Question` (chacun avec `prompt`, `options` = JSON de 4 chaÃ®nes, `correct_index` 0..3) et persistance du `Quiz` rattachÃ© Ã  l'utilisateur.

[[DIAGRAMME: sequence-generation-quiz.svg]]
*Figure 3 â€” SÃ©quence de gÃ©nÃ©ration d'un quiz, du dÃ©pÃ´t du cours Ã  la persistance des 10 questions.*

### 2.4 Verdict technique

La stack est entiÃ¨rement composÃ©e de briques Ã©prouvÃ©es et open source. La seule incertitude technique rÃ©elle porte sur la **latence du LLM local sur CPU** (poste 16 Go RAM, objectif < 60 s par quiz), traitÃ©e en Â§5. **FaisabilitÃ© technique : Ã©levÃ©e, sous rÃ©serve de maÃ®trise de la latence.**

## 3. FaisabilitÃ© organisationnelle

### 3.1 Ã‰quipe Scrum et rÃ´les

Le projet est conduit selon le cadre **Scrum**, sur une semaine immersive. L'Ã©quipe se structure autour des trois responsabilitÃ©s du cadre.

| RÃ´le | Mission principale |
|---|---|
| Product Owner | Porte la vision, priorise le backlog (must-have F1-F6 d'abord), valide les incrÃ©ments |
| Scrum Master | Facilite les cÃ©rÃ©monies, lÃ¨ve les obstacles, protÃ¨ge l'Ã©quipe des perturbations |
| Ã‰quipe de dÃ©veloppement | ConÃ§oit, code et teste l'incrÃ©ment ; auto-organisÃ©e et pluridisciplinaire |

### 3.2 Planning de la semaine

| Jour | Phase | Livrable attendu |
|---|---|---|
| J1 (lundi) | Cadrage, conception, Sprint Planning | Backlog priorisÃ©, architecture, artefacts de cadrage |
| J2 (mardi) | RÃ©alisation â€” socle | Auth (F1), saisie de cours (F2), squelette d'intÃ©gration LLM |
| J3 (mercredi 10h00) | RÃ©alisation â€” cÅ“ur | GÃ©nÃ©ration 10 QCM (F3), correction (F4), score (F5) |
| J3-bis (mercredi 14h00) | RÃ©alisation â€” cÅ“ur (double crÃ©neau) | RGPD / donnÃ©es personnelles (demande d'accÃ¨s, souverainetÃ©) |
| J4 (jeudi) | RÃ©alisation â€” finalisation | Historique (F6), polissage, gestion des perturbations |
| J5 (vendredi) | Recette et soutenance | DÃ©monstration, rÃ©trospective, restitution |

### 3.3 CÃ©rÃ©monies

Le rituel quotidien comprend un **Daily Scrum** (synchronisation courte, 15 min) ouvrant chaque journÃ©e. La semaine est cadrÃ©e par un **Sprint Planning** (J1), une **Sprint Review** (dÃ©monstration de l'incrÃ©ment, J5) et une **RÃ©trospective** (amÃ©lioration continue, J5). L'Ã©valuation portant prioritairement sur la **rÃ©action agile aux perturbations**, le Scrum Master joue un rÃ´le clÃ© dans la replanification du backlog au fil des alÃ©as injectÃ©s.

### 3.4 Verdict organisationnel

Le pÃ©rimÃ¨tre MVP est dimensionnÃ© pour la durÃ©e. La pluridisciplinaritÃ© requise (back Python, front TypeScript, conteneurisation, intÃ©gration IA) est couverte par une Ã©quipe Scrum standard. **FaisabilitÃ© organisationnelle : Ã©levÃ©e.**

## 4. FaisabilitÃ© Ã©conomique

L'analyse Ã©conomique compare l'exploitation en IA locale (option retenue) Ã  une exploitation via API cloud, sur la base d'un usage prÃ©visionnel de rÃ©fÃ©rence.

| Poste de coÃ»t | Infra locale (Ollama) | API cloud (free tier) | API cloud (premium) |
|---|---|---|---|
| CoÃ»t d'infÃ©rence LLM | 0 â‚¬ (compute local) | 0 â‚¬ jusqu'Ã  quota, puis facturation | ~0,15â€“0,60 â‚¬ / 1M tokens (variable) |
| HÃ©bergement applicatif | Poste/serveur existant (16 Go RAM) | Idem + dÃ©pendance rÃ©seau | Idem |
| Base de donnÃ©es PostgreSQL | Incluse (conteneur) | Incluse (conteneur) | Incluse (conteneur) |
| CoÃ»t marginal par quiz | â‰ˆ 0 â‚¬ | 0 â‚¬ sous quota | quelques centimes |
| DonnÃ©es quittant le pÃ©rimÃ¨tre | Non (souverain) | Oui | Oui |
| Risque de coÃ»t Ã  l'Ã©chelle | Nul | Plafond de quota | CroÃ®t avec l'usage |

Sur le pÃ©rimÃ¨tre du projet, l'option **Ollama local est la plus Ã©conomique** : coÃ»t d'infÃ©rence nul, aucun abonnement, aucun coÃ»t marginal par quiz. Les seuls coÃ»ts rÃ©siduels sont le matÃ©riel (poste laptop 16 Go RAM, dÃ©jÃ  disponible) et le temps humain de dÃ©veloppement. Les fournisseurs cloud en *free tier* constituent un plan de repli sans coÃ»t immÃ©diat, mais introduisent une dÃ©pendance externe et une rupture de la souverainetÃ© des donnÃ©es. **FaisabilitÃ© Ã©conomique : favorable, l'option locale minimisant les coÃ»ts rÃ©currents.**

## 5. Analyse des risques

[[DIAGRAMME: activite-generation-quiz.svg]]
*Figure 4 â€” ActivitÃ© de gÃ©nÃ©ration d'un quiz, point de concentration des risques de latence et de parsing.*

| # | Risque | ProbabilitÃ© | Impact | Mitigation |
|---|---|---|---|---|
| R1 | **Latence du LLM local > 60 s** sur CPU (poste 16 Go RAM) | Ã‰levÃ©e | Majeur | **ADR** dÃ©diÃ© : repli sur un fournisseur cloud *free tier* (Groq/Gemini) via la factory `llm` ; timeout configurable dans `LLMConfig` ; feedback UX (Ã©tat Â« gÃ©nÃ©ration en cours Â») |
| R2 | RÃ©ponse LLM mal formÃ©e (parsing en 10 `Question` Ã©choue) | Moyenne | Majeur | Prompt strict + validation du schÃ©ma JSON ; retry bornÃ© ; fournisseur `mock` pour tests dÃ©terministes |
| R3 | Non-conformitÃ© RGPD (fuite de contenu de cours) | Faible | Critique | IA locale par dÃ©faut (donnÃ©es souveraines) ; suppression de compte ; minimisation des donnÃ©es ; ADR obligatoire avant tout passage cloud |
| R4 | DÃ©passement du pÃ©rimÃ¨tre / temps court | Moyenne | Majeur | Priorisation stricte F1-F6 ; backlog gÃ©rÃ© par le PO ; replanification agile |
| R5 | Saturation mÃ©moire (Ollama + 3 conteneurs sur 16 Go) | Moyenne | ModÃ©rÃ© | Choix d'un modÃ¨le 8B ; limites de ressources Docker ; surveillance |
| R6 | IndisponibilitÃ© d'un fournisseur cloud (si bascule) | Faible | ModÃ©rÃ© | Architecture multi-fournisseurs ; retour au local |

Le risque **R1 (latence)** est identifiÃ© comme le risque technique majeur du projet. La latence d'infÃ©rence d'un modÃ¨le 8B sur CPU peut dÃ©passer l'objectif des 60 secondes. La dÃ©cision de basculer vers un fournisseur cloud â€” modifiant la promesse de souverainetÃ© â€” doit impÃ©rativement Ãªtre tracÃ©e par un **ADR**, qui documentera le contexte, les options, la dÃ©cision et ses consÃ©quences sur la conformitÃ© RGPD (R3).

## 6. Matrice RACI

R = RÃ©alise, A = Approuve (responsable final), C = ConsultÃ©, I = InformÃ©.

| ActivitÃ© | Product Owner | Scrum Master | Ã‰quipe Dev | Formateur/Client |
|---|---|---|---|---|
| Priorisation du backlog | A/R | C | C | I |
| Architecture & choix de stack | C | I | A/R | I |
| DÃ©cision LLM local vs cloud (ADR) | A | C | R | C |
| DÃ©veloppement F1-F6 | I | I | A/R | â€” |
| ConformitÃ© RGPD | A | C | R | C |
| Animation des cÃ©rÃ©monies | C | A/R | I | I |
| Gestion des perturbations | C | A/R | R | I |
| Recette et dÃ©monstration | A | C | R | I |

## 7. Conclusion et recommandation

Les quatre dimensions analysÃ©es convergent vers une **faisabilitÃ© globale favorable** :

- **Technique** : stack mature, intÃ©gralement conteneurisÃ©e, lancement par `docker compose up` ; seule la latence du LLM local constitue un point de vigilance, couvert par une architecture multi-fournisseurs et un ADR de repli.
- **Organisationnelle** : pÃ©rimÃ¨tre MVP dimensionnÃ© pour une semaine, cadre Scrum adaptÃ© Ã  la gestion des perturbations.
- **Ã‰conomique** : l'option Ollama local supprime tout coÃ»t d'infÃ©rence et de licence, avec un coÃ»t marginal par quiz quasi nul.
- **Risques** : maÃ®trisables, le risque majeur (latence < 60 s) disposant d'une mitigation claire et tracÃ©e.

**Recommandation : GO.** Le projet EduTutor IA est jugÃ© faisable sur la durÃ©e de la semaine immersive, sur le pÃ©rimÃ¨tre MVP F1-F6. Deux conditions de succÃ¨s sont posÃ©es : (1) valider en dÃ©but de J2 la latence rÃ©elle d'Ollama sur le poste cible et, le cas Ã©chÃ©ant, dÃ©clencher l'ADR de bascule cloud *free tier* ; (2) prÃ©server la conformitÃ© RGPD comme invariant de conception, toute dÃ©rogation devant Ãªtre formellement documentÃ©e. La proposition de valeur â€” IA locale, donnÃ©es souveraines, ancrage pÃ©dagogique â€” reste le fil directeur du go/no-go.
