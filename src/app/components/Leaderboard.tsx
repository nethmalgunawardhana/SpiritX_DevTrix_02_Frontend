"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { TrophyIcon, ClockIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

interface User {
  rank: number;
  username: string;
  points: number;
  avatarUrl: string;
}

interface LeaderboardProps {
  users: User[];
  currentUser: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users, currentUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1: return "text-yellow-400";
      case 2: return "text-gray-400";
      case 3: return "text-amber-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white shadow-md backdrop-filter backdrop-blur-lg bg-opacity-30 rounded-lg">
      <div className="">
        <h2 className="text-2xl font-bold text-white text-center">Leaderboard</h2>
        <div className="flex justify-center items-center mt-3 space-x-2 bg-white/10 rounded-full py-2 px-4 w-fit mx-auto">
            Remaining Time&nbsp;&nbsp;
          <ClockIcon className="w-5 h-5 text-white" />
          <span className="text-white font-medium">02:15:30</span>
        </div>
      </div>

      <div className="p-6 rounded-b-lg">
        {currentUsers.map((user, index) => (
          <motion.div
            key={user.rank}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-center p-3 mb-2 rounded-lg ${
              user.username === currentUser 
                ? 'bg-zinc-800 border border-teal-400' 
                : 'bg-zinc-800'
            }`}
          >
            <div className="flex items-center justify-center w-10">
              {user.rank <= 3 ? (
                <TrophyIcon className={`w-6 h-6 ${getMedalColor(user.rank)}`} />
              ) : (
                <span className="text-zinc-500 dark:text-zinc-400 font-semibold">{user.rank}</span>
              )}
            </div>
            
            <div className="relative ml-3">
              <Image
                src={user.avatarUrl}
                alt={`${user.username}'s avatar`}
                width={40}
                height={40}
                className="rounded-full border-2 border-zinc-200 dark:border-zinc-700"
              />
              {user.rank <= 3 && (
                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${
                  user.rank === 1 ? 'bg-yellow-400' : user.rank === 2 ? 'bg-zinc-400' : 'bg-amber-600'
                } border border-white dark:border-zinc-800`}></div>
              )}
            </div>
            
            <div className="ml-4 flex-1">
              <p className={`font-medium ${
                user.username === currentUser ? 'text-teal-400' : 'text-zinc-200'
              }`}>
                {user.username}
              </p>
            </div>
            
            <div className="flex items-center justify-center px-3 py-1 bg-zinc-100 dark:bg-zinc-700 rounded-full">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{user.points.toLocaleString()}</span>
              <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-400">pts</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center p-4">
        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, index) => {
            if (
              index + 1 === currentPage ||
              index + 1 === 1 ||
              index + 1 === totalPages ||
              index + 1 === currentPage - 1 ||
              index + 1 === currentPage + 1
            ) {
              return (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-zinc-800 text-white' : 'bg-zinc-200 text-zinc-800'}`}
                >
                  {index + 1}
                </button>
              );
            }
            
            if (
              (index + 1 === currentPage - 2 && currentPage > 3) ||
              (index + 1 === currentPage + 2 && currentPage < totalPages - 2)
            ) {
              return (
                <div key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-black dark:text-white">
                  ...
                </div>
              );
            }
            
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;