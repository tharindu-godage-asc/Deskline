# Technical Overview

Deskline is a React-based single-page application (SPA) built using **Vite**, **React**, and **TypeScript**. The project follows a feature-oriented architecture to promote scalability, maintainability, and separation of concerns as new functionality is introduced throughout the development process.

At the current stage of development, the application focuses on establishing the project foundation rather than implementing complete business functionality.

## Technology Stack

| Technology | Purpose |
|------------|---------|
| React | Component-based UI development |
| TypeScript | Static typing and improved developer experience |
| Vite | Fast development server and build tool |
| CSS | Application styling using CSS custom properties (design tokens) |
| React Router *(planned)* | Client-side routing |
| Mock REST API *(planned)* | Simulate backend communication |

---

## Current Architecture

The project is organized using a modular, feature-based folder structure.

```
src/
├── assets/
├── components/
├── features/
│   └── requests/
├── layouts/
├── pages/
├── shared/
├── styles/
├── types/
├── App.tsx
└── main.tsx
```

Each feature will encapsulate its own components, types, utilities, and business logic, while shared resources will be placed under the `shared` directory.

---

## Current Functionality

The current implementation includes:

- React + TypeScript + Vite project setup
- Initial application layout
- Core `Request` TypeScript model
- Small fixture dataset for development
- Static request detail view
- Theme color tokens using CSS custom properties
- Basic project structure for future expansion

---

## Core Domain Model

The primary domain entity is a **Request**, which represents an IT or facilities support request.

```ts
type Status = "open" | "pending" | "closed" | "cancelled";

type Priority = "low" | "medium" | "high";

type Category =
  | "hardware"
  | "software"
  | "facilities"
  | "access";

type Request = {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  category: Category;
  requesterId: string;
  assigneeId: string | null;
  createdAt: string;
  updatedAt: string;
};
```

Additional domain models such as `User` and `Message` will be introduced in later development stages.

---

## Planned Technical Enhancements

As development progresses, the project will be extended with:

- Client-side routing using React Router
- Role-based authentication and authorization
- Feature-based state management
- Mock REST API integration
- Loading, empty, and error state handling
- Form validation
- Search and filtering
- Theme persistence (Light/Dark Mode)
- Accessibility improvements
- Performance optimizations for large datasets

## How to Run the App

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`, then open the local Vite URL shown in the terminal (default `http://localhost:5173`).
3. No `.env` or backend setup is needed — Mock Service Worker (MSW) starts automatically in dev mode (see below) and serves fixture data.

Other scripts:

| Command | Purpose |
| --- | --- |
| `npm run build` | Type-check (`tsc -b`) and produce a production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` / `npm run test:watch` | Run unit tests with Vitest |
| `npm run test:coverage` | Run unit tests with coverage |
| `npm run e2e` | Run Playwright end-to-end tests (expects the dev server at `http://localhost:5173`) |
| `npm run e2e:ui` / `npm run e2e:headed` | Playwright tests in UI mode / headed browser mode |

## Testing

The project has two separate test layers: Vitest for fast unit tests, and Playwright for end-to-end browser tests against the running app.

### Unit tests (Vitest)

```bash
npm test              # run once
npm run test:watch    # watch mode
npm run test:coverage # run with V8 coverage report
```

Tests live in [src/tests/](src/tests/) and cover pure logic rather than components:

| File | Covers |
| --- | --- |
| [filterRequests.test.ts](src/tests/filterRequests.test.ts) | `filterRequests`/`sortRequests` — status/priority/category/assignee/search filtering (incl. case-insensitivity and combined filters), all sort orders, and that sorting doesn't mutate the input array |
| [permissions.test.ts](src/tests/permissions.test.ts) | Role checks and the full requester/technician/admin permission matrix (view, create, cancel, comment, assign, reopen, close) from [permissions.ts](src/shared/lib/permissions.ts) |
| [requestSchema.test.ts](src/tests/requestSchema.test.ts) | Zod validation for the new-request form — accepts a valid payload, rejects empty title/category/priority/description |
| [errorMapper.test.ts](src/tests/errorMapper.test.ts) | Maps HTTP status codes (400/401/403/404/500, unknown, undefined) to user-facing error messages |

`test:coverage` writes an HTML/text report to `coverage/` via `@vitest/coverage-v8`; no coverage thresholds are enforced yet, it's informational.

### End-to-end tests (Playwright)

```bash
npm run e2e          # headless run against http://localhost:5173
npm run e2e:ui       # interactive Playwright UI mode
npm run e2e:headed   # headed (visible) browser run
```

Playwright ([playwright.config.ts](playwright.config.ts)) points at `http://localhost:5173` but does **not** start the dev server itself — run `npm run dev` in a separate terminal first (or `npm run preview` after a build), then run `npm run e2e`.

Coverage today is the login flow in [auth.spec.ts](e2e/auth.spec.ts): the login page loads, requester/technician/admin credentials redirect to the correct landing route (`my-requests` vs `queue`), and an invalid password surfaces the "Invalid email or password." error. Since MSW auto-starts in dev, no extra backend or fixture setup is needed for e2e runs either.

## Why MSW Is Used

Mock Service Worker (MSW) is used to simulate API responses locally without needing a real backend. It's wired up in [main.tsx](src/main.tsx) to start only in dev builds (`import.meta.env.DEV`), so it never ships in production and never has to be manually toggled — it just works after `npm install` + `npm run dev`. This lets frontend development, UI states, and route behavior be exercised reliably while the app stays fully interactive without a live server.

## Theme Approach

Theming is token-based: colors, status/priority/category colors, and motion durations are defined once as CSS custom properties in [tokens.css](src/styles/tokens.css), scoped under `:root` for light and overridden under `[data-theme="dark"]` for dark. Components never hardcode colors — they consume the tokens (directly or via Tailwind), so switching themes never requires touching component styling logic.

The active theme is controlled by [useTheme.ts](src/shared/hooks/useTheme.ts), which:

- Initializes from `localStorage`, falling back to the OS preference (`prefers-color-scheme: dark`) on first visit.
- Applies the theme by setting `data-theme` on `<html>`, so the CSS variable overrides above cascade automatically.
- Persists the user's choice back to `localStorage`, so a manual toggle survives reloads and isn't overwritten by the OS preference.

This keeps theme state in one small hook rather than a global store, since the only consumers are the CSS variable cascade and a toggle button.

## Reduce-Motion Approach

Motion is opt-out, following the same token/attribute pattern as theming. [useMotion.ts](src/shared/hooks/useMotion.ts) initializes `reduceMotion` from `localStorage`, falling back to the OS-level `prefers-reduced-motion: reduce` media query, and sets `data-motion="reduce"` on `<html>`.

A single global rule in [tokens.css](src/styles/tokens.css) then disables animations, transitions, and smooth scrolling app-wide whenever that attribute is set:

```css
[data-motion="reduce"] *,
[data-motion="reduce"] *::before,
[data-motion="reduce"] *::after {
  animation: none !important;
  transition: none !important;
  scroll-behavior: auto !important;
}
```

The reasoning: rather than threading a `reduceMotion` flag through every animated component, one attribute selector guarantees nothing animated can slip through as new components are added, and it composes with the OS setting or a manual override (persisted like the theme) without extra plumbing.

## Queue Performance Strategy

The request queue ([RequestList.tsx](src/features/requests/components/RequestList.tsx)) is built against a fixture dataset of ~612 requests (12 hand-authored + 600 generated in [requests.ts](src/shared/fixtures/requests.ts)) to validate performance at a realistic-to-larger scale before a real backend exists. The approach:

- **Row virtualization** with `@tanstack/react-virtual` — only the rows currently in (or near) the viewport are mounted; the container renders a single sized wrapper and absolutely-positions the visible rows via `translateY`, so scrolling ~600 items costs roughly the same as scrolling 20.
- **Debounced search** via [useDebounce.ts](src/shared/hooks/useDebounce.ts) (300 ms) so filtering doesn't re-run on every keystroke.
- **Memoized filtering/sorting** ([filterRequests.ts](src/features/requests/utils/filterRequests.ts)) so the filtered/sorted list is only recomputed when the requests, filters, or sort option actually change, not on unrelated re-renders.

Virtualization was chosen over pagination because the queue is meant to feel like one continuously scrollable list (matching how support/helpdesk queues are typically triaged), while still keeping DOM node count — and therefore render/layout cost — flat regardless of dataset size.
