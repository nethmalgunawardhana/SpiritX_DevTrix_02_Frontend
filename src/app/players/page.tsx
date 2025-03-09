import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TableView from '../components/TableView';
import ProtectedRoute from '../components/ProtectedRoute';

const Dashboard: React.FC = () => {
    return (
        <ProtectedRoute availableFor={['team_owner','admin']} >
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6">
                    <h1 className="text-2xl text-white mb-4">Player List</h1>
                    <TableView />
                </main>
            </div>
        </div>
        </ProtectedRoute>
    );
};

export default Dashboard;