import type { AppLanguage } from '@/contexts/LanguageContext';

type ProviderCopy = {
  label: string;
  help: string;
};

type ProfileAdminCopy = {
  profile: {
    title: string;
    info: {
      title: string;
      success: string;
      error: string;
      firstName: string;
      lastName: string;
      emailHint: string;
      emailUnverified: string;
      save: string;
      saving: string;
      emailTaken: string;
    };
    password: {
      title: string;
      success: string;
      error: string;
      current: string;
      next: string;
      confirm: string;
      mismatch: string;
      submit: string;
      submitting: string;
      currentInvalid: string;
    };
    data: {
      title: string;
      intro: string;
      exportButton: string;
      exportError: string;
    };
    danger: {
      title: string;
      intro: string;
      passwordLabel: string;
      confirmLabel: string;
      submit: string;
      submitting: string;
      deleteError: string;
      passwordInvalid: string;
    };
  };
  admin: {
    title: string;
    intro: string;
    tabs: Record<'overview' | 'llm' | 'site' | 'users' | 'data', string>;
    loading: string;
    loadError: string;
    overview: {
      users: string;
      activeUsers: string;
      administrators: string;
      quizzesCreated: string;
      quizzesTaken: string;
      averageScore: string;
      totalQuestions: string;
      noScore: string;
    };
    users: {
      searchPlaceholder: string;
      headers: {
        email: string;
        name: string;
        quizzes: string;
        emailVerified: string;
        status: string;
        role: string;
        actions: string;
      };
      superBadge: string;
      emptyName: string;
      yes: string;
      no: string;
      active: string;
      disabled: string;
      adminRole: string;
      memberRole: string;
      deactivate: string;
      activate: string;
      removeAdmin: string;
      makeAdmin: string;
      forceVerification: string;
      resendEmail: string;
      delete: string;
      confirmDelete: string;
      empty: string;
      actionError: string;
      deleteError: string;
      resendError: string;
      ownAccountBlocked: string;
      superuserBlocked: string;
      resendSuccess: string;
    };
    site: {
      saveSuccess: string;
      saveError: string;
      appName: string;
      allowSignupsTitle: string;
      allowSignupsHelp: string;
      requireEmailTitle: string;
      requireEmailHelp: string;
      bannerTitle: string;
      bannerHelp: string;
      bannerMessage: string;
      bannerPlaceholder: string;
      save: string;
      saving: string;
    };
    llm: {
      saveSuccess: string;
      saveError: string;
      clearKeySuccess: string;
      clearKeyError: string;
      activeConfig: string;
      effectiveFallback: string;
      effectiveHint: string;
      provider: string;
      paid: string;
      cloud: string;
      localFree: string;
      getApiKey: string;
      model: string;
      modelHint: string;
      ollamaHost: string;
      ollamaHint: string;
      apiKey: string;
      apiKeyAlreadySet: string;
      apiKeyPlaceholderSet: string;
      apiKeyPlaceholderEmpty: string;
      clearStoredKey: string;
      timeout: string;
      timeoutHint: string;
      save: string;
      saving: string;
      securityTitle: string;
      securityBody: string;
    };
    data: {
      seedTitle: string;
      seedIntro: string;
      seed: string;
      seeding: string;
      seedSuccess: string;
      seedError: string;
      resetTitle: string;
      resetIntro: string;
      includeUsers: string;
      confirmReset: string;
      adminPassword: string;
      reset: string;
      resetting: string;
      resetError: string;
      resetPasswordInvalid: string;
      resetSuccess: string;
    };
    providers: Record<string, ProviderCopy>;
  };
};

const COPY: Record<AppLanguage, ProfileAdminCopy> = {
  fr: {
    profile: {
      title: 'Mon profil',
      info: {
        title: 'Mes informations',
        success: 'Profil mis a jour.',
        error: 'Mise a jour impossible.',
        firstName: 'Prenom',
        lastName: 'Nom',
        emailHint: "Changer d'email necessitera une nouvelle confirmation par mail.",
        emailUnverified: 'non confirme',
        save: 'Enregistrer',
        saving: 'Enregistrement...',
        emailTaken: 'Cet email est deja utilise par un autre compte.',
      },
      password: {
        title: 'Changer mon mot de passe',
        success: 'Mot de passe modifie.',
        error: 'Changement de mot de passe impossible.',
        current: 'Mot de passe actuel',
        next: 'Nouveau mot de passe',
        confirm: 'Confirmer',
        mismatch: 'Les deux nouveaux mots de passe ne correspondent pas.',
        submit: 'Modifier le mot de passe',
        submitting: 'Modification...',
        currentInvalid: 'Mot de passe actuel incorrect.',
      },
      data: {
        title: 'Mes donnees',
        intro:
          'Conformement au RGPD, vous pouvez exporter ou supprimer vos donnees personnelles.',
        exportButton: 'Exporter mes donnees (JSON)',
        exportError: "Erreur lors de l'export de vos donnees.",
      },
      danger: {
        title: 'Zone de danger',
        intro:
          'La suppression de votre compte est definitive et efface toutes vos donnees (quiz, historique). Cette action est irreversible.',
        passwordLabel: 'Confirmez avec votre mot de passe',
        confirmLabel: 'Je comprends que cette action est irreversible.',
        submit: 'Supprimer definitivement mon compte',
        submitting: 'Suppression...',
        deleteError: 'Suppression impossible.',
        passwordInvalid: 'Mot de passe incorrect.',
      },
    },
    admin: {
      title: 'Administration',
      intro:
        "Reserve aux administrateurs. Configurez l'application, le LLM et gerez les utilisateurs.",
      tabs: {
        overview: "Vue d'ensemble",
        llm: 'Config LLM',
        site: 'Config app',
        users: 'Utilisateurs',
        data: 'Donnees',
      },
      loading: 'Chargement...',
      loadError: 'Chargement impossible.',
      overview: {
        users: 'Utilisateurs',
        activeUsers: 'Comptes actifs',
        administrators: 'Administrateurs',
        quizzesCreated: 'Quiz crees',
        quizzesTaken: 'Quiz passes',
        averageScore: 'Score moyen',
        totalQuestions: 'Questions totales',
        noScore: '-',
      },
      users: {
        searchPlaceholder: 'Rechercher par email ou nom...',
        headers: {
          email: 'Email',
          name: 'Nom',
          quizzes: 'Quiz',
          emailVerified: 'Email verifie',
          status: 'Statut',
          role: 'Role',
          actions: 'Actions',
        },
        superBadge: 'super',
        emptyName: '-',
        yes: 'oui',
        no: 'non',
        active: 'actif',
        disabled: 'desactive',
        adminRole: 'admin',
        memberRole: 'membre',
        deactivate: 'Desactiver',
        activate: 'Activer',
        removeAdmin: 'Retirer admin',
        makeAdmin: 'Rendre admin',
        forceVerification: 'Forcer verif.',
        resendEmail: 'Renvoyer mail',
        delete: 'Supprimer',
        confirmDelete: 'Supprimer definitivement le compte {{email}} ?',
        empty: 'Aucun utilisateur trouve.',
        actionError: 'Action impossible.',
        deleteError: 'Suppression impossible.',
        resendError: 'Envoi impossible.',
        ownAccountBlocked: 'Vous ne pouvez pas modifier ou supprimer votre propre compte ici.',
        superuserBlocked: 'Action interdite sur un super-administrateur.',
        resendSuccess: 'Email de validation renvoye a {{email}}.',
      },
      site: {
        saveSuccess: 'Configuration enregistree.',
        saveError: 'Enregistrement impossible.',
        appName: "Nom de l'application",
        allowSignupsTitle: 'Autoriser les inscriptions',
        allowSignupsHelp: 'Decoche = plus aucune creation de compte (le login reste ouvert).',
        requireEmailTitle: "Exiger la validation d'email",
        requireEmailHelp: 'Coche = un email confirme est requis pour generer des quiz.',
        bannerTitle: 'Afficher une banniere globale',
        bannerHelp: 'Annonce visible par tous les utilisateurs.',
        bannerMessage: 'Message de la banniere',
        bannerPlaceholder: 'Ex. Maintenance prevue ce soir a 20h.',
        save: 'Enregistrer',
        saving: 'Enregistrement...',
      },
      llm: {
        saveSuccess: 'Configuration LLM enregistree. Elle est active immediatement.',
        saveError: 'Enregistrement impossible.',
        clearKeySuccess: 'Cle supprimee.',
        clearKeyError: 'Suppression impossible.',
        activeConfig: 'Configuration active (effective)',
        effectiveFallback: '(modele par defaut)',
        effectiveHint: "La base l'emporte si renseignee, sinon repli sur le .env.",
        provider: 'Fournisseur',
        paid: 'Payant',
        cloud: 'Cloud - les donnees quittent le serveur local (RGPD)',
        localFree: 'Local / gratuit',
        getApiKey: 'Obtenir une cle API',
        model: 'Modele',
        modelHint: '(vide = defaut du .env)',
        ollamaHost: 'URL Ollama',
        ollamaHint: '(vide = OLLAMA_HOST)',
        apiKey: 'Cle API',
        apiKeyAlreadySet: '- deja definie (***).',
        apiKeyPlaceholderSet: 'Laisser vide pour ne pas changer',
        apiKeyPlaceholderEmpty: 'Saisir la cle API',
        clearStoredKey: 'Supprimer la cle enregistree',
        timeout: 'Timeout (s)',
        timeoutHint: '(vide = defaut)',
        save: 'Enregistrer la config LLM',
        saving: 'Enregistrement...',
        securityTitle: 'Securite',
        securityBody:
          "les cles API sont stockees en base (jamais reaffichees en clair). C'est acceptable pour ce kit pedagogique, mais en production il faudrait les chiffrer ou utiliser un gestionnaire de secrets.",
      },
      data: {
        seedTitle: 'Donnees de demonstration',
        seedIntro:
          "Insere un utilisateur de test et des quiz d'exemple (commande seed).",
        seed: 'Inserer des donnees de demo',
        seeding: 'Insertion...',
        seedSuccess: 'Donnees de demonstration inserees.',
        seedError: 'Seed impossible.',
        resetTitle: 'Reinitialiser la base',
        resetIntro:
          'Supprime tous les quiz (et leurs questions). Optionnellement, supprime aussi tous les comptes non-administrateurs. Action irreversible.',
        includeUsers: 'Supprimer aussi les comptes non-administrateurs',
        confirmReset: 'Tapez RESET pour confirmer',
        adminPassword: 'Votre mot de passe administrateur',
        reset: 'Reinitialiser la base',
        resetting: 'Reinitialisation...',
        resetError: 'Reinitialisation impossible.',
        resetPasswordInvalid: 'Mot de passe administrateur incorrect.',
        resetSuccess:
          'Base reinitialisee ({{quizzes}} quiz, {{users}} utilisateurs supprimes).',
      },
      providers: {
        ollama: {
          label: 'Ollama (local)',
          help:
            "Modele open-source execute en local (gratuit, souverain, hors ligne). Telechargez-le une fois avec `make pull-model`. Aucune cle requise. Lent sur CPU (cf. perturbation J2).",
        },
        gemini: {
          label: 'Google Gemini',
          help:
            'Cloud avec free tier genereux, ideal pour tester une API sans carte bancaire. Creez une cle gratuite sur Google AI Studio.',
        },
        groq: {
          label: 'Groq',
          help: 'Cloud tres rapide (LPU), free tier genereux, modeles open-source.',
        },
        cerebras: {
          label: 'Cerebras Cloud',
          help: 'Cloud tres rapide, free tier disponible.',
        },
        mistral: {
          label: 'Mistral AI',
          help:
            'Fournisseur europeen (donnees en UE, meilleur pour le RGPD), free tier.',
        },
        openrouter: {
          label: 'OpenRouter',
          help:
            "Passerelle multi-modeles. Certains modeles sont gratuits (suffixe `:free`). Modele au format `editeur/modele`.",
        },
        openai: {
          label: 'OpenAI',
          help:
            'Cloud payant (credit requis des le premier appel). Reserve a une future version premium.',
        },
        anthropic: {
          label: 'Anthropic (Claude)',
          help:
            'Cloud payant (credit requis). Reserve a une future version premium.',
        },
        mock: {
          label: 'Mock (faux quiz)',
          help:
            'Genere des QCM bidon instantanement, sans LLM. Pratique pour developper le frontend.',
        },
      },
    },
  },
  en: {
    profile: {
      title: 'My profile',
      info: {
        title: 'My details',
        success: 'Profile updated.',
        error: 'Unable to update the profile.',
        firstName: 'First name',
        lastName: 'Last name',
        emailHint: 'Changing your email address will require a new email confirmation.',
        emailUnverified: 'not verified',
        save: 'Save',
        saving: 'Saving...',
        emailTaken: 'This email address is already used by another account.',
      },
      password: {
        title: 'Change my password',
        success: 'Password updated.',
        error: 'Unable to change the password.',
        current: 'Current password',
        next: 'New password',
        confirm: 'Confirm',
        mismatch: 'The two new passwords do not match.',
        submit: 'Change password',
        submitting: 'Updating...',
        currentInvalid: 'Current password is incorrect.',
      },
      data: {
        title: 'My data',
        intro:
          'Under GDPR, you can export or delete your personal data from your account.',
        exportButton: 'Export my data (JSON)',
        exportError: 'Unable to export your data.',
      },
      danger: {
        title: 'Danger zone',
        intro:
          'Deleting your account is permanent and removes all your data (quizzes, history). This action cannot be undone.',
        passwordLabel: 'Confirm with your password',
        confirmLabel: 'I understand that this action cannot be undone.',
        submit: 'Permanently delete my account',
        submitting: 'Deleting...',
        deleteError: 'Unable to delete the account.',
        passwordInvalid: 'Password is incorrect.',
      },
    },
    admin: {
      title: 'Administration',
      intro:
        'Admin-only area. Configure the application, the LLM stack and manage users.',
      tabs: {
        overview: 'Overview',
        llm: 'LLM config',
        site: 'App config',
        users: 'Users',
        data: 'Data',
      },
      loading: 'Loading...',
      loadError: 'Unable to load data.',
      overview: {
        users: 'Users',
        activeUsers: 'Active accounts',
        administrators: 'Administrators',
        quizzesCreated: 'Created quizzes',
        quizzesTaken: 'Completed quizzes',
        averageScore: 'Average score',
        totalQuestions: 'Total questions',
        noScore: '-',
      },
      users: {
        searchPlaceholder: 'Search by email or name...',
        headers: {
          email: 'Email',
          name: 'Name',
          quizzes: 'Quizzes',
          emailVerified: 'Verified email',
          status: 'Status',
          role: 'Role',
          actions: 'Actions',
        },
        superBadge: 'super',
        emptyName: '-',
        yes: 'yes',
        no: 'no',
        active: 'active',
        disabled: 'disabled',
        adminRole: 'admin',
        memberRole: 'member',
        deactivate: 'Disable',
        activate: 'Enable',
        removeAdmin: 'Remove admin',
        makeAdmin: 'Make admin',
        forceVerification: 'Force verify',
        resendEmail: 'Resend email',
        delete: 'Delete',
        confirmDelete: 'Permanently delete account {{email}}?',
        empty: 'No user found.',
        actionError: 'Unable to perform this action.',
        deleteError: 'Unable to delete the account.',
        resendError: 'Unable to resend the email.',
        ownAccountBlocked: 'You cannot modify or delete your own account from this screen.',
        superuserBlocked: 'This action is not allowed on a super-admin account.',
        resendSuccess: 'Verification email sent again to {{email}}.',
      },
      site: {
        saveSuccess: 'Configuration saved.',
        saveError: 'Unable to save the configuration.',
        appName: 'Application name',
        allowSignupsTitle: 'Allow sign-ups',
        allowSignupsHelp: 'Unchecked means no new account can be created (sign-in stays open).',
        requireEmailTitle: 'Require email verification',
        requireEmailHelp: 'Checked means a verified email is required to generate quizzes.',
        bannerTitle: 'Show a global banner',
        bannerHelp: 'Announcement visible to every user.',
        bannerMessage: 'Banner message',
        bannerPlaceholder: 'e.g. Scheduled maintenance tonight at 8 PM.',
        save: 'Save',
        saving: 'Saving...',
      },
      llm: {
        saveSuccess: 'LLM configuration saved. It is active immediately.',
        saveError: 'Unable to save the configuration.',
        clearKeySuccess: 'API key removed.',
        clearKeyError: 'Unable to remove the API key.',
        activeConfig: 'Active configuration (effective)',
        effectiveFallback: '(default model)',
        effectiveHint: 'Database values win when set, otherwise the app falls back to .env.',
        provider: 'Provider',
        paid: 'Paid',
        cloud: 'Cloud - data leaves the local server (GDPR)',
        localFree: 'Local / free',
        getApiKey: 'Get an API key',
        model: 'Model',
        modelHint: '(blank = default from .env)',
        ollamaHost: 'Ollama URL',
        ollamaHint: '(blank = OLLAMA_HOST)',
        apiKey: 'API key',
        apiKeyAlreadySet: '- already set (***).',
        apiKeyPlaceholderSet: 'Leave blank to keep the current key',
        apiKeyPlaceholderEmpty: 'Enter the API key',
        clearStoredKey: 'Remove the saved key',
        timeout: 'Timeout (s)',
        timeoutHint: '(blank = default)',
        save: 'Save LLM config',
        saving: 'Saving...',
        securityTitle: 'Security',
        securityBody:
          'API keys are stored in the database and never shown again in clear text. That is acceptable for this teaching kit, but a production system should encrypt them or use a secrets manager.',
      },
      data: {
        seedTitle: 'Demo data',
        seedIntro:
          'Insert a test user and example quizzes (the `seed` command).',
        seed: 'Insert demo data',
        seeding: 'Inserting...',
        seedSuccess: 'Demo data inserted.',
        seedError: 'Unable to insert demo data.',
        resetTitle: 'Reset the database',
        resetIntro:
          'Deletes all quizzes and their questions. Optionally deletes every non-admin account as well. This action cannot be undone.',
        includeUsers: 'Also delete non-admin accounts',
        confirmReset: 'Type RESET to confirm',
        adminPassword: 'Your admin password',
        reset: 'Reset database',
        resetting: 'Resetting...',
        resetError: 'Unable to reset the database.',
        resetPasswordInvalid: 'Admin password is incorrect.',
        resetSuccess: 'Database reset ({{quizzes}} quizzes, {{users}} users deleted).',
      },
      providers: {
        ollama: {
          label: 'Ollama (local)',
          help:
            'Runs an open-source model locally (free, sovereign, offline). Download it once with `make pull-model`. No API key required. Slow on CPU (see J2 perturbation).',
        },
        gemini: {
          label: 'Google Gemini',
          help:
            'Cloud provider with a generous free tier, useful for testing an API without a credit card. Create a free key in Google AI Studio.',
        },
        groq: {
          label: 'Groq',
          help: 'Very fast cloud inference (LPU), generous free tier, open-source models.',
        },
        cerebras: {
          label: 'Cerebras Cloud',
          help: 'Very fast cloud provider, free tier available.',
        },
        mistral: {
          label: 'Mistral AI',
          help: 'European provider (EU data hosting, better GDPR posture), free tier available.',
        },
        openrouter: {
          label: 'OpenRouter',
          help:
            'Multi-model gateway. Some models are free (suffix `:free`). Use the `vendor/model` format.',
        },
        openai: {
          label: 'OpenAI',
          help:
            'Paid cloud provider. Credit is required from the first request. Reserved for a future premium version.',
        },
        anthropic: {
          label: 'Anthropic (Claude)',
          help:
            'Paid cloud provider. Credit is required. Reserved for a future premium version.',
        },
        mock: {
          label: 'Mock (fake quiz)',
          help:
            'Generates fake quizzes instantly without a real LLM. Useful for frontend development.',
        },
      },
    },
  },
};

export function getProfileCopy(language: AppLanguage) {
  return COPY[language].profile;
}

export function getAdminCopy(language: AppLanguage) {
  return COPY[language].admin;
}

export function getProviderCopy(
  language: AppLanguage,
  key: string,
  fallback: ProviderCopy,
): ProviderCopy {
  return COPY[language].admin.providers[key] ?? fallback;
}
