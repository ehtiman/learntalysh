# LearnTalysh Project Guide

## Project Overview
An interactive language learning platform for the Talysh language.
- **Tech Stack:** React (Vite), TypeScript, Tailwind CSS, Shadcn UI.
- **Backend:** Supabase (Auth & Database).
- **Deployment:** GitHub Pages (Action-based).

## Critical Deployment Rules (DO NOT REMOVE)
- **Base URL:** The site is hosted at `ehtiman.github.io/learntalysh/`.
- **Vite Config:** `vite.config.ts` must always have `base: "/learntalysh/"`.
- **Routing:** `src/App.tsx` must always have `<BrowserRouter basename="/learntalysh">`.
- **404 Handling:** The `public/404.html` file must be maintained to handle direct link refreshes.

## Development Commands
- **Install:** `npm install`
- **Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Type Check:** `npx tsc --noEmit`

## Coding Standards & Preferences
- **Languages:** Support AZ, EN, and RU. Use the `LanguageProvider` for all UI text.
- **Components:** Use Shadcn UI components from `@/components/ui`.
- **Icons:** Use `lucide-react`.
- **Data:** Lessons and content should be structured as JSON/Objects to match existing components.
- **Auth:** Use the `useAuth` hook for protected routes (e.g., Dashboard).

## Workflow
- Always create a new branch for features or edits.
- Create a Pull Request (PR) for me to review before merging to `main`.
- Ensure GitHub Secrets (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) are respected.
