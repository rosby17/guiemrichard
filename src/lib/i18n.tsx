import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Locale = 'fr' | 'en'
export const LOCALES: Locale[] = ['fr', 'en']
export const DEFAULT_LOCALE: Locale = 'fr'

const STORAGE_KEY = 'gr.locale'

/** Sélectionne la variante FR/EN d'un contenu bilingue. */
export type Bilingual<T> = { fr: T; en: T }
export function pick<T>(value: Bilingual<T>, locale: Locale): T {
  return value[locale]
}

const ui = {
  fr: {
    'nav.about': 'Parcours',
    'nav.research': 'Recherche',
    'nav.publications': 'Publications',
    'nav.supervision': 'Encadrement',
    'nav.resources': 'Ressources',
    'nav.contact': 'Contact',
    'nav.courses': 'Voir les cours',
    'hero.role': 'Enseignant-chercheur en mathématiques appliquées',
    'hero.cta.primary': 'Découvrir les cours',
    'hero.cta.secondary': 'Parcourir les publications',
    'about.title': 'Parcours',
    'about.positions': 'Fonctions occupées',
    'about.education': 'Formation',
    'research.title': 'Axes de recherche',
    'research.intro':
      'Analyse appliquée : systèmes dynamiques, équations intégro-différentielles, équations différentielles fractionnaires et équations aux dérivées partielles.',
    'publications.title': 'Publications',
    'publications.thesis': 'Thèse de doctorat',
    'publications.dissertation': 'Mémoire de master',
    'publications.articles': 'Articles à comité de lecture',
    'publications.supervisors': 'Sous la direction de',
    'publications.download': 'Télécharger',
    'supervision.title': 'Encadrement',
    'supervision.intro':
      'Sujets de mémoires de master en mathématiques appliquées et en ingénierie encadrés par le Dr. Guiem.',
    'supervision.cta':
      'Pour une collaboration scientifique ou l’encadrement d’un mémoire ou d’une thèse, écrivez-moi.',
    'resources.title': 'Ressources gratuites',
    'resources.intro':
      'Corrigés d’épreuves et fiches de travaux dirigés, en accès libre.',
    'resources.download': 'PDF',
    'contact.title': 'Contact',
    'contact.intro':
      'Pour une collaboration, une intervention ou une question sur les cours.',
    'contact.email': 'Courriel',
    'contact.phone': 'Téléphone / WhatsApp',
    'contact.location': 'Localisation',
    'footer.rights': 'Tous droits réservés.',
    'footer.built': 'Site en reconstruction — phase 1.',
    'lang.switch': 'English',
  },
  en: {
    'nav.about': 'Background',
    'nav.research': 'Research',
    'nav.publications': 'Publications',
    'nav.supervision': 'Supervision',
    'nav.resources': 'Resources',
    'nav.contact': 'Contact',
    'nav.courses': 'View courses',
    'hero.role': 'Senior lecturer and researcher in applied mathematics',
    'hero.cta.primary': 'Explore the courses',
    'hero.cta.secondary': 'Browse publications',
    'about.title': 'Background',
    'about.positions': 'Positions held',
    'about.education': 'Education',
    'research.title': 'Research areas',
    'research.intro':
      'Applied analysis: dynamical systems, integro-differential equations, fractional differential equations and partial differential equations.',
    'publications.title': 'Publications',
    'publications.thesis': 'Ph.D. thesis',
    'publications.dissertation': "Master's dissertation",
    'publications.articles': 'Peer-reviewed articles',
    'publications.supervisors': 'Supervised by',
    'publications.download': 'Download',
    'supervision.title': 'Supervision',
    'supervision.intro':
      "Master's dissertation topics in applied mathematics and engineering supervised by Dr. Guiem.",
    'supervision.cta':
      'For a scientific collaboration or the supervision of a dissertation or thesis, get in touch.',
    'resources.title': 'Free resources',
    'resources.intro':
      'Worked exam solutions and tutorial sheets, freely available.',
    'resources.download': 'PDF',
    'contact.title': 'Contact',
    'contact.intro':
      'For a collaboration, a talk, or a question about the courses.',
    'contact.email': 'Email',
    'contact.phone': 'Phone / WhatsApp',
    'contact.location': 'Location',
    'footer.rights': 'All rights reserved.',
    'footer.built': 'Site under reconstruction — phase 1.',
    'lang.switch': 'Français',
  },
} as const satisfies Record<Locale, Record<string, string>>

export type UIKey = keyof (typeof ui)['fr']

type Ctx = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: UIKey) => string
}

const LocaleContext = createContext<Ctx | null>(null)

function readInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'fr' || stored === 'en') return stored
  } catch {
    /* ignore */
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language : ''
  return nav.toLowerCase().startsWith('en') ? 'en' : DEFAULT_LOCALE
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    setLocaleState(readInitialLocale())
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const t = useCallback((key: UIKey) => ui[locale][key] ?? ui.fr[key] ?? key, [locale])

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
