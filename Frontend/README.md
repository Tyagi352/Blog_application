# MERN Blog Frontend

React frontend for the MERN blog application with infinite scrolling, authentication, and theme support.

## Quick Start

1. Install dependencies:
```powershell
npm install
```

2. Start the dev server:
```powershell
npm run dev
```

3. Open `http://localhost:5173` in your browser

## Configuration

Ensure the backend is running on `http://localhost:8000` and the `.env` file contains:
```
VITE_API_URL=http://localhost:8000/api/v1
```

## Features

- **Authentication** - Register and login with JWT
- **Infinite Scroll** - Load blogs as you scroll
- **Create Blogs** - Write and publish blogs with cover images
- **Theme Toggle** - Switch between light and dark modes
- **Responsive** - Works on mobile and desktop
- **Toast Notifications** - User feedback for all actions

## Pages

- `/` - Home page with features overview
- `/blogs` - All blogs with infinite scrolling
- `/about` - About page
- `/login` - Login form
- `/register` - Registration form
- `/create` - Create new blog (requires login)

## Build

```powershell
npm run build
npm run preview
```

## Dependencies

- react - UI library
- react-router-dom - Routing
- axios - HTTP client
- tailwindcss - Styling
- react-toastify - Notifications
- react-infinite-scroll-component - Infinite scrolling
