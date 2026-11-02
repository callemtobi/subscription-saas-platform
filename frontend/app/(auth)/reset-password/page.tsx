"use client";

import React, { useState } from "react";
import {
  Mail,
  KeyRound,
  ArrowRight,
  Lock,
  Info,
  ExternalLink,
  Send,
  Fingerprint,
  ShieldCheck,
} from "lucide-react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("sarah.chen@acme.com");
  const [channel, setChannel] = useState<"email" | "hardware">("email");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-xl">
        <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10">
          {/* Top Row: Icon + Badge */}
          <div className="flex items-start justify-between mb-6">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <KeyRound className="h-6 w-6 text-blue-600" />
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
              <Lock className="h-3 w-3" />
              SSO-Compliant Flow
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-slate-900">Reset your password</h1>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            Enter the work email associated with your OmniWorkspace account and
            we&apos;ll send you a secure verification link and one-time passcode.
          </p>

          {/* Email Field */}
          <div className="mt-7 space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              Work Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-32 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                <ShieldCheck className="h-3 w-3 text-green-600" />
                acme.com
              </div>
            </div>
          </div>

          {/* Verification Channel */}
          <div className="mt-6 space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              Verification Channel
            </label>

            {/* Email Option */}
            <label
              className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition ${
                channel === "email"
                  ? "border-blue-400 bg-blue-50/40"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name="channel"
                checked={channel === "email"}
                onChange={() => setChannel("email")}
                className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900">
                    Send recovery link via Email
                  </span>
                  <Send className="h-4 w-4 text-blue-600" />
                </div>
                <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                  Dispatches magic authentication token &amp; 6-digit backup code
                </p>
              </div>
            </label>

            {/* Hardware Key Option */}
            <label
              className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition ${
                channel === "hardware"
                  ? "border-blue-400 bg-blue-50/40"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name="channel"
                checked={channel === "hardware"}
                onChange={() => setChannel("hardware")}
                className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-900">
                    Use hardware security key
                  </span>
                  <Fingerprint className="h-4 w-4 text-slate-400" />
                </div>
                <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                  FIDO2 / Touch ID / WebAuthn passkey direct reset
                </p>
              </div>
            </label>
          </div>

          {/* Send Reset Link Button */}
          <button className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition">
            Send Reset Link
            <ArrowRight className="h-4 w-4" />
          </button>

          {/* Info Box */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex gap-3">
              <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600 leading-relaxed">
                If your organization enforces{" "}
                <span className="font-semibold text-slate-800">
                  Single Sign-On (Okta / Azure AD)
                </span>
                , please contact your IT admin or sign in via your identity provider
                portal.
              </p>
            </div>
          </div>

          {/* Escalation Link */}
          <div className="mt-5 flex items-center justify-between text-sm">
            <span className="text-slate-500">Need manual escalation?</span>
            <a
              href="#"
              className="inline-flex items-center gap-1 font-medium text-blue-600 hover:underline"
            >
              Contact Enterprise SecOps Support
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Link */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Remember your password?{" "}
          <a href="/login" className="font-medium text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}