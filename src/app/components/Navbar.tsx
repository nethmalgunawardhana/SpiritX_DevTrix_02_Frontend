"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Img from "next/image";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-18 border-b border-zinc-800 flex px-6 justify-end">
      <div className="relative flex items-center space-x-4" ref={dropdownRef}>
        <Img 
          src="/Images/avatar.jpeg" 
          alt="User avatar" 
          className="rounded-full h-10 w-10"
          width={32}
          height={32}
        />
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="text-[1rem] font-medium">
            <div>Nethmal Gunewardana</div>
            <div className="text-[12px] text-gray-400">Current Rank: -</div>
          </div>
          <div className="w-4 h-4 flex-shrink-0">
            <ChevronDownIcon
              className="w-4 h-4 text-gray-200 transition-transform duration-200"
              style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </div>
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-md shadow-lg z-50">
            <ul className="py-2 text-sm text-gray-200">
              <li className="px-4 py-2 hover:bg-zinc-700 cursor-pointer">Profile</li>
              <li className="px-4 py-2 hover:bg-red-900 text-red-400 cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
