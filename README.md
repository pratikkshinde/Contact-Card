# Contact Cards

A clean, modern, and responsive React Single Page Application (SPA) for creating and managing contact cards. Built as a project demonstrating fundamental React component architecture, props, and state management.

---

## Features

- ✅ **Add contacts** — validated form with required and optional fields
- ✅ **Dynamic Rendering** — dynamically adding contact cards to a parent list
- ✅ **Empty state** — friendly UI when no contacts exist or search has no results
- ✅ **Responsive layout** — works on desktop, tablet, and mobile
- ✅ **Accessible** — semantic HTML, proper ARIA attributes, keyboard navigation

---

## Tech Stack

| Tool          | Purpose                        |
|---------------|-------------------------------|
| React 18      | UI library                    |
| JavaScript ES6+ | Language                    |
| Vite          | Development server & bundler   |
| CSS3          | Styling (no Tailwind)         |

---

## Project Structure

```
src/
├── components/
│   ├── Header/        — App header with contact count
│   ├── ContactForm/   — Add contact form
│   ├── UserList/      — Search bar + card grid
│   ├── ContactCard/   — Individual contact card
│   └── EmptyState/    — Zero-state and no-results UI
│
├── utils/
│   ├── validation.js   — Form field validators
│   └── contactUtils.js — Helpers: initials, ID, filter, duplicate check
│
├── App.jsx     — Root; wires state and dynamic rendering
├── App.css     — App layout styles
└── index.css   — Global design tokens + reset
```

---

## Installation & Running

```bash
# Clone or navigate to the project
cd "React Contact"

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## React Architecture

```
App
 ├── Header
 ├── ContactForm
 └── UserList
      └── ContactCard × N
```

State lives at **App** level. All mutations flow up via callback props.

---

## Future Improvements

- Edit and Delete features
- LocalStorage persistence
- Profile photo upload
- Backend REST API + database
- User authentication
