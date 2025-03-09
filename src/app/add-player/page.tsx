import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

const AddPlayer: React.FC = () => {
    return (
        <ProtectedRoute>
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6">
                    <h1 className="text-2xl text-white mb-4">Add Player</h1>
                </main>
            </div>
        </div>
        </ProtectedRoute>
    );
};

export default AddPlayer;