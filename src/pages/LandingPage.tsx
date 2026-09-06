import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Section } from '@/components/Section'
import { useLocale, pick } from '@/lib/i18n'
import {
  profile,
  bio,
  positions,
  education,
  researchAreas,
  theses,
  articles,
  supervised,
  freeResources,
  contact,
} from '@/content/site'

const META = {
  fr: {
    title: 'Guiem Richard — Enseignant-chercheur en mathématiques appliquées',
    description:
      'Site du Dr. Guiem Richard, maître de conférences à l’Université de Maroua : recherche en modélisation épidémiologique et équations différentielles, publications, encadrement et cours.',
  },
  en: {
    title: 'Guiem Richard — Applied mathematics researcher',
    description:
      'Website of Dr. Guiem Richard, senior lecturer at the University of Maroua: research on epidemiological modelling and differential equations, publications, supervision and courses.',
  },
}

export function LandingPage() {
  const { t, locale } = useLocale()

  useEffect(() => {
    document.title = META[locale].title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', META[locale].description)
  }, [locale])

  const articlesByYear = [...articles].sort((a, b) => Number(b.year) - Number(a.year))

  return (
    <div id="top" className="min-h-screen bg-paper">
      <Header />

      {/* ---- Hero ---- */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-accent">
            {pick(profile.title, locale)}
          </p>
          <h1 className="mt-4 text-balance font-display text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">{t('hero.role')}</p>
          <p className="mt-2 max-w-xl text-sm text-ink-soft">
            {pick(profile.institution, locale)} · {pick(profile.location, locale)}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/cours"
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {t('hero.cta.primary')}
            </Link>
            <a
              href="#publications"
              className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
            >
              {t('hero.cta.secondary')}
            </a>
          </div>
        </div>
      </section>

      {/* ---- Parcours ---- */}
      <Section id="about" eyebrow="01" title={t('about.title')}>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-4">
            {pick(bio, locale).map((p, i) => (
              <p key={i} className="max-w-prose text-ink-soft">
                {p}
              </p>
            ))}
          </div>
          <div className="space-y-10">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
                {t('about.positions')}
              </h3>
              <ul className="mt-4 space-y-4">
                {positions.map((row, i) => (
                  <li key={i} className="grid grid-cols-[5.5rem_1fr] gap-3 text-sm">
                    <span className="font-mono text-xs text-accent">{row.period}</span>
                    <span>
                      <span className="font-medium text-ink">{pick(row.role, locale)}</span>
                      <br />
                      <span className="text-ink-soft">{pick(row.org, locale)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
                {t('about.education')}
              </h3>
              <ul className="mt-4 space-y-4">
                {education.map((row, i) => (
                  <li key={i} className="grid grid-cols-[5.5rem_1fr] gap-3 text-sm">
                    <span className="font-mono text-xs text-accent">{row.period}</span>
                    <span>
                      <span className="font-medium text-ink">{pick(row.degree, locale)}</span>
                      <br />
                      <span className="text-ink-soft">{pick(row.org, locale)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Recherche ---- */}
      <Section
        id="research"
        eyebrow="02"
        title={t('research.title')}
        intro={t('research.intro')}
      >
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {researchAreas.map((area, i) => (
            <article key={i} className="bg-surface p-6">
              <h3 className="font-display text-lg font-semibold text-ink">
                {pick(area.title, locale)}
              </h3>
              <p className="mt-2 text-sm text-ink-soft">{pick(area.body, locale)}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* ---- Publications ---- */}
      <Section id="publications" eyebrow="03" title={t('publications.title')}>
        <div className="grid gap-4 sm:grid-cols-2">
          {theses.map((th, i) => (
            <article key={i} className="rounded-xl border border-line bg-surface p-6">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent">
                {th.kind === 'thesis'
                  ? t('publications.thesis')
                  : t('publications.dissertation')}{' '}
                · {th.year}
              </p>
              <h3 className="mt-3 font-display text-lg font-medium leading-snug text-ink">
                {th.title}
              </h3>
              <p className="mt-3 text-xs text-ink-soft">
                {t('publications.supervisors')} {th.supervisors}
              </p>
            </article>
          ))}
        </div>

        <h3 className="mt-12 font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
          {t('publications.articles')}
        </h3>
        <ol className="mt-5 space-y-5">
          {articlesByYear.map((a, i) => (
            <li key={i} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line pb-5 last:border-0">
              <span className="font-mono text-sm tabular-nums text-accent">{a.year}</span>
              <div className="text-sm">
                <p className="text-ink">{a.title}</p>
                <p className="mt-1 text-ink-soft">{a.authors}</p>
                <p className="mt-0.5 italic text-ink-soft">{a.venue}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---- Encadrement ---- */}
      <Section
        id="supervision"
        eyebrow="04"
        title={t('supervision.title')}
        intro={t('supervision.intro')}
      >
        <ul className="space-y-5">
          {supervised.map((s, i) => (
            <li
              key={i}
              className="grid gap-1 border-b border-line pb-5 last:border-0 sm:grid-cols-[7rem_1fr]"
            >
              <span className="font-mono text-xs text-accent">{s.year}</span>
              <div className="text-sm">
                <p className="text-ink">{s.title}</p>
                <p className="mt-1 text-ink-soft">
                  {s.student} · {pick(s.track, locale)}
                  {s.note ? ` · co-encadrement ${s.note}` : ''}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-xl border-l-2 border-accent pl-4 text-sm text-ink-soft">
          {t('supervision.cta')}
        </p>
      </Section>

      {/* ---- Ressources gratuites ---- */}
      <Section
        id="resources"
        eyebrow="05"
        title={t('resources.title')}
        intro={t('resources.intro')}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {freeResources.map((r, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-4 rounded-lg border border-line bg-surface p-4"
            >
              <div>
                <p className="text-sm text-ink">{r.title}</p>
                <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-wider text-ink-soft">
                  {pick(r.kind, locale)}
                </p>
              </div>
              <span className="mt-0.5 shrink-0 rounded border border-line px-2 py-0.5 font-mono text-[0.65rem] text-ink-soft">
                {t('resources.download')}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-ink-soft">
          {locale === 'fr'
            ? 'Téléchargement disponible à la mise en ligne complète du site.'
            : 'Downloads will open when the full site goes live.'}
        </p>
      </Section>

      {/* ---- Contact ---- */}
      <Section
        id="contact"
        eyebrow="06"
        title={t('contact.title')}
        intro={t('contact.intro')}
      >
        <dl className="grid gap-8 sm:grid-cols-3">
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
              {t('contact.email')}
            </dt>
            <dd className="mt-2 space-y-1 text-sm">
              {contact.emails.map((e) => (
                <a key={e} href={`mailto:${e}`} className="block text-primary hover:underline">
                  {e}
                </a>
              ))}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
              {t('contact.phone')}
            </dt>
            <dd className="mt-2 text-sm text-ink">{contact.phone}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
              {t('contact.location')}
            </dt>
            <dd className="mt-2 text-sm text-ink">{pick(contact.location, locale)}</dd>
            <dd className="mt-3 flex gap-3 text-sm">
              {contact.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-primary hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </dd>
          </div>
        </dl>
      </Section>

      {/* ---- Footer ---- */}
      <footer className="border-t border-line py-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-1 px-5 text-xs text-ink-soft sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.fullName}. {t('footer.rights')}
          </p>
          <p>{t('footer.built')}</p>
        </div>
      </footer>
    </div>
  )
}
