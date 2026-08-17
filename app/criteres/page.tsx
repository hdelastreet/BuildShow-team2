import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sur quoi vous êtes évalué — Coach Soutenances",
  description:
    "Le déroulé d'une session, les quatre axes que le coach IA regarde dans votre pitch, la méthode STAR appliquée au client et la checklist à relire avant votre soutenance.",
};

/**
 * Page « En savoir plus » — transparence & coaching.
 * Reprend les critères d'évaluation (critères-pitch.md) dans une version
 * condensée : le WeFiiTer sait ce qui sera noté AVANT de démarrer, et repart
 * avec des conseils actionnables.
 *
 * Reste un Server Component : la checklist cochable est du CSS pur
 * (input natif + variantes `peer`/`group-has`), donc zéro JS et zéro état
 * persistant — un rafraîchissement remet tout à décoché.
 */
export default function CriteresPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-20">
      <p className="wf-eyebrow mb-4">Transparence &amp; coaching</p>
      <h1 className="wf-h1 wf-dot max-w-3xl">
        Sur quoi votre pitch est évalué
      </h1>
      <p className="wf-lead mt-6 max-w-2xl">
        Une session suit toujours le même déroulé, et le débrief s’appuie
        toujours sur les mêmes critères. Voici les deux, pour savoir où vous
        mettez les pieds avant de vous lancer.
      </p>

      {/* Le déroulé d'une session */}
      <h2 className="wf-h2 mt-14">Le déroulé d’une session</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {FLOW.map((s) => (
          <div
            key={s.step}
            className="rounded-2xl border border-border-white bg-glace px-5 py-5"
          >
            <p className="wf-caps text-orange">Étape {s.step}</p>
            <p className="wf-title mt-2">{s.title}</p>
            <p className="wf-sm mt-1">{s.detail}</p>
          </div>
        ))}
      </div>

      {/* Les 4 axes */}
      <h2 className="wf-h2 mt-16">Les quatre axes du débrief</h2>
      <p className="wf-body mt-3 max-w-2xl">
        Le coach regarde ces quatre dimensions, et rien d’autre. Pour chacune,
        voici ce qui fait la différence.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {AXES.map((axe) => (
          <article
            key={axe.n}
            className="flex flex-col rounded-2xl border border-border-white bg-blanc px-6 py-6 shadow-sm"
          >
            <p className="wf-caps text-orange">{axe.n}</p>
            <h3 className="wf-title mt-2">{axe.title}</h3>
            <p className="wf-sm mt-1 italic">{axe.claim}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {axe.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"
                  />
                  <span className="wf-body">{p}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* Méthode STAR */}
      <div className="mt-16 rounded-2xl bg-creme px-6 py-8 sm:px-8">
        <h2 className="wf-h2">La méthode STAR, tournée vers le client</h2>
        <p className="wf-body mt-3 max-w-2xl">
          Le cœur du pitch, c’est 3 à 4 expériences d’une minute à une minute
          trente. Racontez chacune dans cet ordre, en commençant par la plus
          pertinente au regard du secteur et des enjeux du client.
        </p>
        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          {STAR.map((item) => (
            <div key={item.letter}>
              <dt className="wf-title flex items-baseline gap-2">
                <span className="text-orange">{item.letter}</span>
                <span>{item.name}</span>
              </dt>
              <dd className="wf-body mt-1">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Checklist cochable — état purement local au navigateur, jamais persisté */}
      <h2 className="wf-h2 mt-16">À vous relire juste avant</h2>
      <p className="wf-body mt-3 max-w-2xl">
        Les mêmes questions que celles posées au coach. Si vous répondez oui à
        tout, vous êtes prêt. Cochez au fur et à mesure : rien n’est enregistré.
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        {CHECKLIST.map((item) => (
          <li key={item}>
            <label className="group flex cursor-pointer select-none items-start gap-3 rounded-xl border border-border-white bg-blanc px-5 py-3 shadow-sm transition-colors duration-200 hover:border-lavande has-[:checked]:border-jade has-[:checked]:bg-jade-clair has-[:focus-visible]:border-electrique">
              <input type="checkbox" className="peer sr-only" />
              <span
                aria-hidden
                className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-xs border border-border-cream bg-blanc text-blanc transition-colors duration-200 peer-checked:border-jade peer-checked:bg-jade"
              >
                <svg
                  viewBox="0 0 12 10"
                  className="h-2.5 w-3 scale-50 opacity-0 transition duration-200 ease-out group-has-[:checked]:scale-100 group-has-[:checked]:opacity-100"
                >
                  <path
                    d="M1 5.2 4.3 8.5 11 1.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="wf-body transition-colors duration-200 peer-checked:text-fg-muted">
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-14 flex flex-wrap items-center gap-4">
        <Link
          href="/session/new"
          className="inline-flex items-center justify-center rounded-pill bg-marine px-7 py-3 font-medium text-blanc shadow-md transition-colors hover:bg-marine-900"
        >
          Démarrer une session
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-pill border border-border-white px-7 py-3 font-medium text-fg transition-colors hover:text-electrique"
        >
          Retour à l’accueil
        </Link>
      </div>

      <p className="wf-legend mt-10">
        Critères WeFiiT : Guide Prépa Soutenance et Questions Types Soutenance
        (Mallette du Consultant), complétés par les bonnes pratiques pitch du
        marché.
      </p>
    </section>
  );
}

const FLOW = [
  {
    step: "1",
    title: "Votre pitch",
    detail: "Environ 10 minutes à voix haute, micro ouvert.",
  },
  {
    step: "2",
    title: "Les questions",
    detail: "Le coach joue le client et creuse vos réponses.",
  },
  {
    step: "3",
    title: "Le débrief",
    detail: "Fond, forme et storytelling, axe par axe.",
  },
];

const AXES = [
  {
    n: "01",
    title: "Structure & narratif",
    claim: "Une soutenance qui se suit sans effort.",
    points: [
      "Une accroche mémorable dans les 30 premières secondes, puis le plan des 3 ou 4 sections qui suivent.",
      "3 à 4 expériences en STAR, la plus pertinente en premier, couvrant des compétences variées.",
      "Des ponts explicites entre les expériences, et une pause de 3 à 5 secondes après chaque résultat.",
      "Une clôture de 30 à 45 secondes sur vos motivations : singulières, orientées client, humbles.",
    ],
  },
  {
    n: "02",
    title: "Présence & livraison",
    claim: "Le comment compte autant que le quoi.",
    points: [
      "Parler lentement, laisser de l’air, varier l’intonation pour marquer l’important.",
      "Regarder le client plutôt que ses notes, posture stable et mains visibles.",
      "Une idée clé tient en une phrase : pas de jargon non expliqué, ni de « euh », ni de « voilà ».",
      "Une énergie congruente : l’enthousiasme doit être réel, ni monotone ni surjoué.",
    ],
  },
  {
    n: "03",
    title: "Contenu & crédibilité",
    claim: "Prouver plutôt qu’affirmer.",
    points: [
      "Des chiffres : « on a réduit le time-to-market de 40 % » plutôt que « on a beaucoup travaillé ».",
      "Des détails qui situent l’histoire : secteur, taille d’équipe, contexte de départ.",
      "Un rebond explicite sur ses enjeux : « Vous mentionniez le scaling, j’ai une expérience directe de ça. »",
      "La transférabilité : le client doit voir comment votre expérience s’applique chez lui.",
    ],
  },
  {
    n: "04",
    title: "Préparation & itération",
    claim: "L’essentiel se joue avant le jour J.",
    points: [
      "S’entraîner à voix haute, ici ou au miroir, puis se réécouter.",
      "Récolter du feedback : le coach IA, le PAD, un ami extérieur au contexte.",
      "Ajuster le timing, la clarté et la fluidité des transitions.",
      "Mémoriser les points clés et leur ordre, pas le mot pour mot.",
    ],
  },
];

const STAR = [
  {
    letter: "S",
    name: "Situation",
    detail: "Un contexte, un secteur, un enjeu comparable à celui du client.",
  },
  {
    letter: "T",
    name: "Task",
    detail: "Votre rôle et vos responsabilités précises sur cette mission.",
  },
  {
    letter: "A",
    name: "Action",
    detail:
      "Ce que vous avez concrètement fait : méthodes, pilotage, outils mobilisés.",
  },
  {
    letter: "R",
    name: "Result",
    detail:
      "L’impact mesurable : délais tenus, coûts évités, qualité, taux d’adoption.",
  },
];

const CHECKLIST = [
  "Ai-je capté l’attention dans les 30 premières secondes ?",
  "Le client voit-il le lien entre mes expériences et ses enjeux ?",
  "Chaque expérience se lit-elle en Situation → Task → Action → Result ?",
  "Suis-je dans les 10 minutes, pauses comprises ?",
  "Mon énergie est-elle authentique, ni monotone ni artificielle ?",
  "Mes motivations sont-elles exprimées clairement, sans flou ?",
  "Ai-je évité le jargon, ou l’ai-je expliqué au passage ?",
  "Quels 2 ou 3 points le client retiendra-t-il de moi ?",
];
