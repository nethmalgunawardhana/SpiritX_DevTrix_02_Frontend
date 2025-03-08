import React from 'react';
import { BellIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Img from 'next/image';

export default function Navbar() {
  return (
    <header className="h-16 border-b border-gray-800 flex px-6">

      <div className="flex items-center space-x-4">
        <button className="text-gray-400">
          <BellIcon className="h-5 w-5" />
        </button>
        <div className="flex items-center space-x-2">
          <Img 
            src="/avatar.jpg" 
            alt="User avatar" 
            className="rounded-full"
            width={32}
            height={32}
          />
          <div className="text-sm">
            <div>Meelk Jagger</div>
            <div className="text-xs text-gray-400">Admin User</div>
          </div>
          <ChevronDownIcon className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
}