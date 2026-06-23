import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logout } from "../features/auth/auth.silice";
import api from "../services/axios";
import LoginLoader from "../components/Login_Loader"
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
  Brain,
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
    text: "Access 10,000+ verified teachers",
  },
  {
    icon: Award,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
    text: "Connect with qualified subject experts",
  },
  {
    icon: BookOpen,
    bg: "bg-amber-100",
    color: "text-amber-500",
    text: "Personalized learning experience",
  },
  {
    icon: TrendingUp,
    bg: "bg-rose-100",
    color: "text-rose-500",
    text: "Track your academic progress",
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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);

  const HandelLogout = () => {
    localStorage.clear("user");
    alert("User Logout Sucessfully");
    dispatch(logout());
  };

  const checklogin = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      googleLogin();
    } else {
      setShowPopup(true);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        const accessToken = tokenResponse.access_token;
        const response = await api.post("user/login", {
          accessToken,
        });
        console.log(response);
        if (!response.data.data.newuser) {
          const loginuser = response.data.data.existingUser;

          localStorage.setItem("user", JSON.stringify(loginuser));

          dispatch(
            loginSuccess({
              user: loginuser,
              accessToken: null,
            }),
          );
        } else {
          navigate("/rolechoose", {
            state: {
              accessToken: tokenResponse,
            },
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
         setTimeout(() => {
            navigate("/")
            setLoading(false);
          },3000);
      
    }
    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });

  if (loading) {
  return <LoginLoader />;
}

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900">
              Already Logged In
            </h2>

            <p className="mt-2 text-slate-500">
              You are already logged into your account.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 w-full rounded-lg bg-violet-600 py-2 text-white"
            >
              OK
            </button>
          </div>
        </div>
      )}
      {/* ── Header ── */}
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => navigate("/")}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-lg"
            >
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

          {/* Nav */}
          <nav className="hidden items-center gap-9 text-sm font-medium lg:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.link;
              return (
                <button
                  key={link.label}
                  onClick={() => navigate(link.link)}
                  className={`pb-5 -mb-5 transition-colors hover:cursor-pointer  ${
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

          {/* CTA */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/login")}
              className="hidden items-center gap-1.5 text-sm font-semibold sm:flex text-violet-700"
            >
              <ShieldCheck className="h-4 w-4" />
              Login
            </button>
            <button
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors"
              style={{ backgroundColor: PURPLE }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = PURPLE_DARK)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = PURPLE)
              }
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <section
        style={{ backgroundColor: "#F4F2FC" }}
        className="min-h-[calc(100vh-80px)] flex items-center"
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* ── Left: Brand panel ── */}
            <div>
              {/* Badge */}
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                style={{
                  backgroundColor: "rgba(108,93,211,0.1)",
                  color: PURPLE,
                }}
              >
                <ShieldCheck className="h-4 w-4" />
                Trusted by 50,000+ Students
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-5xl">
                Welcome Back to
                <br />
                <span style={{ color: PURPLE }}>TutorMate</span>
              </h1>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-500">
                Sign in to connect with your teachers, track your progress, and
                continue your learning journey.
              </p>

              {/* Benefits list */}
              <div className="mt-8 space-y-4">
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.text} className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${b.bg}`}
                      >
                        <Icon className={`h-5 w-5 ${b.color}`} />
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {b.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Testimonial card */}
              <div className="mt-10 max-w-sm rounded-2xl bg-white p-5 shadow-xl shadow-indigo-100/70">
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/150?img=44"
                    alt="Student testimonial"
                    className="h-12 w-12 flex-shrink-0 rounded-full object-cover ring-2 ring-rose-200"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">
                      Anjali Mehta
                    </div>
                    <div className="text-xs text-slate-400">
                      Class 12 Student, Meerut
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
                  "TutorMate helped me find the perfect Maths teacher. My board
                  exam score jumped from 72% to 94%!"
                </p>
              </div>
            </div>

            {/* ── Right: Login form ── */}
            <div className="rounded-2xl bg-white p-8 shadow-xl shadow-indigo-100/70 lg:p-10">
              {/* Form heading */}
              <div className="mb-7">
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Sign In
                </h2>
                <p className="mt-1.5 text-sm text-slate-500">
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/signup")}
                    className="font-semibold hover:underline"
                    style={{ color: PURPLE }}
                  >
                    Sign up for free
                  </button>
                </p>
              </div>

              {/* Google sign-in */}
              <button
                onClick={() => checklogin()}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 active:bg-slate-100"
              >
                <GoogleIcon />
                Continue with Google
              </button>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 border-t border-slate-100" />
                <span className="text-xs font-medium tracking-wide text-slate-400">
                  OR CONTINUE WITH EMAIL
                </span>
                <div className="flex-1 border-t border-slate-100" />
              </div>

              {/* Fields */}
              <div className="space-y-5">
                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 transition-colors focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
                    <Mail className="h-4 w-4 flex-shrink-0 text-slate-400" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={user?.email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <button
                      className="text-xs font-semibold hover:underline"
                      style={{ color: PURPLE }}
                      onClick={() => navigate("/forgot-password")}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 transition-colors focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
                    <Lock className="h-4 w-4 flex-shrink-0 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={user?.googleId}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 transition-colors hover:text-slate-600"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 accent-violet-600"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-slate-600 select-none cursor-pointer"
                  >
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit */}
                {!user ? (
                  <button
                    className="flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-sm font-semibold text-white shadow-sm"
                    style={{ backgroundColor: PURPLE }}
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Sign In Securely
                  </button>
                ) : (
                  <button
                    onClick={() => HandelLogout()}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-3.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                  >
                    Logout
                  </button>
                )}
              </div>

              {/* Trust row */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  SSL Secured
                </span>
                <div className="h-3 w-px bg-slate-200" />
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Privacy Protected
                </span>
                <div className="h-3 w-px bg-slate-200" />
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  2FA Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* AI Tutor Assistant Button */}
      <button
        onClick={() => navigate("/chatbot")}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Blinking Ring */}
          <span className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-30"></span>

          {/* Hover Text */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-violet-100 bg-white px-4 py-2 shadow-lg opacity-0 invisible translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-x-0">
            <p className="text-sm font-semibold text-slate-800">
              Talk to AI Teacher
            </p>
            <p className="text-xs text-slate-500">Ask doubts anytime</p>
          </div>

          {/* Button */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-xl transition-all duration-300 hover:scale-110">
            <Brain className="h-8 w-8 text-amber-300" />
          </div>
        </div>
      </button>
    </div>
  );
}
