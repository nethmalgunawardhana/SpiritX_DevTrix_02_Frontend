"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    UserGroupIcon,
    TrophyIcon,
    SparklesIcon,
    CogIcon,
    QuestionMarkCircleIcon,
    PlusCircleIcon,
    PresentationChartBarIcon
} from '@heroicons/react/24/outline';
import Img from 'next/image';

interface MenuItemProps {
  url?: string;
  icon?: React.ReactNode;
  label: string;
  notification?: number;
  isActive?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ url, icon, label, notification, isActive }) => {
  return (
    <Link href={url || '#'} className={`flex text-[0.9rem] items-center justify-between px-3 py-2 rounded-md ${isActive ? 'bg-zinc-800 text-white' : 'text-gray-300 hover:bg-zinc-900'}`}>
          <div className="flex items-center space-x-3">
            {icon}
            <span>{label}</span>
          </div>
          {notification && (
            <span className="h-5 w-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
              {notification}
            </span>
          )}
    </Link>
  );
};

export default function Sidebar() {
  const currentPath = usePathname();

  return (
    <div className="w-64 border-r border-zinc-800 flex flex-col">
      <div className="p-4 flex items-center space-x-2 border-b border-zinc-800">
        <div className="h-12 w-12 rounded-full flex items-center justify-center gap-2">
          <Img 
            src="/spirit11-logo.png" 
            alt="Spirit11" 
            width={32}
            height={32}
          />
        </div>
        <span className="font-medium text-[1.1rem]">Spirit11 Fantasy</span>
      </div>

      <nav className="pt-4 px-2 flex-1">
        <div className="space-y-1 py-2">
          <MenuItem label="Dashboard" isActive={currentPath === '/dashboard'} icon={<PresentationChartBarIcon className='h-5 w-5' />} notification={undefined} url='/dashboard'/>
          <MenuItem icon={<UserGroupIcon className="h-5 w-5" />} label="Players" isActive={currentPath === '/players'} notification={undefined} url='/players'/>
          <MenuItem icon={<PlusCircleIcon className="h-5 w-5" />} label="Create Team" isActive={currentPath === '/create-team'} notification={undefined} url='/create-team'/>
          <MenuItem icon={<TrophyIcon className="h-5 w-5" />} label="Leaderboard" isActive={currentPath === '/leaderboard'} notification={undefined} url='/leaderboard'/>
          <MenuItem icon={<SparklesIcon className="h-5 w-5" />} label="Spiriter AI Chat" isActive={currentPath === '/spiriter-ai-chat'} notification={undefined} url='/spiriter-ai-chat'/>
        </div>

        <hr className="my-4 border-t border-zinc-800" />

        <div className="pt-2 space-y-1">
          <MenuItem icon={<CogIcon className="h-5 w-5" />} label="Settings" isActive={currentPath === '/settings'} url='/settings'/>
          <MenuItem icon={<QuestionMarkCircleIcon className="h-5 w-5" />} label="Help Center" isActive={currentPath === '/help-center'} url='/help-center'/>
        </div>

        <button className="ml-2 w-56 text-md font-semibold text-zinc-900 bg-zinc-200 rounded-md px-4 mt-10 py-2">Available Balance <br/>Rs. 9,000,000</button>
      </nav>
    </div>
  );
}