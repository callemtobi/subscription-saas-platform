"use client";

import React, { useState } from "react";
import {
  Check,
  X,
  ArrowUpRight,
  ArrowRight,
  Star,
  Settings,
  Server,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Users,
  CreditCard,
  Calendar,
  TrendingUp,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
type BillingCycle = "monthly" | "annual";

interface PlanFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

interface Plan {
  id: string;
  name: string;
  tagline: string;
  icon: React.ReactNode;
  iconBg: string;
  price: { monthly: string; annual: string };
  priceNote: string;
  subNote?: string;
  features: PlanFeature[];
  cta: { label: string; variant: "primary" | "secondary" | "disabled"; icon?: React.ReactNode };
  isCurrent?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const plans: Plan[] = [
  {
    id: "team",
    name: "Team",
    tagline: "For growing developer pods",
    icon: <Sparkles className="h-4 w-4" />,
    iconBg: "bg-slate-100 text-slate-600",
    price: { monthly: "$36", annual: "$29" },
    priceNote: "/ user / mo",
    subNote: "Billed annually ($348/user/yr)",
    features: [
      { text: "10 seats included in base subscription", included: true },
      { text: "Standard telemetry & trace history (14 days)", included: true },
      { text: "Shared GPU burst queue access", included: true },
      { text: "Community support & dev forum access", included: true },
      { text: "Dedicated SecOps escalation", included: false },
    ],
    cta: { label: "Downgrade to Team", variant: "secondary" },
  },
  {
    id: "enterprise",
    name: "Enterprise Growth",
    tagline: "Scale production workloads",
    icon: <Settings className="h-4 w-4" />,
    iconBg: "bg-blue-100 text-blue-600",
    price: { monthly: "$5,400", annual: "$4,500" },
    priceNote: "/ mo commitment",
    subNote: "Includes 50 enterprise seats + inference cluster",
    features: [
      { text: "50 full seats included with audit logging", included: true, highlight: true },
      { text: "Dedicated H100 inference cluster node", included: true, highlight: true },
      { text: "SOC-2 Type II attestation & HIPAA compliance", included: true, highlight: true },
      { text: "SAML 2.0 / Okta / Azure AD Single Sign-On (SSO)", included: true, highlight: true },
      { text: "24/7 dedicated SecOps manager (15-min SLA)", included: true, highlight: true },
    ],
    cta: { label: "Active On Organization", variant: "disabled", icon: <Check className="h-4 w-4" /> },
    isCurrent: true,
  },
  {
    id: "custom",
    name: "Custom Scale",
    tagline: "Mission-critical multi-region",
    icon: <Server className="h-4 w-4" />,
    iconBg: "bg-slate-100 text-slate-600",
    price: { monthly: "Custom", annual: "Custom" },
    priceNote: "",
    subNote: "Tailored annual master services agreement",
    features: [
      { text: "Unlimited seats across global business units", included: true, highlight: true },
      { text: "Custom on-premises or private VPC isolation", included: true },
      { text: "Guaranteed SLA 99.999% uptime guarantee", included: true, highlight: true },
      { text: "Tailored LLM fine-tuning & proprietary adapters", included: true },
      { text: "Custom invoicing with 60-day NET terms", included: true },
    ],
    cta: { label: "Contact Enterprise Sales", variant: "primary", icon: <ArrowRight className="h-4 w-4" /> },
  },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

function BillingToggle({
  cycle,
  onChange,
}: {
  cycle: BillingCycle;
  onChange: (c: BillingCycle) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-100 p-1">
      <button
        onClick={() => onChange("monthly")}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
          cycle === "monthly"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange("annual")}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
          cycle === "annual"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        Annual
        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
          Save 20%
        </span>
      </button>
    </div>
  );
}

function CurrentPlanCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50/60 via-white to-white p-6 sm:p-8">
      {/* Top badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          <Star className="h-3 w-3" fill="currentColor" />
          Enterprise Growth
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          Active Contract
        </span>
        <span className="text-xs text-slate-500">Contract #ACME-2024-EXP-91</span>
      </div>

      {/* Content grid */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto]">
        {/* Left */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Enterprise Growth Tier
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            High-throughput orchestration with dedicated inference nodes, verified
            zero-retention privacy, and 24/7 SecOps incident escalation.
          </p>

          {/* Info boxes */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <CreditCard className="h-3.5 w-3.5" />
                Monthly Compute Base
              </div>
              <p className="mt-1 text-xl font-bold text-slate-900">
                $4,500<span className="text-sm font-normal text-slate-500">/mo</span>
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar className="h-3.5 w-3.5" />
                Auto-Renewal Date
              </div>
              <p className="mt-1 text-xl font-bold text-slate-900">Oct 28, 2025</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/80 p-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Users className="h-3.5 w-3.5" />
                Allocated Seats
              </div>
              <p className="mt-1 text-xl font-bold text-slate-900">
                42<span className="text-sm font-normal text-slate-500">/50 In Use</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex flex-col items-start gap-3 lg:items-end">
          <button className="w-full rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition sm:w-auto">
            Change Plan
          </button>
          <button className="w-full rounded-xl border border-slate-200 bg-slate-100 px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition sm:w-auto">
            Contact Sales
          </button>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
          >
            View SLA report
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function PricingCard({ plan, cycle }: { plan: Plan; cycle: BillingCycle }) {
  const isCurrent = plan.isCurrent;
  const price = cycle === "annual" ? plan.price.annual : plan.price.monthly;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition ${
        isCurrent
          ? "border-blue-400 ring-2 ring-blue-100"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {/* Current plan badge */}
      {isCurrent && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
            <Check className="h-3 w-3" />
            Current Active Plan
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3
            className={`text-lg font-bold ${
              isCurrent ? "text-blue-700" : "text-slate-900"
            }`}
          >
            {plan.name}
          </h3>
          <p className="mt-0.5 text-sm text-slate-500">{plan.tagline}</p>
        </div>
        <div className={`rounded-lg p-2 ${plan.iconBg}`}>{plan.icon}</div>
      </div>

      {/* Price */}
      <div className="mt-5">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-slate-900">{price}</span>
          {plan.priceNote && (
            <span className="text-sm text-slate-500">{plan.priceNote}</span>
          )}
        </div>
        {plan.subNote && (
          <p
            className={`mt-1 text-xs ${
              isCurrent ? "text-blue-600 font-medium" : "text-slate-500"
            }`}
          >
            {plan.subNote}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-slate-100" />

      {/* Features */}
      <ul className="flex-1 space-y-3">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5">
            {f.included ? (
              <Check
                className={`mt-0.5 h-4 w-4 shrink-0 ${
                  f.highlight ? "text-blue-600" : "text-slate-400"
                }`}
              />
            ) : (
              <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
            )}
            <span
              className={`text-sm ${
                f.included
                  ? f.highlight
                    ? "font-semibold text-slate-900"
                    : "text-slate-700"
                  : "text-slate-400"
              }`}
            >
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        disabled={plan.cta.variant === "disabled"}
        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
          plan.cta.variant === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
            : plan.cta.variant === "disabled"
            ? "cursor-not-allowed bg-slate-100 text-slate-500"
            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
        }`}
      >
        {plan.cta.icon}
        {plan.cta.label}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function BillingPage() {
  const [cycle, setCycle] = useState<BillingCycle>("annual");

  return (
    <div className="min-h-screen bg-slate-50/80 p-4 sm:p-6 lg:p-8">
      {/* ── Page Header ────────────────────────────────────────── */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
              Organization Billing
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">Workspace ID: omni-prod-88219</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Subscription & Plans
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Review your active enterprise contract, tier capabilities, and scale
            add-ons.
          </p>
        </div>
        <BillingToggle cycle={cycle} onChange={setCycle} />
      </div>

      {/* ── Current Plan Card ──────────────────────────────────── */}
      <CurrentPlanCard />

      {/* ── Available Tiers ────────────────────────────────────── */}
      <div className="mt-10">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Available Tiers</h2>
            <p className="mt-1 text-sm text-slate-500">
              Switch tiers at any time; unused compute and prorated seats rollover
              automatically.
            </p>
          </div>
          <p className="text-xs text-slate-400">
            Prices displayed in USD, billed {cycle === "annual" ? "annually" : "monthly"}
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} cycle={cycle} />
          ))}
        </div>
      </div>
    </div>
  );
}