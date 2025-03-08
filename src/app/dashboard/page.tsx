import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Dashboard: React.FC = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6 bg-gray-800">
                    <h1 className="text-2xl text-white">Dashboard</h1>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;