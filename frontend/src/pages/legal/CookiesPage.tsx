/** Politique de gestion des cookies — EduTutor IA. */

export default function CookiesPage() {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Politique de gestion des cookies</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-1">Plateforme : EduTutor IA</p>
      <p className="text-slate-500 dark:text-slate-500 text-sm mb-6">Dernière mise à jour : 1er juillet 2026 — Version 1.0</p>

      <p className="text-slate-700 dark:text-slate-300 mb-6">
        La présente politique détaille l'usage des cookies et technologies de stockage similaires
        sur le site d'EduTutor IA, leur utilité et la manière de les contrôler.
      </p>

      <div className="space-y-6 text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">1. Qu'est-ce qu'un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte (ou un espace de stockage local comme le localStorage)
            déposé et enregistré par votre navigateur web sur votre terminal (ordinateur, smartphone, tablette)
            lors de la visite d'un site internet. Il permet au site de mémoriser certaines informations vous
            concernant afin de faciliter votre navigation, de sécuriser votre connexion ou d'adapter l'affichage
            à vos préférences.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">2. Cookies et stockage utilisés</h2>
          <p>
            La plateforme EduTutor IA adopte une philosophie « Local-First » et de minimisation des données.
            À ce titre, aucun cookie tiers (publicitaire, ciblage ou réseaux sociaux) n'est déployé.
            Le site utilise exclusivement des technologies de stockage local strictement nécessaires.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 dark:border-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th className="text-left p-2 border-b border-slate-200 dark:border-slate-700">Nom</th>
                  <th className="text-left p-2 border-b border-slate-200 dark:border-slate-700">Type</th>
                  <th className="text-left p-2 border-b border-slate-200 dark:border-slate-700">Finalité</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b border-slate-200 dark:border-slate-700 font-mono text-xs">auth_token</td>
                  <td className="p-2 border-b border-slate-200 dark:border-slate-700">localStorage</td>
                  <td className="p-2 border-b border-slate-200 dark:border-slate-700">Token d'authentification</td>
                </tr>
                <tr>
                  <td className="p-2 border-b border-slate-200 dark:border-slate-700 font-mono text-xs">theme_preference</td>
                  <td className="p-2 border-b border-slate-200 dark:border-slate-700">localStorage</td>
                  <td className="p-2 border-b border-slate-200 dark:border-slate-700">Mode sombre / clair</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono text-xs">session_id</td>
                  <td className="p-2">Cookie</td>
                  <td className="p-2">Session technique serveur</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">3. Finalité de chaque cookie/stockage</h2>
          <ul className="list-disc ml-6 mt-2 space-y-2 text-sm">
            <li>
              <strong>auth_token (localStorage) — Technique / Sécurité :</strong> Essentiel pour maintenir votre
              session active. Il évite à l'enseignant ou à l'étudiant de ressaisir ses identifiants à chaque
              changement de page ou lors de l'envoi d'un cours à l'API LLM.
            </li>
            <li>
              <strong>theme_preference (localStorage) — Fonctionnelle / Confort :</strong> Permet de charger
              instantanément l'interface graphique correspondante (par exemple, le mode sombre activé par
              l'utilisateur pour réviser tard le soir sans fatigue visuelle), évitant un effet de flash lumineux
              au chargement.
            </li>
            <li>
              <strong>session_id (Cookie) — Technique :</strong> Assure la stabilité et la sécurité des
              requêtes HTTP transmises à notre infrastructure locale.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">4. Consentement</h2>
          <p>
            Conformément aux directives de la CNIL et du RGPD, les cookies et espaces de stockage exclusivement
            techniques et nécessaires à la fourniture du service demandé par l'utilisateur sont exemptés de
            consentement préalable.
          </p>
          <p className="mt-2">
            Puisque EduTutor IA n'utilise aucun traceur publicitaire ou de mesure d'audience externe, aucune
            bannière de consentement intrusive n'est affichée à l'entrée du site. L'utilisation de la plateforme
            vaut pour acceptation de ces stockages techniques indispensables.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">5. Durée de conservation</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
            <li><strong>Token d'authentification (localStorage) :</strong> Conservé tant que l'utilisateur ne clique pas sur « Déconnexion » ou jusqu'à l'expiration programmée du jeton de sécurité (généralement 7 à 14 jours).</li>
            <li><strong>Préférence de thème (localStorage) :</strong> Conservée indéfiniment sur le navigateur de l'utilisateur jusqu'à ce que ce dernier efface manuellement les données de son navigateur ou bascule à nouveau le bouton de thème.</li>
            <li><strong>Cookie de session (session_id) :</strong> Supprimé automatiquement dès la fermeture de la fenêtre du navigateur web.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">6. Gérer ou refuser les cookies</h2>
          <p>
            Bien que ces stockages soient indispensables au bon fonctionnement de l'application, vous pouvez
            à tout moment inspecter, bloquer ou supprimer ces données via les paramètres de votre navigateur :
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
            <li><strong>Via les outils de développement (F12) :</strong> Onglet Application ou Stockage → Local Storage / Cookies.</li>
            <li><strong>Via les réglages généraux du navigateur :</strong> Vous pouvez configurer votre logiciel pour qu'il rejette globalement les cookies ou nettoie automatiquement le stockage local à la fermeture.</li>
          </ul>
          <p className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded text-sm text-amber-800 dark:text-amber-200">
            <strong>Attention :</strong> si vous désactivez ou effacez le localStorage pour EduTutor IA,
            vous serez instantanément déconnecté et il vous sera impossible d'accéder à votre tableau de bord
            ou de générer des quiz.
          </p>
        </section>
      </div>

      <p className="text-xs text-slate-400 mt-10 pt-4 border-t border-slate-200 dark:border-slate-700">
        Dernière mise à jour : 1er juillet 2026. Document rédigé dans le cadre pédagogique APOCAL'IPSSI 2026.
      </p>
    </article>
  );
}
