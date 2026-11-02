"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShieldCheck,
  Building2,
  BookOpen,
  HelpCircle,
  ChevronDown,
  Menu,
  X,
  FolderKanban,
  CheckSquare,
  Users,
  CreditCard,
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" />, href: "/dashboard" },
  { label: "Projects", icon: <FolderKanban className="h-4 w-4" />, href: "/projects" },
  { label: "Tasks", icon: <CheckSquare className="h-4 w-4" />, href: "/tasks" },
  { label: "Team", icon: <Users className="h-4 w-4" />, href: "/team" },
  // { label: "Approvals & Audit", icon: <ShieldCheck className="h-4 w-4" />, href: "/approvals-and-audit" },
  { label: "Billing", icon: <CreditCard className="h-4 w-4" />, href: "/subscription-plan" },
  // { label: "Enterprise Plan", icon: <Building2 className="h-4 w-4" />, href: "/enterprise-plan" },
];

const bottomItems: NavItem[] = [
  { label: "Documentation", icon: <BookOpen className="h-4 w-4" />, href: "/documentation" },
  { label: "Support", icon: <HelpCircle className="h-4 w-4" />, href: "/support" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-25 rounded-lg bg-white p-2 shadow-md lg:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-15 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-20 h-full w-64 transform border-r border-gray-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Org Selector */}
        <div className="flex items-center gap-3 border-b border-gray-100 p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
            <Building2 className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">Acme Enterprise</p>
            <p className="truncate text-xs text-gray-500">Growth Tier • SOC-2</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>

        {/* Main Nav */}
        <nav className="flex-1 space-y-0.5 p-3 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                router.push(item.href);
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive(item.href)
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* Cluster Nodes Widget */}
        <div className="mx-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-700">Cluster Nodes</span>
            <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              99.98%
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-blue-200">
            <div className="h-full w-[66%] rounded-full bg-blue-600" />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-gray-500">16 / 24 vCPUs</span>
            <button className="font-medium text-blue-600 hover:underline">Inspect</button>
          </div>
        </div>

        {/* SOC-2 Card */}
        <div className="mx-3 mt-3 rounded-xl border border-blue-200 bg-blue-50/60 p-3">
          <p className="text-sm font-semibold text-gray-900">SOC-2 Type II Certified</p>
          <p className="mt-1 text-xs text-gray-600">
            Scale clusters with isolated enterprise tenancy.
          </p>
          <button className="mt-3 w-full rounded-lg border border-blue-200 bg-white py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition">
            Upgrade Tier
          </button>
        </div>

        {/* Bottom Nav */}
        <nav className="space-y-0.5 p-3">
          {bottomItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                router.push(item.href);
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}