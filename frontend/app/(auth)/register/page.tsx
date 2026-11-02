"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Mail,
  User,
  Building2,
  BadgeCheck,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Apple,
  ChevronDown,
  ShieldCheck,
  Link2,
  Info,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    slug: "acme",
    role: "",
    password: "",
    showPassword: false,
    agree: true,
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:8000/api/auth/register", form);
      if (response.status === 200) {
        console.log(response.data);
        router.push("/login");
      }
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const strengthChecks = [
    form.password.length >= 12,
    /[A-Z]/.test(form.password),
    /[0-9]/.test(form.password),
    /[^A-Za-z0-9]/.test(form.password),
  ];
  const metCount = strengthChecks.filter(Boolean).length;
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-xl">
        <div className="rounded-3xl bg-white shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10">
          {/* Badge */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Enterprise Onboarding
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-center text-3xl font-bold text-slate-900">
            Create your workspace account
          </h1>
          <p className="mt-2 text-center text-sm text-slate-500 leading-relaxed">
            Join your team on OmniWorkspace or start a new 14-day enterprise trial.
          </p>

          {/* SSO Buttons */}
          <div className="mt-7 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
                <Apple className="h-4 w-4" />
                Sign up with Apple
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
                <Mail className="h-4 w-4 text-blue-600" />
                Google Workspace
              </button>
            </div>
            <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 transition">
              <Link2 className="h-4 w-4" />
              Continue with SAML SSO
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-slate-400">
                or register with work credentials
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={form.fullName}
                  // onChange={(e) => setForm({...form, fullName: e.target.value})}
                  onChange={handleChange}
                  placeholder="Elena Rostova"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Work Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Work Email</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                  @
                </span>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  name="email"
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Workspace URL */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  Workspace URL / Team Slug
                </label>
                <span className="text-xs text-slate-500">Custom domain available</span>
              </div>
              <div className="flex rounded-xl border border-slate-200 bg-white overflow-hidden">
                <div className="flex items-center gap-2 border-r border-slate-200 bg-slate-50 px-3">
                  <Building2 className="h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={form.slug}
                    onChange={handleChange}
                    name="slug"
                    className="w-24 bg-transparent py-3 text-sm text-slate-900 outline-none"
                  />
                </div>
                <div className="flex items-center px-3 text-sm text-slate-500 bg-slate-50">
                  .omniworkspace.com
                </div>
              </div>
            </div>

            {/* Organizational Role */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                Organizational Role
              </label>
              <div className="relative">
                <BadgeCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <select
                  value={form.role}
                  onChange={handleChange}
                  name="role"
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select your primary responsibility</option>
                  <option value="engineering">Engineering</option>
                  <option value="security">Security / SecOps</option>
                  <option value="product">Product</option>
                  <option value="operations">Operations</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Master Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  Master Password
                </label>
                <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline">
                  Requirements
                  <Info className="h-3 w-3" />
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={form.showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  name="password"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
                <button
                  onClick={() => setForm((prev) => ({...prev, showPassword: !prev.showPassword}))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {form.showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Strength Bar */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1.5">
                    {strengthChecks.map((passed, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition ${
                          passed ? "bg-green-600" : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-xs">
                    <span
                      className={`font-medium ${
                        metCount >= 3 ? "text-green-700" : "text-slate-500"
                      }`}
                    >
                      ● {metCount >= 3 ? "Strong credentials" : "Weak credentials"}
                    </span>
                    <span className="text-slate-500">{metCount} of 4 met</span>
                  </div>
                </div>
              )}
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => setForm((prev) => ({...prev, agree: e.target.checked}))}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-600 leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Enterprise Terms of Service
                </a>
                ,{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
                , and Data Processing Addendum (DPA).
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition">
            Create Account & Join Workspace
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        {error && (
          <p className="text-sm text-red-600 mt-2 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}