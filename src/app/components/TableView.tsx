"use client"; 

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Table from './Table';
import { db } from '../../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function   PlayersPage() {

  /*
    {
      id: '1',
      name: 'Michael Jordan',
      avatarUrl: '/Images/avatar.jpeg',
      university: 'University of North Carolina',
      price: '$15,000,000',
    },

  */

/* eslint-disable @typescript-eslint/no-explicit-any */
  const [players, setPlayers] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    const playersCollection = collection(db, "players");

    const unsubscribe = onSnapshot(playersCollection, (snapshot) => {
      const updatedPlayers = snapshot.docs.map((doc) => ({
        id: doc.id,
        avatarUrl: doc.data().avatarUrl,
        name: doc.data().name,
        university: doc.data().university,
        price: doc.data().basePrice,
      }));
      console.log("Updated players:", updatedPlayers);
      setPlayers(updatedPlayers);
    });

    return () => unsubscribe(); // Cleanup on unmount
}, []);

  const [menuState, setMenuState] = useState({
    visible: false,
    playerId: '',
    x: 200,
    y: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 10;
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = (playerId: string, event: React.MouseEvent) => {
    event.preventDefault();
    setMenuState((prevState) => ({
      visible: prevState.playerId !== playerId || !prevState.visible,
      playerId,
      x: event.clientX - 150, // Adjust the x coordinate to move the menu to the left
      y: event.clientY,
    }));
  };

  const handleCloseMenu = useCallback(() => {
    setMenuState((prevState) => ({
      ...prevState,
      visible: false,
    }));
  }, []);

  const handleMenuAction = (action: string) => {
    console.log(`Action ${action} for player ${menuState.playerId}`);
    handleCloseMenu();
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      handleCloseMenu();
    }
  }, [menuRef, handleCloseMenu]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div onClick={handleCloseMenu}>
      <Table 
        players={currentPlayers}
        onMenuClick={handleMenuClick}
      />

      {menuState.visible && (
        <div 
          ref={menuRef}
          className="fixed bg-zinc-800 shadow-lg rounded-md overflow-hidden z-50"
          style={{
            top: menuState.y,
            left: menuState.x,
            minWidth: '150px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="py-1">
            <button
              onClick={() => handleMenuAction('view')}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700"
            >
              View Details
            </button>
            <button
              onClick={() => handleMenuAction('edit')}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700"
            >
              Edit Player
            </button>
            <button
              onClick={() => handleMenuAction('delete')}
              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-zinc-700"
            >
              Remove Player
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(players.length / playersPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-zinc-800 text-white' : 'bg-zinc-200 text-zinc-800'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}