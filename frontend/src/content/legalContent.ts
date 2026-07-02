import type { AppLanguage } from '@/contexts/LanguageContext';

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: {
    headers: [string, string, string];
    rows: [string, string, string][];
  };
  link?: {
    textBefore: string;
    label: string;
    to: string;
    textAfter?: string;
  };
  warning?: string;
};

export type LegalDocumentData = {
  title: string;
  subtitle?: string;
  meta?: string[];
  intro?: string;
  sections: LegalSection[];
  footer: string;
};

type LegalBundle = {
  mentions: LegalDocumentData;
  privacy: LegalDocumentData;
  terms: LegalDocumentData;
  cookies: LegalDocumentData;
};

export const legalContent: Record<AppLanguage, LegalBundle> = {
  fr: {
    mentions: {
      title: 'Mentions legales',
      subtitle:
        "Informations legales obligatoires identifiant l'editeur et l'hebergeur du site.",
      sections: [
        {
          title: '1. Editeur du site',
          paragraphs: [
            "Le present site internet est edite par l'equipe projet EduTutor IA, constituee dans le cadre de la semaine immersive Scrum APOCAL'IPSSI 2026.",
          ],
          bullets: [
            "Statut : projet etudiant de fin de cycle / startup de simulation pedagogique",
            "Organisation de rattachement : IPSSI (Ecole d'Informatique)",
            'Adresse de l organisation : 25 Rue Claude Tillier, 75012 Paris',
            'Email de contact : contact-equipe08@edututor.local',
          ],
        },
        {
          title: '2. Directeur de la publication',
          paragraphs: [
            "Le directeur de la publication du site internet est le Product Owner de l'equipe : Chahrazed SOLTANI.",
          ],
        },
        {
          title: '3. Hebergeur',
          paragraphs: [
            "Le site internet est heberge localement au sein des infrastructures de l'etablissement ou sur les serveurs de l'equipe.",
          ],
          bullets: [
            "Nom de l'hebergeur : Infrastructure Locale IPSSI",
            'Adresse : 25 Rue Claude Tillier, 75012 Paris',
            'Telephone : 01 23 45 67 89',
          ],
        },
        {
          title: '4. Propriete intellectuelle',
          paragraphs: [
            "L'ensemble des contenus presents sur ce site (textes, logos, code source, architectures, interfaces et livrables pedagogiques) est la propriete exclusive de la startup EduTutor IA et de ses concepteurs, sous reserve des elements fournis initialement dans le cadre du kit de demarrage APOCAL'IPSSI 2026 par Mohamed Amine EL AFRIT (licence CC BY-NC-SA 4.0). Toute reproduction, modification ou distribution non autorisee du code ou des fonctionnalites du module de generation de quiz par IA est interdite sans accord prealable ecrit.",
          ],
        },
        {
          title: '5. Contact',
          paragraphs: [
            "Pour toute question d'ordre juridique ou pour exercer vos droits d'acces, de rectification ou d'effacement de vos donnees personnelles, vous pouvez contacter l'equipe a l'adresse suivante :",
          ],
          bullets: ['Adresse email dediee : rgpd-equipe08@edututor.local'],
        },
      ],
      footer:
        "Derniere mise a jour : 1er juillet 2026. Document redige dans le cadre pedagogique APOCAL'IPSSI 2026.",
    },
    privacy: {
      title: 'Politique de confidentialite',
      subtitle:
        'Comment les donnees personnelles des utilisateurs sont collectees, utilisees et protegees.',
      sections: [
        {
          title: '1. Responsable du traitement',
          paragraphs: [
            "Le responsable du traitement des donnees est l'equipe projet EduTutor IA, agissant en tant que startup de simulation pedagogique au sein de l'ecole IPSSI.",
            "Referent interne : le Scrum Master / QA & Compliance Lead de l'equipe.",
          ],
        },
        {
          title: '2. Donnees personnelles collectees',
          paragraphs: [
            "Dans le cadre de l'utilisation de l'application, les donnees suivantes sont collectees :",
          ],
          bullets: [
            "Donnees d'identification : adresse email obligatoire pour l'authentification et la gestion du profil.",
            'Donnees d usage et contenus : documents importes, textes colles et fichiers PDF televerses pour generer les QCM.',
            "Donnees d'activite pedagogique : historique des quiz generes, reponses soumises, scores obtenus, signalements d'erreurs ou d'hallucinations, et metadonnees de progression.",
          ],
        },
        {
          title: '3. Finalites du traitement',
          paragraphs: [
            'Les donnees sont collectees et traitees uniquement pour les finalites suivantes :',
          ],
          bullets: [
            'Creation, securisation et gestion des comptes utilisateurs.',
            "Generation automatisee de quiz par le modele de langage a partir des cours fournis.",
            "Suivi de la progression pedagogique et reevaluation via l'espace de revision.",
            "Amelioration continue de la qualite de l'IA via le traitement des signalements de bugs ou d'hallucinations.",
            "Reponse immediate aux demandes d'exercice de droits, notamment via l'export JSON.",
          ],
        },
        {
          title: '4. Base legale',
          bullets: [
            "Execution d'un contrat (art. 6.1.b RGPD) : creation du compte, acces a l'interface et fourniture du service de generation de quiz.",
            "Consentement (art. 6.1.a RGPD) : traitement des documents optionnels televerses par l'utilisateur.",
            "Interet legitime (art. 6.1.f RGPD) : analyse de la latence, protection contre les injections de prompts et suivi de l'adoption.",
          ],
        },
        {
          title: '5. Duree de conservation',
          bullets: [
            "Donnees du compte : conservees tant que l'utilisateur reste actif, puis supprimees sur demande de suppression de compte.",
            "Cours et PDF importes : conserves le temps necessaire a la generation du quiz et a l'evaluation associee, puis supprimes ou anonymises.",
            "Historique des quiz et scores : conserve pendant l'annee universitaire en cours afin de permettre le suivi pedagogique.",
          ],
        },
        {
          title: '6. Destinataires des donnees',
          bullets: [
            "L'equipe interne d'EduTutor IA (developpeurs, Product Owner, administrateur systeme).",
            "Sous-traitants techniques : Brevo, uniquement pour l'envoi des emails transactionnels de validation de compte.",
          ],
          paragraphs: [
            "Les contenus textuels ne sont transmis a aucun courtier de donnees tiers.",
          ],
        },
        {
          title: '7. Transferts hors UE',
          paragraphs: [
            "Dans le cadre d'une architecture orientee souverainete et local-first, le traitement des donnees et l'execution de l'IA via Ollama sont effectues localement sur des infrastructures europeennes ou locales. Aucun transfert de donnees personnelles ou de propriete intellectuelle n'est realise hors de l'Union europeenne lorsque la configuration locale est utilisee.",
          ],
        },
        {
          title: '8. Vos droits',
          paragraphs: [
            "Conformement au RGPD, vous disposez d'un droit d'acces, de rectification, d'effacement, d'opposition et de limitation du traitement.",
            "Un endpoint d'export vous permet de telecharger instantanement l'integralite de vos donnees au format JSON depuis votre espace profil.",
            "Pour exercer vos droits manuellement, vous pouvez egalement contacter l'equipe a l'adresse mentionnee a la section 10.",
          ],
        },
        {
          title: '9. Cookies',
          link: {
            textBefore:
              "Le site utilise uniquement des cookies techniques et stockages strictement necessaires au fonctionnement de la plateforme. Pour plus d'informations, consultez notre ",
            label: 'Politique de cookies',
            to: '/legal/cookies',
            textAfter: '.',
          },
        },
        {
          title: '10. Contact et reclamation',
          bullets: [
            "Contact RGPD de l'equipe : rgpd-equipe08@edututor.local",
            "Si vous estimez, apres nous avoir contactes, que vos droits ne sont pas respectes, vous pouvez adresser une reclamation aupres de la CNIL sur son site internet (cnil.fr).",
          ],
        },
      ],
      footer:
        "Derniere mise a jour : 1er juillet 2026. Document redige dans le cadre pedagogique APOCAL'IPSSI 2026.",
    },
    terms: {
      title: "Conditions Generales d'Utilisation",
      meta: ['Plateforme : EduTutor IA', 'Derniere mise a jour : 1er juillet 2026 - Version 1.0'],
      intro:
        "Les presentes Conditions Generales d'Utilisation (CGU) regissent l'acces et l'utilisation de la plateforme EduTutor IA. Tout utilisateur, qu'il soit enseignant, personnel administratif ou etudiant, s'engage a les respecter.",
      sections: [
        {
          title: '1. Objet',
          paragraphs: [
            "Les presentes CGU definissent les conditions dans lesquelles l'equipe projet EduTutor IA met a disposition son service web d'aide pedagogique base sur l'intelligence artificielle. La plateforme permet notamment de televerser des documents de cours afin de generer automatiquement des QCM, des quiz et des grilles d'evaluation.",
          ],
        },
        {
          title: '2. Acceptation des conditions',
          paragraphs: [
            "L'acces et l'utilisation d'EduTutor IA sont subordonnes a l'acceptation pleine et entiere des presentes CGU. Cette acceptation est materialisee par une case a cocher lors de la creation du compte ou, a defaut, par l'utilisation effective du service.",
          ],
        },
        {
          title: '3. Acces au service',
          bullets: [
            "Disponibilite : le service est accessible gratuitement et en principe 24h/24 et 7j/7, sous reserve des periodes de maintenance et des contraintes d'infrastructure propres au projet etudiant.",
            "Prerequis techniques : l'acces necessite une connexion Internet stable, un navigateur recent et une infrastructure capable de traiter des fichiers PDF ou du texte. Des variations de latence peuvent survenir selon la charge du serveur ou du modele local.",
          ],
        },
        {
          title: '4. Compte utilisateur',
          bullets: [
            "Creation : l'acces aux fonctionnalites avancees necessite un compte individuel avec une adresse email valide.",
            "Responsabilite : l'utilisateur est seul responsable de la confidentialite de son mot de passe et des actions realisees avec son compte.",
            "Exactitude : l'utilisateur s'engage a fournir des informations de profil exactes et a les maintenir a jour.",
          ],
        },
        {
          title: '5. Comportements interdits',
          bullets: [
            'Televerser des contenus illicites, injurieux, diffamatoires, pornographiques, racistes ou contraires aux lois en vigueur.',
            "Tenter de contourner, manipuler ou pirater le systeme, notamment par des attaques de prompt injection visant a forcer le LLM a ignorer ses consignes de securite.",
            "Effectuer du reverse engineering ou saturer abusivement les endpoints de l'API.",
          ],
        },
        {
          title: '6. Contenu genere par IA',
          bullets: [
            "Limites technologiques : les quiz sont generes automatiquement par un modele de langage. Malgre l'ancrage dans le document fourni, des approximations ou hallucinations factuelles peuvent subsister.",
            "Responsabilite de relecture : le contenu genere ne remplace pas l'expertise humaine. L'enseignant ou l'utilisateur reste responsable de la verification, de la validation et de la correction des quiz avant toute diffusion.",
          ],
        },
        {
          title: '7. Responsabilite',
          bullets: [
            "L'editeur ne saurait etre tenu responsable des erreurs, omissions ou inexactitudes presentes dans les quiz generes par l'IA.",
            "L'editeur ne saurait etre tenu responsable des interruptions temporaires de service, pertes de donnees ou dommages directs ou indirects lies a l'utilisation de la plateforme.",
            "L'editeur ne saurait etre tenu responsable de l'usage qui sera fait des notes et scores obtenus a la suite des quiz generes.",
          ],
        },
        {
          title: '8. Propriete intellectuelle',
          bullets: [
            "Droits sur le service : la structure de la plateforme, les codes sources, les logos et la documentation restent la propriete de l'equipe EduTutor IA ou de l'ecole IPSSI.",
            "Droits sur les documents deposes : les cours, textes et manuels importes demeurent la propriete intellectuelle de l'utilisateur qui les depose.",
          ],
        },
        {
          title: '9. Modification des CGU',
          paragraphs: [
            "L'equipe se reserve le droit de modifier les presentes CGU a tout moment afin de les adapter aux evolutions techniques de la plateforme ou aux exigences reglementaires. Les utilisateurs seront informes de toute modification majeure via une notification visible dans le service.",
          ],
        },
        {
          title: '10. Droit applicable et litiges',
          paragraphs: [
            "Les presentes CGU sont soumises au droit francais. En cas de litige et a defaut de resolution amiable prealable avec le contact de l'equipe (rgpd-equipe08@edututor.local), les tribunaux competents de Paris seront seuls saisis.",
          ],
        },
      ],
      footer:
        "Derniere mise a jour : 1er juillet 2026. Document redige dans le cadre pedagogique APOCAL'IPSSI 2026.",
    },
    cookies: {
      title: 'Politique de gestion des cookies',
      meta: ['Plateforme : EduTutor IA', 'Derniere mise a jour : 1er juillet 2026 - Version 1.0'],
      intro:
        "La presente politique detaille l'usage des cookies et stockages similaires sur le site d'EduTutor IA, leur utilite et la maniere de les controler.",
      sections: [
        {
          title: "1. Qu'est-ce qu'un cookie ?",
          paragraphs: [
            "Un cookie est un petit fichier texte, ou un espace de stockage local comme localStorage, enregistre par votre navigateur sur votre terminal lors de la visite d'un site internet. Il permet au site de memoriser certaines informations afin de faciliter votre navigation, de securiser votre connexion ou d'adapter l'affichage a vos preferences.",
          ],
        },
        {
          title: '2. Cookies et stockages utilises',
          paragraphs: [
            "La plateforme EduTutor IA suit une logique local-first et de minimisation des donnees. Aucun cookie tiers publicitaire ou de ciblage n'est deploye. Le site utilise uniquement des stockages techniques strictement necessaires.",
          ],
          table: {
            headers: ['Nom', 'Type', 'Finalite'],
            rows: [
              ['apocal_token', 'localStorage', "Token d'authentification"],
              ['edututor-theme', 'localStorage', 'Preference de theme clair / sombre'],
              ['edututor-language', 'localStorage', "Preference de langue de l'interface"],
              ['sessionid', 'Cookie', 'Session technique Django eventuelle'],
            ],
          },
        },
        {
          title: '3. Finalite de chaque stockage',
          bullets: [
            "apocal_token (localStorage) - technique / securite : maintient la session authentifiee et evite de ressaisir ses identifiants a chaque appel.",
            "edututor-theme (localStorage) - fonctionnel : memorise le mode clair ou sombre choisi par l'utilisateur.",
            "edututor-language (localStorage) - fonctionnel : memorise la langue de l'interface pour les prochaines visites.",
            'sessionid (cookie) - technique : peut etre depose par Django pour certains usages de session, notamment la navigation technique ou Swagger.',
          ],
        },
        {
          title: '4. Consentement',
          paragraphs: [
            "Conformement aux recommandations de la CNIL et au RGPD, les cookies et stockages exclusivement techniques et necessaires a la fourniture du service sont exemptes de consentement prealable.",
            "EduTutor IA n'utilise aucun traceur publicitaire ou de mesure d'audience tiers. Aucune banniere de consentement intrusive n'est donc affichee a l'entree du site.",
          ],
        },
        {
          title: '5. Duree de conservation',
          bullets: [
            "apocal_token : conserve tant que l'utilisateur ne se deconnecte pas ou jusqu'a l'expiration du jeton.",
            "edututor-theme : conserve jusqu'a modification manuelle par l'utilisateur ou suppression des donnees navigateur.",
            "edututor-language : conserve jusqu'a changement de langue ou suppression des donnees navigateur.",
            'sessionid : supprime automatiquement a la fin de la session navigateur, selon la configuration serveur.',
          ],
        },
        {
          title: '6. Gerer ou refuser les cookies',
          paragraphs: [
            "Bien que ces stockages soient necessaires au bon fonctionnement de l'application, vous pouvez a tout moment les inspecter, les supprimer ou les bloquer via les parametres de votre navigateur.",
            'Vous pouvez aussi utiliser les outils de developpement du navigateur pour consulter localStorage et les cookies effectivement presents.',
          ],
          warning:
            "Attention : si vous supprimez localStorage pour EduTutor IA, vous serez deconnecte et certaines preferences d'interface seront perdues.",
        },
      ],
      footer:
        "Derniere mise a jour : 1er juillet 2026. Document redige dans le cadre pedagogique APOCAL'IPSSI 2026.",
    },
  },
  en: {
    mentions: {
      title: 'Legal notice',
      subtitle: 'Mandatory legal information identifying the website publisher and host.',
      sections: [
        {
          title: '1. Website publisher',
          paragraphs: [
            "This website is published by the EduTutor IA project team, created as part of the APOCAL'IPSSI 2026 Scrum immersion week.",
          ],
          bullets: [
            'Status: end-of-course student project / educational startup simulation',
            "Affiliated organisation: IPSSI (School of Computer Science)",
            'Organisation address: 25 Rue Claude Tillier, 75012 Paris',
            'Contact email: contact-equipe08@edututor.local',
          ],
        },
        {
          title: '2. Publication director',
          paragraphs: [
            'The publication director of the website is the team Product Owner: Chahrazed SOLTANI.',
          ],
        },
        {
          title: '3. Hosting provider',
          paragraphs: [
            'The website is hosted locally within the school infrastructure or on the team servers.',
          ],
          bullets: [
            'Hosting provider name: Infrastructure Locale IPSSI',
            'Address: 25 Rue Claude Tillier, 75012 Paris',
            'Phone: 01 23 45 67 89',
          ],
        },
        {
          title: '4. Intellectual property',
          paragraphs: [
            "All content available on this website (texts, logos, source code, architectures, interfaces and teaching deliverables) is the exclusive property of EduTutor IA and its creators, except for the starter-kit elements initially provided as part of APOCAL'IPSSI 2026 by Mohamed Amine EL AFRIT under the CC BY-NC-SA 4.0 licence. Any unauthorised reproduction, modification or distribution of the code or the AI quiz-generation features is prohibited without prior written approval.",
          ],
        },
        {
          title: '5. Contact',
          paragraphs: [
            'For any legal question or to exercise your rights of access, rectification or erasure regarding your personal data, you may contact the team at:',
          ],
          bullets: ['Dedicated email address: rgpd-equipe08@edututor.local'],
        },
      ],
      footer:
        "Last updated: July 1, 2026. Document prepared within the APOCAL'IPSSI 2026 teaching framework.",
    },
    privacy: {
      title: 'Privacy policy',
      subtitle: 'How users personal data is collected, used and protected.',
      sections: [
        {
          title: '1. Data controller',
          paragraphs: [
            "The data controller is the EduTutor IA project team, acting as an educational startup simulation within IPSSI.",
            'Internal contact: the team Scrum Master / QA & Compliance Lead.',
          ],
        },
        {
          title: '2. Personal data collected',
          paragraphs: ['The following categories of data may be collected when using the application:'],
          bullets: [
            'Identification data: email address required for authentication and profile management.',
            'Usage data and content: uploaded documents, pasted text and PDF files used to generate quizzes.',
            'Learning activity data: generated quiz history, submitted answers, scores, factual-error reports and progress metadata.',
          ],
        },
        {
          title: '3. Purposes of processing',
          paragraphs: ['Data is processed only for the following purposes:'],
          bullets: [
            'Creating, securing and managing user accounts.',
            'Generating quizzes automatically from the uploaded course material.',
            'Tracking learning progress and powering the review area.',
            'Improving AI quality through bug and hallucination reports.',
            'Answering data-rights requests, including JSON export requests.',
          ],
        },
        {
          title: '4. Legal basis',
          bullets: [
            'Performance of a contract (GDPR art. 6.1.b): account creation, access to the interface and delivery of the quiz-generation service.',
            'Consent (GDPR art. 6.1.a): processing of optional uploaded documents provided by the user.',
            'Legitimate interest (GDPR art. 6.1.f): latency analysis, prompt-injection protection and adoption monitoring.',
          ],
        },
        {
          title: '5. Retention period',
          bullets: [
            'Account data: kept while the user remains active, then deleted when the account deletion request is processed.',
            'Uploaded courses and PDFs: kept only as long as needed to generate the quiz and support the related evaluation, then deleted or anonymised.',
            'Quiz history and scores: kept during the current academic year to support learning follow-up.',
          ],
        },
        {
          title: '6. Recipients of the data',
          bullets: [
            'The EduTutor IA internal team (developers, Product Owner, system administrator).',
            'Technical subcontractors: Brevo, only for transactional account-verification emails.',
          ],
          paragraphs: ['Textual content is not shared with third-party data brokers.'],
        },
        {
          title: '7. Transfers outside the EU',
          paragraphs: [
            'With the local-first and sovereignty-oriented setup, data processing and AI execution through Ollama are performed on local or European infrastructure. When the local configuration is used, no transfer of personal data or intellectual property takes place outside the European Union.',
          ],
        },
        {
          title: '8. Your rights',
          paragraphs: [
            'Under GDPR, you have rights of access, rectification, erasure, objection and restriction of processing.',
            'An export endpoint lets you download your full data set instantly in JSON format from your profile page.',
            'You can also contact the team manually at the address listed in section 10 to exercise your rights.',
          ],
        },
        {
          title: '9. Cookies',
          link: {
            textBefore:
              'The website only uses technical cookies and storage items that are strictly necessary for the platform to operate. For more information, see our ',
            label: 'Cookie policy',
            to: '/legal/cookies',
            textAfter: '.',
          },
        },
        {
          title: '10. Contact and complaint',
          bullets: [
            'Team GDPR contact: rgpd-equipe08@edututor.local',
            'If, after contacting us, you believe that your rights are not respected, you may file a complaint with the CNIL through its official website (cnil.fr).',
          ],
        },
      ],
      footer:
        "Last updated: July 1, 2026. Document prepared within the APOCAL'IPSSI 2026 teaching framework.",
    },
    terms: {
      title: 'Terms of use',
      meta: ['Platform: EduTutor IA', 'Last updated: July 1, 2026 - Version 1.0'],
      intro:
        'These Terms of Use govern access to and use of the EduTutor IA platform. Every user, whether teacher, administrative staff member or student, agrees to comply with them.',
      sections: [
        {
          title: '1. Purpose',
          paragraphs: [
            'These terms define the conditions under which the EduTutor IA project team provides its AI-based educational web service. The platform allows users to upload course material and automatically generate MCQs, quizzes and evaluation grids.',
          ],
        },
        {
          title: '2. Acceptance of the terms',
          paragraphs: [
            'Access to and use of EduTutor IA is subject to full acceptance of these terms. Acceptance is materialised through a checkbox during account creation or, failing that, through effective use of the service.',
          ],
        },
        {
          title: '3. Access to the service',
          bullets: [
            'Availability: the service is free of charge and generally available 24/7, subject to maintenance windows and infrastructure constraints specific to the student project.',
            'Technical requirements: access requires a stable Internet connection, a modern browser and an environment capable of processing PDF files or text. Latency may vary depending on server or local model load.',
          ],
        },
        {
          title: '4. User account',
          bullets: [
            'Creation: advanced features require an individual account with a valid email address.',
            'Responsibility: each user is solely responsible for keeping their password confidential and for all actions performed with their account.',
            'Accuracy: each user undertakes to provide accurate profile information and keep it up to date.',
          ],
        },
        {
          title: '5. Prohibited behaviour',
          bullets: [
            'Uploading illegal, abusive, defamatory, pornographic, racist or otherwise unlawful content.',
            'Trying to bypass, manipulate or hack the system, including prompt-injection attacks intended to make the LLM ignore its safety rules.',
            'Performing reverse engineering or abusively saturating API endpoints.',
          ],
        },
        {
          title: '6. AI-generated content',
          bullets: [
            'Technical limits: quizzes are generated automatically by a language model. Even with grounding in the provided document, factual errors or hallucinations may remain.',
            'Review responsibility: generated content does not replace human expertise. Teachers and users remain responsible for reviewing, validating and correcting quizzes before any distribution.',
          ],
        },
        {
          title: '7. Liability',
          bullets: [
            'The publisher cannot be held liable for errors, omissions or inaccuracies in quizzes generated by the AI.',
            'The publisher cannot be held liable for temporary service interruptions, data loss or direct or indirect damage linked to the use of the platform.',
            'The publisher cannot be held liable for how users or institutions rely on the scores produced by the quizzes.',
          ],
        },
        {
          title: '8. Intellectual property',
          bullets: [
            'Rights over the service: the platform structure, source code, logos and documentation remain the property of the EduTutor IA team or IPSSI.',
            'Rights over uploaded documents: imported course material, texts and manuals remain the intellectual property of the user who uploaded them.',
          ],
        },
        {
          title: '9. Changes to the terms',
          paragraphs: [
            'The team reserves the right to modify these terms at any time in order to adapt them to technical changes in the platform or to regulatory requirements. Users will be informed of any major change through a visible in-app notice.',
          ],
        },
        {
          title: '10. Applicable law and disputes',
          paragraphs: [
            'These terms are governed by French law. In the event of a dispute and failing prior amicable resolution with the team contact (rgpd-equipe08@edututor.local), only the competent courts of Paris shall have jurisdiction.',
          ],
        },
      ],
      footer:
        "Last updated: July 1, 2026. Document prepared within the APOCAL'IPSSI 2026 teaching framework.",
    },
    cookies: {
      title: 'Cookie policy',
      meta: ['Platform: EduTutor IA', 'Last updated: July 1, 2026 - Version 1.0'],
      intro:
        'This policy explains the use of cookies and similar storage technologies on the EduTutor IA website, why they are used and how they can be controlled.',
      sections: [
        {
          title: '1. What is a cookie?',
          paragraphs: [
            'A cookie is a small text file, or a local storage item such as localStorage, saved by your browser on your device while visiting a website. It allows the site to remember information in order to make navigation easier, secure your connection or adapt the interface to your preferences.',
          ],
        },
        {
          title: '2. Cookies and storage used',
          paragraphs: [
            'EduTutor IA follows a local-first, data-minimisation approach. No third-party advertising or targeting cookie is deployed. The website only uses technical storage items that are strictly necessary.',
          ],
          table: {
            headers: ['Name', 'Type', 'Purpose'],
            rows: [
              ['apocal_token', 'localStorage', 'Authentication token'],
              ['edututor-theme', 'localStorage', 'Light / dark theme preference'],
              ['edututor-language', 'localStorage', 'Interface language preference'],
              ['sessionid', 'Cookie', 'Optional Django technical session'],
            ],
          },
        },
        {
          title: '3. Purpose of each storage item',
          bullets: [
            'apocal_token (localStorage) - technical / security: keeps the authenticated session alive and avoids re-entering credentials on each request.',
            'edututor-theme (localStorage) - functional: stores the selected light or dark theme.',
            'edututor-language (localStorage) - functional: stores the preferred interface language for the next visits.',
            'sessionid (cookie) - technical: may be set by Django for certain session-based flows, including technical navigation or Swagger usage.',
          ],
        },
        {
          title: '4. Consent',
          paragraphs: [
            'In line with CNIL guidance and GDPR, cookies and storage items that are purely technical and necessary to provide the requested service do not require prior consent.',
            'EduTutor IA does not use advertising trackers or third-party analytics trackers. No intrusive consent banner is displayed when entering the site.',
          ],
        },
        {
          title: '5. Retention period',
          bullets: [
            'apocal_token: kept until the user signs out or until token expiry.',
            'edututor-theme: kept until the user changes the theme or clears browser data.',
            'edututor-language: kept until the user changes the language or clears browser data.',
            'sessionid: automatically removed at the end of the browser session depending on server configuration.',
          ],
        },
        {
          title: '6. Managing or refusing cookies',
          paragraphs: [
            'Although these storage items are necessary for the application to work correctly, you may inspect, delete or block them at any time through your browser settings.',
            'You can also use browser developer tools to inspect the actual cookies and localStorage keys in use.',
          ],
          warning:
            'Warning: if you clear localStorage for EduTutor IA, you will be signed out and some interface preferences will be lost.',
        },
      ],
      footer:
        "Last updated: July 1, 2026. Document prepared within the APOCAL'IPSSI 2026 teaching framework.",
    },
  },
};
