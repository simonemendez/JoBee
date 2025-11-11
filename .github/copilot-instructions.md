# Jobee - Copilot Instructions

## Project Overview
**Jobee** is a React-based job search application. It's a full-stack job marketplace where users can search jobs and companies, apply to jobs, and manage their profiles. The project is deployed on Netlify with a fallback mock data system.

## Architecture Overview

### Three-Layer Component Structure
- **Authentication Layer** (`LoginForm.js`, `SignupForm.js`, `PrivateRoute.js`)
  - JWT-based authentication stored in `localStorage`
  - Mock token generation for development without backend
  - Private routes protect company/job data from unauthenticated users

- **Context Layer** (`App.js`, `UserContext.js`)
  - `UserContext` provides `currentUser` state to all components
  - `App.js` manages token lifecycle and user session
  - Loading state ("fetching") handled during initial app load

- **Feature Components** (`CompanyList.js`, `JobList.js`, `CompanyDetail.js`, `Applications.js`, `ProfileForm.js`)
  - Display data fetched from API or mock data
  - Use `UserContext` to access current user info

### Data Flow
```
App.js (token + currentUser) 
  → UserContext.Provider 
    → [NavBar, Routes] 
      → Feature Components (useContext(UserContext))
```

## API & Mock Data System

### Dual-Mode API (`api.js`)
The app **automatically falls back to mock data** when `REACT_APP_BASE_URL` environment variable is not set:

```javascript
const USE_MOCK_DATA = !process.env.REACT_APP_BASE_URL;
```

**When to use mock data:**
- Local development without backend running
- Portfolio demonstrations
- Netlify deployments without backend setup

**Key endpoints handled:**
- `auth/token`, `auth/register` - Return mock JWT
- `companies`, `companies/:handle` - Filter mock companies by name/handle
- `jobs`, `jobs/:jobId` - Return mock jobs with company associations
- `users/:username` - Return mock user profile

**Mock data sources:** `mockData.js` contains realistic sample data for 5 companies and 10+ jobs.

## Deployment & Environment

### Netlify Configuration
- **Redirects:** `_redirects` file sends all routes to `index.html` (SPA routing)
- **Environment Variables:** Set `REACT_APP_BASE_URL` in Netlify dashboard to enable real backend
- **Build Command:** `npm run build` (creates optimized production bundle)
- **Deploy Directory:** `build/`

### Without Backend
1. Leave `REACT_APP_BASE_URL` empty in Netlify settings
2. App uses mock data automatically
3. Perfect for portfolio without backend infrastructure

## Key Patterns & Conventions

### Token Management
- Stored as JSON string in `localStorage` under key `"token"`
- Token set on login/register, cleared on logout
- Decoded client-side using `jsonwebtoken` library to extract username
- Mock tokens format: `"mock-jwt-token-" + Date.now()` (for testing)

### Form Pattern (LoginForm, SignupForm, ProfileForm)
- Controlled components with state for each input field
- `onSubmit` handler calls parent function (logIn/register/updateProfile)
- Error/success messages via `Alert.js` component

### Job Application Flow
- Users click "Apply" button on job listings
- Application stored in user's profile via API
- `Applications.js` displays user's applied jobs

## Important File References

- **Entry Point:** `src/index.js` (renders App component)
- **Main App Logic:** `src/App.js` (token + user state management)
- **Routing:** `src/Routes.js` (public/private route definitions)
- **API Abstraction:** `src/api.js` (all server calls + mock fallback)
- **User Context:** `src/UserContext.js` (global user state)
- **Styling:** Bootstrap + react-bootstrap + CSS modules
- **UI Components:** `Alert.js`, `Navbar.js`, `SearchBox.js` (reusable)

## Development Workflow

```bash
npm install          # Install dependencies
npm start            # Run dev server (localhost:3000)
npm test             # Run test suite
npm run build        # Production build
```

## Common Tasks

**Adding a new feature route:**
1. Create component file in `src/`
2. Import in `Routes.js`
3. Add `<Route>` or `<PrivateRoute>` in Switch
4. Add link in `Navbar.js` if needed

**Connecting new component to user data:**
1. Import `useContext` from React
2. Get `currentUser` via `useContext(UserContext)`
3. If needs global state changes, call `setCurrentUser` via context

**Testing with real backend:**
1. Set `REACT_APP_BASE_URL=http://localhost:3001` (or deployed URL) in `.env`
2. Restart dev server
3. Real API calls will override mock data

**Debugging:** 
- Check browser console for API logs (`console.debug` in `api.js`)
- Inspect `localStorage` for token value
- Use React DevTools to inspect context values
