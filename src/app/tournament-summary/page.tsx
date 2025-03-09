import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const TournamentSummary: React.FC = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6">
                    <h1 className="text-2xl text-white mb-4">Tournament Summary</h1>
                </main>
            </div>
        </div>
    );
};

export default TournamentSummary;