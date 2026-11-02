"use client";

import React from "react";
import {
  Folder,
  CheckCircle2,
  AlertTriangle,
  Settings,
  Filter,
  Plus,
  Star,
  ListFilter,
  LayoutGrid,
  List,
  MoreHorizontal,
  ExternalLink,
  Calendar,
  Lock,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

/* ---------- Stat Card ---------- */
interface StatCardProps {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ReactNode;
  iconBg: string;
  valueColor?: string;
  dotColor?: string;
}

function StatCard({ label, value, sub, icon, iconBg, valueColor = "text-gray-900", dotColor }: StatCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className={`mt-1 text-3xl font-bold ${valueColor}`}>{value}</p>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
          {dotColor && <span className={`h-2 w-2 rounded-full ${dotColor}`} />}
          {sub}
        </div>
      </div>
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
        {icon}
      </div>
    </div>
  );
}

/* ---------- Project Card ---------- */
interface ProjectCardProps {
  status: string;
  statusColor: string;
  statusIcon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
  tags: { label: string; variant?: "green" | "gray" }[];
  progressLabel: string;
  progress: number;
  progressColor: string;
  avatars: string[];
  extraCount: number;
  footerRight: React.ReactNode;
}

function ProjectCard({
  status,
  statusColor,
  statusIcon,
  badge,
  title,
  description,
  tags,
  progressLabel,
  progress,
  progressColor,
  avatars,
  extraCount,
  footerRight,
}: ProjectCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${statusColor}`}>
            {statusIcon}
            {status}
          </span>
          <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
            {badge}
          </span>
        </div>
        <button className="rounded-lg p-1 text-gray-400 hover:bg-gray-100">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Title */}
      <div className="mt-4 flex items-center gap-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <ExternalLink className="h-4 w-4 text-gray-400" />
      </div>
      <p className="mt-1 text-sm text-gray-600 leading-relaxed">{description}</p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t.label}
            className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium ${
              t.variant === "green"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-gray-200 bg-gray-50 text-gray-600"
            }`}
          >
            {t.variant === "green" && <Lock className="h-3 w-3" />}
            {t.label}
          </span>
        ))}
      </div>

      {/* Progress */}
      <div className="mt-6 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-gray-700">{progressLabel}</span>
          <span className={`font-semibold ${progressColor}`}>{progress}% Complete</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full ${progress === 92 ? "bg-green-600" : "bg-blue-600"}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex -space-x-2">
          {avatars.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="h-7 w-7 rounded-full border-2 border-white object-cover"
            />
          ))}
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-[10px] font-semibold text-gray-600">
            +{extraCount}
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          {footerRight}
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
export default function ProjectsPage() {
  const tabs = [
    { label: "All Projects", count: 14, active: true },
    { label: "Active", count: 9 },
    { label: "In Review", count: 3 },
    { label: "Archived", count: 2 },
    { label: "Favorites", icon: <Star className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="border-b border-gray-200 bg-white px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Live Synced
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Real-time multi-agent workflows, infrastructure migrations, and workspace roadmaps.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
              <Filter className="h-4 w-4" />
              Filter Metrics
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition">
              <Plus className="h-4 w-4" />
              New Project
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Stats Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Projects"
            value={14}
            sub="+2 this quarter"
            icon={<Folder className="h-5 w-5 text-blue-600" />}
            iconBg="bg-blue-50"
            valueColor="text-gray-900"
          />
          <StatCard
            label="On Track"
            value={11}
            sub="78.5% nominal"
            icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
            iconBg="bg-green-50"
            valueColor="text-green-700"
            dotColor="bg-green-500"
          />
          <StatCard
            label="At Risk"
            value={2}
            sub="Telemetry blocked"
            icon={<AlertTriangle className="h-5 w-5 text-red-600" />}
            iconBg="bg-red-50"
            valueColor="text-red-600"
            dotColor="bg-red-500"
          />
          <StatCard
            label="Pending Review"
            value={1}
            sub="Audit gate 2"
            icon={<Settings className="h-5 w-5 text-purple-600" />}
            iconBg="bg-purple-50"
            valueColor="text-purple-700"
            dotColor="bg-purple-400"
          />
        </div>

        {/* Filter Bar */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1">
            {tabs.map((t) => (
              <button
                key={t.label}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  t.active
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {t.icon}
                {t.label}
                {t.count !== undefined && (
                  <span className={t.active ? "text-blue-100" : "text-gray-400"}>
                    {t.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <ListFilter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Filter by lead or tag..."
                className="h-9 w-56 rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="flex items-center rounded-lg border border-gray-200 bg-white p-1">
              <button className="rounded-md bg-blue-50 p-1.5 text-blue-600">
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button className="rounded-md p-1.5 text-gray-400 hover:text-gray-600">
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ProjectCard
            status="In Progress"
            statusColor="bg-purple-50 text-purple-700"
            statusIcon={<Sparkles className="h-3 w-3" />}
            badge="Sprint 42"
            title="AI Workflow Copilot v2.4"
            description="Autonomous context engine integration with dynamic prompt caching, latency quantization, and automated multi-tenant orchestrators."
            tags={[
              { label: "LLM Inference" },
              { label: "PyTorch" },
              { label: "gRPC Engine" },
            ]}
            progressLabel="Deployment Velocity"
            progress={78}
            progressColor="text-blue-600"
            avatars={[
              "https://i.pravatar.cc/100?img=3",
              "https://i.pravatar.cc/100?img=4",
              "https://i.pravatar.cc/100?img=5",
            ]}
            extraCount={2}
            footerRight={
              <>
                <Calendar className="h-3.5 w-3.5" />
                Due Nov 18
              </>
            }
          />

          <ProjectCard
            status="Review"
            statusColor="bg-blue-50 text-blue-700"
            statusIcon={<ShieldCheck className="h-3 w-3" />}
            badge="Audit Gate 3"
            title="SOC-2 Compliance & Cloud Audit"
            description="Continuous evidence collection across AWS KMS, zero-trust IAM governance policies, and external penetration validation reports."
            tags={[
              { label: "Zero-Trust", variant: "green" },
              { label: "AWS IAM" },
              { label: "Auditor Pass" },
            ]}
            progressLabel="Control Verification"
            progress={92}
            progressColor="text-green-700"
            avatars={["https://i.pravatar.cc/100?img=8"]}
            extraCount={1}
            footerRight={
              <>
                <Settings className="h-3.5 w-3.5" />
                Audit Next Week
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}