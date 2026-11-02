"use client";

import React, { useState } from "react";
import {
  Search,
  Shield,
  UserPlus,
  Mail,
  Clock,
  CheckCircle2,
  MoreVertical,
  ChevronDown,
  Download,
  Key,
  Smartphone,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Member" | "Guest";
  avatar: string;
  lastActive: string;
  verified?: boolean;
}

interface PendingInvite {
  id: string;
  email: string;
  role: "Member" | "Admin";
  invitedBy: string;
  invitedDaysAgo: number;
  hoursAgo?: number;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Elena Rostova",
    email: "elena.rostova@acme.ai",
    role: "Owner",
    avatar: "https://i.pravatar.cc/100?img=1",
    lastActive: "Just now",
    verified: true,
  },
  {
    id: "2",
    name: "Marcus Vance",
    email: "marcus.vance@acme.ai",
    role: "Admin",
    avatar: "https://i.pravatar.cc/100?img=3",
    lastActive: "14m ago",
  },
  {
    id: "3",
    name: "Aisha Patel",
    email: "aisha.patel@acme.ai",
    role: "Admin",
    avatar: "https://i.pravatar.cc/100?img=5",
    lastActive: "2h ago",
  },
  {
    id: "4",
    name: "Kaito Tanaka",
    email: "kaito.tanaka@acme.ai",
    role: "Member",
    avatar: "https://i.pravatar.cc/100?img=8",

    lastActive: "Yesterday",
  },
  {
    id: "5",
    name: "Sarah Chen",
    email: "sarah.chen@acme.ai",
    role: "Member",
    avatar: "https://i.pravatar.cc/100?img=9",

    lastActive: "3h ago",
  },
  {
    id: "6",
    name: "Devon Lane",
    email: "devon.lane@acme.ai",
    role: "Member",
    avatar: "https://i.pravatar.cc/100?img=10",

    lastActive: "1d ago",
  },
];

const pendingInvites: PendingInvite[] = [
  {
    id: "1",
    email: "devon.lane@acme.com",
    role: "Member",
    invitedBy: "Elena",
    invitedDaysAgo: 2,
  },
  {
    id: "2",
    email: "priya.sharma@acme.com",
    role: "Admin",
    invitedBy: "Marcus",
    invitedDaysAgo: 0,
    hoursAgo: 5,
  },
];

const roleColors = {
  Owner: "bg-blue-50 text-blue-700 border-blue-200",
  Admin: "bg-purple-50 text-purple-700 border-purple-200",
  Member: "bg-gray-100 text-gray-700 border-gray-200",
  Guest: "bg-green-50 text-green-700 border-green-200",
};

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedStatus, setSelectedStatus] = useState("Active");

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "All Roles" || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                Identity & Access Management
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Okta Directory Synced
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Members & Access
            </h1>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl">
              Manage active teammates, pending invitations, and RBAC permissions across your workspace.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md active:scale-95">
              <Shield className="h-4 w-4" />
              Configure RBAC
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 active:scale-95">
              <UserPlus className="h-4 w-4" />
              Invite Teammates
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Active Seats",
            value: "8 / 10",
            subtext: "used",
            footer: "2 seats available",
            footerIcon: CheckCircle2,
            footerColor: "text-green-600",
            icon: UserCheck,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
          },
          {
            label: "Pending Invites",
            value: "2",
            subtext: "",
            footer: "Expires in 4 days",
            footerIcon: Clock,
            footerColor: "text-purple-600",
            icon: Mail,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600",
          },
          {
            label: "SSO Provisioned",
            value: "100%",
            subtext: "",
            footer: "SAML 2.0 Enforced",
            footerIcon: ShieldCheck,
            footerColor: "text-green-600",
            icon: Shield,
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
          },
          {
            label: "Guest Collaborators",
            value: "3",
            subtext: "",
            footer: "Time-bound access",
            footerIcon: AlertCircle,
            footerColor: "text-gray-500",
            icon: UserCheck,
            iconBg: "bg-gray-100",
            iconColor: "text-gray-600",
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          const FooterIcon = stat.footerIcon;
          return (
            <div
              key={stat.label}
              className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </span>
                    {stat.subtext && (
                      <span className="text-sm text-gray-500">{stat.subtext}</span>
                    )}
                  </div>
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconBg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs">
                <FooterIcon className={`h-3.5 w-3.5 ${stat.footerColor}`} />
                <span className={`font-medium ${stat.footerColor}`}>
                  {stat.footer}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm animate-fade-in">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, role or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 py-2.5 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            >
              <option>All Roles</option>
              <option>Owner</option>
              <option>Admin</option>
              <option>Member</option>
              <option>Guest</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            >
              <option>Status: Active</option>
              <option>Status: Inactive</option>
              <option>Status: Pending</option>
            </select>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 active:scale-95">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Roster - Takes 2/3 width */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden animate-fade-in">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">Active Roster</h2>
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                {filteredMembers.length} Members
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Realtime Sync
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredMembers.map((member, index) => (
                  <tr
                    key={member.id}
                    className="group transition-colors duration-200 hover:bg-gray-50 animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm transition-transform duration-200 group-hover:scale-105"
                          />
                          {member.verified && (
                            <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center ring-2 ring-white">
                              <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-medium text-gray-900">
                              {member.name}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
                          roleColors[member.role]
                        }`}
                      >
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{member.lastActive}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="rounded-lg p-1.5 text-gray-400 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Invites - Takes 1/3 width */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm animate-fade-in">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-900">Pending Invites</h2>
              <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700">
                {pendingInvites.length}
              </span>
            </div>
            <button className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Resend All
            </button>
          </div>
          <div className="p-6 space-y-4">
            {pendingInvites.map((invite, index) => (
              <div
                key={invite.id}
                className="group rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-all duration-300 hover:border-purple-200 hover:shadow-md hover:bg-white animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {invite.email}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                          roleColors[invite.role]
                        }`}
                      >
                        {invite.role}
                      </span>
                      <span className="text-xs text-gray-500">
                        Invited {invite.invitedDaysAgo === 0 ? `${invite.hoursAgo} hours` : `${invite.invitedDaysAgo} days`} ago by {invite.invitedBy}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition-all duration-200 hover:bg-blue-100 active:scale-95">
                    <RefreshCw className="h-3.5 w-3.5" />
                    Resend Invite
                  </button>
                  <button className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition-all duration-200 hover:bg-red-100 active:scale-95">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-xl">
            <p className="text-xs text-gray-500 leading-relaxed">
              Unaccepted invitations automatically expire after 7 days. Seats remain reserved until revoked.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}