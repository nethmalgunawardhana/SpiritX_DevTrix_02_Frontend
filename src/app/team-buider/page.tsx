"use client";
import type { NextPage } from 'next';
import Head from 'next/head';
import TeamBuilder from '../components/Teambuilder';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Teampage: NextPage = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 p-6 overflow-auto">
          <TeamBuilder />
        </main>
      </div>
    </div>
  );
};

export default Teampage;