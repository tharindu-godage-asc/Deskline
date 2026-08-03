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

1. Install dependencies with `npm install`.
2. Start the development server with `npm run dev`.
3. Open the local Vite URL shown in the terminal to view the app.

## Why MSW Is Used

Mock Service Worker (MSW) is used to simulate API responses locally without needing a real backend. This allows frontend development, UI testing, and route behavior to be exercised reliably while keeping the app fully interactive in development.

## Theme Approach

The app uses CSS custom properties and a token-based styling system to support theming consistently across components. Colors and surface values are defined centrally in the shared styles layer, making it easier to adjust light and dark themes without scattering styling logic throughout the UI.

## Reduce-Motion Approach

The app respects reduced-motion preferences by using a lightweight motion hook and conditional animation behavior. When users prefer less motion, transitions and animated effects are minimized to improve comfort and accessibility.

## Queue Performance Strategy

The queue is designed to remain responsive even with a large dataset. The implementation uses:

- Generated fixture data of roughly 600 requests
- Memoized filtering with `useMemo`
- Debounced search input updates with a 300 ms delay
- Lightweight UI state updates to avoid unnecessary re-renders
