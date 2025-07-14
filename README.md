
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
<img width="1919" height="900" alt="image" src="https://github.com/user-attachments/assets/b4ab83be-4c46-481a-b0f8-d7719c7de06f" />

<img width="1898" height="915" alt="image" src="https://github.com/user-attachments/assets/fa87dafb-a061-4401-b7d7-6e2087b43234" />

<img width="456" height="817" alt="image" src="https://github.com/user-attachments/assets/058e61d9-3b15-4f1e-975a-ca1302574363" />

<img width="442" height="801" alt="image" src="https://github.com/user-attachments/assets/93613cf7-3b0c-43f2-9b38-b713defe5128" />


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
