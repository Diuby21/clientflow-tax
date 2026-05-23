# ClientFlow Tax

Plateforme SaaS pour comptables québécois — gestion de clients, dossiers fiscaux et outils alignés sur la fiscalité du Québec.

## Stack

- **Next.js 15** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **Shadcn UI** (style New York, thème slate)

## Prérequis

- [Node.js](https://nodejs.org/) 20 LTS ou plus récent (inclut `npm` et `npx`)
- Git (optionnel)

## Démarrage rapide

Ouvrez PowerShell dans ce dossier (`Clientflow`) et exécutez les commandes **une par une** (voir section ci-dessous).

## Ajouter des composants Shadcn

```bash
npx shadcn@latest add card input label
```

## Structure

```
src/
├── app/          # Pages et layouts (App Router)
├── components/   # Composants React (ui/ = Shadcn)
└── lib/          # Utilitaires (cn, etc.)
```

## Licence

Projet privé — ClientFlow Tax.
