# Memento Frontend (React + Vite)

Beautiful, modern authentication and dashboard for the Memento productivity app.

## Features

✨ **Authentication**
- OIDC integration with Keycloak
- Google Sign-In support
- Automatic user profile creation on first login
- JWT token management

🎨 **UI/UX**
- Modern responsive design with Tailwind CSS
- Smooth animations and transitions
- Splash screen "Moment" during auth
- Beautiful sign in/sign up pages

🔐 **Security**
- Protected routes with role-based access
- Automatic token refresh
- Secure token storage

## Tech Stack

- **React 18.3** - UI library
- **Vite 5.2** - Fast build tool
- **React Router v6** - Client-side routing
- **react-oidc-context** - OIDC/OAuth2 integration
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Keycloak running on http://localhost:8181
- User Service running on http://localhost:8081

### Installation

```bash
cd frontend
npm install
```

### Environment Setup

Create `.env.local` (copy from `.env.example`):

```bash
VITE_KEYCLOAK_URL=http://localhost:8181
VITE_KEYCLOAK_REALM=memento
VITE_KEYCLOAK_CLIENT_ID=memento-web
VITE_USER_SERVICE_URL=http://localhost:8081/api
VITE_APP_NAME=Memento
```

### Development

Start the dev server:

```bash
npm run dev
```

Opens at http://localhost:5173

### Build

```bash
npm run build
```

Production build in `dist/` folder.

## Project Structure

```
src/
├── components/          # Reusable components
│   └── ProtectedRoute.jsx
├── context/            # React contexts
│   └── AuthContext.jsx
├── pages/              # Page components
│   ├── Splash.jsx      # Loading/transition screen
│   ├── SignIn.jsx      # Sign in page
│   ├── SignUp.jsx      # Sign up page
│   └── Dashboard.jsx   # Main dashboard (protected)
├── services/           # API services
│   └── ApiService.js
├── App.jsx             # Main app with routing
├── main.jsx            # Entry point
└── index.css           # Global styles with Tailwind

```

## Authentication Flow

```
User visits app
    ↓
Splash screen (2.5 seconds)
    ↓
    ├─ If authenticated → Dashboard
    ├─ If not → Sign In page
    ↓
User clicks "Sign In with Google" (or Email)
    ↓
Redirects to Keycloak
    ↓
Keycloak redirects to Google
    ↓
User grants permission
    ↓
Redirects back to app with authorization code
    ↓
App exchanges code for JWT
    ↓
AuthContext fetches user profile from backend
    ↓
Profile auto-created on first login
    ↓
Redirects to Dashboard
```

## API Integration

The frontend communicates with the User Service via:

### Get Current User Profile
```javascript
GET /api/users/profile
Header: Authorization: Bearer <JWT>
Response: UserResponse { id, email, firstName, lastName, displayName, avatarUrl, ... }
```

### Update User Profile
```javascript
PUT /api/users/profile
Header: Authorization: Bearer <JWT>
Body: { firstName, lastName, displayName, avatarUrl }
```

### Get User Stats
```javascript
GET /api/users/stats
Header: Authorization: Bearer <JWT>
Response: UserStatsResponse { projectsCreated, tasksCreated, notesCreated, ... }
```

## Key Components

### AuthContext
Wraps the app and provides:
- `isAuthenticated` - Boolean auth state
- `userProfile` - Current user profile object
- `loading` - Loading state
- `error` - Error message if any
- `logout()` - Sign out function
- `refreshProfile()` - Fetch latest profile

### ProtectedRoute
Wraps routes that require authentication. Redirects to `/signin` if not authenticated.

### SignIn / SignUp Pages
Beautiful, modern pages with:
- Email login/sign up via Keycloak
- Google Sign-In button
- Toggle between sign in and sign up

### Splash Screen
The "Moment" branded splash screen that:
- Shows for 2.5 seconds on app load
- Displays animated gradient background
- Shows loading dots animation
- Transitions to dashboard or sign in

## Testing

### Sign In Flow
1. Start app: `npm run dev`
2. Click "Sign In with Email"
3. Enter test credentials (from Keycloak)
4. Verify dashboard loads with profile

### Google Sign In
1. Click "Sign In with Google"
2. Grant permission
3. Should be logged in and redirected to dashboard

### Protected Routes
1. After logout, navigate to `/dashboard`
2. Should redirect to `/signin`

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables for Production
Update these in your deployment platform:

```
VITE_KEYCLOAK_URL=https://keycloak.yourdomain.com
VITE_KEYCLOAK_REALM=memento
VITE_KEYCLOAK_CLIENT_ID=memento-web
VITE_USER_SERVICE_URL=https://api.yourdomain.com/api
```

## Troubleshooting

### "401 Unauthorized" on profile endpoint
- Check that Keycloak is running
- Verify User Service is running on port 8081
- Check that JWT token is being sent in Authorization header

### Blank screen on app load
- Check browser console for errors
- Verify environment variables in `.env.local`
- Check that Keycloak URL is correct

### Google Sign In not working
- Verify Google OAuth is configured in Keycloak (see backend setup docs)
- Check that Google client ID and secret are correct
- Verify redirect URIs in Google Cloud Console match Keycloak

### CORS errors
- If hitting backend from different port, check CORS is enabled on User Service
- Verify the API service URL in `.env.local` matches your backend

## Next Steps

After authentication is working:

1. **Workspace Service Integration** - Connect to Projects/Tasks/Notes endpoints
2. **Dashboard Enhancements** - Status widgets, weekly overview, productivity score
3. **Sidebar Navigation** - Create persistent sidebar with main sections
4. **Profile Page** - Full profile management and preferences
5. **Real-time Sync** - Use WebSockets for live updates

## Contributing

For development:

```bash
npm run dev     # Start dev server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint (when configured)
```

## License

MIT - See LICENSE file

---

**Created by Pluto** 🪐  
**Last Updated:** April 25, 2026
