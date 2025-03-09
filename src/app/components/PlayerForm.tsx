"use client";

import React, { useState } from 'react';

const PlayerForm: React.FC = () => {
  const [tournament, setTournament] = useState('');
  const [activeTab, setActiveTab] = useState<'bulk' | 'single'>('bulk');
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [category, setCategory] = useState('');
  const [totalRuns, setTotalRuns] = useState(0);
//   const [ballsFaced, setBallsFaced] = useState(0);
//   const [inningsPlayed, setInningsPlayed] = useState(0);
//   const [wickets, setWickets] = useState(0);
//   const [oversBowled, setOversBowled] = useState(0);
//   const [runsConceded, setRunsConceded] = useState(0);
//   const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleCsvUpload = () => {
    // Handle CSV upload logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white rounded-lg shadow-md">
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
          <label className="block text-sm font-medium mb-1">Upload CSV File</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleCsvUpload}
            className="w-full p-2 border border-gray-700 rounded bg-zinc-800 text-white"
          />
          <div className="flex justify-end mt-4">
            <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
              Upload
            </button>
          </div>
        </div>
      )}

      {activeTab === 'single' && (
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <h3 className="text-xl font-semibold mb-4">Single Player Creation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded bg-zinc-800 text-white"
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
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded bg-zinc-800 text-white"
              >
                <option value="">Select a category</option>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All-Rounder">All-Rounder</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Runs</label>
              <input
                type="number"
                min="0"
                value={totalRuns}
                onChange={(e) => setTotalRuns(Number(e.target.value))}
                className="w-full p-2 border border-gray-700 rounded bg-zinc-800 text-white"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
              Add Player
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PlayerForm;
