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
    <header className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a
          href="#top"
          className="font-mono text-[0.8rem] font-medium uppercase tracking-[0.16em] text-ink"
        >
          Guiem&nbsp;Richard
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
            className="font-mono text-xs uppercase tracking-wider text-ink-soft transition-colors hover:text-ink"
          >
            {t('lang.switch')}
          </button>
          <Link
            to="/cours"
            className="rounded-md bg-primary px-3.5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            {t('nav.courses')}
          </Link>
        </div>
      </div>
    </header>
  )
}
