"use client";

import Link from "next/link";
import {
  Search,
  Bell,
  MessageSquare,
  LayoutGrid,
} from "lucide-react";

export default function Navbar() {

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
      {/* Left: Logo + Search */}
      <div className="flex items-center gap-4 lg:gap-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600">
            <LayoutGrid className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">OmniWorkspace</span>
        </div>

        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects, vaults..."
            className="h-9 w-120 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-16 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-gray-300 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 lg:gap-3">
        <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition">
          <Bell className="h-5 w-5" />
        </button>
        <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition">
          <MessageSquare className="h-5 w-5" />
        </button>
        <div className="mx-1 h-6 w-px bg-gray-200 hidden lg:block" />
        <button className="hidden sm:flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition">
          <span className="text-lg leading-none">+</span>
          Invite Member
        </button>
        <div className="ml-2 h-9 w-9 overflow-hidden rounded-full border-2 border-green-400">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}