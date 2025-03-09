"use client"; 

import React, { useState } from 'react';
import Table from './Table';

export default function PlayersPage() {
  const players = [
    {
      id: '1',
      name: 'Michael Jordan',
      avatarUrl: '/Images/avatar.jpeg',
      university: 'University of North Carolina',
      price: '$15,000,000',
    },
    {
      id: '2',
      name: 'LeBron James',
      avatarUrl: '/Images/avatar.jpeg',
      university: 'St. Vincent-St. Mary High School',
      price: '$45,000,000',
    },
    {
      id: '3',
      name: 'Stephen Curry',
      avatarUrl: '/Images/avatar.jpeg',
      university: 'Davidson College',
      price: '$48,000,000',
    },
    {
      id: '4',
      name: 'Kevin Durant',
      avatarUrl: '/Images/avatar.jpeg',
      university: 'University of Texas',
      price: '$42,000,000',
    },
    {
      id: '5',
      name: 'Giannis Antetokounmpo',
      avatarUrl: '/Images/avatar.jpeg',
      university: 'Filathlitikos (Greece)',
      price: '$39,000,000',
    },
  ];

  const [menuState, setMenuState] = useState({
    visible: false,
    playerId: '',
    x: 0,
    y: 0,
  });

  const handleMenuClick = (playerId: string, event: React.MouseEvent) => {
    event.preventDefault();
    setMenuState({
      visible: true,
      playerId,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleCloseMenu = () => {
    setMenuState({
      ...menuState,
      visible: false,
    });
  };

  const handleMenuAction = (action: string) => {
    console.log(`Action ${action} for player ${menuState.playerId}`);
    handleCloseMenu();
  };

  return (
    <div onClick={handleCloseMenu}>
      <Table 
        players={players}
        onMenuClick={handleMenuClick}
      />

      {menuState.visible && (
        <div 
          className="fixed bg-zinc-800 shadow-lg rounded-md overflow-hidden z-50"
          style={{
            top: menuState.y,
            left: menuState.x,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="py-1">
            <button
              onClick={() => handleMenuAction('view')}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-800"
            >
              View Details
            </button>
            <button
              onClick={() => handleMenuAction('edit')}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-800"
            >
              Edit Player
            </button>
            <button
              onClick={() => handleMenuAction('delete')}
              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-zinc-800"
            >
              Remove Player
            </button>
          </div>
        </div>
      )}
    </div>
  );
}