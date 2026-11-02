"use client";

import React, { useState } from "react";
import {
  Flag,
  Edit3,
  Clock,
  TrendingUp,
  CheckCircle2,
  Plus,
  List,
  LayoutGrid,
  MoreHorizontal,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
type Status = "In Progress" | "Pending Review" | "Active" | "Planning" | "Completed";

interface Project {
  id: string;
  initials: string;
  initialsBg: string;
  name: string;
  category: string;
  leadInitials: string;
  leadName: string;
  leadBg: string;
  status: Status;
  progress: number;
  targetDate: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const projects: Project[] = [
  {
    id: "1",
    initials: "AI",
    initialsBg: "bg-blue-100 text-blue-700",
    name: "AI Workflow Copilot v2.4",
    category: "Core Platform • High Velocity",
    leadInitials: "ER",
    leadName: "Elena R.",
    leadBg: "bg-purple-100 text-purple-700",
    status: "In Progress",
    progress: 78,
    targetDate: "Nov 15, 2024",
  },
  {
    id: "2",
    initials: "S2",
    initialsBg: "bg-slate-100 text-slate-700",
    name: "SOC-2 Compliance & Cloud Audit",
    category: "Security & Legal • Final Review",
    leadInitials: "AP",
    leadName: "Aisha P.",
    leadBg: "bg-green-100 text-green-700",
    status: "Pending Review",
    progress: 92,
    targetDate: "Nov 22, 2024",
  },
  {
    id: "3",
    initials: "GP",
    initialsBg: "bg-slate-100 text-slate-700",
    name: "Global Payments Migration",
    category: "Fintech Core • Gateway Phase 2",
    leadInitials: "MV",
    leadName: "Marcus V.",
    leadBg: "bg-blue-100 text-blue-700",
    status: "Active",
    progress: 45,
    targetDate: "Dec 04, 2024",
  },
];

/* ------------------------------------------------------------------ */
/*  Status helpers                                                     */
/* ------------------------------------------------------------------ */
const statusStyles: Record<Status, string> = {
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  "Pending Review": "bg-purple-50 text-purple-700 border-purple-200",
  Active: "bg-slate-100 text-slate-700 border-slate-200",
  Planning: "bg-amber-50 text-amber-700 border-amber-200",
  Completed: "bg-green-50 text-green-700 border-green-200",
};

const statusDot: Record<Status, string> = {
  "In Progress": "bg-blue-500",
  "Pending Review": "bg-purple-500",
  Active: "bg-slate-400",
  Planning: "bg-amber-500",
  Completed: "bg-green-500",
};

const progressColor = (p: number) =>
  p >= 90 ? "bg-purple-600" : p >= 60 ? "bg-blue-600" : "bg-blue-500";

/* ------------------------------------------------------------------ */
/*  Stat Card                                                          */
/* ------------------------------------------------------------------ */
interface StatCardProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function StatCard({ label, icon, children }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        <span className="text-slate-400">{icon}</span>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "cards">("list");

  const tabs = [
    { label: "All", count: 14 },
    { label: "In Progress", count: 8 },
    { label: "Pending Review", count: 2 },
    { label: "Planning", count: 3 },
    { label: "Completed", count: 1 },
  ];

  return (
    <div className="min-h-screen bg-slate-50/80 p-4 sm:p-6 lg:p-8">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Q4 Enterprise Cycle
          </div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            All Projects
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Consolidated health, delivery milestones, and recent team velocity
            across all 14 enterprise initiatives.
          </p>
        </div>
        <button className="inline-flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition">
          <Plus className="h-4 w-4" />
          New Initiative
        </button>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────────── */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Active Initiatives */}
        <StatCard label="Active Initiatives" icon={<Flag className="h-4 w-4" />}>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">14</span>
            <span className="flex items-center gap-1 text-xs font-medium text-green-700">
              <TrendingUp className="h-3 w-3" />
              100% committed
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-md bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
              11 On Track
            </span>
            <span className="rounded-md bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
              2 At Risk
            </span>
            <span className="rounded-md bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700">
              1 Review
            </span>
          </div>
        </StatCard>

        {/* Delivery Velocity */}
        <StatCard label="Delivery Velocity" icon={<Edit3 className="h-4 w-4" />}>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">82%</span>
            <span className="text-xs text-slate-500">sprint throughput</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[82%] rounded-full bg-blue-600" />
          </div>
        </StatCard>

        {/* Team Bandwidth */}
        <StatCard label="Team Bandwidth" icon={<span className="h-2.5 w-2.5 rounded-full bg-green-500" />}>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">94.2%</span>
            <span className="text-xs text-slate-500">allocation</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
            <CheckCircle2 className="h-3.5 w-3.5 text-slate-400" />
            31 of 34 engineers assigned
          </div>
        </StatCard>

        {/* Next Deployment */}
        <StatCard label="Next Deployment" icon={<Clock className="h-4 w-4" />}>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">Nov 15</span>
            <span className="text-xs font-medium text-blue-600">in 5 days</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Release candidate: Copilot v2.4
          </p>
        </StatCard>
      </div>

      {/* ── Filter Bar ─────────────────────────────────────────── */}
      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1">
          {tabs.map((t) => (
            <button
              key={t.label}
              onClick={() => setActiveTab(t.label)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                activeTab === t.label
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {t.label}{" "}
              <span
                className={
                  activeTab === t.label ? "text-blue-500" : "text-slate-400"
                }
              >
                ({t.count})
              </span>
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
              viewMode === "list"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-500"
            }`}
          >
            <List className="h-3.5 w-3.5" />
            Compact List
          </button>
          <button
            onClick={() => setViewMode("cards")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
              viewMode === "cards"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-500"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Clean Cards
          </button>
        </div>
      </div>

      {/* ── Table (desktop) ────────────────────────────────────── */}
      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-xs font-medium uppercase tracking-wider text-slate-500">
              <th className="px-5 py-3 text-left">Initiative / Project</th>
              <th className="px-5 py-3 text-left">Lead</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Progress</th>
              <th className="px-5 py-3 text-left">Target Date</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition">
                {/* Initiative */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${p.initialsBg}`}
                    >
                      {p.initials}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900">{p.name}</p>
                      <p className="text-xs text-slate-500">{p.category}</p>
                    </div>
                  </div>
                </td>

                {/* Lead */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${p.leadBg}`}
                    >
                      {p.leadInitials}
                    </span>
                    <span className="font-medium text-slate-700">
                      {p.leadName}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[p.status]}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${statusDot[p.status]}`} />
                    {p.status}
                  </span>
                </td>

                {/* Progress */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${progressColor(p.progress)}`}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-600">
                      {p.progress}%
                    </span>
                  </div>
                </td>

                {/* Target Date */}
                <td className="px-5 py-4 text-sm text-slate-600">
                  {p.targetDate}
                </td>

                {/* Actions */}
                <td className="px-5 py-4 text-right">
                  <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Cards (mobile / tablet) ────────────────────────────── */}
      <div className="space-y-3 lg:hidden">
        {projects.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${p.initialsBg}`}
                >
                  {p.initials}
                </span>
                <div>
                  <p className="font-semibold text-slate-900">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.category}</p>
                </div>
              </div>
              <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Meta row */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ${p.leadBg}`}
                >
                  {p.leadInitials}
                </span>
                <span className="text-xs font-medium text-slate-700">
                  {p.leadName}
                </span>
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${statusStyles[p.status]}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${statusDot[p.status]}`} />
                {p.status}
              </span>
            </div>

            {/* Progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Progress</span>
                <span className="font-medium text-slate-700">{p.progress}%</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${progressColor(p.progress)}`}
                  style={{ width: `${p.progress}%` }}
                />
              </div>
            </div>

            {/* Target */}
            <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="h-3.5 w-3.5" />
              Target: {p.targetDate}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}