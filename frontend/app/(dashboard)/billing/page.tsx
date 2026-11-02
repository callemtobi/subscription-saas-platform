"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Filter,
  Download,
  Calendar,
  CreditCard,
  Cpu,
  Cloud,
  TrendingUp,
  ArrowRight,
  Search,
  CheckCircle2,
  Clock,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Invoice {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  amount: string;
  status: "Paid" | "Pending" | "Overdue";
}

interface ChartDataPoint {
  date: string;
  apiCalls: number;
  computeNodes: number;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const invoices: Invoice[] = [
  {
    id: "INV-2024-0098",
    date: "Oct 01, 2024",
    title: "Enterprise Growth Tier - Annual",
    subtitle: "Base 60 seats • Unlimited Telemetry",
    amount: "$4,500.00",
    status: "Paid",
  },
  {
    id: "INV-2024-0084",
    date: "Sep 15, 2024",
    title: "GPU Add-on Cluster (8x H100)",
    subtitle: "On-demand burst compute batch",
    amount: "$850.00",
    status: "Paid",
  },
  {
    id: "INV-2024-0072",
    date: "Sep 01, 2024",
    title: "Dedicated Vault Add-on",
    subtitle: "Private HSM Key Provisioning",
    amount: "$320.00",
    status: "Paid",
  },
  {
    id: "INV-2024-0059",
    date: "Aug 01, 2024",
    title: "Custom Telemetry Egress Overage",
    subtitle: "18.4TB cross-region sync",
    amount: "$412.80",
    status: "Paid",
  },
];

const chartData: ChartDataPoint[] = [
  { date: "Oct 01", apiCalls: 25000, computeNodes: 12000 },
  { date: "Oct 04", apiCalls: 32000, computeNodes: 15000 },
  { date: "Oct 07", apiCalls: 41000, computeNodes: 22000 },
  { date: "Oct 10", apiCalls: 38000, computeNodes: 20000 },
  { date: "Oct 14", apiCalls: 42000, computeNodes: 24000 },
  { date: "Oct 17", apiCalls: 45000, computeNodes: 28000 },
  { date: "Oct 21", apiCalls: 52000, computeNodes: 35000 },
  { date: "Oct 24", apiCalls: 68410, computeNodes: 58000 },
  { date: "Oct 27", apiCalls: 72000, computeNodes: 62000 },
  { date: "Oct 28", apiCalls: 65000, computeNodes: 55000 },
  { date: "Oct 30", apiCalls: 58000, computeNodes: 48000 },
  { date: "Oct 31", apiCalls: 70000, computeNodes: 60000 },
];

/* ------------------------------------------------------------------ */
/*  Stat Card                                                          */
/* ------------------------------------------------------------------ */
interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: React.ReactNode;
  iconBg: string;
  progress: number;
  progressColor: string;
  leftLabel: string;
  rightLabel: string;
  rightLabelColor?: string;
}

function StatCard({
  label,
  value,
  subValue,
  icon,
  iconBg,
  progress,
  progressColor,
  leftLabel,
  rightLabel,
  rightLabelColor = "text-blue-600",
}: StatCardProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedProgress(progress), 300);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-bold text-gray-900">
              {value}
            </span>
            {subValue && (
              <span className="text-sm text-gray-500">{subValue}</span>
            )}
          </div>
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} transition-transform duration-300 group-hover:scale-110`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-gray-600">{leftLabel}</span>
          <span className={`font-medium ${rightLabelColor}`}>{rightLabel}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${progressColor}`}
            style={{ width: `${animatedProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Chart Component (SVG)                                              */
/* ------------------------------------------------------------------ */
function BurndownChart({ timeRange }: { timeRange: string }) {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [animated, setAnimated] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const width = 900;
  const height = 300;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxApi = 80000;
  const maxCompute = 70000;

  const xScale = (i: number) =>
    padding.left + (i / (chartData.length - 1)) * chartWidth;
  const yScaleApi = (v: number) =>
    padding.top + chartHeight - (v / maxApi) * chartHeight;
  const yScaleCompute = (v: number) =>
    padding.top + chartHeight - (v / maxCompute) * chartHeight;

  const apiPath = chartData
    .map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScaleApi(d.apiCalls)}`)
    .join(" ");
  const computePath = chartData
    .map(
      (d, i) =>
        `${i === 0 ? "M" : "L"} ${xScale(i)} ${yScaleCompute(d.computeNodes)}`
    )
    .join(" ");

  const apiAreaPath = `${apiPath} L ${xScale(chartData.length - 1)} ${
    padding.top + chartHeight
  } L ${xScale(0)} ${padding.top + chartHeight} Z`;
  const computeAreaPath = `${computePath} L ${xScale(chartData.length - 1)} ${
    padding.top + chartHeight
  } L ${xScale(0)} ${padding.top + chartHeight} Z`;

  const yTicks = [0, 20000, 40000, 60000, 80000];

  return (
    <div className="relative w-full overflow-x-auto">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full min-w-[600px] h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="apiGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="computeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={padding.left}
              y1={yScaleApi(tick)}
              x2={width - padding.right}
              y2={yScaleApi(tick)}
              stroke="#f1f5f9"
              strokeWidth="1"
            />
            <text
              x={padding.left - 10}
              y={yScaleApi(tick) + 4}
              textAnchor="end"
              className="text-xs"
              fill="#94a3b8"
              fontSize="11"
            >
              {(tick / 1000).toFixed(0)}k ops
            </text>
          </g>
        ))}

        {/* X axis labels */}
        {chartData.map((d, i) =>
          i % 2 === 0 || i === chartData.length - 1 ? (
            <text
              key={i}
              x={xScale(i)}
              y={height - 10}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="11"
            >
              {d.date}
            </text>
          ) : null
        )}

        {/* Area fills */}
        <path
          d={computeAreaPath}
          fill="url(#computeGradient)"
          className={`transition-opacity duration-1000 ${
            animated ? "opacity-100" : "opacity-0"
          }`}
        />
        <path
          d={apiAreaPath}
          fill="url(#apiGradient)"
          className={`transition-opacity duration-1000 ${
            animated ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Lines */}
        <path
          d={computePath}
          fill="none"
          stroke="#6366f1"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-1000"
          style={{
            strokeDasharray: animated ? "none" : "2000",
            strokeDashoffset: animated ? 0 : 2000,
          }}
        />
        <path
          d={apiPath}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-1000"
          style={{
            strokeDasharray: animated ? "none" : "2000",
            strokeDashoffset: animated ? 0 : 2000,
          }}
        />

        {/* Hover points */}
        {chartData.map((d, i) => (
          <g key={i}>
            <circle
              cx={xScale(i)}
              cy={yScaleApi(d.apiCalls)}
              r="12"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
            <circle
              cx={xScale(i)}
              cy={yScaleCompute(d.computeNodes)}
              r="12"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
            />
            {hoveredPoint === i && (
              <>
                <circle
                  cx={xScale(i)}
                  cy={yScaleApi(d.apiCalls)}
                  r="5"
                  fill="#3b82f6"
                  stroke="white"
                  strokeWidth="2"
                />
                <circle
                  cx={xScale(i)}
                  cy={yScaleCompute(d.computeNodes)}
                  r="5"
                  fill="#6366f1"
                  stroke="white"
                  strokeWidth="2"
                />
              </>
            )}
          </g>
        ))}
      </svg>

      {/* Tooltip */}
      {hoveredPoint !== null && (
        <div
          className="absolute pointer-events-none bg-white rounded-lg shadow-lg border border-gray-200 p-3 text-sm z-10 animate-fade-in"
          style={{
            left: `${(hoveredPoint / (chartData.length - 1)) * 100}%`,
            top: "20%",
            transform: "translateX(-50%)",
          }}
        >
          <p className="text-xs text-gray-500 mb-1">
            {chartData[hoveredPoint].date}, 2024
          </p>
          <p className="font-bold text-gray-900">
            {chartData[hoveredPoint].apiCalls.toLocaleString()} API Calls
          </p>
          <p className="text-indigo-600 font-medium">
            {chartData[hoveredPoint].computeNodes.toLocaleString()} Compute Nodes
            Live
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function UsageBillingPage() {
  const [timeRange, setTimeRange] = useState("30 Days");
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div
        className={`mb-8 transition-all duration-700 ${
          pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Usage & Billing History
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Live Sync
              </span>
            </div>
            <p className="text-sm text-gray-600 max-w-2xl">
              Real-time telemetry on compute consumption, seat provisioning, and
              downloadable tax invoices.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md active:scale-95">
              <Calendar className="h-4 w-4" />
              Billing Cycle: <span className="font-semibold">Oct 1 – Oct 31, 2024</span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md active:scale-95">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Current Cycle Spend"
          value="$3,840.50"
          subValue="/ $5,000 threshold"
          icon={<CreditCard className="h-5 w-5 text-blue-600" />}
          iconBg="bg-blue-50"
          progress={76.8}
          progressColor="bg-blue-600"
          leftLabel="76.8% of cap utilized"
          rightLabel="12 days left in cycle"
          rightLabelColor="text-blue-600"
        />
        <StatCard
          label="AI Compute Ingestion"
          value="42k"
          subValue="/ 50k tokens/min"
          icon={<Cpu className="h-5 w-5 text-indigo-600" />}
          iconBg="bg-indigo-50"
          progress={84}
          progressColor="bg-indigo-500"
          leftLabel="84% capacity gauge"
          rightLabel="Optimal Load"
          rightLabelColor="text-indigo-600"
        />
        <StatCard
          label="Storage & Vault"
          value="42.4 GB"
          subValue="/ 100 GB"
          icon={<Cloud className="h-5 w-5 text-green-600" />}
          iconBg="bg-green-50"
          progress={42.4}
          progressColor="bg-green-600"
          leftLabel="42.4% NVMe tier"
          rightLabel="57.6 GB headroom"
          rightLabelColor="text-green-600"
        />
      </div>

      {/* Chart Section */}
      <div
        className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm mb-8 transition-all duration-700 delay-200 ${
          pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Daily Compute & API Burndown
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Aggregate execution units, inference cycles, and gateway
              transactions.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                <span className="text-gray-600">Active API Calls</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                <span className="text-gray-600">Compute Clusters</span>
              </span>
            </div>
            <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 p-1">
              {["7 Days", "30 Days", "90 Days"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    timeRange === range
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        <BurndownChart timeRange={timeRange} />
      </div>

      {/* Invoice Table */}
      <div
        className={`rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-all duration-700 delay-300 ${
          pageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Invoice & Billing History
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Download previous PDF invoices, receipt statements, and credit
                note reconciliations.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 active:scale-95 self-start">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr className="border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((invoice, index) => (
                <tr
                  key={invoice.id}
                  className="group transition-colors duration-200 hover:bg-blue-50/30 animate-slide-up"
                  style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">
                      {invoice.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{invoice.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {invoice.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {invoice.subtitle}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-gray-900">
                      {invoice.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded-lg p-2 text-blue-600 transition-all duration-200 hover:bg-blue-50 active:scale-95">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-gray-50/30">
          <p className="text-xs text-gray-500">
            Showing recent 4 billing events
          </p>
          <button className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors group">
            View All Historical Archives
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
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
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}