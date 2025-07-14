# 🏆 PointClaimer

A real-time, gamified leaderboard system built with React, Tailwind CSS, Framer Motion, and Node.js backend.

## Features

- Podium-style leaderboard for top 3 users
- Animated, responsive UI with modern gradients
- Claim random points for any user
- Real-time claim history with user and points
- Add new users instantly
- Mobile-friendly design

## Screenshots

### 📱 Mobile View

![Mobile View](./public/mobile-screenshot.png)

> Replace `public/mobile-screenshot.png` with your own screenshot for best results.

---

## Getting Started

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd frontend-vite
```

### 2. Install dependencies

```sh
npm install
npm install framer-motion lucide-react
npm install -D tailwindcss postcss autoprefixer
```

### 3. Start the development server

```sh
npm run dev
```

### 4. Backend Setup

- Make sure your backend (Node.js/Express) is running and accessible at the configured API endpoint (default: `http://localhost:5000`).

---

## Folder Structure

```
frontend-vite/
  ├── public/
  │   └── mobile-screenshot.png   # <-- Add your mobile screenshot here
  ├── src/
  │   ├── components/
  │   ├── App.jsx
  │   └── ...
  ├── tailwind.config.js
  ├── postcss.config.js
  ├── package.json
  └── ...
```

---

## Customization

- Update the color scheme, icons, and avatars as needed in the components.
- To change the mobile screenshot, replace `public/mobile-screenshot.png` with your own image.

---

## License

MIT
