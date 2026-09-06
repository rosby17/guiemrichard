import { Link } from 'react-router-dom'

/**
 * Landing publique — présente le Dr. Guiem Richard.
 * Phase 1 du plan : parcours, axes de recherche, publications, encadrement,
 * ressources gratuites, contact. Bilingue FR/EN.
 */
export function LandingPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
        Enseignant-chercheur · Mathématiques appliquées
      </p>
      <h1 className="mt-4 font-display text-5xl font-semibold leading-tight text-ink">
        Guiem Richard
      </h1>
      <p className="mt-5 max-w-prose text-lg text-ink-soft">
        Modélisation mathématique en épidémiologie, équations aux dérivées
        partielles et fractionnaires, analyse des systèmes dynamiques.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          to="/cours"
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white"
        >
          Voir les cours
        </Link>
        <a
          href="#publications"
          className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink"
        >
          Publications
        </a>
      </div>
    </main>
  )
}
