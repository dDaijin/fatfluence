# FatFluence

A minimalist ticket/task tracker built with React. Create tickets, track their status through a simple workflow (`ToDo` → `inProgress` → `Done`), and discuss each one via comments — all styled with a bold black/yellow/red theme.

## Features

- **Create tickets** with a title and optional description
- **List view** of all tickets, showing status, comment count, and creation date
- **Ticket detail page** where you can:
  - Change the ticket's status
  - Add comments
  - Delete comments
- **Delete tickets** directly from the list
- Data is persisted in the browser via **localStorage** — no backend required

## Tech Stack

- [React 19](https://react.dev/)
- [React Router 7](https://reactrouter.com/) for client-side routing
- [Tailwind CSS](https://tailwindcss.com/) (loaded via CDN in `public/index.html`) for styling
- [Create React App](https://create-react-app.dev/) (`react-scripts`) as the build tooling

## Project Structure

```
fatfluence/
├── public/
│   └── index.html          # HTML shell, loads Tailwind via CDN
├── src/
│   ├── components/
│   │   ├── FormPage.jsx     # "/" — create a new ticket
│   │   ├── SuccessPage.jsx  # "/list" — list of all tickets
│   │   └── EntryPage.jsx    # "/entry/:id" — ticket details, status & comments
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.js               # route definitions
│   └── index.js             # app entry point, wraps App in BrowserRouter
└── package.json
```

## Routes

| Path           | Component     | Description                          |
|----------------|---------------|---------------------------------------|
| `/`            | `FormPage`    | Create a new ticket                   |
| `/list`        | `SuccessPage` | Browse and delete existing tickets    |
| `/entry/:id`   | `EntryPage`   | View/edit a single ticket's status and comments |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/dDaijin/fatfluence.git
cd fatfluence
npm install
```

### Running locally

```bash
npm start
```

This runs the app in development mode at [http://localhost:3000/fatfluence](http://localhost:3000/fatfluence) (note the app is configured with a `/fatfluence` base path in `BrowserRouter`).

### Building for production

```bash
npm run build
```

Builds the app for production to the `build` folder.

### Running tests

```bash
npm test
```

## Notes

- All ticket data lives in the browser's `localStorage` under the `entries` key — clearing your browser storage will remove all tickets.
- Since there's no backend, data is local to a single browser and won't sync across devices.

## License

No license specified.
