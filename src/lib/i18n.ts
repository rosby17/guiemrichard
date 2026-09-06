// Minimal i18n scaffold — FR default, EN secondary.
// Phase 1 will expand this (see build plan section 02).
export type Locale = 'fr' | 'en'

export const DEFAULT_LOCALE: Locale = 'fr'

export const strings = {
  fr: {
    'nav.home': 'Accueil',
    'nav.courses': 'Cours',
    'nav.publications': 'Publications',
    'nav.contact': 'Contact',
    'nav.signIn': 'Se connecter',
    'hero.role': 'Enseignant-chercheur',
  },
  en: {
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.publications': 'Publications',
    'nav.contact': 'Contact',
    'nav.signIn': 'Sign in',
    'hero.role': 'Senior Lecturer – Researcher',
  },
} satisfies Record<Locale, Record<string, string>>

export type StringKey = keyof (typeof strings)['fr']

export function t(locale: Locale, key: StringKey): string {
  return strings[locale][key] ?? strings[DEFAULT_LOCALE][key] ?? key
}
