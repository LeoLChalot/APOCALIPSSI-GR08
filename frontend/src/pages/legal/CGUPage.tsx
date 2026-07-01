/** Conditions Générales d'Utilisation — EduTutor IA. */

export default function CGUPage() {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Conditions Générales d'Utilisation</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-1">Plateforme : EduTutor IA</p>
      <p className="text-slate-500 dark:text-slate-500 text-sm mb-6">Dernière mise à jour : 1er juillet 2026 — Version 1.0</p>

      <p className="text-slate-700 dark:text-slate-300 mb-6">
        Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») régissent l'accès et
        l'utilisation de la plateforme EduTutor IA. Tout utilisateur (enseignant, personnel administratif
        ou étudiant) s'engage à les respecter sans réserve.
      </p>

      <div className="space-y-6 text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">1. Objet</h2>
          <p>
            Les présentes CGU ont pour objet de définir les modalités et conditions dans lesquelles l'équipe
            projet EduTutor IA (constituée dans le cadre de la semaine immersive Scrum APOCAL'IPSSI 2026) met
            à la disposition des utilisateurs son service web d'aide pédagogique basé sur l'Intelligence
            Artificielle. La plateforme permet notamment de téléverser des documents de cours afin de générer
            automatiquement des questionnaires à choix multiples (QCM), des quiz et des grilles d'évaluation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">2. Acceptation des conditions</h2>
          <p>
            L'accès et l'utilisation d'EduTutor IA sont subordonnés à l'acceptation pleine et entière des
            présentes CGU. Cette acceptation est matérialisée par une case à cocher obligatoire lors de la
            création du compte utilisateur ou, à défaut, par l'utilisation effective du service. Si l'utilisateur
            n'agrée pas tout ou partie des CGU, il doit immédiatement cesser d'utiliser la plateforme.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">3. Accès au service</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
            <li><strong>Disponibilité :</strong> Le service est accessible gratuitement et en principe 24h/24, 7j/7, sous réserve des périodes de maintenance technique ou des contraintes d'infrastructure propres à la simulation du projet étudiant.</li>
            <li><strong>Prérequis techniques :</strong> L'accès nécessite une connexion Internet stable ainsi qu'un navigateur web récent (prenant en charge le mode sombre, le stockage des sessions locales et l'import de fichiers PDF/texte). Le traitement de l'IA s'effectuant via une infrastructure locale/européenne souveraine (Ollama), des variations de latence peuvent occasionnellement survenir selon la charge du serveur.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">4. Compte utilisateur</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
            <li><strong>Création :</strong> L'accès aux fonctionnalités avancées (génération de quiz, historique des erreurs) nécessite la création d'un compte individuel via une adresse email valide. L'identifiant est l'adresse email.</li>
            <li><strong>Responsabilité :</strong> L'utilisateur est seul responsable de la confidentialité de son mot de passe et de toutes les actions menées avec son compte. Il s'engage à notifier l'équipe pour tout usage non autorisé.</li>
            <li><strong>Exactitude :</strong> L'utilisateur s'engage à fournir des informations de profil exactes et à les maintenir à jour via son espace personnel.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">5. Comportements interdits</h2>
          <p>Il est strictement interdit aux utilisateurs de :</p>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
            <li>Utiliser la plateforme pour téléverser des contenus à caractère injurieux, diffamatoire, pornographique, raciste ou enfreignant les lois en vigueur.</li>
            <li>Tenter de contourner, manipuler ou pirater le système, notamment par le biais d'attaques par injection de prompt (Prompt Injection), visant à forcer le LLM à ignorer ses consignes de sécurité ou à divulguer des informations système.</li>
            <li>Effectuer du reverse-engineering ou saturer abusivement les endpoints d'API.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">6. Contenu généré par IA</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
            <li><strong>Limites technologiques :</strong> L'utilisateur est expressément informé que les questionnaires et quiz sont générés de manière automatisée par un modèle de langage (LLM). Malgré l'intégration d'une architecture RAG (Retrieval-Augmented Generation) visant à ancrer les réponses dans le document fourni, l'IA est susceptible de générer des approximations ou des hallucinations factuelles.</li>
            <li><strong>Responsabilité de relecture :</strong> Le contenu généré ne saurait remplacer l'expertise pédagogique humaine. L'enseignant ou l'utilisateur reste le seul et unique responsable de la vérification, de la validation juridique/académique et de la correction des quiz avant toute projection ou diffusion en classe. Un bouton "Signaler" est mis à disposition pour notifier l'administration en cas d'erreur flagrante d'un modèle.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">7. Responsabilité</h2>
          <p>L'éditeur ne saurait être tenu responsable :</p>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
            <li>Des éventuelles erreurs, omissions ou inexactitudes présentes dans les quiz générés par l'IA.</li>
            <li>Des interruptions de service temporaires, des pertes de données ou des dommages directs ou indirects découlant de l'utilisation ou de l'impossibilité d'utiliser la plateforme.</li>
            <li>De l'usage qui sera fait des notes et scores obtenus par les étudiants à la suite des quiz générés.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">8. Propriété intellectuelle</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
            <li><strong>Droits sur le service :</strong> La structure globale de la plateforme, les codes sources (React, Django), les logos et la documentation technique (Kit de démarrage) restent la propriété exclusive de l'équipe EduTutor IA ou de l'école IPSSI.</li>
            <li><strong>Droits sur les documents déposés :</strong> Les textes de lois, cours et manuels téléversés par l'utilisateur demeurent sa propriété intellectuelle exclusive. L'application étant "Local-First" et hébergée souverainement, aucun document déposé n'est partagé avec des tiers ou utilisé pour entraîner des modèles Cloud américains.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">9. Modification des CGU</h2>
          <p>
            L'équipe se réserve le droit de modifier les présentes CGU à tout moment afin de les adapter
            aux évolutions techniques de la plateforme (notamment lors du déploiement des Release 2 et 3)
            ou aux exigences réglementaires. Les utilisateurs seront informés de toute modification majeure
            par une notification lors de leur connexion ou via une mise à jour visible au pied de page du site.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">10. Droit applicable et litiges</h2>
          <p>
            Les présentes CGU sont soumises au droit français. En cas de contestation, réclamation ou litige
            relatif à l'interprétation ou à l'exécution des présentes, et à défaut de résolution amiable
            préalable avec le contact de l'équipe (rgpd-equipe08@edututor.local), les tribunaux compétents
            de Paris seront seuls saisis.
          </p>
        </section>
      </div>

      <p className="text-xs text-slate-400 mt-10 pt-4 border-t border-slate-200 dark:border-slate-700">
        Dernière mise à jour : 1er juillet 2026. Document rédigé dans le cadre pédagogique APOCAL'IPSSI 2026.
      </p>
    </article>
  );
}
