import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

import api from "../services/axios"
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
  Brain,
  Menu,
  X,
} from "lucide-react";

const PURPLE = "#6C5DD3";
const PURPLE_DARK = "#5A4BC4";

const navLinks = [
  { label: "Home", link: "/" },
  { label: "Find Teachers", link: "/findteacher" },
  { label: "Subjects", link: "/subjects" },
  { label: "How it Works", link: "/howitwork" },
  { label: "Become a Teacher", link: "/teacher" },
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
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.auth.user)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const googleLogin = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        navigate("/rolechoose",{
          state:{
            accessToken:tokenResponse
          }
        })
      },
      onError: () => {
        console.log("Google Login Failed");
      },
    });

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
    <div className="min-h-screen bg-white font-sans antialiased overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              onClick={() => navigate("/")}
              className="flex h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-lg sm:h-11 sm:w-11"
            >
              <BookOpen className="h-5 w-5 text-amber-300 sm:h-6 sm:w-6" />
            </div>
            <div>
              <div className="text-base font-extrabold leading-tight text-slate-900 sm:text-xl">
                TutorMate
              </div>
              <div className="hidden text-xs leading-tight text-slate-400 sm:block">
                Find the right teacher for you
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium lg:flex xl:gap-9">
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

          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => navigate("/login")}
              className="hidden items-center gap-1.5 text-sm font-semibold sm:flex"
              style={{ color: PURPLE }}
            >
              <ShieldCheck className="h-4 w-4" />
              Login
            </button>

            <button
              className="rounded-lg px-3.5 py-2 text-xs font-semibold text-white shadow-sm sm:px-5 sm:py-2.5 sm:text-sm"
              style={{ backgroundColor: PURPLE }}
            >
              Sign Up
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav panel */}
        {mobileMenuOpen && (
          <nav className="flex flex-col gap-1 border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.link;
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate(link.link);
                  }}
                  className={`rounded-lg px-3 py-2.5 text-left text-sm font-medium ${
                    isActive
                      ? "bg-violet-50 font-semibold text-violet-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate("/login");
              }}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              <ShieldCheck className="h-4 w-4" />
              Login
            </button>
          </nav>
        )}
      </header>

      {/* Main */}
      <section
        style={{ backgroundColor: "#F4F2FC" }}
        className="flex items-center"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Left Side */}
            <div>
              <div
                className="mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium sm:mb-6 sm:px-4 sm:py-2 sm:text-sm"
                style={{
                  backgroundColor: "rgba(108,93,211,0.1)",
                  color: PURPLE,
                }}
              >
                <ShieldCheck className="h-4 w-4" />
                Join 50,000+ Successful Students
              </div>

              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Join
                <br />
                <span style={{ color: PURPLE }}>TutorMate</span>
                <br />
                Today
              </h1>

              <p className="mt-4 max-w-md text-base leading-relaxed text-slate-500 sm:text-lg">
                Create your free account and connect with expert tutors,
                personalized learning plans, and better academic outcomes.
              </p>

              <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <div key={benefit.text} className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 ${benefit.bg}`}
                      >
                        <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${benefit.color}`} />
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {benefit.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 max-w-sm rounded-2xl bg-white p-4 shadow-xl shadow-indigo-100/70 sm:mt-10 sm:p-5">
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/150?img=32"
                    alt=""
                    className="h-11 w-11 flex-shrink-0 rounded-full object-cover ring-2 ring-indigo-200 sm:h-12 sm:w-12"
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
            <div className="rounded-2xl bg-white p-5 shadow-xl shadow-indigo-100/70 sm:p-8 lg:p-10">
              <div className="mb-6 sm:mb-7">
                <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
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

               <button
                onClick={() => googleLogin()}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 active:bg-slate-100"
              >
                <GoogleIcon />
                Continue with Google
              </button>

              <div className="my-5 flex items-center gap-3 sm:my-6">
                <div className="flex-1 border-t border-slate-100" />
                <span className="text-xs font-medium tracking-wide text-slate-400 text-center">
                  OR SIGN UP WITH EMAIL
                </span>
                <div className="flex-1 border-t border-slate-100" />
              </div>

              <div className="space-y-4 sm:space-y-5">
                {/* Full Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3">
                    <User className="h-4 w-4 flex-shrink-0 text-slate-400" />

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full min-w-0 flex-1 bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3">
                    <Mail className="h-4 w-4 flex-shrink-0 text-slate-400" />

                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full min-w-0 flex-1 bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3">
                    <Phone className="h-4 w-4 flex-shrink-0 text-slate-400" />

                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full min-w-0 flex-1 bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Password
                  </label>

                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3">
                    <Lock className="h-4 w-4 flex-shrink-0 text-slate-400" />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      className="w-full min-w-0 flex-1 bg-transparent text-sm outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="flex-shrink-0"
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
                    <Lock className="h-4 w-4 flex-shrink-0 text-slate-400" />

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className="w-full min-w-0 flex-1 bg-transparent text-sm outline-none"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="flex-shrink-0"
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
                    className="mt-1 h-4 w-4 flex-shrink-0 accent-violet-600"
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

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-slate-400 sm:mt-7">
                <span>100% Free Registration</span>

                <div className="hidden h-3 w-px bg-slate-200 xs:block" />

                <span>Verified Tutors</span>

                <div className="hidden h-3 w-px bg-slate-200 xs:block" />

                <span>Secure & Protected</span>
              </div>
            </div>
          </div>
        </div>
      </section>
        {/* AI Tutor Assistant Button */}
      <button
        onClick={() => navigate("/chatbot")}
        className="fixed bottom-4 right-4 z-50 group sm:bottom-6 sm:right-6"
      >
        <div className="relative">
          {/* Blinking Ring */}
          <span className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-30"></span>

          {/* Hover Text - desktop only */}
          <div className="absolute right-[4.5rem] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-xl border border-violet-100 bg-white px-4 py-2 shadow-lg opacity-0 invisible translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 sm:block">
            <p className="text-sm font-semibold text-slate-800">
              Talk to AI Teacher
            </p>
            <p className="text-xs text-slate-500">Ask doubts anytime</p>
          </div>

          {/* Button */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-xl transition-all duration-300 hover:scale-110 sm:h-16 sm:w-16">
            <Brain className="h-7 w-7 text-amber-300 sm:h-8 sm:w-8" />
          </div>
        </div>
      </button>
    </div>
  );
}