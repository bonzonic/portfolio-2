# Portfolio v2 — Claude Code Guide

## Project overview

Next.js 15 portfolio site. App Router, TypeScript strict mode, Tailwind v4, ESLint + Prettier.

## Tech stack

| Tool | Version | Notes |
|---|---|---|
| Next.js | 15 | App Router only — no Pages Router |
| React | 19 | Server Components by default |
| TypeScript | 5 | strict mode enabled |
| Tailwind CSS | 4 | config-free, `@import "tailwindcss"` in globals.css |
| ESLint | 9 | flat config (`eslint.config.mjs`), includes `next/typescript` + `prettier` |
| Prettier | 3 | `.prettierrc` — 2 spaces, double quotes, 100 char width |

## Project structure

```
src/
  app/
    layout.tsx        # root layout — metadata and font go here
    page.tsx          # home page
    globals.css       # @import "tailwindcss" and global custom styles
    components/       # shared UI components
    sections/         # full-width page sections composed in page.tsx
    data/             # static typed data (TypeScript objects, no DB)
    utils/            # hooks and helpers
```

## Component conventions

- Server Components by default — only add `"use client"` when you need state, effects, or browser APIs.
- One component per file. Filename matches the exported component name in kebab-case.
- Props interface defined at the top of the file, above the component.
- Use named exports for everything except page and layout files (those use default exports per Next.js convention).

```tsx
// components/my-card.tsx
export interface MyCardProps {
  title: string;
  description: string;
}

export function MyCard({ title, description }: MyCardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
```

## TypeScript rules

- Always type component props explicitly — never rely on inference from JSX usage.
- Prefer `interface` for object shapes, `type` for unions and primitives.
- No `any`. Use `unknown` with a type guard if the shape is truly unknown.
- Async Server Components: `async function Page()` with `await` directly in JSX — no `useEffect` for data fetching.

## React / Next.js patterns

- Layouts accept `{ children: React.ReactNode }` — no other props.
- Metadata is exported from layout or page files (`export const metadata: Metadata = { ... }`).
- Static data (work history, projects, skills) lives in `src/app/data/` as typed TS files — no JSON.
- Images: always use `next/image` with explicit `width` and `height`.
- Fonts: use `next/font/google` in `layout.tsx`, pass the className to `<body>`.
- Links: always use `next/link`, never a bare `<a>` for internal navigation.

## Tailwind v4

- No `tailwind.config.ts` — Tailwind v4 is config-free.
- Custom tokens go in `globals.css` under `@theme { ... }`.
- Custom variants: `@custom-variant dark (&:where(.dark, .dark *));`

## ESLint + Prettier

- Run `npm run lint` before committing. CI will fail on lint errors.
- Run `npm run format` to auto-format. Prettier is the source of truth for style — don't hand-fix formatting.
- ESLint and Prettier are separated: ESLint handles code quality, Prettier handles formatting. `eslint-config-prettier` disables conflicting ESLint style rules.

## Development workflow

```bash
npm run dev          # start dev server at localhost:3000
npm run build        # production build (run this to catch type and lint errors)
npm run type-check   # TypeScript check without building
npm run lint         # ESLint check
npm run format       # Prettier format all files
```

## Vercel deployment

- Push to `main` — Vercel auto-deploys.
- No `vercel.json` needed: the repo root is the Next.js project root.
- No environment variables required for the base portfolio.
- Add `.env.local` for any secrets (already in `.gitignore`).

## Adding a new section

1. Create `src/app/sections/my-section.tsx` (named export, Server Component).
2. Add static data to `src/app/data/` if needed.
3. Import and render in `src/app/page.tsx`.
4. Run `npm run build` to verify no type errors.

## What NOT to do

- Don't put business logic in components — extract to `utils/`.
- Don't use `useEffect` for data that can be fetched server-side.
- Don't add comments explaining what the code does — only comment *why* when non-obvious.
- Don't add error boundaries or loading skeletons before they are needed.
- Don't create abstractions to handle hypothetical future cases.
