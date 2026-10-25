# CampusLoop

A student marketplace and community platform where campus peers can buy, sell, lend, and share items — textbooks, lab equipment, electronics, and more — and connect for study sessions or gaming.

## Tech Stack

- **React 18** — UI library
- **Vite 6** — build tool and dev server
- **TypeScript** — type safety
- **Tailwind CSS v4** — utility-first styling
- **shadcn/ui + Radix UI** — accessible component primitives
- **Framer Motion** — animations
- **Lucide React** — icons

## Features

- 📚 **Marketplace** — list items to sell, lend, or share with fellow students
- 🤝 **Community** — post requests for study buddies or gaming partners
- 🔍 **Search & filter** — find items by category, type, or keyword
- ⚡ **Trust Points** — reputation system rewarding helpful community members
- 🛒 **Cart & Wishlist** — save and manage items you're interested in
- 📝 **New Post Modal** — easy listing creation with category selection

## Getting Started

Requires **Node 18+** and **pnpm** (`npm i -g pnpm`).

```bash
# Install dependencies (needs network once; works offline after)
pnpm install

# Start the dev server
pnpm dev          # http://localhost:5173

# Other commands
pnpm build        # production build → dist/
pnpm preview      # serve dist/ locally
pnpm typecheck    # run TypeScript checks
```

Fonts (Inter, via `@fontsource-variable/inter`) and listing photos (`public/images/`) are bundled locally so the app runs without internet after the initial install.

## Project Structure

```
src/
├── app/
│   ├── App.tsx              # Root component, all state lives here
│   └── components/
│       ├── ui/              # shadcn/ui primitives (Button, Card, Dialog…)
│       ├── Header.tsx       # Sticky nav with search, cart, and tabs
│       ├── MarketplaceCard.tsx
│       ├── CommunityCard.tsx
│       ├── Panels.tsx       # Cart, Wishlist, dialogs
│       ├── NewPostModal.tsx
│       └── FloatingElements.tsx
├── styles/
│   ├── index.css            # Entry stylesheet
│   ├── theme.css            # Design tokens (CSS custom properties)
│   └── tailwind.css         # Tailwind base import
└── main.tsx                 # React DOM entry point
public/
└── images/                  # Listing photos (Unsplash, bundled locally)
```

## License

MIT

