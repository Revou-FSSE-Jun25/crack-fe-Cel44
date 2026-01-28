# Movie Booking API (Frontend)

## Overview
This the frontend application for a movie ticketing web app. Users can browse movies, select showtimes and seats, and view booking history.

## Tech Stack
- Next.js
- React
- Tailwind CSS
- Swiper.js
- Fetch API

## Environment Variables
Create `.env.local` based on `.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Instalasi

1. Clone repo Frontend:
```bash
git clone <URL_FRONTEND_REPO>
cd <nama-folder-frontend>
```

2. Run the server
```bash
npm install
npm run dev
```

## Database Schema Documentation
Database schema and table relationships are documented in:
- `DATABASE.md`

## Features
- Loading state uses skeleton for movie list
- error states are handled and displayed in authentication flow

## Links
open in browser: https://crack-fe-cel44-d8q5.vercel.app/