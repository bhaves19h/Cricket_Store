# Cricket Kit Store 🏏

A MERN-stack e-commerce application for cricket equipment, built with the MERN stack (MongoDB, Express, React, Node.js). Installable on mobile as a Progressive Web App (PWA).

## Features

- Browse and filter cricket products (bats, balls, pads, gloves, helmets)
- User registration and login with JWT authentication
- Shopping cart with order summary
- Admin panel for product management
- **PWA support** — install on your phone's home screen for a native app experience

## Project Structure

```
Cricket_Store/
├── frontend/          # React app (Create React App)
│   ├── public/        # Static assets & PWA manifest
│   └── src/           # React components, pages, services
├── backend/           # Node.js + Express API
│   ├── config/        # Database connection
│   ├── controllers/   # Route handlers
│   ├── middleware/     # JWT auth middleware
│   ├── models/        # Mongoose schemas
│   └── routes/        # API routes
└── package.json       # Root scripts for deployment
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Atlas cloud or local)

## Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/bhaves19h/Cricket_Store.git
   cd Cricket_Store
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**

   Create `backend/.env`:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

   For local development, optionally create `frontend/.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the backend** (in one terminal)
   ```bash
   cd backend
   npm run dev
   ```

5. **Start the frontend** (in another terminal)
   ```bash
   cd frontend
   npm start
   ```

   The app opens at `http://localhost:3000`.

## Deployment (Render)

This app is configured for easy deployment on [Render](https://render.com/).

### Option 1: Single Web Service (Recommended)

1. Push your code to GitHub.
2. Create a **Web Service** on Render, connected to your repo.
3. Configure:
   - **Build Command:** `cd backend && npm install && cd ../frontend && npm install && npm run build`
   - **Start Command:** `cd backend && node server.js`
   - **Environment Variables:**
     - `MONGO_URI` — your MongoDB Atlas connection string
     - `JWT_SECRET` — a secure random string
     - `NODE_ENV` — `production`

### Option 2: Separate Frontend & Backend

Deploy the backend as a **Web Service** and the frontend as a **Static Site** on Render, Vercel, or Netlify.

For the frontend, set the `REACT_APP_API_URL` environment variable to your deployed backend URL (e.g., `https://your-backend.onrender.com/api`).

## Run on Mobile 📱

This app is a **Progressive Web App (PWA)**, which means you can install it on your phone:

### Android (Chrome)
1. Open the deployed app URL in Chrome
2. Tap the **three-dot menu** (⋮) in the top right
3. Tap **"Add to Home screen"** or **"Install app"**
4. The app will appear on your home screen like a native app

### iPhone (Safari)
1. Open the deployed app URL in Safari
2. Tap the **Share button** (📤) at the bottom
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"** to confirm
5. The app will appear on your home screen

The app runs in standalone mode (no browser bar) and works like a native mobile app.

## API Endpoints

| Method | Endpoint              | Description          | Auth Required |
|--------|-----------------------|----------------------|---------------|
| POST   | `/api/auth/register`  | Register new user    | No            |
| POST   | `/api/auth/login`     | Login user           | No            |
| GET    | `/api/products`       | Get all products     | No            |
| POST   | `/api/products`       | Add product          | Yes (Admin)   |
| DELETE | `/api/products/:id`   | Delete product       | Yes (Admin)   |
| POST   | `/api/orders`         | Create order         | Yes           |
| GET    | `/api/orders`         | Get all orders       | Yes           |

## Tech Stack

- **Frontend:** React 18, React Router, Axios
- **Backend:** Express.js, Mongoose, JWT, bcryptjs
- **Database:** MongoDB
- **Deployment:** Render / Vercel / Netlify
