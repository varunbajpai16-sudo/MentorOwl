import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  GraduationCap,
  Award,
  Users,
  ArrowRight,
  Check,
  ShieldCheck,
} from "lucide-react";

const PURPLE = "#6C5DD3";
const PURPLE_DARK = "#5A4BC4";

const roles = [
  {
    id: "becomeateacher",
    title: "Teacher",
    tagline: "I want to teach",
    desc: "Create your profile, list the subjects you teach, and get discovered by students near you.",
    icon: Award,
    bg: "bg-indigo-100",
    color: "text-indigo-600",
  },
  {
    id: "registerparent",
    title: "Parent",
    tagline: "I'm looking for a tutor",
    desc: "Find verified, experienced tutors for your child and keep track of their progress.",
    icon: Users,
    bg: "bg-amber-100",
    color: "text-amber-500",
  },
  {
    id: "registerstudent",
    title: "Student",
    tagline: "I want to learn",
    desc: "Browse subjects, book sessions, and connect with tutors who match how you learn best.",
    icon: GraduationCap,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
  },
];

export default function RoleSelectionPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleContinue = () => {
    if (!selectedRole) return;
    navigate(`/${selectedRole}`);
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 hover:cursor-pointer"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-lg">
              <BookOpen className="h-6 w-6 text-amber-300" />
            </div>
            <div className="text-left">
              <div className="text-xl font-extrabold leading-tight text-slate-900">
                TutorMate
              </div>
              <div className="text-xs leading-tight text-slate-400">
                Find the right teacher for you
              </div>
            </div>
          </button>

          <a
            onClick={() => navigate("/login")}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:cursor-pointer hover:text-violet-600"
          >
            <ShieldCheck className="h-4 w-4" />
            Already have an account?{" "}
            <span style={{ color: PURPLE }}>Log In</span>
          </a>
        </div>
      </header>

      {/* Role selection */}
      <section
        className="flex flex-1 items-center justify-center px-6 py-16 lg:px-10"
        style={{ backgroundColor: "#F4F2FC" }}
      >
        <div className="w-full max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: PURPLE }}
            >
              Get Started
            </span>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-5xl">
              How will you use <span style={{ color: PURPLE }}>TutorMate</span>?
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-500">
              Choose the role that fits you best. You can update this anytime
              from your account settings.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`relative flex flex-col items-start rounded-2xl border-2 bg-white p-6 text-left shadow-sm transition-all hover:cursor-pointer hover:shadow-md ${
                    isSelected
                      ? "shadow-lg"
                      : "border-slate-100 hover:border-violet-200"
                  }`}
                  style={
                    isSelected
                      ? {
                          borderColor: PURPLE,
                          boxShadow:
                            "0 12px 28px -8px rgba(108,93,211,0.35)",
                        }
                      : undefined
                  }
                >
                  {isSelected && (
                    <div
                      className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full"
                      style={{ backgroundColor: PURPLE }}
                    >
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full ${role.bg}`}
                  >
                    <Icon className={`h-7 w-7 ${role.color}`} />
                  </div>

                  <div className="mt-5 text-lg font-bold text-slate-900">
                    {role.title}
                  </div>
                  <div
                    className="mt-0.5 text-sm font-medium"
                    style={{ color: PURPLE }}
                  >
                    {role.tagline}
                  </div>
                  <div className="mt-3 text-sm leading-relaxed text-slate-500">
                    {role.desc}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <button
              onClick={handleContinue}
              disabled={!selectedRole}
              className={`flex items-center justify-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors ${
                selectedRole
                  ? "hover:cursor-pointer"
                  : "cursor-not-allowed opacity-40"
              }`}
              style={{ backgroundColor: PURPLE }}
              onMouseEnter={(e) => {
                if (selectedRole)
                  e.currentTarget.style.backgroundColor = PURPLE_DARK;
              }}
              onMouseLeave={(e) => {
                if (selectedRole)
                  e.currentTarget.style.backgroundColor = PURPLE;
              }}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-sm text-slate-400">
              By continuing, you agree to TutorMate's Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}