import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  MapPin,
  Search,
  ShieldCheck,
  ChevronDown,
  Users,
  Award,
  Calendar,
  TrendingUp,
  Star,
  ArrowRight,
  Calculator,
  FlaskConical,
  Atom,
  Monitor,
  Brain,
} from "lucide-react";

const subjectList = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
];

const PURPLE = "#6C5DD3";
const PURPLE_DARK = "#5A4BC4";
const navLinks = [
  { label: "Home", link: "/" },
  { label: "Find Teachers", link: "/findteacher" },
  { label: "Subjects", link: "/subjects" },
  { label: "How it Works", link: "/howitwork" },
  { label: "Become a Teacher", link: "/becomeateacher" },
];

const features = [
  {
    icon: Users,
    bg: "bg-indigo-100",
    color: "text-indigo-600",
    title: "Verified Teachers",
    desc: "All teachers are background checked and verified.",
  },
  {
    icon: Award,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
    title: "Qualified & Experienced",
    desc: "Connect with qualified and experienced tutors.",
  },
  {
    icon: Calendar,
    bg: "bg-amber-100",
    color: "text-amber-500",
    title: "Flexible Learning",
    desc: "Choose teachers that fit your schedule and needs.",
  },
  {
    icon: TrendingUp,
    bg: "bg-rose-100",
    color: "text-rose-500",
    title: "Better Results",
    desc: "Personalized learning for better academic outcomes.",
  },
];

const subjects = [
  {
    name: "Mathematics",
    icon: Calculator,
    bg: "bg-indigo-100",
    color: "text-indigo-600",
    count: "2,345",
  },
  {
    name: "Science",
    icon: FlaskConical,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
    count: "1,892",
  },
  {
    name: "English",
    icon: BookOpen,
    bg: "bg-amber-100",
    color: "text-amber-500",
    count: "2,123",
  },
  {
    name: "Physics",
    icon: Atom,
    bg: "bg-rose-100",
    color: "text-rose-500",
    count: "1,234",
  },
  {
    name: "Chemistry",
    icon: FlaskConical,
    bg: "bg-sky-100",
    color: "text-sky-500",
    count: "987",
  },
  {
    name: "Computer Science",
    icon: Monitor,
    bg: "bg-orange-100",
    color: "text-orange-500",
    count: "1,102",
  },
];

const teachers = [
  {
    name: "Priya Sharma",
    subject: "Mathematics",
    exp: "5+ Years Exp.",
    rating: "4.9",
    reviews: "120",
    ring: "ring-slate-200",
    img: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Rahul Verma",
    subject: "Physics",
    exp: "7+ Years Exp.",
    rating: "4.8",
    reviews: "98",
    ring: "ring-sky-200",
    img: "https://i.pravatar.cc/150?img=53",
  },
  {
    name: "Anjali Mehta",
    subject: "English",
    exp: "4+ Years Exp.",
    rating: "4.7",
    reviews: "76",
    ring: "ring-rose-200",
    img: "https://i.pravatar.cc/150?img=44",
  },
];

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 600 520"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* background blob */}
      <path
        d="M300,46 C400,34 520,70 558,168 C594,262 566,372 478,432 C396,488 268,494 168,448 C72,404 28,300 50,200 C70,108 160,90 220,66 C246,55 272,50 300,46 Z"
        fill="#EEEAFC"
      />

      {/* decorative dots */}
      <circle cx="64" cy="222" r="5" fill="#D7CFF5" />
      <circle cx="542" cy="304" r="6" fill="#D7CFF5" />
      <circle cx="488" cy="360" r="4" fill="#D7CFF5" />

      {/* plus marks */}
      <g stroke="#CFC6F2" strokeWidth="2.5" strokeLinecap="round">
        <line x1="500" y1="64" x2="500" y2="80" />
        <line x1="492" y1="72" x2="508" y2="72" />
        <line x1="36" y1="368" x2="36" y2="384" />
        <line x1="28" y1="376" x2="44" y2="376" />
      </g>

      {/* lightbulb */}
      <g transform="translate(124,96)">
        <line
          x1="0"
          y1="-30"
          x2="0"
          y2="-20"
          stroke="#D8CDF0"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="-20"
          y1="-10"
          x2="-13"
          y2="-5"
          stroke="#D8CDF0"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="-10"
          x2="13"
          y2="-5"
          stroke="#D8CDF0"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          cx="0"
          cy="0"
          r="17"
          fill="none"
          stroke="#D8CDF0"
          strokeWidth="3"
        />
        <rect x="-6" y="15" width="12" height="8" rx="2" fill="#D8CDF0" />
        <line
          x1="-4"
          y1="26"
          x2="4"
          y2="26"
          stroke="#D8CDF0"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* A+ speech bubble */}
      <g transform="translate(486,124)">
        <rect
          x="-40"
          y="-28"
          width="80"
          height="52"
          rx="22"
          fill="#FFFFFF"
          stroke="#E6E0F8"
          strokeWidth="2"
        />
        <path
          d="M-16,22 L-5,22 L-12,36 Z"
          fill="#FFFFFF"
          stroke="#E6E0F8"
          strokeWidth="2"
        />
        <text
          x="0"
          y="7"
          textAnchor="middle"
          fontSize="20"
          fontWeight="700"
          fill={PURPLE}
          fontFamily="sans-serif"
        >
          A+
        </text>
      </g>

      {/* book stack bottom-left */}
      <g transform="translate(64,372)">
        <rect
          x="0"
          y="40"
          width="112"
          height="20"
          rx="4"
          fill={PURPLE}
          transform="rotate(-3 56 50)"
        />
        <rect
          x="6"
          y="20"
          width="100"
          height="20"
          rx="4"
          fill="#F5A93B"
          transform="rotate(2 56 30)"
        />
        <rect
          x="2"
          y="2"
          width="106"
          height="18"
          rx="4"
          fill="#FFFFFF"
          stroke="#ECE6FB"
          strokeWidth="2"
          transform="rotate(-2 55 11)"
        />
      </g>

      {/* pencil cup bottom-right */}
      <g transform="translate(498,372)">
        <line
          x1="10"
          y1="22"
          x2="-6"
          y2="-24"
          stroke="#F5A93B"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="24"
          y1="20"
          x2="20"
          y2="-32"
          stroke="#FF8FA3"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="36"
          y1="22"
          x2="42"
          y2="-22"
          stroke="#5FC9E8"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path d="M0,22 L48,22 L42,66 Q24,74 6,66 Z" fill={PURPLE_DARK} />
      </g>

      {/* woman torso + head */}
      <path
        d="M150,406 C150,308 176,254 230,244 C284,254 310,308 310,406 Z"
        fill="#8378E2"
      />
      <path d="M212,256 L230,294 L248,256 Z" fill="#FFFFFF" />
      <circle cx="230" cy="190" r="44" fill="#F2C49A" />
      <path
        d="M184,168 C180,228 188,278 200,300 L190,300 C172,260 170,200 188,158 Z"
        fill="#2A2540"
      />
      <path
        d="M276,168 C280,228 272,278 260,300 L270,300 C288,260 290,200 272,158 Z"
        fill="#2A2540"
      />
      <path
        d="M188,158 C192,116 268,116 272,158 C264,138 196,138 188,158 Z"
        fill="#2A2540"
      />
      <circle cx="214" cy="192" r="3.5" fill="#2A2540" />
      <circle cx="246" cy="192" r="3.5" fill="#2A2540" />
      <path
        d="M212,208 Q230,218 248,208"
        stroke="#2A2540"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* boy torso + head */}
      <path
        d="M322,406 C322,326 342,280 380,273 C418,280 438,326 438,406 Z"
        fill="#F7B955"
      />
      <circle cx="380" cy="218" r="38" fill="#F0BD8C" />
      <path
        d="M344,210 C340,188 350,158 380,154 C410,158 420,188 416,210 C412,178 348,178 344,210 Z"
        fill="#1F1B30"
      />
      <path
        d="M344,204 C340,224 344,238 350,244 L342,244 C332,228 332,200 344,190 Z"
        fill="#1F1B30"
      />
      <path
        d="M416,204 C420,224 416,238 410,244 L418,244 C428,228 428,200 416,190 Z"
        fill="#1F1B30"
      />
      <circle cx="368" cy="220" r="3" fill="#2A2540" />
      <circle cx="392" cy="220" r="3" fill="#2A2540" />
      <path
        d="M366,234 Q380,242 394,234"
        stroke="#2A2540"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* desk / open notebook (drawn over lower torsos) */}
      <rect
        x="140"
        y="392"
        width="320"
        height="74"
        rx="14"
        fill="#FFFFFF"
        stroke="#EAE3FA"
        strokeWidth="2"
      />
      <line
        x1="300"
        y1="400"
        x2="300"
        y2="458"
        stroke="#EFE9FC"
        strokeWidth="2"
      />
      <line
        x1="165"
        y1="416"
        x2="265"
        y2="416"
        stroke="#E7DFF9"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="165"
        y1="430"
        x2="245"
        y2="430"
        stroke="#E7DFF9"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="335"
        y1="416"
        x2="435"
        y2="416"
        stroke="#E7DFF9"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="335"
        y1="430"
        x2="415"
        y2="430"
        stroke="#E7DFF9"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* arms + hands resting on notebook (drawn last, on top) */}
      <path
        d="M222,332 Q258,360 272,400"
        stroke="#8378E2"
        strokeWidth="26"
        strokeLinecap="round"
        fill="none"
      />
      <line
        x1="272"
        y1="400"
        x2="304"
        y2="413"
        stroke="#3A3450"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M346,336 Q322,362 314,398"
        stroke="#F7B955"
        strokeWidth="22"
        strokeLinecap="round"
        fill="none"
      />
      <line
        x1="314"
        y1="398"
        x2="288"
        y2="408"
        stroke="#3A3450"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function TutorMateHomepage() {
  const location = useLocation();
  const navigate = useNavigate();
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

      {/* Hero */}
      <section style={{ backgroundColor: "#F4F2FC" }}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:px-10 lg:py-20">
          <div>
            <h1 className="text-5xl font-extrabold leading-[1.15] tracking-tight text-slate-900 lg:text-6xl">
              Find the Right
              <br />
              <span style={{ color: PURPLE }}>Tuition Teacher</span>
              <br />
              for You
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-500">
              Connect with experienced and trusted tuition teachers near you and
              achieve your learning goals.
            </p>

            <div className="mt-8 rounded-2xl bg-white p-5 shadow-xl shadow-indigo-100/70">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 px-4 py-3">
                  <BookOpen className="h-4 w-4 flex-shrink-0 text-slate-400" />
                  <span className="flex-1 text-sm text-slate-400">
                    Select Subject
                  </span>
                  <ChevronDown className="h-4 w-4 flex-shrink-0 text-slate-400" />
                </div>
                <div className="flex flex-1 items-center gap-2 rounded-lg border border-slate-200 px-4 py-3">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-slate-400" />
                  <span className="text-sm text-slate-400">Enter Location</span>
                </div>
                <button
                  className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-6 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: PURPLE }}
                >
                  <Search className="h-4 w-4" />
                  Search Teachers
                </button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                <span className="text-slate-500">Popular Searches:</span>
                {[
                  "Maths Teacher",
                  "Physics Teacher",
                  "English Teacher",
                  "Chemistry Teacher",
                ].map((t) => (
                  <a
                    key={t}
                    href="#"
                    className="font-medium hover:underline"
                    style={{ color: PURPLE }}
                  >
                    {t}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-8 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white px-6 py-8 shadow-sm sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`flex items-start gap-4 pt-8 sm:pt-0 ${i === 0 ? "" : "sm:pl-8"}`}
              >
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${f.bg}`}
                >
                  <Icon className={`h-6 w-6 ${f.color}`} />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{f.title}</div>
                  <div className="mt-1 text-sm leading-snug text-slate-500">
                    {f.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Subjects + Teachers */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.65fr_1fr]">
          {/* Popular Subjects */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Popular Subjects
              </h2>
              <a
                onClick={() => navigate("/subjects")}
                className="flex items-center gap-1 text-sm font-medium  hover:cursor-pointer hover:underline"
                style={{ color: PURPLE }}
              >
                View All Subjects <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {subjects.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.name}
                    className="rounded-xl border border-slate-100 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div
                      className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full ${s.bg}`}
                    >
                      <Icon className={`h-6 w-6 ${s.color}`} />
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {s.name}
                    </div>
                    <div className="mt-2 text-xs text-slate-400">
                      Tutors Available
                    </div>
                    <div className="mt-0.5 font-bold" style={{ color: PURPLE }}>
                      {s.count}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Rated Teachers */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Top Rated Teachers
              </h2>
              <a
                onClick={() => navigate("/findteacher")}
                className="flex items-center gap-1 text-sm font-medium hover:cursor-pointer hover:underline"
                style={{ color: PURPLE }}
              >
                View All Teachers <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="space-y-4">
              {teachers.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <img
                    src={t.img}
                    alt={t.name}
                    className={`h-14 w-14 flex-shrink-0 rounded-full object-cover ring-2 ${t.ring}`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-slate-900">{t.name}</div>
                    <div className="truncate text-sm text-slate-500">
                      {t.subject} <span className="text-slate-300">•</span>{" "}
                      {t.exp}
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-slate-700">
                        {t.rating}
                      </span>
                      <span className="text-slate-400">
                        ({t.reviews} Reviews)
                      </span>
                    </div>
                  </div>
                  <button
                    className="flex-shrink-0 whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-indigo-50"
                    style={{ borderColor: "#D9D2F5", color: PURPLE }}
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
