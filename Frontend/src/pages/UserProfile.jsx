import React, { useState } from "react";
import AvatarBlock from "../components/Avater_Block";
import {
  BookOpen,
  MapPin,
  ShieldCheck,
  Star,
  Edit3,
  GraduationCap,
  Users,
  Clock,
  CheckCircle2,
  Award,
  Monitor,
  Wifi,
  Home,
  Camera,
  Plus,
  Trash2,
  Save,
  ChevronDown,
  Brain,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PURPLE = "#6C5DD3";
const PURPLE_DARK = "#5A4BC4";
const PURPLE_LIGHT = "#F4F2FC";

const navLinks = [
  { label: "Home", link: "/" },
  { label: "Find Teachers", link: "/findteacher" },
  { label: "Subjects", link: "/subjects" },
  { label: "How it Works", link: "/howitwork" },
  { label: "Become a Teacher", link: "/teacher" },
];

// ─── Shared Header ─────────────────────────────────────────────────────────────
function Header({ user, navigate, location }) {
  return (
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
            const isActive = location?.pathname === link.link;
            return (
              <button
                key={link.label}
                onClick={() => navigate(link.link)}
                className={`pb-5 -mb-5 transition-colors hover:cursor-pointer ${
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

        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-sm font-bold text-white shadow-md">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        </div>
        <div className="flex items-center gap-5 cursor-pointer">
          <a
            onClick={() => navigate("/login")}
            className="hidden items-center gap-1.5 text-sm font-medium text-slate-700 sm:flex hover:text-violet-600"
          >
            <ShieldCheck className="h-4 w-4" />
            Login
          </a>

          <button
            onClick={() => navigate("/signup")}
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
            style={{ backgroundColor: PURPLE }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Avatar Upload ──────────────────────────────────────────────────────────────

// ─── Badge ──────────────────────────────────────────────────────────────────────
function Badge({ label, color = "indigo" }) {
  const map = {
    indigo: "bg-indigo-100 text-indigo-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    rose: "bg-rose-100 text-rose-700",
    sky: "bg-sky-100 text-sky-600",
    purple: "bg-violet-100 text-violet-700",
    orange: "bg-orange-100 text-orange-600",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${map[color] || map.indigo}`}
    >
      {label}
    </span>
  );
}

// ─── Section Card ───────────────────────────────────────────────────────────────
function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-slate-100 bg-white shadow-sm p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 className="text-base font-bold text-slate-900 mb-4">{children}</h3>
  );
}

// ─── TEACHER PROFILE ────────────────────────────────────────────────────────────
function TeacherProfile({ user, teacher }) {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(teacher?.bio || "");
  const [location, setLocation] = useState(teacher?.location || "");
  const [fee, setFee] = useState(teacher?.hourelyfee || "");

  const subjects = teacher?.subjects || ["Mathematics", "Physics"];
  const classes = teacher?.classes || ["9th", "10th", "11th", "12th"];
  const mode = teacher?.mode || ["online", "offline"];
  const education = teacher?.education || [
    { degree: "B.Sc Mathematics", institute: "Delhi University", year: 2018 },
  ];
  const experience = teacher?.experienceDetails || [
    { institution: "Bright Future Academy", years: 3 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Hero Card */}
      <Card>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <AvatarBlock
            name={user?.name}
            avatar={user?.avatar}
            isEditing={isEditing}
            onAvatarChange={(file) => {
              setFormData((prev) => ({
                ...prev,
                avatar: file,
              }));
            }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    {user?.name || "Teacher Name"}
                  </h2>
                  {teacher?.isVerifiedTeacher && (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />{" "}
                    {teacher?.location || "Location"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{" "}
                    {teacher?.rating?.toFixed(1) || "0.0"}{" "}
                    <span className="text-slate-400">
                      ({teacher?.totalReviews || 0} reviews)
                    </span>
                  </span>
                  <span
                    className="flex items-center gap-1 font-semibold"
                    style={{ color: PURPLE }}
                  >
                    ₹{teacher?.hourelyfee || 0}/hr
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors hover:bg-indigo-50"
                style={{ borderColor: "#D9D2F5", color: PURPLE }}
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4" /> Save
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4" /> Edit Profile
                  </>
                )}
              </button>
            </div>

            {/* Teaching mode badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {mode.includes("online") && (
                <span className="flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-600">
                  <Wifi className="h-3 w-3" /> Online
                </span>
              )}
              {mode.includes("offline") && (
                <span className="flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                  <Home className="h-3 w-3" /> Offline
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Bio */}
          <Card>
            <SectionTitle>About Me</SectionTitle>
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-violet-400 transition-colors resize-none"
                placeholder="Tell students about yourself..."
              />
            ) : (
              <p className="text-sm leading-relaxed text-slate-600">
                {bio || "No bio added yet."}
              </p>
            )}
          </Card>

          {/* Education */}
          <Card>
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-3">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                    <GraduationCap className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">
                      {edu.degree}
                    </div>
                    <div className="text-xs text-slate-500">
                      {edu.institute} · {edu.year}
                    </div>
                  </div>
                  {isEditing && (
                    <button className="ml-auto text-slate-400 hover:text-rose-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  className="flex items-center gap-2 text-sm font-medium mt-1"
                  style={{ color: PURPLE }}
                >
                  <Plus className="h-4 w-4" /> Add Education
                </button>
              )}
            </div>
          </Card>

          {/* Experience */}
          <Card>
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-3">
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <Award className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">
                      {exp.institution}
                    </div>
                    <div className="text-xs text-slate-500">
                      {exp.years} {exp.years === 1 ? "year" : "years"} of
                      experience
                    </div>
                  </div>
                  {isEditing && (
                    <button className="ml-auto text-slate-400 hover:text-rose-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  className="flex items-center gap-2 text-sm font-medium mt-1"
                  style={{ color: PURPLE }}
                >
                  <Plus className="h-4 w-4" /> Add Experience
                </button>
              )}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Subjects */}
          <Card>
            <SectionTitle>Subjects</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {subjects.map((s) => (
                <Badge key={s} label={s} color="purple" />
              ))}
              {isEditing && (
                <button
                  className="flex items-center gap-1 rounded-full border border-dashed border-violet-300 px-3 py-1 text-xs font-semibold"
                  style={{ color: PURPLE }}
                >
                  <Plus className="h-3 w-3" /> Add
                </button>
              )}
            </div>
          </Card>

          {/* Classes */}
          <Card>
            <SectionTitle>Classes Taught</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {classes.map((c) => (
                <Badge key={c} label={`${c}`} color="indigo" />
              ))}
            </div>
          </Card>

          {/* Fee */}
          <Card>
            <SectionTitle>Hourly Fee</SectionTitle>
            {isEditing ? (
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3">
                <span className="text-slate-500 font-medium">₹</span>
                <input
                  type="number"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="flex-1 bg-transparent text-sm font-bold text-slate-900 outline-none"
                  placeholder="e.g. 500"
                />
                <span className="text-slate-400 text-sm">/hr</span>
              </div>
            ) : (
              <div
                className="text-3xl font-extrabold"
                style={{ color: PURPLE }}
              >
                ₹{teacher?.hourelyfee || 0}
                <span className="text-base font-medium text-slate-400">
                  /hr
                </span>
              </div>
            )}
          </Card>

          {/* Stats */}
          <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 border-0">
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "Rating",
                  value: teacher?.rating?.toFixed(1) || "0.0",
                  icon: Star,
                },
                {
                  label: "Reviews",
                  value: teacher?.totalReviews || 0,
                  icon: Users,
                },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="text-center">
                  <Icon className="h-5 w-5 text-amber-300 mx-auto mb-1" />
                  <div className="text-2xl font-extrabold text-white">
                    {value}
                  </div>
                  <div className="text-xs text-indigo-200">{label}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── STUDENT PROFILE ────────────────────────────────────────────────────────────
function StudentProfile({ user, student, navigate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [location, setLocation] = useState(student?.location || "");
  const [studentClass, setStudentClass] = useState(student?.studentClass || "");

  const subjects = student?.subjects || ["Mathematics", "Physics", "English"];

  const subjectColors = [
    "purple",
    "indigo",
    "emerald",
    "amber",
    "rose",
    "sky",
    "orange",
  ];

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <Card>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <AvatarBlock
            name={user?.name}
            avatar={user?.avatar}
            isEditing={isEditing}
            onAvatarChange={(file) => {
              setFormData((prev) => ({
                ...prev,
                avatar: file,
              }));
            }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {user?.name || "Student Name"}
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5" />{" "}
                    {student?.studentClass || "—"}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />{" "}
                    {student?.location || "Location"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors hover:bg-indigo-50"
                style={{ borderColor: "#D9D2F5", color: PURPLE }}
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4" /> Save
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4" /> Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Basic Info */}
          <Card>
            <SectionTitle>Academic Details</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Current Class
                </label>
                {isEditing ? (
                  <div className="relative">
                    <select
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-violet-400 transition-colors cursor-pointer"
                    >
                      {["6th", "7th", "8th", "9th", "10th", "11th", "12th"].map(
                        (c) => (
                          <option key={c} value={c}>
                            Class {c}
                          </option>
                        ),
                      )}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-slate-400" />
                  </div>
                ) : (
                  <div className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
                    {student?.studentClass || "—"}
                  </div>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Location
                </label>
                {isEditing ? (
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-violet-400 transition-colors"
                    placeholder="Your city / area"
                  />
                ) : (
                  <div className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
                    {student?.location || "—"}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Subjects */}
          <Card>
            <SectionTitle>Subjects I'm Studying</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {subjects.map((s, i) => (
                <div key={s} className="flex items-center gap-1">
                  <Badge
                    label={s}
                    color={subjectColors[i % subjectColors.length]}
                  />
                  {isEditing && (
                    <button className="text-slate-300 hover:text-rose-400 transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  className="flex items-center gap-1 rounded-full border border-dashed border-violet-300 px-3 py-1 text-xs font-semibold"
                  style={{ color: PURPLE }}
                >
                  <Plus className="h-3 w-3" /> Add Subject
                </button>
              )}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Quick action */}
          <Card className="border-0" style={{ backgroundColor: PURPLE_LIGHT }}>
            <div className="text-center">
              <div
                className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm"
                style={{ color: PURPLE }}
              >
                <Brain className="h-7 w-7" />
              </div>
              <div className="font-bold text-slate-900">Find a Teacher</div>
              <div className="mt-1 text-xs text-slate-500">
                Discover qualified tutors for your subjects.
              </div>
              <button
                onClick={() => navigate("/findteacher")}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: PURPLE }}
              >
                Browse Teachers <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Card>

          {/* Learning overview */}
          <Card>
            <SectionTitle>Overview</SectionTitle>
            <div className="space-y-3">
              {[
                {
                  label: "Class",
                  value: `Class ${student?.studentClass || "—"}`,
                  icon: GraduationCap,
                  color: "bg-indigo-100 text-indigo-600",
                },
                {
                  label: "Subjects",
                  value: `${subjects.length} subjects`,
                  icon: BookOpen,
                  color: "bg-emerald-100 text-emerald-600",
                },
                {
                  label: "Location",
                  value: student?.location || "—",
                  icon: MapPin,
                  color: "bg-amber-100 text-amber-500",
                },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">{label}</div>
                    <div className="text-sm font-semibold text-slate-900">
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── PARENT PROFILE ─────────────────────────────────────────────────────────────
function ParentProfile({ user, parent, navigate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [location, setLocation] = useState(parent?.location || "");
  const children = parent?.children || [
    { name: "Aarav", class: "10th", subjects: ["Mathematics", "Science"] },
    { name: "Priya", class: "8th", subjects: ["English", "Hindi"] },
  ];

  const subjectColors = [
    "purple",
    "indigo",
    "emerald",
    "amber",
    "rose",
    "sky",
    "orange",
  ];
  const childCardColors = [
    {
      bg: "bg-indigo-50",
      ring: "ring-indigo-200",
      icon: "bg-indigo-100 text-indigo-600",
    },
    {
      bg: "bg-emerald-50",
      ring: "ring-emerald-200",
      icon: "bg-emerald-100 text-emerald-600",
    },
    {
      bg: "bg-amber-50",
      ring: "ring-amber-200",
      icon: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <Card>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <AvatarBlock name={user?.name} isEditing={isEditing} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  {user?.name || "Parent Name"}
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {children.length}{" "}
                    {children.length === 1 ? "child" : "children"} registered
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />{" "}
                    {parent?.location || "Location"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-colors hover:bg-indigo-50"
                style={{ borderColor: "#D9D2F5", color: PURPLE }}
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4" /> Save
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4" /> Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Children */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <SectionTitle>My Children</SectionTitle>
              {isEditing && (
                <button
                  className="flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: PURPLE }}
                >
                  <Plus className="h-4 w-4" /> Add Child
                </button>
              )}
            </div>
            <div className="space-y-4">
              {children.map((child, i) => {
                const colorSet = childCardColors[i % childCardColors.length];
                return (
                  <div key={i} className={`rounded-2xl p-5 ${colorSet.bg}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-full text-lg font-extrabold ${colorSet.icon.split(" ")[0]} ${colorSet.icon.split(" ")[1]}`}
                        >
                          {child.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">
                            {child.name}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" /> Class{" "}
                            {child.class}
                          </div>
                        </div>
                      </div>
                      {isEditing && (
                        <button className="text-slate-400 hover:text-rose-500 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {child.subjects?.map((s, j) => (
                        <Badge
                          key={s}
                          label={s}
                          color={subjectColors[j % subjectColors.length]}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Location */}
          <Card>
            <SectionTitle>Location</SectionTitle>
            {isEditing ? (
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-violet-400 transition-colors"
                placeholder="Your city / area"
              />
            ) : (
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                  <MapPin className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {parent?.location || "—"}
                  </div>
                  <div className="text-xs text-slate-400">
                    Used to find nearby teachers
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Stats */}
          <Card className="border-0" style={{ backgroundColor: PURPLE_LIGHT }}>
            <SectionTitle>At a Glance</SectionTitle>
            <div className="space-y-3">
              {[
                {
                  label: "Children",
                  value: children.length,
                  icon: Users,
                  color: "bg-indigo-100 text-indigo-600",
                },
                {
                  label: "Total Subjects",
                  value: children.reduce(
                    (acc, c) => acc + (c.subjects?.length || 0),
                    0,
                  ),
                  icon: BookOpen,
                  color: "bg-emerald-100 text-emerald-600",
                },
                {
                  label: "Location",
                  value: parent?.location || "—",
                  icon: MapPin,
                  color: "bg-amber-100 text-amber-500",
                },
              ].map(({ label, value, icon: Icon, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm"
                >
                  <div
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">{label}</div>
                    <div className="text-sm font-bold text-slate-900">
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <Card>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-lg">
                <Brain className="h-7 w-7 text-amber-300" />
              </div>
              <div className="font-bold text-slate-900">Find a Tutor</div>
              <div className="mt-1 text-xs text-slate-500">
                Search for verified teachers near you.
              </div>
              <button
                onClick={() => navigate("/findteacher")}
                className="hover:cursor-pointer mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white"
                style={{ backgroundColor: PURPLE }}
              >
                Find Teachers <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PROFILE PAGE ──────────────────────────────────────────────────────────
export default function ProfilePage() {
  // In your real app, pull these from Redux / route
  const user = useSelector?.((state) => state.auth.user) || {
    name: "Demo User",
    role: "teacher", // "teacher" | "student" | "parent"
  };

  // Mock data — replace with real API data

  // Simulate role — in real app: user.role
  const role = user?.role;

  let userRole = "Demo User";
  if (role === "teacher") {
    userRole = JSON.parse(localStorage.getItem("teacher"));
  }
  if (role === "parent") {
    userRole = JSON.parse(localStorage.getItem("parent"));
  }
  if (role === "student") {
    userRole = JSON.parse(localStorage.getItem("student"));
  }
  console.log(userRole);
  const navigate = useNavigate();
  const location =
    typeof window !== "undefined" ? { pathname: "/profile" } : {};

  return (
    <div
      style={{ backgroundColor: "#F4F2FC" }}
      className="min-h-screen bg-white font-sans antialiased"
    >
      <Header
        user={user}
        navigate={navigate || (() => {})}
        location={location}
      />

      {/* Page hero banner */}

      {/* Profile content */}
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {role === "teacher" && (
          <TeacherProfile user={user} teacher={userRole} navigate={navigate} />
        )}
        {role === "student" && (
          <StudentProfile user={user} student={userRole} navigate={navigate} />
        )}
        {role === "parent" && (
          <ParentProfile user={user} parent={userRole} navigate={navigate} />
        )}
      </main>

      {/* AI Chatbot Button */}
      <button
        onClick={() => navigate?.("/chatbot")}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-30"></span>
          <div className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-violet-100 bg-white px-4 py-2 shadow-lg opacity-0 invisible translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-x-0">
            <p className="text-sm font-semibold text-slate-800">
              Talk to AI Teacher
            </p>
            <p className="text-xs text-slate-500">Ask doubts anytime</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-xl transition-all duration-300 hover:scale-110">
            <Brain className="h-8 w-8 text-amber-300" />
          </div>
        </div>
      </button>
    </div>
  );
}
