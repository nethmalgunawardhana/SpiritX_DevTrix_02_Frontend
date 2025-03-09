"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

interface Player {
  id: string;
  name: string;
  basePrice: string;
  category: string;
  university?: string;
  stats?: {
    playerPoints: number;
    [key: string]: any;
  };
  activeStatus?: boolean;
}

const TeamBuilder: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teamMembers, setTeamMembers] = useState<(Player | null)[]>(Array(10).fill(null));
  const [activeTab, setActiveTab] = useState<'Wk' | 'Bat' | 'Ar' | 'Bowl'>('Wk');
  const [selectedPlayerCount, setSelectedPlayerCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const [pagination, setPagination] = useState({
    limit: 20,
    offset: 0,
    hasMore: false,
    totalCount: 0
  });

  // Fetch players from API
  const fetchPlayers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('http://localhost:3005/players/get', {
        params: {
          category: activeTab,
          limit: pagination.limit,
          offset: pagination.offset,
          sortBy: 'name',
          sortOrder: 'asc'
        }
      });
      
      if (response.data.success) {
        setPlayers(response.data.players);
        setPagination({
          ...pagination,
          hasMore: response.data.pagination.hasMore,
          totalCount: response.data.totalCount
        });
      } else {
        setError('Failed to fetch players');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error('Error fetching players:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch more players
  const loadMorePlayers = () => {
    setPagination({
      ...pagination,
      offset: pagination.offset + pagination.limit
    });
  };

  // Load initial players and refresh when activeTab changes
  useEffect(() => {
    setPagination({
      ...pagination,
      offset: 0 // Reset offset when tab changes
    });
    // fetchPlayers will be called by the next useEffect when pagination changes
  }, [activeTab]);

  // Fetch players when pagination changes
  useEffect(() => {
    fetchPlayers();
  }, [pagination.offset, pagination.limit, activeTab]);

  // Load team from localStorage on component mount
  useEffect(() => {
    const savedTeam = localStorage.getItem('savedTeam');
    if (savedTeam) {
      try {
        const parsedTeam = JSON.parse(savedTeam);
        setTeamMembers(parsedTeam);
        countSelectedPlayers(parsedTeam);
      } catch (e) {
        console.error('Error parsing saved team:', e);
        localStorage.removeItem('savedTeam');
      }
    }
  }, []);

  // Count selected players for progress indicator
  const countSelectedPlayers = (team: (Player | null)[]) => {
    const count = team.filter(player => player !== null).length;
    setSelectedPlayerCount(count);
  };

  // Add player to team
  const addPlayerToTeam = (player: Player) => {
    const firstEmptySlot = teamMembers.findIndex(slot => slot === null);
    if (firstEmptySlot !== -1) {
      const newTeam = [...teamMembers];
      newTeam[firstEmptySlot] = player;
      setTeamMembers(newTeam);
      countSelectedPlayers(newTeam);
      
      // Save to localStorage
      localStorage.setItem('savedTeam', JSON.stringify(newTeam));
    }
  };

  // Remove player from team
  const removePlayerFromTeam = (player: Player) => {
    const updatedTeam = teamMembers.map(member => 
      member && member.id === player.id ? null : member
    );
    setTeamMembers(updatedTeam);
    countSelectedPlayers(updatedTeam);
    
    // Update localStorage
    localStorage.setItem('savedTeam', JSON.stringify(updatedTeam));
  };

  // Clear all team selections
  const clearTeam = () => {
    setTeamMembers(Array(10).fill(null));
    setSelectedPlayerCount(0);
    localStorage.removeItem('savedTeam');
  };

  // Create team
  const createTeam = () => {
    // Get non-null team members
    const finalTeam = teamMembers.filter(member => member !== null);
    console.log('Team created with members:', finalTeam);
    
    // Additional logic for team creation (e.g. API calls) would go here
    alert(`Team created with ${finalTeam.length} players!`);
  };

  // Format price for display
  const formatPrice = (price: string) => {
    if (!price) return '₹0';
    const numericValue = parseFloat(price.replace(/[^\d.-]/g, ''));
    return `₹${numericValue.toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-black h-full w-full flex justify-center overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-6 overflow-hidden">
        {/* Left side - Player selection */}
        <div className="w-full md:w-1/2 bg-zinc rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="p-4">
            {/* Progress indicator */}
            <div className="flex mb-4">
              {Array(11).fill(null).map((_, i) => (
                <div 
                  key={`progress-${i}`} 
                  className={`w-8 h-8 rounded-full mr-1 ${i < selectedPlayerCount ? 'bg-teal-500' : 'bg-gray-300'}`}
                />
              ))}
            </div>
            
            {/* Tab navigation */}
            <div className="flex border-b mb-4">
              {(['Wk', 'Bat', 'Ar', 'Bowl'] as const).map(tab => (
                <button
                  key={tab}
                  className={`py-2 px-4 ${activeTab === tab ? 'border-b-2 border-teal-800 font-semibold' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          {/* Player list with scrolling */}
          <div className="flex-1 overflow-y-auto p-4">
            {loading && players.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <div className="text-white">Loading players...</div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center p-4">{error}</div>
            ) : players.length === 0 ? (
              <div className="text-white text-center p-4">No players found in this category</div>
            ) : (
              <div className="space-y-2">
                {players.map((player) => {
                  const isSelected = teamMembers.some(member => member && member.id === player.id);
                  return (
                    <div 
                      key={player.id} 
                      className={`flex items-center p-2 rounded ${isSelected ? 'bg-teal-800 text-white' : 'bg-gray-800'}`}
                    >
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <div className="ml-4 flex-grow">
                        <div className="font-medium">{player.name}</div>
                        <div className="text-sm flex items-center">
                          <span className="mr-2">{player.category}</span>
                          {player.university && (
                            <span className="text-xs opacity-75">{player.university}</span>
                          )}
                        </div>
                      </div>
                      <div className="mr-4">{formatPrice(player.basePrice)}</div>
                      <button 
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${isSelected ? 'bg-gray-800 text-teal-800' : 'bg-white text-green-800'}`}
                        onClick={() => isSelected ? removePlayerFromTeam(player) : addPlayerToTeam(player)}
                      >
                        {isSelected ? '-' : '+'}
                      </button>
                    </div>
                  );
                })}
                
                {pagination.hasMore && (
                  <div className="flex justify-center mt-4">
                    <button 
                      className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded"
                      onClick={loadMorePlayers}
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : 'Load More'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Right side - Team creation */}
        <div className="w-full md:w-1/2 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-2">
            <div className="grid grid-cols-2 gap-4">
              {teamMembers.map((member, index) => (
                <div 
                  key={`slot-${index}`} 
                  className={`rounded-lg h-32 relative ${member ? 'bg-teal-800' : 'bg-gray-700'}`}
                >
                  {member ? (
                    <>
                      <button 
                        className="absolute top-2 right-2 text-white font-bold"
                        onClick={() => removePlayerFromTeam(member)}
                      >
                        X
                      </button>
                      <div className="p-4 flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div className="ml-4 text-white">
                          <div>{member.name}</div>
                          <div>{formatPrice(member.basePrice)}</div>
                        </div>
                        <div className="ml-auto bg-white text-black px-2 py-1 text-sm rounded">
                          {member.category}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <button className="text-white text-4xl">+</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="p-4">
            <div className="flex gap-4">
              <button 
                className="bg-teal-500 text-white py-3 px-6 rounded-lg flex-grow"
                onClick={createTeam}
              >
                Create Team
              </button>
              <button 
                className="bg-white text-black py-3 px-6 rounded-lg"
                onClick={clearTeam}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamBuilder;