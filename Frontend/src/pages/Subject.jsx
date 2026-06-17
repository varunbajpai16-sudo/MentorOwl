import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  GraduationCap,
  ShieldCheck,
  Search,
  Calculator,
  FlaskConical,
  Atom,
  Microscope,
  BookOpen,
  Languages,
  ScrollText,
  Monitor,
  Laptop,
  Receipt,
  LineChart,
  Briefcase,
  Landmark,
  Globe,
  Palette,
  Music,
} from "lucide-react";

const PURPLE = "#6C5DD3";
const PURPLE_DARK = "#5A4BC4";

const navLinks = [
  { label: "Home", active: true, link: "/" },
  { label: "Find Teachers", link: "/findteacher" },
  { label: "Subjects", link: "/subjects" },
  { label: "How it Works", link: "/howitwork" },
  { label: "Become a Teacher", link: "/becomeateacher" },
];

const categories = [
  "All",
  "Mathematics",
  "Science",
  "Languages",
  "Computer",
  "Commerce",
  "Humanities",
  "Arts",
];

const subjectsData = [
  {
    name: "Mathematics",
    category: "Mathematics",
    icon: Calculator,
    bg: "bg-indigo-100",
    color: "text-indigo-600",
    tutors: 2345,
    price: 300,
  },
  {
    name: "Science",
    category: "Science",
    icon: FlaskConical,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
    tutors: 1892,
    price: 280,
  },
  {
    name: "Physics",
    category: "Science",
    icon: Atom,
    bg: "bg-rose-100",
    color: "text-rose-500",
    tutors: 1234,
    price: 350,
  },
  {
    name: "Chemistry",
    category: "Science",
    icon: FlaskConical,
    bg: "bg-sky-100",
    color: "text-sky-500",
    tutors: 987,
    price: 350,
  },
  {
    name: "Biology",
    category: "Science",
    icon: Microscope,
    bg: "bg-green-100",
    color: "text-green-600",
    tutors: 845,
    price: 320,
  },
  {
    name: "English",
    category: "Languages",
    icon: BookOpen,
    bg: "bg-amber-100",
    color: "text-amber-500",
    tutors: 2123,
    price: 250,
  },
  {
    name: "Hindi",
    category: "Languages",
    icon: Languages,
    bg: "bg-orange-100",
    color: "text-orange-500",
    tutors: 1560,
    price: 220,
  },
  {
    name: "Sanskrit",
    category: "Languages",
    icon: ScrollText,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
    tutors: 410,
    price: 260,
  },
  {
    name: "Computer Science",
    category: "Computer",
    icon: Monitor,
    bg: "bg-orange-100",
    color: "text-orange-600",
    tutors: 1102,
    price: 400,
  },
  {
    name: "Computer Applications",
    category: "Computer",
    icon: Laptop,
    bg: "bg-cyan-100",
    color: "text-cyan-600",
    tutors: 698,
    price: 350,
  },
  {
    name: "Accountancy",
    category: "Commerce",
    icon: Receipt,
    bg: "bg-teal-100",
    color: "text-teal-600",
    tutors: 760,
    price: 380,
  },
  {
    name: "Economics",
    category: "Commerce",
    icon: LineChart,
    bg: "bg-blue-100",
    color: "text-blue-600",
    tutors: 690,
    price: 360,
  },
  {
    name: "Business Studies",
    category: "Commerce",
    icon: Briefcase,
    bg: "bg-violet-100",
    color: "text-violet-600",
    tutors: 540,
    price: 340,
  },
  {
    name: "History",
    category: "Humanities",
    icon: Landmark,
    bg: "bg-amber-100",
    color: "text-amber-700",
    tutors: 480,
    price: 260,
  },
  {
    name: "Geography",
    category: "Humanities",
    icon: Globe,
    bg: "bg-lime-100",
    color: "text-lime-700",
    tutors: 430,
    price: 260,
  },
  {
    name: "Art & Craft",
    category: "Arts",
    icon: Palette,
    bg: "bg-pink-100",
    color: "text-pink-600",
    tutors: 560,
    price: 300,
  },
  {
    name: "Music",
    category: "Arts",
    icon: Music,
    bg: "bg-purple-100",
    color: "text-purple-600",
    tutors: 420,
    price: 350,
  },
];

function SubjectCard({ subject }) {
  const Icon = subject.icon;
  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md">
      <div
        className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full ${subject.bg}`}
      >
        <Icon className={`h-6 w-6 ${subject.color}`} />
      </div>
      <div className="text-sm font-semibold text-slate-900">{subject.name}</div>
      <div className="mt-1 text-xs text-slate-400">{subject.category}</div>

      <div className="mt-3 text-xs text-slate-400">Tutors Available</div>
      <div className="font-bold" style={{ color: PURPLE }}>
        {subject.tutors.toLocaleString()}
      </div>
      <div className="mt-1 text-xs text-slate-400">
        Starting ₹{subject.price}/hr
      </div>

      <button
        className="mt-4 w-full rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
        style={{ backgroundColor: PURPLE }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = PURPLE_DARK)
        }
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PURPLE)}
      >
        Find Teachers
      </button>
    </div>
  );
}

export default function SubjectsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSubjects = useMemo(() => {
    return subjectsData.filter((s) => {
      if (activeCategory !== "All" && s.category !== activeCategory)
        return false;
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
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

          <div className="flex items-center gap-5">
            <a
              onClick={() => navigate("/login")}
              className="hidden items-center gap-1.5 text-sm font-medium text-slate-700 sm:flex hover:cursor-pointer hover:text-violet-600"
            >
              <ShieldCheck className="h-4 w-4" />
              Login
            </a>
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

      {/* Page intro + search */}
      <section
        style={{ backgroundColor: "#F4F2FC" }}
        className="border-b border-indigo-50"
      >
        <div className="mx-auto max-w-4xl px-6 py-12 text-center lg:px-10">
          <p className="text-sm text-slate-400">
            Home <span className="mx-1">/</span>{" "}
            <span className="font-medium text-slate-600">Subjects</span>
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl">
            Explore All Subjects
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            Choose from {subjectsData.length}+ subjects taught by verified,
            experienced tutors near you.
          </p>

          <div className="relative mx-auto mt-7 max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search subjects..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm shadow-xl shadow-indigo-100/70 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>
      </section>

      {/* Category filters + grid */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
                style={
                  isActive
                    ? { backgroundColor: PURPLE, color: "#FFFFFF" }
                    : {
                        backgroundColor: "#FFFFFF",
                        color: "#475569",
                        border: "1px solid #E2E8F0",
                      }
                }
              >
                {cat}
              </button>
            );
          })}
        </div>

        <p className="mb-5 mt-5 text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {filteredSubjects.length}
          </span>{" "}
          of {subjectsData.length} subjects
        </p>

        {filteredSubjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
            <Search className="h-10 w-10 text-slate-300" />
            <h3 className="mt-4 font-semibold text-slate-900">
              No subjects found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Try a different search term or category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: PURPLE }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredSubjects.map((subject) => (
              <SubjectCard key={subject.name} subject={subject} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div
          className="mt-14 rounded-2xl border border-indigo-100 px-8 py-10 text-center"
          style={{ backgroundColor: "#F4F2FC" }}
        >
          <h2 className="text-2xl font-extrabold text-slate-900">
            Can't find your subject?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-slate-500">
            Tell us what you're looking for and we'll help you find the right
            tutor, or share your own expertise and start teaching.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              className="rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white"
              style={{
                borderColor: "#C9BEF2",
                color: PURPLE,
                backgroundColor: "#FFFFFF",
              }}
            >
              Request a Subject
            </button>
            <button
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors"
              style={{ backgroundColor: PURPLE }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = PURPLE_DARK)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = PURPLE)
              }
            >
              Become a Teacher
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
