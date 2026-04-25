# Memento Full-Stack Setup & Testing Guide

**For:** Summer 🌞  
**Date:** April 25, 2026  
**Status:** Complete Frontend Scaffold ✅

---

## What You Now Have

A complete, end-to-end authentication system for Memento:

### Backend (Spring Boot)
✅ User Service (Port 8081) - MongoDB, Keycloak OAuth2 Resource Server  
✅ JWT validation, auto user profile creation on first login  

### Frontend (React + Vite)
✅ Beautiful Sign In / Sign Up pages  
✅ Google Sign-In integration  
✅ Keycloak OIDC flow (react-oidc-context)  
✅ Splash screen transition  
✅ Protected routes  
✅ Dashboard with profile display  

### Identity Provider
✅ Keycloak 24.x - All auth orchestration  
✅ Google broker for social login  

---

## Complete Setup (From Scratch)

### Step 1: Start Infrastructure (Docker)

**Keycloak** (Identity Provider)
```bash
docker run -d \
  --name keycloak \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  -p 8181:8080 \
  quay.io/keycloak/keycloak:latest \
  start-dev
```

Wait 30 seconds, then visit **http://localhost:8181**

**MongoDB** (Database)
```bash
docker run -d \
  --name memento-mongo \
  -p 27017:27017 \
  mongo:8
```

### Step 2: Configure Keycloak (Admin Console)

**Access:** http://localhost:8181  
**Login:** admin / admin

#### 2.1 Create Realm
1. Click **"Create Realm"** (top-left)
2. Name: `memento`
3. Click **Create**

#### 2.2 Configure Google Sign-In
1. Go to **Realm Settings** → **Identity Providers**
2. Click **Add provider** → **Google**
3. Enter Google OAuth credentials:
   - Go to https://console.cloud.google.com
   - Create/select project
   - APIs & Services → Credentials
   - Create OAuth 2.0 Client ID (Web application)
   - Copy **Client ID** and **Client Secret** to Keycloak
   - Add redirect URIs:
     - `http://localhost:8181/realms/memento/broker/google/endpoint`
     - `http://localhost:8181/realms/memento/broker/google/endpoint/callback`
4. Save in Keycloak

#### 2.3 Create Backend Client
1. Go to **Clients** → **Create client**
2. Client ID: `memento-service`
3. Protocol: **openid-connect**
4. Click **Next**
5. Client Type: **Web**
6. **Client authentication:** ON
7. Click **Create**
8. Go to **Credentials** tab → Copy **Client Secret**
9. Save this for backend env var

#### 2.4 Create Frontend Client
1. Go to **Clients** → **Create client**
2. Client ID: `memento-web`
3. Protocol: **openid-connect**
4. Click **Next**
5. Client Type: **Public**
6. **Valid redirect URIs:**
   - `http://localhost:5173`
   - `http://localhost:5173/*`
7. **Web origins:** `http://localhost:5173`
8. Click **Create**

#### 2.5 Create Test User
1. Go to **Users** → **Create new user**
2. Username: `testuser`
3. Email: `test@example.com`
4. First name: `Test`
5. Last name: `User`
6. Click **Create**
7. Go to **Credentials** tab → **Set password**
8. Enter password, toggle **Temporary: ON** then **OFF**
9. Click **Set Password**

#### 2.6 Set Default Roles
1. Go to **Realm Settings** → **Default roles**
2. Add **USER** role to default assignments

---

### Step 3: Start Backend (User Service)

```bash
cd '/Users/divakartr/spring-boot-dev/Personal Projects/Memento/userservice'

# Set environment variables
export MONGODB_URI='mongodb://localhost:27017/memento'
export KEYCLOAK_CLIENT_SECRET='<your-backend-client-secret>'

# Build and run
./mvnw clean package -DskipTests
./mvnw spring-boot:run
```

**Expected output:**
```
2026-04-25 10:00:00 - User Service started on port 8081
```

**Verify:** http://localhost:8081/api/users/health → "User Service is running"

---

### Step 4: Start Frontend (React + Vite)

```bash
cd '/Users/divakartr/spring-boot-dev/Personal Projects/Memento/frontend'

# Install dependencies
npm install

# Start dev server
npm run dev
```

**Output:**
```
VITE v5.2.10  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

---

## End-to-End Testing Flow

### Test 1: Splash Screen & Auto-Redirect

**Action:**
1. Open http://localhost:5173 in **new incognito window**
2. Watch for 2.5 seconds

**Expected:**
- Animated splash screen with "Memento" logo
- Loading dots animation
- Auto-redirects to Sign In page after 2.5s

---

### Test 2: Email Sign In

**Action:**
1. On Sign In page, click **"Sign In with Email"**
2. Enter test credentials:
   - Username: `testuser`
   - Password: `password` (or whatever you set)
3. Click **Sign in**

**Expected:**
- Redirects to Sign In page briefly
- Fetches user profile from backend
- Redirects to Dashboard
- Shows user name, email, avatar placeholder
- Profile auto-created in MongoDB

**Verify in MongoDB:**
```bash
docker exec -it memento-mongo mongosh
use memento
db.memento_users.findOne({ email: "test@example.com" })
```

---

### Test 3: Google Sign In

**Action:**
1. Go back to http://localhost:5173
2. Click **"Sign In with Google"**
3. Use your personal Google account
4. Grant permission to Memento

**Expected:**
- Redirects to Google login
- You grant permission
- Redirects back to Dashboard
- Shows your Google name and profile picture
- New user doc created in MongoDB

**Verify:**
```bash
docker exec -it memento-mongo mongosh
use memento
db.memento_users.find().pretty()  # Should see both users
```

---

### Test 4: Protected Routes

**Action:**
1. After signing in, copy dashboard URL: `http://localhost:5173/dashboard`
2. Click **"Sign Out"** button
3. Manually navigate to dashboard URL in address bar
4. Press Enter

**Expected:**
- Automatically redirects to Sign In page
- Cannot access protected content without JWT

---

### Test 5: User Profile Persistence

**Action:**
1. Sign in again
2. Refresh the page (F5)
3. Dashboard should load immediately without re-signing in

**Expected:**
- Session persists
- User profile loads
- No splash screen during refresh

---

### Test 6: Sign Up Flow (Email)

**Action:**
1. On Sign In page, click **"Sign up →"** link
2. Click **"Sign Up with Email"**
3. On Keycloak registration, fill form:
   - Email: `newuser@example.com`
   - Password: Create new password
   - First name: `New`
   - Last name: `User`
4. Submit registration
5. Auto-logs in, redirects to Dashboard

**Expected:**
- New user doc created in MongoDB
- Dashboard shows new user's info

---

### Test 7: Sign Up with Google

**Action:**
1. Go to Sign Up page again
2. Click **"Sign Up with Google"**
3. Use a different Google account (or incognito)
4. Grant permission

**Expected:**
- User doc created in MongoDB
- Logged in and shows dashboard
- Google profile info populated (avatar, name)

---

## API Testing (Advanced)

### Get Access Token

```bash
curl -X POST 'http://localhost:8181/realms/memento/protocol/openid-connect/token' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id=memento-service' \
  -d 'client_secret=YOUR_CLIENT_SECRET' \
  -d 'grant_type=password' \
  -d 'username=testuser' \
  -d 'password=testuser_password'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5...",
  "expires_in": 300,
  "refresh_expires_in": 1800,
  ...
}
```

### Test Profile Endpoint

```bash
export ACCESS_TOKEN='<access_token_from_above>'

curl -X GET 'http://localhost:8081/api/users/profile' \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

**Response:**
```json
{
  "id": "12345abc",
  "email": "test@example.com",
  "firstName": "Test",
  "lastName": "User",
  "displayName": "Test User",
  "avatarUrl": null,
  "lastLoginAt": "2026-04-25T10:30:00Z",
  "createdAt": "2026-04-25T10:30:00Z",
  "updatedAt": "2026-04-25T10:30:00Z"
}
```

### Test Update Profile

```bash
curl -X PUT 'http://localhost:8081/api/users/profile' \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "firstName": "TestUpdated",
    "lastName": "UserUpdated",
    "displayName": "Test Updated User",
    "avatarUrl": "https://example.com/avatar.jpg"
  }'
```

### Test Stats Endpoint

```bash
curl -X GET 'http://localhost:8081/api/users/stats' \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

**Response:**
```json
{
  "projectsCreated": 0,
  "tasksCreated": 0,
  "notesCreated": 0,
  "lastLoginAt": "2026-04-25T10:30:00Z",
  "createdAt": "2026-04-25T10:30:00Z"
}
```

---

## Troubleshooting

### Frontend Issues

| Symptom | Fix |
|---------|-----|
| **Blank page on load** | Check browser console (F12), verify `.env.local` matches backend |
| **Stuck on splash screen** | Check network tab, see if token exchange is failing |
| **401 on dashboard** | Token expired, refresh page or sign in again |
| **Google button doesn't work** | Verify Keycloak Google broker config, check console for errors |
| **CORS error** | Backend CORS is configured for 5173, should work |

### Backend Issues

| Symptom | Fix |
|---------|-----|
| **Port 8081 already in use** | Kill process: `lsof -i :8081 \| grep LISTEN \| awk '{print $2}' \| xargs kill -9` |
| **MongoDB connection failed** | Check MongoDB container is running: `docker ps \| grep mongo` |
| **401 Unauthorized** | Check Keycloak is running, client secret is correct, JWT is valid |
| **User not found** | Backend will auto-create, verify first request includes JWT header |

### Keycloak Issues

| Symptom | Fix |
|---------|-----|
| **Can't access Keycloak** | Wait 30-60s for startup, visit http://localhost:8181 |
| **Google login doesn't work** | Verify credentials in Google Cloud Console, check OAuth scope settings |
| **Redirect URI mismatch** | Update Keycloak client redirect URIs to match your app domain |

---

## Directory Structure Summary

```
Memento/
├── userservice/                    # Backend (Spring Boot)
│   ├── src/main/java/.../
│   │   ├── model/User.java        (MongoDB document)
│   │   ├── controller/UserController.java
│   │   ├── service/UserService.java
│   │   ├── security/
│   │   │   ├── SecurityConfig.java
│   │   │   ├── JwtUtil.java
│   │   │   └── KeycloakJwtAuthenticationConverter.java
│   │   └── repository/UserRepository.java (MongoRepository)
│   ├── src/main/resources/application.yaml (MongoDB + OAuth2 config)
│   └── pom.xml
│
├── frontend/                       # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx                (Routes + OIDC setup)
│   │   ├── main.jsx               (Entry point)
│   │   ├── index.css              (Tailwind + globals)
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx    (OIDC + profile management)
│   │   ├── pages/
│   │   │   ├── Splash.jsx
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   └── Dashboard.jsx
│   │   └── services/
│   │       └── ApiService.js
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env.local                 (Your config)
│   └── README.md
│
└── README.md (root)
```

---

## Ports Reference

| Service | Port | URL |
|---------|------|-----|
| Keycloak | 8181 | http://localhost:8181 |
| User Service | 8081 | http://localhost:8081 |
| Frontend | 5173 | http://localhost:5173 |
| MongoDB | 27017 | localhost:27017 |

---

## Next Steps (After Verification)

Once auth is working perfectly:

### Phase 3: Workspace Service Backend
- New Spring Boot service on Port 8082 (MongoDB-backed)
- Projects, Tasks, Notes, Calendar endpoints
- Activity log tracking

### Phase 4: Frontend Expansion
- Sidebar navigation (6 sections: Home, Projects, Tasks, Notes, Calendar, Profile)
- Dashboard with status widgets, weekly overview, productivity score
- Full CRUD for Projects, Tasks, Notes

### Phase 5: AI Integration
- Task Sidekick (OpenAI/Claude API)
- Note Synthesizer (summarization, extraction)
- AI Service orchestration (Port 8083)

### Phase 6: Production Deployment
- Docker containerization
- Kubernetes setup (optional)
- CI/CD pipeline (GitHub Actions)

---

## Quick Commands Cheat Sheet

```bash
# Frontend
cd frontend && npm run dev           # Start dev server
npm run build                        # Production build
npm run preview                      # Preview build

# Backend
cd userservice && ./mvnw spring-boot:run
./mvnw clean package -DskipTests

# Docker
docker logs keycloak                 # Keycloak logs
docker logs memento-mongo            # MongoDB logs
docker exec -it memento-mongo mongosh  # MongoDB shell
docker stop keycloak memento-mongo   # Stop containers
docker rm keycloak memento-mongo     # Remove containers

# Testing
curl http://localhost:8081/api/users/health
curl http://localhost:5173           # Frontend
```

---

## Deployment Checklist

For production:

- [ ] Update Keycloak realm settings (HTTPS, proper SMTP)
- [ ] Update frontend `.env.local` with production URLs
- [ ] Update backend `application.yaml` with production MongoDB URI
- [ ] Update Keycloak client redirect URIs to production domain
- [ ] Build frontend: `npm run build`
- [ ] Deploy backend to cloud (AWS, GCP, Azure, Heroku)
- [ ] Deploy frontend to CDN (Netlify, Vercel, AWS S3 + CloudFront)
- [ ] Test end-to-end in production
- [ ] Set up monitoring and logging

---

## Success Indicators ✅

You'll know everything is working when:

✅ Splash screen loads on `/`  
✅ Sign in page appears automatically  
✅ Email sign-in works with test user  
✅ Google sign-in redirects and works  
✅ Dashboard shows user profile  
✅ MongoDB has user docs  
✅ Protected routes redirect to signin  
✅ Logout clears session  
✅ Refresh maintains session  

---

## Congratulations! 🎉

You now have:
- ✅ Complete authentication system
- ✅ Keycloak OIDC + Google Sign-In
- ✅ Beautiful React frontend
- ✅ MongoDB user storage
- ✅ Spring Boot backend
- ✅ Splash screen branding
- ✅ Protected routes
- ✅ Profile auto-creation

**Ready for Phase 3: Workspace Service!**

---

**Questions?** Check:
- `/memories/repo/MEMENTO_ARCHITECTURE.md` - System design
- `/memories/session/KEYCLOAK_QUICK_START.md` - Auth setup
- `/memories/session/FRONTEND_SETUP_GUIDE.md` - Frontend details
- `frontend/README.md` - Frontend documentation

---

**Created by Pluto** 🪐  
**For Summer** 🌞  
**Memento Project**  
**April 25, 2026**
