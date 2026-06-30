import React from "react";
import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HomePageLoader from "../components/Loader";
import api from "../services/axios";
import {
  setTeachers,
  addTeacher,
  clearTeachers,
  setTeacherLoading,
  setTeacherError,
} from "../features/LocalTeacher/LocalTeachers";
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
  CheckCircle2,
  Menu,
  X,
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
  { label: "Become a Teacher", link: "/teacher" },
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

const subjectStyles = {
  Mathematics: { bg: "bg-indigo-50", text: "text-indigo-600" },
  Physics: { bg: "bg-rose-50", text: "text-rose-600" },
  English: { bg: "bg-amber-50", text: "text-amber-600" },
  Chemistry: { bg: "bg-sky-50", text: "text-sky-600" },
  Biology: { bg: "bg-emerald-50", text: "text-emerald-600" },
  "Computer Science": { bg: "bg-orange-50", text: "text-orange-600" },
  Hindi: { bg: "bg-fuchsia-50", text: "text-fuchsia-600" },
  Science: { bg: "bg-teal-50", text: "text-teal-600" },
  Economics: { bg: "bg-lime-50", text: "text-lime-600" },
  Commerce: { bg: "bg-cyan-50", text: "text-cyan-600" },
};

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
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers);
  const [showSuccessPopup, setShowSuccessPopup] = useState(
    location.state?.accountCreated || false,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const getTeachers = async () => {
      try {
        let latitude = null;
        let longitude = null;
        if (user?.role === "student") {
          const student = JSON.parse(localStorage.getItem("student"));
          longitude = student.coordinates.coordinates[0];
          latitude = student.coordinates.coordinates[1];
        }
        if (user?.role === "parent") {
          const parent = JSON.parse(localStorage.getItem("parent"));
          longitude = parent.coordinates.coordinates[0];
          latitude = parent.coordinates.coordinates[1];
        }

        const response = await api.post("/user/getteacher", {
          latitude,
          longitude,
        });
        localStorage.setItem(
          "localTeachers",
          JSON.stringify(response.data.data),
        );
        dispatch(setTeachers(response.data.data));
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    };

    getTeachers();
  }, []);

  useEffect(() => {
    if (location.state?.accountCreated) {
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [loading, setLoading] = useState(
    !sessionStorage.getItem("homepageLoaded"),
  );

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem("homepageLoaded", "true");
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [loading]);

  const topTeachers = [...teachers.teachers]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  if (loading) {
    return <HomePageLoader />;
  }
  return (
    <div className="min-h-screen bg-white font-sans antialiased overflow-x-hidden">
      {showSuccessPopup && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 sm:h-20 sm:w-20">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 sm:h-10 sm:w-10" />
              </div>
            </div>

            <h2 className="mt-5 text-center text-2xl font-extrabold text-slate-900 sm:mt-6 sm:text-3xl">
              Account Created!
            </h2>

            <p className="mt-3 text-center text-sm text-slate-500 sm:text-base">
              Your account has been created successfully.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="flex-1 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold sm:text-base"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setShowSuccessPopup(false);
                  navigate("/findteacher");
                }}
                className="flex-1 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white sm:text-base"
              >
                Find Teachers
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-lg sm:h-11 sm:w-11">
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

          <div className="flex items-center gap-3 sm:gap-5">
            {user ? (
              <div
                onClick={() => navigate("/profile")}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-sm font-bold text-white shadow-md sm:h-10 sm:w-10">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              </div>
            ) : (
              <>
                <a
                  onClick={() => navigate("/login")}
                  className="hidden items-center gap-1.5 text-sm font-medium text-slate-700 sm:flex hover:text-violet-600 hover:cursor-pointer"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Login
                </a>

                <button
                  onClick={() => navigate("/signup")}
                  className="rounded-lg px-3.5 py-2 text-xs font-semibold text-white sm:px-5 sm:py-2.5 sm:text-sm"
                  style={{ backgroundColor: PURPLE }}
                >
                  Sign Up
                </button>
              </>
            )}

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
                  onClick={() => navigate(link.link)}
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
            {!user && (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                <ShieldCheck className="h-4 w-4" />
                Login
              </button>
            )}
          </nav>
        )}
      </header>

      {/* Hero */}
      <section style={{ backgroundColor: "#F4F2FC" }}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:px-10 lg:py-20">
          <div>
            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
              Find the Right
              <br />
              <span style={{ color: PURPLE }}>Tuition Teacher</span>
              <br />
              for You
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-500 sm:mt-5 sm:text-lg">
              Connect with experienced and trusted tuition teachers near you and
              achieve your learning goals.
            </p>

            <div className="mt-6 rounded-2xl bg-white p-4 shadow-xl shadow-indigo-100/70 sm:mt-8 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex flex-1 items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 hover:border-violet-300 transition-colors">
                  <BookOpen className="h-4 w-4 flex-shrink-0 text-slate-400" />

                  <select
                    value={selectedSubjects[0] || ""}
                    onChange={(e) =>
                      setSelectedSubjects(
                        e.target.value ? [e.target.value] : [],
                      )
                    }
                    className="
      w-full
      appearance-none
      bg-transparent
      text-sm
      font-medium
      text-slate-700
      outline-none
      cursor-pointer
    "
                  >
                    <option value="">Select Subject</option>

                    {subjectList.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-4 h-4 w-4 text-slate-400" />
                </div>
                <div className="relative flex flex-1 items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 transition-colors hover:border-violet-300">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-slate-400" />

                  <select
                    className="
      w-full
      appearance-none
      bg-transparent
      text-sm
      font-medium
      text-slate-700
      outline-none
      cursor-pointer 
    "
                  >
                    <option value="">Select Location</option>
                    <option value="meerut">Meerut</option>
                    <option value="delhi">Delhi</option>
                    <option value="noida">Noida</option>
                    <option value="ghaziabad">Ghaziabad</option>
                    <option value="gurgaon">Gurgaon</option>
                    <option value="lucknow">Lucknow</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-4 h-4 w-4 text-slate-400" />
                </div>
                <button
                  className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-6 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: PURPLE }}
                  onClick={() => navigate("/findteacher")}
                >
                  <Search className="h-4 w-4" />
                  Search Teachers
                </button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs sm:text-sm">
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
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <div className="grid grid-cols-1 gap-6 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white px-5 py-6 shadow-sm sm:grid-cols-2 sm:gap-8 sm:divide-y-0 sm:divide-x sm:px-6 sm:py-8 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`flex items-start gap-4 ${i === 0 ? "" : "pt-6 sm:pt-0"} ${i % 2 === 1 ? "sm:pl-6 lg:pl-8" : i !== 0 ? "lg:pl-8" : ""}`}
              >
                <div
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12 ${f.bg}`}
                >
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${f.color}`} />
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
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.65fr_1fr]">
          {/* Popular Subjects */}
          <div>
            <div className="mb-5 flex items-center justify-between sm:mb-6">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Popular Subjects
              </h2>
              <a
                onClick={() => navigate("/subjects")}
                className="flex items-center gap-1 text-xs font-medium hover:cursor-pointer hover:underline sm:text-sm"
                style={{ color: PURPLE }}
              >
                View All <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
              {subjects.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.name}
                    className="rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md sm:p-5"
                  >
                    <div
                      className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full sm:h-14 sm:w-14 ${s.bg}`}
                    >
                      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${s.color}`} />
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
            <div className="mb-5 flex items-center justify-between sm:mb-6">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Top Rated Teachers
              </h2>
              <a
                onClick={() => navigate("/findteacher")}
                className="flex items-center gap-1 text-xs font-medium hover:cursor-pointer hover:underline sm:text-sm"
                style={{ color: PURPLE }}
              >
                View All <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="space-y-4">
              {topTeachers.map((teacher) => (
                <div
                  key={teacher?._id || teacher?.userid?.name}
                  className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-4"
                >
                  <div className="flex items-center gap-4 sm:contents">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-base font-bold text-white shadow-md sm:h-14 sm:w-14">
                      {teacher?.userid?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-slate-900">
                        {teacher?.userid?.name || "Unnamed Teacher"}
                      </div>

                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {teacher?.subjects?.map((subj) => {
                          const style = subjectStyles[subj] || {
                            bg: "bg-slate-100",
                            text: "text-slate-600",
                          };
                          return (
                            <span
                              key={subj}
                              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${style.bg} ${style.text}`}
                            >
                              {subj}
                            </span>
                          );
                        })}
                      </div>

                      <div className="mt-1 flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-slate-700">
                          {teacher?.rating ?? 0}
                        </span>
                        <span className="text-slate-400">
                          ({teacher?.totalReviews ?? 0} Reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate("/teacherprofile", { state: teacher })
                    }
                    className="w-full flex-shrink-0 whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-indigo-50 hover:cursor-pointer sm:w-auto"
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