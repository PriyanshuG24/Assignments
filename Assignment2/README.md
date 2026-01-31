# Startup Benefits Platform

A full-stack platform that provides exclusive SaaS deals and benefits for early-stage startups, indie hackers, and development teams.

## 🚀 Live Demo
- **Frontend**: https://assignments-nlt7.vercel.app/
- **API Documentation**: https://universal-firefly-774237-1.postman.co/workspace/Backend~9541e76e-a85d-4d95-b955-6a2f43f09d23/collection/24977220-3bbf5664-db41-4ca6-be4a-eab22e6cc3b5?action=share&creator=24977220

## 📋 End-to-End Application Flow

1. **User Registration & Authentication**
   - Users create accounts with email, username, and password
   - JWT tokens are generated and stored in HTTP-only cookies
   - Passwords are hashed using Argon2 for security

2. **Deal Discovery**
   - Browse all available deals on the deals listing page
   - Filter deals by category (cloud, marketing, analytics, productivity, devtools, other)
   - Search functionality across deal titles, descriptions, and partner names
   - Visual distinction between public and locked deals

3. **Deal Claiming Process**
   - Public deals: Available to all registered users
   - Locked deals: Require verified user status
   - Claims are created with "pending" status
4. **User Dashboard**
   - View profile information and verification status
   - Track all claimed deals with current status
   - Monitor claim lifecycle (pending → approved/rejected)

## 🔐 Authentication & Authorization Strategy

### Authentication Flow
- **Registration**: User data validated, password hashed with Argon2, user created with `isVerified: false`
- **Login**: Credentials verified, JWT token generated, stored in HTTP-only cookie
- **Authorization**: Middleware extracts JWT from cookies, validates token, attaches user to request

### Authorization Rules
- **Public Routes**: Landing page, deal browsing, authentication pages
- **Protected Routes**: User dashboard, profile management, deal claiming
- **Restricted Actions**: Only verified users can claim locked deals
- **Token Validation**: JWT tokens expire after configured time, require re-authentication

## 🔄 Internal Flow of Claiming a Deal

1. **Deal Selection**: User views deal details and eligibility conditions
2. **Authorization Check**: Middleware verifies JWT token and user authentication
3. **Access Validation**: 
   - For public deals: Any authenticated user can claim
   - For locked deals: Only verified users (`isVerified: true`) can claim
4. **Claim Creation**: 
   - Generate unique claim ID
   - Link user and deal via ObjectId references
   - Set initial status to "pending"
   - Enforce unique constraint (one claim per user per deal)
5. **Response**: Return claim details with current status
6. **Status Updates**: Admin can update claim status through protected endpoints

## 🌐 Frontend-Backend Interaction

### API Architecture
- **Base URL**: Configured environment variable for API endpoints
- **Authentication**: JWT tokens sent via HTTP-only cookies
- **Error Handling**: Centralized error middleware with consistent error responses
- **Validation**: Zod schemas for request/response validation

### Key API Endpoints
```
POST /api/auth/register     - User registration
POST /api/auth/login        - User login
POST /api/auth/logout       - User logout
POST /api/auth/refresh-token- Get new access token
GET  /api/deal/all-deals    - Fetch all deals
GET  /api/claim/my-deals    - Fetch user claim deals 
POST /api/claim/claim-deal  - Claim a deal (protected)
GET  /api/search            - Fetch deals on the basis of the parameters
```

### Frontend State Management
- **Zustand**: Global state for user authentication and deal data
- **React Hook Form**: Form validation and submission
- **Axios**: HTTP client with interceptors for error handling
- **Framer Motion**: Animations and page transitions

## 🏗️ Technical Architecture

### Backend Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with HTTP-only cookies
- **Security**: Argon2 password hashing, Helmet.js, CORS
- **Validation**: Zod schemas
- **Logging**: Winston logger

### Frontend Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Shadcn UI primitives
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation

### Database Schema

#### User Model
```typescript
{
  username: string (unique, required)
  email: string (unique, required)
  password: string (hashed with Argon2)
  isVerified: boolean (default: false)
  timestamps: true
}
```

#### Deal Model
```typescript
{
  dealId: number (unique, required)
  title: string (required)
  description: string (required)
  category: enum (cloud, marketing, analytics, productivity, devtools, other)
  partnerName: string (required)
  isLocked: boolean (default: false)
  expiresAt: Date (required)
  timestamps: true
}
```

#### Claim Model
```typescript
{
  claimId: number (unique, required)
  userId: ObjectId (ref: User)
  dealId: ObjectId (ref: Deal)
  status: enum (pending, approved, rejected)
  timestamps: true
}
```

## ⚠️ Known Limitations

1. **User Verification**: Manual admin process for verifying users (no automated verification system)
2. **Deal Management**: No admin interface for creating/managing deals
3. **Email Notifications**: Missing email system for claim status updates
4. **Real-time Updates**: No WebSocket implementation for live status updates
5. **Rate Limiting**: Missing API rate limiting for abuse prevention

## 🚧 Production Readiness Improvements

### Security
- Implement rate limiting on authentication endpoints
- Add CSRF protection
- Implement input sanitization
- Set up security headers (CSP, HSTS)
- Add API key management for third-party services

### Performance
- Implement Redis caching for frequently accessed deals
- Add database connection pooling
- Optimize MongoDB indexes for query performance
- Implement CDN for static assets




## 📦 Installation & Setup

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure environment variables
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Configure API URL
npm run dev
```

### Environment Variables
**Backend (.env)**:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

**Frontend (.env)**:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 📊 Project Structure

```
Assignment2/
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── users/        # User authentication & management
│   │   │   ├── deals/        # Deal management
│   │   │   └── claims/       # Claim processing
│   │   ├── routes/           # API route definitions
│   │   ├── middleware/       # Auth, error handling
│   │   └── config/           # Database, environment config
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   ├── components/       # Reusable UI components
│   │   └── hooks/            # Custom React hooks
│   └── package.json
└── README.md
```

## 🤝 Contributing

This project was developed as a full-stack assignment demonstration. The codebase follows clean architecture principles with proper separation of concerns, comprehensive error handling, and modern development practices.
