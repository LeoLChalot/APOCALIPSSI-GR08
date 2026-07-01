/** Politique de confidentialité — EduTutor IA. */

export default function ConfidentialitePage() {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Politique de confidentialité</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Comment les données personnelles des utilisateurs sont collectées, utilisées et protégées.
      </p>

      <div className="space-y-6 text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données est l'équipe projet <strong>EduTutor IA</strong>,
            agissant en tant que startup de simulation pédagogique au sein de l'école IPSSI.
          </p>
          <p className="mt-1 text-sm">Référent interne : Le Scrum Master / QA & Compliance Lead de l'équipe.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">2. Données personnelles collectées</h2>
          <p>Dans le cadre de l'utilisation de l'application, les données suivantes sont collectées :</p>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
            <li><strong>Données d'identification :</strong> Adresse email (obligatoire pour l'authentification et la gestion du profil).</li>
            <li><strong>Données d'usage et contenus :</strong> Documents importés (textes bruts, manuels, fichiers PDF téléversés pour générer les QCM).</li>
            <li><strong>Données d'activité pédagogique :</strong> Historique des quiz générés, réponses soumises par les étudiants, scores obtenus (sur /10), signalements d'erreurs factuelles ou d'hallucinations d'IA, et métadonnées de progression.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">3. Finalités du traitement</h2>
          <p>Les données sont collectées et traitées uniquement pour les finalités suivantes :</p>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
            <li>Création, sécurisation et gestion des comptes utilisateurs (inscription, connexion, réinitialisation de mot de passe).</li>
            <li>Génération automatisée de quiz (10 QCM) par le modèle de langage (LLM) à partir des cours fournis.</li>
            <li>Suivi de la progression pédagogique et réévaluation via l'espace « Réviser mes erreurs ».</li>
            <li>Amélioration continue de la qualité de l'IA via le traitement des rapports de signalement de bugs ou d'hallucinations.</li>
            <li>Réponse automatisée et immédiate aux demandes d'exercice de droits (export JSON).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">4. Base légale</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
            <li><strong>Exécution d'un contrat (Art. 6.1.b du RGPD) :</strong> Pour la création du compte, l'accès à l'interface et la fourniture du service de génération de quiz.</li>
            <li><strong>Consentement (Art. 6.1.a du RGPD) :</strong> Pour le traitement des documents optionnels téléversés par l'utilisateur.</li>
            <li><strong>Intérêt légitime (Art. 6.1.f du RGPD) :</strong> Pour l'analyse de la latence, l'assainissement contre les injections de prompts (sécurité de la plateforme) et la gestion des statistiques d'adoption (WAU).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">5. Durée de conservation</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
            <li><strong>Données du compte :</strong> Conservées tant que l'utilisateur reste actif. Supprimées sur demande de suppression de compte.</li>
            <li><strong>Cours et PDF importés :</strong> Conservés uniquement le temps nécessaire à la vectorisation et à l'ancrage RAG, puis supprimés ou anonymisés dès la fin de l'évaluation pédagogique associée.</li>
            <li><strong>Historique des quiz et scores :</strong> Conservés pendant l'année universitaire en cours afin de permettre le suivi pédagogique par l'enseignant.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">6. Destinataires des données</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
            <li>L'équipe interne d'EduTutor IA (développeurs, Product Owner pour le support, administrateur système).</li>
            <li>Sous-traitants techniques : Brevo (uniquement pour l'envoi des emails transactionnels de validation de compte).</li>
          </ul>
          <p className="mt-2 text-sm font-medium">Note importante : Les contenus textuels ne sont transmis à aucun courtier de données tiers.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">7. Transferts hors UE</h2>
          <p>
            Dans le cadre d'une architecture orientée souveraineté et Local-First, le traitement des
            données et l'exécution de l'IA (via Ollama) sont effectués localement sur des infrastructures
            européennes ou locales. Aucun transfert de données personnelles ou de propriété intellectuelle
            n'est réalisé hors de l'Union européenne.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">8. Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez des droits suivants : droit d'accès, de rectification,
            d'effacement (droit à l'oubli), d'opposition et de limitation du traitement.
          </p>
          <p className="mt-2 text-sm">
            <strong>Automatisation :</strong> Un point de terminaison d'exportation (endpoint SAR) vous permet
            de télécharger instantanément l'intégralité de vos données au format JSON depuis votre espace profil.
          </p>
          <p className="mt-1 text-sm">
            Pour exercer vos droits manuellement, vous pouvez contacter l'équipe à l'adresse mentionnée à la section 10.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">9. Cookies</h2>
          <p>
            Le site utilise uniquement des cookies techniques strictement nécessaires au fonctionnement
            de la plateforme (maintien de la session utilisateur authentifiée, mémorisation de la préférence
            pour le mode sombre). Aucun cookie de traçage publicitaire ou tiers n'est déposé. Pour plus
            d'informations, veuillez consulter notre <a href="/cookies" className="text-indigo-600 underline hover:no-underline">Politique de cookies</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">10. Contact & réclamation</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
            <li>Contact RGPD de l'équipe : rgpd-equipe08@edututor.local</li>
            <li>
              Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés,
              vous pouvez adresser une réclamation directement auprès de la{' '}
              <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) sur leur site internet (cnil.fr).
            </li>
          </ul>
        </section>
      </div>

      <p className="text-xs text-slate-400 mt-10 pt-4 border-t border-slate-200 dark:border-slate-700">
        Dernière mise à jour : 1er juillet 2026. Document rédigé dans le cadre pédagogique APOCAL'IPSSI 2026.
      </p>
    </article>
  );
}
