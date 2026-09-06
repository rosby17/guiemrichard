# Plateforme Guiem Richard

Reconstruction de [guiemrichard.cm](https://guiemrichard.cm) **sans WordPress** :

- **Landing** publique bilingue (FR/EN) présentant le Dr. Guiem Richard
- **Espace élève** : catalogue de cours par catégorie, achat unitaire, consultation
- **Administration sur-mesure** : gestion des cours, catégories, fichiers, commandes

Plan de construction complet : voir l'artifact partagé (schéma de données, écrans, phases).

## Stack

| | |
|---|---|
| Front | React + Vite + Tailwind v4, React Router |
| Backend | Supabase — Postgres, Auth, Storage, Edge Functions |
| Paiement | Maketou / Tara Money (MTN MoMo, Orange Money, carte) — repris d'IziVoice |
| E-mails | Brevo |
| Hébergement front | Cloudflare Pages *(à confirmer)* |

## Démarrage

```bash
npm install
cp .env.example .env.local   # renseigner VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
npm run dev
```

## Structure

```
src/
  pages/        écrans (LandingPage, CatalogPage, AdminPage, …)
  lib/
    supabase.ts client Supabase (clé anon)
    i18n.ts     chaînes FR/EN
supabase/
  migrations/   schéma SQL (0001_init.sql = tables + RLS)
```

## Secrets

Les secrets serveur (`SUPABASE_SERVICE_ROLE_KEY`, `MAKETOU_API_KEY`,
`MAKETOU_PRODUCT_ID`, `TARA_WEBHOOK_SECRET`, `BREVO_API_KEY`) se configurent
comme **secrets d'Edge Functions Supabase** — jamais dans le dépôt ni dans le chat.

## Phases

0. Fondations · 1. Landing · 2. Comptes & catalogue · 3. Admin · 4. Paiement Maketou · 5. Migration & mise en ligne
