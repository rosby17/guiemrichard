import type { Bilingual } from '@/lib/i18n'

/**
 * Contenu de la landing — repris du site guiemrichard.cm.
 * Prose bilingue via { fr, en } ; les données factuelles (dates, citations) une seule fois.
 */

export const profile = {
  name: 'Guiem Richard',
  fullName: 'Dr. Guiem Richard',
  title: {
    fr: 'Enseignant-chercheur, Maître de conférences',
    en: 'Senior Lecturer & Researcher',
  } satisfies Bilingual<string>,
  institution: {
    fr: 'École Nationale Supérieure Polytechnique de Maroua, Université de Maroua',
    en: 'National Advanced School of Engineering of Maroua, University of Maroua',
  } satisfies Bilingual<string>,
  location: { fr: 'Maroua, Cameroun', en: 'Maroua, Cameroon' } satisfies Bilingual<string>,
}

export const bio: Bilingual<string[]> = {
  fr: [
    'Plus de dix ans d’enseignement continu des mathématiques, dans le secondaire comme dans le supérieur, au Cameroun et à l’étranger. Une pédagogie centrée sur l’étudiant, éprouvée auprès de près de 3 000 étudiants sur une dizaine de modules.',
    'Une activité de recherche soutenue : près de dix articles scientifiques co-signés dans des revues à comité de lecture et l’encadrement d’une dizaine de mémoires de master en mathématiques appliquées et en ingénierie.',
  ],
  en: [
    'More than ten years of continuous mathematics teaching, at both secondary and higher-education levels, in Cameroon and abroad. A student-centred approach, tested with close to 3,000 students across some ten modules.',
    'An active research record: nearly ten co-authored articles in peer-reviewed journals and the supervision of about ten Master’s dissertations in applied mathematics and engineering.',
  ],
}

export type Position = { period: string; role: Bilingual<string>; org: Bilingual<string> }

export const positions: Position[] = [
  {
    period: '2023 —',
    role: { fr: 'Maître de conférences', en: 'Senior Lecturer' },
    org: {
      fr: 'École Nationale Supérieure Polytechnique de Maroua, Université de Maroua',
      en: 'National Advanced School of Engineering of Maroua, University of Maroua',
    },
  },
  {
    period: '2019 – 2023',
    role: { fr: 'Chargé de cours, Analyse', en: 'Senior Lecturer, Analysis' },
    org: {
      fr: 'École Nationale Supérieure Polytechnique de Maroua',
      en: 'National Polytechnic School of Maroua',
    },
  },
  {
    period: '2015 – 2018',
    role: { fr: 'Assistant d’enseignement', en: 'Teaching Assistant' },
    org: { fr: 'North-West University, Afrique du Sud', en: 'North-West University, South Africa' },
  },
  {
    period: '2011 – 2019',
    role: { fr: 'Assistant', en: 'University Assistant' },
    org: {
      fr: 'École Nationale Supérieure Polytechnique de Maroua',
      en: 'National Polytechnic School of Maroua',
    },
  },
]

export type Education = { period: string; degree: Bilingual<string>; org: Bilingual<string> }

export const education: Education[] = [
  {
    period: '2015 – 2019',
    degree: {
      fr: 'Doctorat (Ph.D.) en mathématiques appliquées',
      en: 'Ph.D. in Applied Mathematics',
    },
    org: { fr: 'North-West University, Afrique du Sud', en: 'North-West University, South Africa' },
  },
  {
    period: '2007 – 2009',
    degree: {
      fr: 'Master en ingénierie mathématique',
      en: "Master's degree in Mathematical Engineering",
    },
    org: { fr: 'Université de Ngaoundéré', en: 'University of Ngaoundéré' },
  },
  {
    period: '2005 – 2007',
    degree: {
      fr: 'Licence en calcul scientifique',
      en: "Bachelor's degree in Scientific Computing",
    },
    org: { fr: 'Université de Ngaoundéré', en: 'University of Ngaoundéré' },
  },
  {
    period: '2008 – 2010',
    degree: { fr: 'DIPES II', en: 'DIPES II (higher-education teaching diploma)' },
    org: { fr: 'Université de Maroua', en: 'University of Maroua' },
  },
]

export type ResearchArea = { title: Bilingual<string>; body: Bilingual<string> }

export const researchAreas: ResearchArea[] = [
  {
    title: {
      fr: 'Modélisation mathématique en épidémiologie',
      en: 'Mathematical modelling in epidemiology',
    },
    body: {
      fr: 'Méthodes déterministes appliquées à la dynamique de propagation des maladies et à l’évaluation des interventions de santé publique.',
      en: 'Deterministic methods applied to disease-spread dynamics and to the assessment of public-health interventions.',
    },
  },
  {
    title: {
      fr: 'Systèmes d’équations différentielles fractionnaires',
      en: 'Systems of fractional differential equations',
    },
    body: {
      fr: 'Description et compréhension de réalités intermédiaires que les dérivées classiques n’expliquent pas.',
      en: 'Describing and understanding intermediate phenomena left unexplained by classical derivatives.',
    },
  },
  {
    title: {
      fr: 'Équations aux dérivées partielles et intégro-différentielles',
      en: 'Partial differential and integro-differential equations',
    },
    body: {
      fr: 'Modélisation de phénomènes issus de l’ingénierie et de la biologie mathématique.',
      en: 'Modelling phenomena arising in engineering and mathematical biology.',
    },
  },
  {
    title: {
      fr: 'Analyse des systèmes dynamiques',
      en: 'Analysis of dynamical systems',
    },
    body: {
      fr: 'Caractère bien posé, stabilité locale et globale des solutions, avec applications à l’épidémiologie.',
      en: 'Well-posedness, local and global stability of solutions, with applications to epidemiology.',
    },
  },
]

export type Thesis = {
  kind: 'thesis' | 'dissertation'
  title: string
  year: string
  supervisors: string
  href?: string
}

export const theses: Thesis[] = [
  {
    kind: 'thesis',
    title:
      'A theoretical analysis of certain types of nonlinear evolution equations with applications',
    year: '2019',
    supervisors: 'Prof. S. C. Oukouomi Noutchie · Dr. R. Y. M’Pika Massoukou',
  },
  {
    kind: 'dissertation',
    title: 'Mathematical modelling of the diffusion of resistance to an antimalarial drug',
    year: '2009',
    supervisors: 'Prof. D. E. Houpa Danga',
  },
]

export type Article = { year: string; authors: string; title: string; venue: string }

export const articles: Article[] = [
  {
    year: '2022',
    authors:
      'S. C. Oukouomi Noutchie, N. E. Mafatle, R. Guiem, R. Y. M’pika Massoukou',
    title:
      'On the dynamics of sexually transmitted diseases under awareness and treatment',
    venue: 'Frontiers in Applied Mathematics, 8 (2022) 880840',
  },
  {
    year: '2022',
    authors: 'N. A. Mbroh, R. Guiem, S. C. Noutchie',
    title:
      'A second-order numerical scheme for a singularly perturbed convection–diffusion problem with a non-local boundary condition',
    venue: 'Journal of Analysis & Applications, 20 (2022)',
  },
  {
    year: '2022',
    authors:
      'S. C. Oukouomi Noutchie, U. Useh, R. Y. M’pika Massoukou, R. Guiem, N. E. Mafatle',
    title: 'A theoretical analysis of a model for diabesity dynamics',
    venue: 'Journal of Algebra and Applied Mathematics, 20 (2022)',
  },
  {
    year: '2021',
    authors:
      'B. T. Mbopda, S. Issa, S. Abdoulkary, R. Guiem, H. P. Ekobena Fouda',
    title: 'Pattern formations in nonlinear dynamics of hepatitis B virus',
    venue: 'The European Physical Journal Plus, 136, 586 (2021)',
  },
  {
    year: '2021',
    authors:
      'S. Che Nde, M. Mathuthu, R. Y. M’pika Massoukou, S. K. Bett, R. Guiem, O. P. Oluwadamilare',
    title:
      'Modelling the dynamics of the cancer risk due to potentially toxic elements in agricultural soils (upper Crocodile River catchment, North-West province, South Africa)',
    venue: 'Ecotoxicology and Environmental Safety, 211 (2021) 111961',
  },
  {
    year: '2018',
    authors: 'R. Y. M’pika Massoukou, S. C. Oukouomi Noutchie, R. Guiem',
    title:
      'Global dynamics of an SVEIR model with age-dependent vaccination, infection, and latency',
    venue: 'Abstract and Applied Analysis, 2018 (2018), 21 p.',
  },
  {
    year: '2016',
    authors: 'R. Guiem, S. C. Oukouomi Noutchie',
    title:
      'A novel method for solving a coagulation–fragmentation equation with growth',
    venue: 'Journal of Algebra and Applied Mathematics, 79 (2016) 79–100',
  },
  {
    year: '2016',
    authors: 'R. Guiem, S. C. Oukouomi Noutchie',
    title: 'A new method for solving a coagulation–fragmentation equation',
    venue: 'Journal of Analysis and Applications, 87 (2016) 87–105',
  },
]

export type Supervised = {
  title: string
  student: string
  year: string
  track: Bilingual<string>
  note?: string
}

export const supervised: Supervised[] = [
  {
    title: 'Dynamics of a fractional SVEIR model with generalized continuous delay',
    student: 'Danwé Tapga',
    year: '2022 – 2023',
    track: { fr: 'Mathématiques appliquées, ENS Maroua', en: 'Applied mathematics, HTTC Maroua' },
  },
  {
    title:
      'Mathematical analysis of a fractional model for the spread of COVID-19 with delay',
    student: 'Mbrobi Jean',
    year: '2022 – 2023',
    track: { fr: 'Mathématiques appliquées, ENS Maroua', en: 'Applied mathematics, HTTC Maroua' },
  },
  {
    title:
      'Mathematical analysis of a fractional model for COVID-19 transmission with vaccination',
    student: 'Djorwé Djaotoing',
    year: '2022 – 2023',
    track: { fr: 'Mathématiques appliquées, ENS Maroua', en: 'Applied mathematics, HTTC Maroua' },
  },
  {
    title:
      'Analysis of an SVEIRS epidemiological model with Atangana–Baleanu fractional derivative',
    student: 'Meteka Jean',
    year: '2022',
    track: { fr: 'Mathématiques appliquées', en: 'Applied mathematics' },
  },
  {
    title:
      'Mathematical modelling of an age-structured fractional model for COVID-19 transmission',
    student: 'Demgne Kamgang Nina Fleurine',
    year: '2022 – 2024',
    track: { fr: 'Mathématiques appliquées, Faculté des Sciences', en: 'Applied mathematics, Faculty of Science' },
  },
  {
    title:
      'Assessing the impact of COVID-19 vaccine hesitancy through mathematical modelling: a fractional approach',
    student: 'Kemba Aboyna Stéphane',
    year: '2022',
    track: { fr: 'Mathématiques appliquées', en: 'Applied mathematics' },
    note: 'Dr. Abboubakar Hamadjam',
  },
  {
    title:
      'Design of a decision-making tool for credit grantors: the case of Crédit du Sahel',
    student: 'Kanne Tamibe Kochiake',
    year: '2022 – 2023',
    track: { fr: 'Ingénierie — sciences des données, ENSPM', en: 'Engineering — data science, NASE' },
  },
  {
    title:
      'An application for 3D model generation of an indoor building scene from 2D images',
    student: 'Zra André',
    year: '2022 – 2023',
    track: { fr: 'Ingénierie — sciences des données, ENSPM', en: 'Engineering — data science, NASE' },
  },
]

export type FreeResource = {
  title: string
  kind: Bilingual<string>
}

export const freeResources: FreeResource[] = [
  { title: 'Correction CC Analyse Réelle 2 — 2023-2024 (ISABEE)', kind: { fr: 'Corrigé d’épreuve', en: 'Worked solution' } },
  { title: 'Correction CC Analyse 1 — 2023-2024', kind: { fr: 'Corrigé d’épreuve', en: 'Worked solution' } },
  { title: 'Correction Examen de rattrapage — Analyse 1 (2024-2025)', kind: { fr: 'Corrigé d’épreuve', en: 'Worked solution' } },
  { title: 'Correction Examen Analyse 1 — 2023-2024 (ENSPM)', kind: { fr: 'Corrigé d’épreuve', en: 'Worked solution' } },
  { title: 'Correction Examen Analyse 1 — 2022-2023', kind: { fr: 'Corrigé d’épreuve', en: 'Worked solution' } },
  { title: 'Correction Examen Analyse 1 — 2023-2024 (ISABEE)', kind: { fr: 'Corrigé d’épreuve', en: 'Worked solution' } },
  { title: 'Correction Examen Analyse 2 — 2022-2023 (ISABEE)', kind: { fr: 'Corrigé d’épreuve', en: 'Worked solution' } },
  { title: 'Fiche de TPE-TP — Analyse numérique 2, 2023-2024 (UMa)', kind: { fr: 'Fiche de TD', en: 'Tutorial sheet' } },
]

export const contact = {
  emails: ['guiemrichard@yahoo.fr', 'richard.guiem@univ-maroua.cm'],
  phone: '+237 620 440 482',
  location: { fr: 'Maroua, Cameroun', en: 'Maroua, Cameroon' } satisfies Bilingual<string>,
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/richard-guiem-73307a28a' },
    { label: 'X', href: 'https://twitter.com/GuiemRicha75772' },
  ],
}
