# Artify Frontend Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running on http://localhost:5000

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```
VITE_API_URL=http://localhost:5000
```

3. Start the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory:
- `VITE_API_URL`: Your backend API URL (default: http://localhost:5000)

## Features Implemented

### Authentication
- Email/Password login
- Google authentication
- User registration with password validation
- Password reset functionality
- Protected routes

### Artwork Management
- Add new artworks
- Update existing artworks
- Delete artworks (only own artworks)
- View artwork details
- Like/Unlike artworks
- Add to favorites
- Remove from favorites

### Pages
- **Home**: Banner slider, featured artworks, top artists, community highlights
- **Explore Artworks**: Search and filter by category
- **Add Artwork**: Form to add new artwork
- **Artwork Details**: Full artwork information with like and favorite options
- **My Gallery**: User's own artworks with update/delete functionality
- **My Favorites**: User's favorite artworks
- **Login/Register**: Authentication pages
- **404 Page**: Custom not found page

### UI Features
- Dark/Light mode toggle with localStorage persistence
- Responsive design for all devices
- Loading spinners
- Toast notifications
- Smooth animations (React Awesome Reveal)
- Image gallery slider (React Image Gallery)
- Typewriter effect (React Simple Typewriter)
- Tooltips (React Tooltip)

### Libraries Used
- react-image-gallery: Image slider on home page
- react-simple-typewriter: Typewriter effect on home page
- react-awesome-reveal: Smooth animations
- react-tooltip: Tooltips for UI elements
- react-hot-toast: Toast notifications
- Firebase: Authentication
- Axios: API calls
- Tailwind CSS: Styling
- DaisyUI: UI components

## Backend API Endpoints

The frontend expects the following API endpoints:
- `GET /api/artworks` - Get all public artworks (with search and category filter)
- `GET /api/artworks/featured` - Get 6 most recent public artworks
- `GET /api/artworks/:id` - Get single artwork (requires auth)
- `GET /api/my-artworks` - Get user's artworks (requires auth)
- `POST /api/artworks` - Add new artwork (requires auth)
- `PUT /api/artworks/:id` - Update artwork (requires auth)
- `DELETE /api/artworks/:id` - Delete artwork (requires auth)
- `PATCH /api/artworks/:id/like` - Like/Unlike artwork (requires auth)
- `GET /api/favorites` - Get user's favorites (requires auth)
- `POST /api/favorites` - Add to favorites (requires auth)
- `DELETE /api/favorites/:artworkId` - Remove from favorites (requires auth)
- `GET /api/artists/:email` - Get artist info

## Firebase Configuration

Firebase is configured in `src/config/firebase.js`. The configuration is already set up with the provided credentials.

## Dark Mode

Dark mode is implemented using:
- ThemeContext for state management
- localStorage for persistence
- ToggleSwitch component in the navbar
- Tailwind CSS dark mode classes

## Notes

- Make sure the backend server is running before starting the frontend
- The backend should be configured to accept requests from http://localhost:5173 (Vite default port)
- All API requests include the Firebase auth token in the Authorization header
- The app uses React Router v7 for routing
- Private routes require authentication
- Users can only update/delete their own artworks

## Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

