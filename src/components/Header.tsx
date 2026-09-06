import { Link } from 'react-router-dom'
import { useLocale, type UIKey } from '@/lib/i18n'

const NAV: { href: string; key: UIKey }[] = [
  { href: '#about', key: 'nav.about' },
  { href: '#research', key: 'nav.research' },
  { href: '#publications', key: 'nav.publications' },
  { href: '#supervision', key: 'nav.supervision' },
  { href: '#resources', key: 'nav.resources' },
  { href: '#contact', key: 'nav.contact' },
]

export function Header() {
  const { t, locale, setLocale } = useLocale()

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a href="#top" className="flex items-center" aria-label="Guiem Richard">
          <img
            src="/img/logo.png"
            alt="Guiem Richard"
            width={936}
            height={406}
            className="h-8 w-auto sm:h-9 dark:brightness-0 dark:invert"
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-blue"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
            className="rounded-md border border-line px-2.5 py-1.5 font-mono text-xs font-medium uppercase tracking-wider text-ink-soft transition-colors hover:border-blue hover:text-blue"
          >
            {locale === 'fr' ? 'EN' : 'FR'}
          </button>
          <Link
            to="/cours"
            className="rounded-md bg-amber px-4 py-2 text-sm font-bold text-[#1a1205] shadow-sm transition-colors hover:bg-amber-deep"
          >
            {t('nav.courses')}
          </Link>
        </div>
      </div>
    </header>
  )
}
