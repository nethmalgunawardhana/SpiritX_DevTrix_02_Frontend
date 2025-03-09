import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TableView from '../components/TableView';

const Dashboard: React.FC = () => {
    return (
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
    );
};

export default Dashboard;