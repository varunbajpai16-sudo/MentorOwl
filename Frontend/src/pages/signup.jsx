import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  GraduationCap,
  ShieldCheck,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Users,
  Award,
  Star,
  BookOpen,
  TrendingUp,
  Phone,
  User,
} from "lucide-react";

const PURPLE = "#6C5DD3";
const PURPLE_DARK = "#5A4BC4";

const navLinks = [
  { label: "Home", link: "/" },
  { label: "Find Teachers", link: "/findteacher" },
  { label: "Subjects", link: "/subjects" },
  { label: "How it Works", link: "/howitwork" },
  { label: "Become a Teacher", link: "/becomeateacher" },
];

const benefits = [
  {
    icon: Users,
    bg: "bg-indigo-100",
    color: "text-indigo-600",
    text: "Access thousands of verified tutors",
  },
  {
    icon: Award,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
    text: "Learn from experienced subject experts",
  },
  {
    icon: BookOpen,
    bg: "bg-amber-100",
    color: "text-amber-500",
    text: "Personalized one-to-one learning",
  },
  {
    icon: TrendingUp,
    bg: "bg-rose-100",
    color: "text-rose-500",
    text: "Improve academic performance faster",
  },
];

function GoogleIcon() {
  return (
    <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [agree, setAgree] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-lg">
              <BookOpen className="h-6 w-6 text-amber-300" />
            </div>
            <div>
              <div className="text-xl font-extrabold leading-tight text-slate-900">
                TutorMate
              </div>
              <div className="text-xs leading-tight text-slate-400">
                Find the right teacher for you
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-9 text-sm font-medium lg:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.link;

              return (
                <button
                  key={link.label}
                  onClick={() => navigate(link.link)}
                  className={`pb-5 -mb-5 transition-colors ${
                    isActive
                      ? "border-b-2 font-semibold text-violet-600"
                      : "text-slate-600 hover:text-black"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/login")}
              className="hidden items-center gap-1.5 text-sm font-semibold sm:flex"
              style={{ color: PURPLE }}
            >
              <ShieldCheck className="h-4 w-4" />
              Login
            </button>

            <button
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
              style={{ backgroundColor: PURPLE }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <section
        style={{ backgroundColor: "#F4F2FC" }}
        className="min-h-[calc(100vh-80px)] flex items-center"
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Left Side */}
            <div>
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                style={{
                  backgroundColor: "rgba(108,93,211,0.1)",
                  color: PURPLE,
                }}
              >
                <ShieldCheck className="h-4 w-4" />
                Join 50,000+ Successful Students
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-5xl">
                Join
                <br />
                <span style={{ color: PURPLE }}>TutorMate</span>
                <br />
                Today
              </h1>

              <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-500">
                Create your free account and connect with expert tutors,
                personalized learning plans, and better academic outcomes.
              </p>

              <div className="mt-8 space-y-4">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <div key={benefit.text} className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${benefit.bg}`}
                      >
                        <Icon className={`h-5 w-5 ${benefit.color}`} />
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {benefit.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 max-w-sm rounded-2xl bg-white p-5 shadow-xl shadow-indigo-100/70">
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/150?img=32"
                    alt=""
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-200"
                  />

                  <div>
                    <div className="font-semibold text-slate-900">
                      Rahul Sharma
                    </div>

                    <div className="text-xs text-slate-400">
                      Class 11 Student
                    </div>

                    <div className="mt-1 flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm italic leading-relaxed text-slate-500">
                  "TutorMate made finding the perfect Physics tutor incredibly
                  easy. My confidence and grades improved dramatically."
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div className="rounded-2xl bg-white p-8 shadow-xl shadow-indigo-100/70 lg:p-10">
              <div className="mb-7">
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Create Account
                </h2>

                <p className="mt-1.5 text-sm text-slate-500">
                  Already have an account?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="font-semibold hover:underline"
                    style={{ color: PURPLE }}
                  >
                    Sign In
                  </button>
                </p>
              </div>

              <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
                <GoogleIcon />
                Continue with Google
              </button>

              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 border-t border-slate-100" />
                <span className="text-xs font-medium tracking-wide text-slate-400">
                  OR SIGN UP WITH EMAIL
                </span>
                <div className="flex-1 border-t border-slate-100" />
              </div>

              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3">
                    <User className="h-4 w-4 text-slate-400" />

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="flex-1 bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3">
                    <Mail className="h-4 w-4 text-slate-400" />

                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="flex-1 bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3">
                    <Phone className="h-4 w-4 text-slate-400" />

                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="flex-1 bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Password
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3">
                    <Lock className="h-4 w-4 text-slate-400" />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      className="flex-1 bg-transparent text-sm outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Confirm Password
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3">
                    <Lock className="h-4 w-4 text-slate-400" />

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className="flex-1 bg-transparent text-sm outline-none"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-violet-600"
                  />

                  <label className="text-sm leading-relaxed text-slate-600">
                    I agree to the{" "}
                    <span
                      className="font-medium cursor-pointer"
                      style={{ color: PURPLE }}
                    >
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span
                      className="font-medium cursor-pointer"
                      style={{ color: PURPLE }}
                    >
                      Privacy Policy
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <button
                  className="w-full rounded-lg py-3.5 text-sm font-semibold text-white shadow-sm transition-colors"
                  style={{ backgroundColor: PURPLE }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = PURPLE_DARK)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = PURPLE)
                  }
                >
                  Create Free Account
                </button>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
                <span>100% Free Registration</span>

                <div className="h-3 w-px bg-slate-200" />

                <span>Verified Tutors</span>

                <div className="h-3 w-px bg-slate-200" />

                <span>Secure & Protected</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
