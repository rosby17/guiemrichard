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

const STATS = [
  { value: '10+', fr: 'ans d’enseignement', en: 'years teaching' },
  { value: '≈ 3 000', fr: 'étudiants formés', en: 'students taught' },
  { value: '≈ 10', fr: 'articles publiés', en: 'articles published' },
  { value: '≈ 10', fr: 'mémoires encadrés', en: 'dissertations supervised' },
]

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
    <div id="top" className="min-h-screen bg-bg">
      <Header />

      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden bg-blue text-on-blue">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              'linear-gradient(135deg, #003fb1 0%, #084088 55%, #0274be 130%)',
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-amber">
              {pick(profile.title, locale)}
            </p>
            <h1 className="mt-4 text-balance font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-5 max-w-lg text-lg text-blue-pale">{t('hero.role')}</p>
            <p className="mt-2 max-w-lg text-sm text-blue-pale/80">
              {pick(profile.institution, locale)} · {pick(profile.location, locale)}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/cours"
                className="rounded-md bg-amber px-6 py-3 text-sm font-bold text-[#1a1205] transition-colors hover:bg-amber-deep"
              >
                {t('hero.cta.primary')}
              </Link>
              <a
                href="#publications"
                className="rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t('hero.cta.secondary')}
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-2xl border border-white/25" />
            <img
              src="/img/graduation.jpg"
              alt={
                locale === 'fr'
                  ? 'Dr. Guiem Richard en tenue doctorale'
                  : 'Dr. Guiem Richard in doctoral regalia'
              }
              width={584}
              height={876}
              className="relative rounded-2xl border border-white/20 object-cover shadow-2xl"
            />
          </div>
        </div>

        {/* stats band */}
        <div className="relative border-t border-white/15 bg-black/10">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-5 py-8 sm:px-8 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.value}>
                <dt className="font-display text-2xl font-bold sm:text-3xl">{s.value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wide text-blue-pale/80">
                  {locale === 'fr' ? s.fr : s.en}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- Parcours ---- */}
      <Section id="about" index="01" eyebrow={t('nav.about')} title={t('about.title')} tone="tint">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="mx-auto w-full max-w-xs lg:mx-0">
            <img
              src="/img/drguiem.jpeg"
              alt="Dr. Guiem Richard"
              width={556}
              height={576}
              className="w-full rounded-2xl border border-line object-cover shadow-sm"
            />
          </div>
          <div>
            <div className="space-y-4">
              {pick(bio, locale).map((p, i) => (
                <p key={i} className="max-w-prose leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              <div>
                <h3 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-blue-bright">
                  {t('about.positions')}
                </h3>
                <ul className="mt-4 space-y-4">
                  {positions.map((row, i) => (
                    <li key={i} className="text-sm">
                      <span className="font-mono text-xs text-amber-deep">{row.period}</span>
                      <p className="mt-0.5 font-semibold text-ink">{pick(row.role, locale)}</p>
                      <p className="text-ink-soft">{pick(row.org, locale)}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-blue-bright">
                  {t('about.education')}
                </h3>
                <ul className="mt-4 space-y-4">
                  {education.map((row, i) => (
                    <li key={i} className="text-sm">
                      <span className="font-mono text-xs text-amber-deep">{row.period}</span>
                      <p className="mt-0.5 font-semibold text-ink">{pick(row.degree, locale)}</p>
                      <p className="text-ink-soft">{pick(row.org, locale)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Recherche ---- */}
      <Section
        id="research"
        index="02"
        eyebrow={t('nav.research')}
        title={t('research.title')}
        intro={t('research.intro')}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {researchAreas.map((area, i) => (
            <article
              key={i}
              className="rounded-xl border border-line bg-surface p-6 transition-shadow hover:shadow-md"
            >
              <span className="block h-1 w-10 rounded bg-blue-bright" />
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                {pick(area.title, locale)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {pick(area.body, locale)}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* ---- Publications ---- */}
      <Section
        id="publications"
        index="03"
        eyebrow={t('nav.publications')}
        title={t('publications.title')}
        tone="tint"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {theses.map((th, i) => (
            <article
              key={i}
              className="rounded-xl bg-blue-deep p-6 text-on-blue"
            >
              <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-amber">
                {th.kind === 'thesis'
                  ? t('publications.thesis')
                  : t('publications.dissertation')}{' '}
                · {th.year}
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug">
                {th.title}
              </h3>
              <p className="mt-4 text-xs text-blue-pale/90">
                {t('publications.supervisors')} {th.supervisors}
              </p>
            </article>
          ))}
        </div>

        <h3 className="mt-12 font-mono text-xs font-medium uppercase tracking-[0.16em] text-blue-bright">
          {t('publications.articles')}
        </h3>
        <ol className="mt-6 divide-y divide-line rounded-xl border border-line bg-surface">
          {articlesByYear.map((a, i) => (
            <li key={i} className="grid grid-cols-[3.2rem_1fr] gap-4 p-5">
              <span className="font-mono text-sm font-medium tabular-nums text-amber-deep">
                {a.year}
              </span>
              <div className="text-sm">
                <p className="font-medium text-ink">{a.title}</p>
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
        index="04"
        eyebrow={t('nav.supervision')}
        title={t('supervision.title')}
        intro={t('supervision.intro')}
      >
        <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
          {supervised.map((s, i) => (
            <li key={i} className="grid gap-1 p-5 sm:grid-cols-[7rem_1fr]">
              <span className="font-mono text-xs text-amber-deep">{s.year}</span>
              <div className="text-sm">
                <p className="font-medium text-ink">{s.title}</p>
                <p className="mt-1 text-ink-soft">
                  {s.student} · {pick(s.track, locale)}
                  {s.note ? ` · co-encadrement ${s.note}` : ''}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-xl rounded-lg border-l-4 border-amber bg-bg-2 p-4 text-sm text-ink-soft">
          {t('supervision.cta')}
        </p>
      </Section>

      {/* ---- Ressources gratuites ---- */}
      <Section
        id="resources"
        index="05"
        eyebrow={t('nav.resources')}
        title={t('resources.title')}
        intro={t('resources.intro')}
        tone="tint"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {freeResources.map((r, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-4 rounded-lg border border-line bg-surface p-4"
            >
              <div>
                <p className="text-sm font-medium text-ink">{r.title}</p>
                <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-wider text-ink-soft">
                  {pick(r.kind, locale)}
                </p>
              </div>
              <span className="mt-0.5 shrink-0 rounded bg-amber/15 px-2 py-0.5 font-mono text-[0.65rem] font-medium text-amber-deep">
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
      <section id="contact" className="scroll-mt-20 bg-blue-deep py-16 text-on-blue sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-sm font-medium text-amber">06</span>
            <p className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.2em] text-blue-pale/80">
              {t('nav.contact')}
            </p>
          </div>
          <h2 className="mt-3 max-w-3xl text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
            {t('contact.title')}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-blue-pale">{t('contact.intro')}</p>

          <dl className="mt-12 grid gap-10 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-pale/70">
                {t('contact.email')}
              </dt>
              <dd className="mt-2 space-y-1 text-sm">
                {contact.emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="block hover:text-amber">
                    {e}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-pale/70">
                {t('contact.phone')}
              </dt>
              <dd className="mt-2 text-sm">{contact.phone}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-blue-pale/70">
                {t('contact.location')}
              </dt>
              <dd className="mt-2 text-sm">{pick(contact.location, locale)}</dd>
              <dd className="mt-3 flex gap-4 text-sm">
                {contact.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-medium hover:text-amber"
                  >
                    {s.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="bg-[#06305f] py-10 text-blue-pale/70">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-5 sm:px-8 sm:flex-row sm:items-center sm:justify-between">
          <img
            src="/img/logo-white.png"
            alt="Guiem Richard"
            width={936}
            height={406}
            className="h-7 w-auto opacity-80"
          />
          <div className="text-xs">
            <p>
              © {new Date().getFullYear()} {profile.fullName}. {t('footer.rights')}
            </p>
            <p className="mt-0.5">{t('footer.built')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
