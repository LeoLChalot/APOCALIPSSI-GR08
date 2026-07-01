/** Mentions légales — EduTutor IA. */

export default function MentionsLegalesPage() {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Mentions légales</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Informations légales obligatoires identifiant l'éditeur et l'hébergeur du site.
      </p>

      <div className="space-y-6 text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">1. Éditeur du site</h2>
          <p>
            Le présent site internet est édité par l'équipe projet <strong>EduTutor IA</strong> (Équipe
            constituée dans le cadre de la semaine immersive Scrum APOCAL'IPSSI 2026).
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
            <li>Statut : Projet étudiant de fin de cycle / Startup de simulation pédagogique</li>
            <li>Organisation de rattachement : IPSSI (École d'Informatique)</li>
            <li>Adresse de l'organisation : 25 Rue Claude Tillier, 75012 Paris</li>
            <li>Email de contact : contact-equipe08@edututor.local</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">2. Directeur de la publication</h2>
          <p>
            Le directeur de la publication du site internet est le Product Owner de l'équipe :
            <strong> Chahrazed SOLTANI</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">3. Hébergeur</h2>
          <p>
            Le site internet est hébergé localement au sein des infrastructures de l'établissement
            ou sur les serveurs de l'équipe :
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
            <li>Nom de l'hébergeur : Infrastructure Locale IPSSI</li>
            <li>Adresse : 25 Rue Claude Tillier, 75012 Paris</li>
            <li>Téléphone : 01 23 45 67 89</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">4. Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus présents sur ce site (textes, logos, code source de l'application,
            architectures, interfaces et livrables pédagogiques) est la propriété exclusive de la
            startup EduTutor IA et de ses concepteurs, sous réserve des éléments fournis initialement
            dans le cadre du kit de démarrage APOCAL'IPSSI 2026 par Mohamed Amine EL AFRIT
            (licence CC BY-NC-SA 4.0). Toute reproduction, modification ou distribution non autorisée
            du code ou des fonctionnalités du module de génération de quiz par IA est strictement
            interdite sans accord préalable écrit.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">5. Contact</h2>
          <p>
            Pour toute question d'ordre juridique ou pour exercer vos droits d'accès, de rectification
            ou d'effacement de vos données personnelles (conformément au RGPD et à la gestion des
            demandes de droit d'accès / SAR) :
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
            <li>Adresse email dédiée : rgpd-equipe08@edututor.local</li>
          </ul>
        </section>
      </div>

      <p className="text-xs text-slate-400 mt-10 pt-4 border-t border-slate-200 dark:border-slate-700">
        Dernière mise à jour : 1er juillet 2026. Document rédigé dans le cadre pédagogique APOCAL'IPSSI 2026.
      </p>
    </article>
  );
}
