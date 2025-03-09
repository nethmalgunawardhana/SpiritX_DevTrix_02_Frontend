"use client";

import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ChatBot from '../components/ChatBot';
import { Shell } from 'lucide-react';

const ChatPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="flex-1 p-6">
            <div className="flex">
                <Shell size={48} className="text-teal-400 mr-2" />
                <h1 className="text-2xl font-semibold text-teal-400 mb-4">Spiriter AI</h1>
            </div>
        </main>
        <div className="max-w-5xl mx-auto p-6 text-white">
            <ChatBot />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;