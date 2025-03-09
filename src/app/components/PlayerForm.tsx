"use client";

import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

interface TournamentData {
  runs?: number;
  wickets?: number;
  ballsFaced?: number;
  inningsPlayed?: number;
  oversBowled?: number;
  runsConceded?: number;
}

interface PlayerData {
  name: string;
  category: string;
  activeStatus?: boolean;
}

interface Player {
  playerData: PlayerData;
  tournamentData: TournamentData;
}

const PlayerForm: React.FC = () => {
  const [tournament, setTournament] = useState('');
  const [activeTab, setActiveTab] = useState<'bulk' | 'single'>('bulk');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Single player form state
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [category, setCategory] = useState('');
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [ballsFaced, setBallsFaced] = useState(0);
  const [inningsPlayed, setInningsPlayed] = useState(0);
  const [oversBowled, setOversBowled] = useState(0);
  const [runsConceded, setRunsConceded] = useState(0);
  
  // Parse CSV file to JSON
  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage({ text: '', type: '' });
    const file = e.target.files?.[0];
    if (!file) return;
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setMessage({ 
            text: `Error parsing CSV: ${results.errors[0].message}`, 
            type: 'error' 
          });
          return;
        }
        
        try {
          // Transform parsed data to match API requirements
          const players = results.data.map((row:any) => {
            return {
              playerData: {
                name: row.Name || '', // Changed from row.name to row.Name
                category: row.Category || '', 
                activeStatus: true
              },
              tournamentData: {
                runs: parseInt(row['Total Runs'] || '0'), 
                wickets: parseInt(row.Wickets || '0'),
                ballsFaced: parseInt(row['Balls Faced'] || '0'),
                inningsPlayed: parseInt(row['Innings Played'] || '0'), 
                oversBowled: parseFloat(row['Overs Bowled'] || '0'), 
                runsConceded: parseInt(row['Runs Conceded'] || '0') 
              }
            };
          });
          
          handleBulkUpload(players);
        } catch (error: any) {
          setMessage({ 
            text: `Error processing CSV data: ${error.message || 'Please check the format.'}`, 
            type: 'error' 
          });
        }
      }
    });
  };
  
  // Submit bulk players to backend
  const handleBulkUpload = async (players: Player[]) => {
    if (players.length === 0) {
      setMessage({ text: 'No valid player data found in CSV', type: 'error' });
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3005/players/create', { players });
      
      if (response.data.success) {
        setMessage({ 
          text: `Successfully added ${response.data.playersCreated} players`, 
          type: 'success' 
        });
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        throw new Error(response.data.error || 'Unknown error occurred');
      }
    } catch (error: any) {
      setMessage({ 
        text: `Error: ${error.response?.data?.details || error.message || 'Failed to upload players'}`, 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle single player form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    
    if (!name || !category) {
      setMessage({ text: 'Name and category are required', type: 'error' });
      return;
    }
    
    const playerData: PlayerData = {
      name,
      category,
      activeStatus: true
    };
    
    const tournamentData: TournamentData = {
      runs,
      wickets,
      ballsFaced,
      inningsPlayed,
      oversBowled,
      runsConceded
    };
    
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3005/players/create/single', { 
        playerData, 
        tournamentData 
      });
      
      if (response.data.success) {
        setMessage({ 
          text: `Player ${name} added successfully with ID: ${response.data.playerId}`, 
          type: 'success' 
        });
        // Reset form fields
        resetForm();
      } else {
        throw new Error(response.data.error || 'Unknown error occurred');
      }
    } catch (error: any) {
      setMessage({ 
        text: `Error: ${error.response?.data?.details || error.message || 'Failed to create player'}`, 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetForm = () => {
    setName('');
    setUniversity('');
    setCategory('');
    setRuns(0);
    setWickets(0);
    setBallsFaced(0);
    setInningsPlayed(0);
    setOversBowled(0);
    setRunsConceded(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white rounded-lg shadow-md">
      {message.text && (
        <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-700' : 'bg-red-700'}`}>
          {message.text}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium mb-1">Select Tournament</label>
        <select
          value={tournament}
          onChange={(e) => setTournament(e.target.value)}
          className="w-full p-2 border border-gray-700 rounded bg-zinc-800 text-white"
        >
          <option value="">Select a tournament</option>
          <option value="tournament1">Tournament 1</option>
          <option value="tournament2">Tournament 2</option>
          <option value="tournament3">Tournament 3</option>
        </select>
      </div>

      <div className="flex mt-6 border-b border-gray-700">
        <button 
          className={`px-4 py-2 ${activeTab === 'bulk' ? 'border-b-2 border-teal-500' : ''}`} 
          onClick={() => setActiveTab('bulk')}
        >
          Bulk Add Players
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'single' ? 'border-b-2 border-teal-500' : ''}`} 
          onClick={() => setActiveTab('single')}
        >
          Single Player Creation
        </button>
      </div>

      {activeTab === 'bulk' && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Bulk Add Players</h3>
          <div className="mb-4">
            <p className="text-sm text-gray-300 mb-2">
              Upload a CSV file with columns: name, category, runs, wickets, ballsFaced, inningsPlayed, oversBowled, runsConceded
            </p>
            <label className="block text-sm font-medium mb-1">Upload CSV File</label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleCsvUpload}
              className="w-full p-2 border border-gray-700 rounded bg-zinc-800 text-white"
              disabled={isLoading}
            />
          </div>
          
          <div className="flex justify-end mt-4">
            <button 
              className={`px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 disabled:bg-gray-600 disabled:cursor-not-allowed`}
              disabled={isLoading}
              onClick={() => fileInputRef.current?.click()}
            >
              {isLoading ? 'Uploading...' : 'Upload CSV'}
            </button>
          </div>
        </div>
      )}

      {activeTab === 'single' && (
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <h3 className="text-xl font-semibold mb-4">Single Player Creation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded bg-zinc-800 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">University</label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded bg-zinc-800 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded bg-zinc-800 text-white"
                required
              >
                <option value="">Select a category</option>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All-Rounder">All-Rounder</option>
              </select>
            </div>
          </div>
          
          <h4 className="text-lg font-medium mt-4">Tournament Statistics</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Runs</label>
              <input
                type="number"
                min="0"
                value={runs}
                onChange={(e) => setRuns(Number(e.target.value))}
                className="w-full p-2 border border-gray-700 rounded bg-zinc-800 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Wickets</label>
              <input
                type="number"
                min="0"
                value={wickets}
                onChange={(e) => setWickets(Number(e.target.value))}
                className="w-full p-2 border border-gray-700 rounded bg-zinc-800 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Balls Faced</label>
              <input
                type="number"
                min="0"
                value={ballsFaced}
                onChange={(e) => setBallsFaced(Number(e.target.value))}
                className="w-full p-2 border border-gray-700 rounded bg-zinc-800 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Innings Played</label>
              <input
                type="number"
                min="0"
                value={inningsPlayed}
                onChange={(e) => setInningsPlayed(Number(e.target.value))}
                className="w-full p-2 border border-gray-700 rounded bg-zinc-800 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Overs Bowled</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={oversBowled}
                onChange={(e) => setOversBowled(Number(e.target.value))}
                className="w-full p-2 border border-gray-700 rounded bg-zinc-800 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Runs Conceded</label>
              <input
                type="number"
                min="0"
                value={runsConceded}
                onChange={(e) => setRunsConceded(Number(e.target.value))}
                className="w-full p-2 border border-gray-700 rounded bg-zinc-800 text-white"
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <button 
              type="submit" 
              className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Adding Player...' : 'Add Player'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PlayerForm;