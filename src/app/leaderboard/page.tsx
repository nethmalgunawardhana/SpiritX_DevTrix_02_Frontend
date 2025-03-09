"use client";

import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Leaderboard from '../components/Leaderboard';
import ProtectedRoute from '../components/ProtectedRoute';

const users = [
  { rank: 1, username: 'Alice', points: 1500, avatarUrl: '/Images/avatar.jpeg' },
  { rank: 2, username: 'Bob', points: 1400, avatarUrl: '/Images/avatar.jpeg' },
  { rank: 3, username: 'Charlie', points: 1300, avatarUrl: '/Images/avatar.jpeg' },
  { rank: 4, username: 'David', points: 1200, avatarUrl: '/Images/avatar.jpeg' },
  { rank: 5, username: 'Eve', points: 1100, avatarUrl: '/Images/avatar.jpeg' },
  { rank: 6, username: 'Frank', points: 1000, avatarUrl: '/Images/avatar.jpeg' },
  { rank: 7, username: 'Grace', points: 900, avatarUrl: '/Images/avatar.jpeg' },
  { rank: 8, username: 'Heidi', points: 800, avatarUrl: '/Images/avatar.jpeg' },
  { rank: 9, username: 'Ivan', points: 700, avatarUrl: '/Images/avatar.jpeg' },
  { rank: 10, username: 'Judy', points: 600, avatarUrl: '/Images/avatar.jpeg' },
];

const currentUser = 'Charlie';

const LeaderboardPage: React.FC = () => {
  return (
    <ProtectedRoute availableFor={['team_owner','admin' , 'user']} >
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-6 text-white">
          <Leaderboard users={users} currentUser={currentUser} />
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
};

export default LeaderboardPage;