# 🏨 Hotel Booking System - Frontend

Modern, responsive Angular 15 application for the Hotel Room Reservation System with real-time visualization.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com)
[![Angular](https://img.shields.io/badge/Angular-15-DD0031?style=flat-square&logo=angular)](https://angular.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)

## 🚀 Live Demo

- **Application**: `https://hotel-reservation-frontend-e8re1yx41-hp2503s-projects.vercel.app/`
- **Backend API**: [Hotel Booking Backend](https://hotel-reservation-system-backend-ngzu.onrender.com)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Components](#components)

## ✨ Features

### User Interface
- **Interactive Hotel Visualization**: 97 rooms across 10 floors
- **Real-time Updates**: Instant feedback on bookings
- **Statistics Dashboard**: Occupancy rates and metrics
- **Booking Management**: Create, view, and manage bookings
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Beautiful UI**: Modern gradient design with smooth animations

### Functionality
- Book 1-5 rooms with smart allocation
- Generate random occupancy for testing
- Reset all bookings with confirmation
- View detailed booking information
- Real-time occupancy statistics
- Color-coded room status (available/booked)

## 🛠 Tech Stack

- **Framework**: Angular 15.2.0
- **Language**: TypeScript 4.9
- **Styling**: SCSS with custom design system
- **HTTP Client**: Angular HttpClient with RxJS 7.8
- **State Management**: Component-based
- **Build Tool**: Angular CLI
- **Deployment**: Vercel

## 📸 Screenshots

### Main Dashboard
```
┌─────────────────────────────────────┐
│  🏨 Hotel Room Reservation System   │
│  97 Rooms | 10 Floors | Smart AI    │
├─────────────────────────────────────┤
│  [ Number of Rooms: 3 ] [Book Now] │
│  [Random Occupancy] [Reset All]     │
├─────────────────────────────────────┤
│  Statistics: 72/97 Available (74%)  │
├─────────────────────────────────────┤
│  Floor 10: 🟢🟢🟢🟢🟢🟢🟢           │
│  Floor 9:  🟢🟢🔴🟢🟢🔴🟢🟢🟢🟢  │
│  Floor 8:  🟢🟢🟢🔴🟢🟢🟢🟢🟢🟢  │
│  ...                                │
└─────────────────────────────────────┘
```

## 📦 Installation

### Prerequisites

- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher
- **Angular CLI**: v15.0.0 or higher

Install Angular CLI globally:
```bash
npm install -g @angular/cli@15
```

### Local Setup

```bash
# Clone repository
git clone https://github.com/hp2503/hotel-reservation-system-frontend.git

# Install dependencies
npm install

# Start development server
npm start
```

Application runs on `http://localhost:4200`

## ⚙️ Environment Configuration

### Development Environment

File: `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

### Production Environment

File: `src/environments/environment.prod.ts`

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://hotel-reservation-system-backend-ngzu.onrender.com/api'
};
```

**Important**: Update `apiUrl` with your actual Render backend URL before deploying.

## 🎯 Running Locally

### Development Server (with hot reload)
```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200`. The app auto-reloads on file changes.

### Build for Production
```bash
npm run build:prod
# or
ng build --configuration production
```

Output in `dist/hotel-reservation-system-frontend/`

### Running Tests
```bash
# Unit tests
npm test
# or
ng test

# E2E tests
ng e2e
```

### Linting
```bash
npm run lint
# or
ng lint
```

## 🌐 Deployment on Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Push to GitHub**: Ensure your code is on GitHub

2. **Import to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. **Configure Project**:
   ```
   Framework Preset: Angular
   Root Directory: ./
   Build Command: npm run build:prod
   Output Directory: dist/hotel-reservation-system-frontend
   Install Command: npm install
   ```

4. **Environment Variables**:
   - Add `API_URL` = `https://hotel-reservation-system-backend-ngzu.onrender.com/api` (if needed)

5. **Deploy**: Click "Deploy"

6. **Update Backend CORS**:
   - After deployment, copy your Vercel URL
   - Update backend `FRONTEND_URL` environment variable on Render
   - Redeploy backend if necessary

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

### Method 3: Automatic Deployment

Vercel automatically deploys on:
- Every push to `main` branch
- Pull requests (preview deployments)

## 📁 Project Structure

```
hotel-reservation-system-frontend/
├── src/
│   ├── app/
│   │   ├── app.component.ts           # Main component logic
│   │   ├── app.component.html         # Main template
│   │   ├── app.component.scss         # Main styles
│   │   ├── app.module.ts              # App module
│   │   ├── models/
│   │   │   └── models.ts              # TypeScript interfaces
│   │   └── services/
│   │       ├── booking.service.ts     # Booking API service
│   │       └── room.service.ts        # Room API service
│   ├── environments/
│   │   ├── environment.ts             # Dev config
│   │   └── environment.prod.ts        # Prod config
│   ├── assets/                        # Static assets
│   ├── index.html                     # HTML entry point
│   ├── main.ts                        # TypeScript entry point
│   └── styles.scss                    # Global styles
├── angular.json                       # Angular configuration
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
├── .gitignore
├── vercel.json                        # Vercel config (optional)
└── README.md
```

## 🧩 Components

### AppComponent

**File**: `src/app/app.component.ts`

**Responsibilities**:
- Main application logic
- API communication orchestration
- State management
- User interaction handling

**Key Methods**:
- `initializeApp()` - Initialize application
- `loadRooms()` - Fetch all rooms
- `createBooking()` - Create new booking
- `generateRandomOccupancy()` - Generate random bookings
- `resetBookings()` - Reset all bookings
- `getRoomsByFloor()` - Filter rooms by floor

### Services

#### BookingService

**File**: `src/app/services/booking.service.ts`

**API Methods**:
- `createBooking(numberOfRooms: number)`
- `getAllBookings(status?: string)`
- `getBookingByReference(reference: string)`
- `cancelBooking(reference: string)`
- `generateRandomOccupancy(percentage: number)`
- `resetBookings()`
- `getBookingStats()`

#### RoomService

**File**: `src/app/services/room.service.ts`

**API Methods**:
- `initializeRooms()`
- `getAllRooms(floor?: number, isBooked?: boolean)`
- `getAvailableRooms()`
- `getRoomsByFloor(floor: number)`
- `getRoomByNumber(roomNumber: number)`
- `getOccupancySummary()`

### Models

**File**: `src/app/models/models.ts`

**Interfaces**:
- `Room` - Room data structure
- `Booking` - Booking data structure
- `ApiResponse<T>` - Generic API response
- `OccupancySummary` - Statistics data
- `FloorOccupancy` - Floor-wise data
- `BookingStats` - Booking statistics

## 🎨 Styling

### Design System

**Colors**:
- Primary: `#667eea` (Purple gradient)
- Success: `#48bb78` (Green)
- Danger: `#f56565` (Red)
- Info: `#4299e1` (Blue)

**Typography**:
- Font Family: System fonts
- Headings: Bold, 600-700 weight
- Body: Regular, 400 weight

**Animations**:
- Smooth transitions (0.3s)
- Hover effects
- Loading spinners
- Slide-in modals

### Responsive Breakpoints

```scss
// Mobile
@media (max-width: 768px) { }

// Tablet
@media (min-width: 769px) and (max-width: 1024px) { }

// Desktop
@media (min-width: 1025px) { }
```

## 🔄 State Management

### Component State

Using Angular's built-in state management:

```typescript
rooms: Room[] = [];              // All rooms
bookings: Booking[] = [];        // All bookings
occupancySummary: OccupancySummary | null = null;
loading: boolean = false;        // Loading state
error: string = '';              // Error messages
successMessage: string = '';     // Success messages
```

### Data Flow

```
User Action → Component Method → Service → API Call → Response → Update State → Re-render View
```

## 📡 API Integration

### HTTP Configuration

**Base URL**: Configured in `environment.ts`

**HTTP Client**: Angular's `HttpClient` with RxJS

**Error Handling**: Automatic retry with `retry()` operator

**Example**:
```typescript
createBooking(numberOfRooms: number): Observable<ApiResponse<any>> {
  return this.http.post<ApiResponse<any>>(
    `${this.apiUrl}/bookings`,
    { numberOfRooms }
  ).pipe(
    retry(1),
    catchError(this.handleError)
  );
}
```

## 🐛 Troubleshooting

### API Connection Issues

**Issue**: Cannot connect to backend

**Solutions**:
1. Verify backend is running
2. Check `environment.prod.ts` has correct API URL
3. Ensure backend allows CORS from your Vercel URL
4. Check browser console for errors

### Build Failures

**Issue**: Build fails on Vercel

**Solutions**:
1. Verify all dependencies in `package.json`
2. Check TypeScript errors: `ng build --configuration production`
3. Ensure Angular version compatibility
4. Clear Vercel cache and redeploy

### CORS Errors

**Issue**: "CORS policy" errors

**Solutions**:
1. Update backend `FRONTEND_URL` with your Vercel URL
2. Ensure URL includes `https://` and no trailing slash
3. Redeploy backend after changing environment variables

### Environment Variables Not Working

**Issue**: API URL not updating

**Solutions**:
1. Rebuild with production configuration: `npm run build:prod`
2. Verify `environment.prod.ts` is correctly configured
3. Check Vercel build logs for environment file usage

### Optimization Techniques

- Production build optimization
- Lazy loading ready
- RxJS operators for efficient HTTP calls
- Component-based architecture
- SCSS modular design

## 🧪 Testing

### Unit Tests

Run with:
```bash
npm test
```

Test files located at: `*.spec.ts`

### Manual Testing Checklist

- [ ] Application loads without errors
- [ ] Can create booking (1-5 rooms)
- [ ] Hotel visualization displays correctly
- [ ] Statistics update in real-time
- [ ] Random occupancy works
- [ ] Reset functionality works
- [ ] Booking details modal opens
- [ ] Responsive on mobile devices
- [ ] API errors display properly

## 🔒 Security

- ✅ **HTTPS**: Enforced by Vercel
- ✅ **Environment Variables**: Secure configuration
- ✅ **XSS Protection**: Angular's built-in sanitization
- ✅ **CSRF Protection**: API-level protection
- ✅ **Input Validation**: Frontend and backend validation

## 📈 Analytics (Optional)

### Add Google Analytics

1. **Get Tracking ID** from Google Analytics

2. **Add to index.html**:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 📞 Support & Contact

**Developer**: Hardik Prashar  
**Repository**: [GitHub](https://github.com/hp2503/hotel-reservation-system-frontend)  
**Backend**: [Repository](https://github.com/hp2503/hotel-reservation-system-backend)  
**Live App**: [Vercel](https://hotel-reservation-frontend-e8re1yx41-hp2503s-projects.vercel.app/)

## 🔗 Related Links

- [Backend Repository](https://github.com/hp2503/hotel-reservation-system-backend)
- [Backend API](https://hotel-reservation-system-backend-ngzu.onrender.com)
- [Angular Documentation](https://angular.io/docs)
- [Vercel Documentation](https://vercel.com/docs)

## 📝 License

MIT License

--

**Quick Commands**:
```bash
# Install
npm install

# Run locally
npm start

# Build production
npm run build:prod

# Deploy to Vercel
vercel --prod
```

**Environment Setup**:
1. Update `src/environments/environment.prod.ts` with backend URL
2. Deploy to Vercel
3. Update backend CORS with Vercel URL
4. Test live application
