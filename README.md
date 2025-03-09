# sprintx

## 📌 Project Overview
This is a **Fantasy Cricket App** that allows users to create teams, view player stats, and participate in tournaments. Admins can manage players, tournaments, and automate point calculations. The app includes real-time updates and a leaderboard system.

## 🚀 Features & Development Branches

### 1️⃣ Player Management (Admin)
📌 **Branch:** `feature/admin-player-management`
- Get list of all players
- Filter players by category (Batsman, Bowler, All-rounder)
- View player details & stats
- Add a new player
- Update existing player details

### 2️⃣ Tournament Management (Admin)
📌 **Branch:** `feature/admin-tournament-management`
- Admin can see the list of tournaments
- View details of a selected tournament
- Assign players to a specific tournament
- Add player statistics for a tournament
- Import tournament data via CSV (bulk upload)
- Auto-update all players in the database based on CSV

### 3️⃣ Points & Price Calculation (Admin)
📌 **Branch:** `feature/admin-player-points`
- When a player is added/updated, calculate:
  - **Points** (based on the equation)
  - **Base Price** (derived from points)
- Store computed points & price in the database
- Ensure points are hidden from the user side

### 4️⃣ Player List & Stats (User)
📌 **Branch:** `feature/user-player-view`
- Get list of players (same as Admin)
- Show individual player stats
- Hide points from the user interface

### 5️⃣ Team Creation & Game Participation (User)
📌 **Branch:** `feature/user-team-management`
- Users can select **11 players** to create a team
- Each player has a cost, and users start with a **9000000 budget**
- Prevent selecting the same player twice
- Remove players from the team before confirming
- Track budget while selecting players
- Once confirmed, the team **cannot be modified**
- Users can **add their team to a game** once created
- After adding a team to a game, the **leaderboard becomes visible**

### 6️⃣ Leaderboard System
📌 **Branch:** `feature/leaderboard`
- Store team creation timestamp
- Rank teams based on:
  - **Points** (sum of selected player points)
  - **Time of team creation** (earlier teams rank higher if points are the same)
- Users can **view their leaderboard position** after adding a team to a game
- Store leaderboard in Firebase Realtime Database for real-time updates

### 7️⃣ Real-time Updates
📌 **Branch:** `feature/realtime-updates`
- Use Firestore `onSnapshot()` for live data
- Update:
  - Player stats in Admin panel
  - Leaderboard ranking
  - User’s team list updates

## 🔥 Development Plan & Merge Strategy
1️⃣ **Start with Admin features** (`feature/admin-player-management`, `feature/admin-tournament-management`)
2️⃣ **Add user features** (`feature/user-player-view`, `feature/user-team-management`)
3️⃣ **Implement leaderboard ranking & real-time updates** (`feature/leaderboard`, `feature/realtime-updates`)
4️⃣ **Finally, integrate Authentication** (`feature/authentication`)

## 🛠️ Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Firebase Authentication, Firestore, Firebase Realtime Database
- **Hosting:** Vercel / Firebase Hosting

## 🏗️ Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/fantasy-cricket.git
   cd fantasy-cricket
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Setup Firebase:
   - Create a Firebase project
   - Enable Authentication (Email/Password)
   - Enable Firestore & Realtime Database
   - Get your Firebase config and create a `.env.local` file:
     ```sh
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```
4. Run the project:
   ```sh
   npm run dev
   ```

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

# Firebase config
- Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
- Create a copy of the `.env.example` file and rename it to `.env`. Fill in the values with your Firebase project's configuration.

```bash

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
