"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  ChevronDown,
  ArrowUpDown,
  AlertTriangle,
  RefreshCw,
  ClipboardCheck,
  TrendingUp,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  ChevronRight,
  Home,
  ListChecks,
} from "lucide-react";

interface Task {
  id: string;
  ticketId: string;
  project: string;
  sprint: string;
  priority: "P0 - BLOCKER" | "P1 - HIGH" | "P2 - MEDIUM" | "P3 - LOW";
  title: string;
  description: string;
  subtasksComplete: number;
  subtasksTotal: number;
  status: "In Progress" | "Pending Review" | "Blocked" | "Completed";
  dueDate: string;
  dueTime?: string;
  isUrgent?: boolean;
  avatars: string[];
  extraCount: number;
}

const tasks: Task[] = [
  {
    id: "1",
    ticketId: "DEV-1082",
    project: "Core Platform",
    sprint: "Sprint 42",
    priority: "P0 - BLOCKER",
    title: "Telemetry Ingestion Pipeline Buffer Optimization",
    description:
      "Mitigate kernel drop rates in Kafka buffer consumer during 80Gbps sustained peak loads across US-East-1 VPC clusters.",
    subtasksComplete: 3,
    subtasksTotal: 4,
    status: "In Progress",
    dueDate: "Due Today",
    dueTime: "5:00 PM",
    isUrgent: true,
    avatars: [
      "https://i.pravatar.cc/100?img=11",
      "https://i.pravatar.cc/100?img=12",
    ],
    extraCount: 2,
  },
  {
    id: "2",
    ticketId: "DEV-1079",
    project: "Security & Compliance",
    sprint: "Sprint 42",
    priority: "P1 - HIGH",
    title: "SOC-2 Evidence Collection for IAM Audit Gate",
    description:
      "Aggregate zero-trust policy snapshots and penetration test reports for external auditor review cycle.",
    subtasksComplete: 5,
    subtasksTotal: 6,
    status: "Pending Review",
    dueDate: "Due Tomorrow",
    dueTime: "12:00 PM",
    isUrgent: true,
    avatars: ["https://i.pravatar.cc/100?img=5"],
    extraCount: 1,
  },
  {
    id: "3",
    ticketId: "DEV-1075",
    project: "Fintech Core",
    sprint: "Sprint 41",
    priority: "P2 - MEDIUM",
    title: "Payment Gateway Retry Logic Refactor",
    description:
      "Implement exponential backoff with jitter for failed transaction retries across multi-region endpoints.",
    subtasksComplete: 2,
    subtasksTotal: 5,
    status: "In Progress",
    dueDate: "Due in 3 days",
    avatars: [
      "https://i.pravatar.cc/100?img=3",
      "https://i.pravatar.cc/100?img=4",
    ],
    extraCount: 0,
  },
  {
    id: "4",
    ticketId: "DEV-1071",
    project: "ML Infrastructure",
    sprint: "Sprint 42",
    priority: "P1 - HIGH",
    title: "LLM Inference Node Auto-Scaling Policy",
    description:
      "Configure HPA rules for GPU node pools based on queue depth and p99 latency thresholds.",
    subtasksComplete: 1,
    subtasksTotal: 4,
    status: "Blocked",
    dueDate: "Due in 5 days",
    avatars: ["https://i.pravatar.cc/100?img=8"],
    extraCount: 3,
  },
];

const priorityColors = {
  "P0 - BLOCKER": "bg-red-100 text-red-700 border-red-200",
  "P1 - HIGH": "bg-orange-100 text-orange-700 border-orange-200",
  "P2 - MEDIUM": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "P3 - LOW": "bg-gray-100 text-gray-700 border-gray-200",
};

const statusColors = {
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  "Pending Review": "bg-purple-50 text-purple-700 border-purple-200",
  Blocked: "bg-red-50 text-red-700 border-red-200",
  Completed: "bg-green-50 text-green-700 border-green-200",
};

const statusDotColors = {
  "In Progress": "bg-blue-500",
  "Pending Review": "bg-purple-500",
  Blocked: "bg-red-500",
  Completed: "bg-green-500",
};

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("Active Tasks");
  const [activeFilter, setActiveFilter] = useState("All Assigned");
  const [searchQuery, setSearchQuery] = useState("");
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());

  const toggleTask = (id: string) => {
    setCheckedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const tabs = ["Active Tasks", "Due This Week", "Completed"];
  const filters = [
    { label: "All Assigned", count: 8 },
    { label: "High Priority", count: 3 },
    { label: "In Review", count: 2 },
    { label: "Blocked", count: 1 },
  ];

  const urgentTasks = tasks.filter((t) => t.isUrgent);
  const otherTasks = tasks.filter((t) => !t.isUrgent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-3 animate-fade-in">
        <Home className="h-3.5 w-3.5" />
        <span>Workspace</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-gray-700 font-medium">My Assigned Tasks</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-8 animate-fade-in">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Assigned Tasks
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Sprint 42 Live
            </span>
          </div>
          <p className="text-sm text-gray-600 max-w-2xl">
            Review, triage, and execute 8 tasks assigned across 3 active
            initiatives and sprint cycles.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Tab Switcher */}
          <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-gray-100 text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 active:scale-95">
            <Filter className="h-4 w-4" />
            Filter
            <span className="rounded-full bg-gray-200 px-1.5 py-0.5 text-[10px] font-semibold text-gray-600">
              3
            </span>
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 active:scale-95">
            <Plus className="h-4 w-4" />
            New Task
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Overdue & Critical */}
        <div className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-red-200 animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Overdue & Critical
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 transition-transform duration-300 group-hover:scale-110">
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-red-600">2</span>
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
              Urgent
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Requires attention today
          </p>
        </div>

        {/* In Progress */}
        <div className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              In Progress
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 transition-transform duration-300 group-hover:scale-110">
              <RefreshCw className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">4</span>
            <span className="text-xs text-gray-500">Across 3 epics</span>
          </div>
          <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
            <ListChecks className="h-3 w-3 text-blue-500" />
            3 subtasks nearing completion
          </p>
        </div>

        {/* Pending Review */}
        <div className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-purple-200 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Pending Review
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 transition-transform duration-300 group-hover:scale-110">
              <ClipboardCheck className="h-4 w-4 text-purple-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">2</span>
            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
              Sign-Off
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
            <Clock className="h-3 w-3 text-purple-500" />
            Waiting on peer attestation
          </p>
        </div>

        {/* Sprint Velocity */}
        <div className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-green-200 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Sprint Velocity
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 transition-transform duration-300 group-hover:scale-110">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-green-600">88%</span>
            <span className="text-xs font-medium text-green-700">On Target</span>
          </div>
          <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-green-500" />
            6 closed this cycle
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-3 shadow-sm animate-fade-in" style={{ animationDelay: "0.25s" }}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-1">
            {filters.map((f) => (
              <button
                key={f.label}
                onClick={() => setActiveFilter(f.label)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                  activeFilter === f.label
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {f.label} ({f.count})
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Filter tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 py-2 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 active:scale-95">
              Group: Sprint
              <ChevronDown className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 active:scale-95">
              Sort: Urgency
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Urgent Section */}
      {urgentTasks.length > 0 && (
        <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
              <h2 className="text-lg font-semibold text-gray-900">
                Urgent / Due Today
              </h2>
              <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                {urgentTasks.length} Tasks
              </span>
            </div>
            <span className="text-xs text-gray-500">Deadlines within 12 hours</span>
          </div>

          <div className="space-y-3">
            {urgentTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                isChecked={checkedTasks.has(task.id)}
                onToggle={() => toggleTask(task.id)}
                animationDelay={`${0.35 + index * 0.05}s`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Other Tasks Section */}
      {otherTasks.length > 0 && (
        <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">
                Upcoming Tasks
              </h2>
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                {otherTasks.length} Tasks
              </span>
            </div>
            <span className="text-xs text-gray-500">Due within the sprint</span>
          </div>

          <div className="space-y-3">
            {otherTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                isChecked={checkedTasks.has(task.id)}
                onToggle={() => toggleTask(task.id)}
                animationDelay={`${0.55 + index * 0.05}s`}
              />
            ))}
          </div>
        </div>
      )}

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
          animation: fade-in 0.5s ease-out;
          animation-fill-mode: both;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}

/* ---------- Task Card Component ---------- */
interface TaskCardProps {
  task: Task;
  isChecked: boolean;
  onToggle: () => void;
  animationDelay: string;
}

function TaskCard({ task, isChecked, onToggle, animationDelay }: TaskCardProps) {
  const progress = (task.subtasksComplete / task.subtasksTotal) * 100;
  const isOverdue = task.dueDate === "Due Today";

  return (
    <div
      className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-blue-200 animate-slide-up"
      style={{ animationDelay }}
    >
      {/* Top Row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Checkbox */}
          <button
            onClick={onToggle}
            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
              isChecked
                ? "border-blue-600 bg-blue-600"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            {isChecked && (
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-blue-600">
                {task.ticketId}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-gray-500">{task.project}</span>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-gray-500">{task.sprint}</span>
              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                  priorityColors[task.priority]
                }`}
              >
                {task.priority}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
              {task.title}
            </h3>

            {/* Description */}
            <p className="mt-1 text-sm text-gray-600 leading-relaxed">
              {task.description}
            </p>
          </div>
        </div>

        {/* Status Dropdown & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <button
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:shadow-sm active:scale-95 ${
                statusColors[task.status]
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  statusDotColors[task.status]
                }`}
              />
              {task.status}
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
          <button className="rounded-lg p-1.5 text-gray-400 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-600">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Progress Bar */}
        <div className="flex items-center gap-3 flex-1">
          <div className="h-1.5 flex-1 max-w-xs overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                progress >= 75 ? "bg-green-500" : progress >= 50 ? "bg-blue-500" : "bg-amber-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {task.subtasksComplete} of {task.subtasksTotal} subtasks complete (
            {Math.round(progress)}%)
          </span>
        </div>

        {/* Due Date & Avatars */}
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium ${
              isOverdue ? "text-red-600" : "text-gray-500"
            }`}
          >
            <Clock className={`h-3.5 w-3.5 ${isOverdue ? "text-red-500" : ""}`} />
            {task.dueDate}
            {task.dueTime && `, ${task.dueTime}`}
          </span>
          <div className="flex -space-x-2">
            {task.avatars.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-7 w-7 rounded-full border-2 border-white object-cover transition-transform duration-200 hover:z-10 hover:scale-110"
              />
            ))}
            {task.extraCount > 0 && (
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-[10px] font-semibold text-gray-600">
                +{task.extraCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}