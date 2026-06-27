import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePageLoader from "../components/Loader";
import {
  BookOpen,
  MapPin,
  ShieldCheck,
  Star,
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Wifi,
  Home as HomeIcon,
  Mail,
  Phone,
  MessageCircle,
  Brain,
  CalendarCheck,
  Users,
  BadgeCheck,
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

// Adjust this to whatever route your backend actually exposes,
// e.g. `${BASE_URL}/teacher/${id}` should return the Teacher doc
// with `userid` populated (name, email, phone, profileImage).
const BASE_URL = "https://tutormate-pzpe.onrender.com/api/v1";

// Placeholder data so the page renders something meaningful while
// the API call is wired up, or if it fails during local development.
// Safe to delete once GET `${BASE_URL}/teacher/:id` is live.
const SAMPLE_TEACHER = {
  _id: "demo",
  userid: {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 98765 43210",
    profileImage: "https://i.pravatar.cc/300?img=47",
  },
  subjects: ["Mathematics", "Physics"],
  classes: ["Class 9", "Class 10", "Class 11", "Class 12"],
  hourelyfee: 600,
  location: "Meerut, Uttar Pradesh",
  bio:
    "I'm a mathematics and physics tutor with over 5 years of experience helping school students build strong fundamentals and exam confidence. I focus on concept clarity first, then plenty of practice with past papers, and I adapt my pace to how each student learns best.",
  rating: 4.9,
  totalReviews: 120,
  mode: ["online", "offline"],
  isVerifiedTeacher: true,
  education: [
    { degree: "M.Sc. Mathematics", institute: "Delhi University", year: 2018 },
    { degree: "B.Sc. Mathematics (Hons)", institute: "Delhi University", year: 2016 },
  ],
  experienceDetails: [
    { institution: "Bright Future Academy", years: 3 },
    { institution: "Private Home Tuitions", years: 2 },
  ],
};

const SAMPLE_REVIEWS = [
  {
    name: "Ananya Gupta",
    rating: 5,
    text: "Explains concepts very clearly and is always patient with doubts. My son's grades improved a lot in two months.",
  },
  {
    name: "Karan Singh",
    rating: 5,
    text: "Very structured classes and punctual. Highly recommend for board exam preparation.",
  },
  {
    name: "Meera Joshi",
    rating: 4,
    text: "Good teaching style, sessions are interactive. Would have liked a few more practice sheets.",
  },
];

function renderStars(rating = 0) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />,
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <Star
          key={i}
          className="h-4 w-4 fill-amber-400 text-amber-400 opacity-50"
        />,
      );
    } else {
      stars.push(<Star key={i} className="h-4 w-4 text-slate-200" />);
    }
  }
  return stars;
}

export default function TeacherProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [teacher, setTeacher] = useState(SAMPLE_TEACHER);
  const [loading, setLoading] = useState(Boolean(id));
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let active = true;

    const fetchTeacher = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/teacher/${id}`);
        if (!res.ok) throw new Error("Failed to fetch teacher");
        const data = await res.json();
        const teacherData = data?.data || data?.teacher || data;

        if (!active) return;

        if (teacherData && Object.keys(teacherData).length > 0) {
          setTeacher(teacherData);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.log("Could not load teacher profile:", error);
        // Keep showing sample data during development instead of a hard error.
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchTeacher();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) return <HomePageLoader />;

  if (notFound) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
          <Users className="h-8 w-8 text-rose-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Teacher not found
        </h1>
        <p className="max-w-sm text-slate-500">
          This teacher profile doesn't exist or may have been removed.
        </p>
        <button
          onClick={() => navigate("/findteacher")}
          className="rounded-xl px-6 py-3 text-sm font-semibold text-white"
          style={{ backgroundColor: PURPLE }}
        >
          Browse Teachers
        </button>
      </div>
    );
  }

  const {
    userid: tutor = {},
    subjects = [],
    classes = [],
    hourelyfee,
    location: teacherLocation,
    bio,
    rating = 0,
    totalReviews = 0,
    mode = [],
    isVerifiedTeacher,
    education = [],
    experienceDetails = [],
  } = teacher || {};

  const totalExperience = experienceDetails.reduce(
    (sum, e) => sum + (Number(e.years) || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
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
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.link)}
                className="pb-5 -mb-5 text-slate-600 transition-colors hover:cursor-pointer hover:text-black"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {user ? (
            <div
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-sm font-bold text-white shadow-md">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <a
                onClick={() => navigate("/login")}
                className="hidden cursor-pointer items-center gap-1.5 text-sm font-medium text-slate-700 sm:flex hover:text-violet-600"
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
          )}
        </div>
      </header>

      {/* Back link */}
      <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-violet-600"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      </div>

      {/* Profile hero */}
      <section className="mx-auto max-w-7xl px-6 pt-4 lg:px-10">
        <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
          <div className="h-28 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700" />
          <div className="relative bg-white px-6 pb-8 sm:px-10">
            <div className="-mt-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <img
                  src={tutor.profileImage || "https://i.pravatar.cc/300"}
                  alt={tutor.name || "Teacher"}
                  className="h-28 w-28 flex-shrink-0 rounded-2xl border-4 border-white object-cover shadow-md"
                />
                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-extrabold text-slate-900">
                      {tutor.name || "Tutor"}
                    </h1>
                    {isVerifiedTeacher && (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                        <ShieldCheck className="h-3.5 w-3.5" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    {teacherLocation && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {teacherLocation}
                      </span>
                    )}
                    {totalExperience > 0 && (
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {totalExperience}+ yrs experience
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    {renderStars(rating)}
                    <span className="text-sm font-semibold text-slate-700">
                      {Number(rating).toFixed(1)}
                    </span>
                    <span className="text-sm text-slate-400">
                      ({totalReviews} Reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  <MessageCircle className="h-4 w-4" /> Message
                </button>
                <button
                  className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: PURPLE }}
                >
                  <CalendarCheck className="h-4 w-4" /> Book a Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl gap-8 px-6 py-10 lg:grid lg:grid-cols-[1.7fr_1fr] lg:px-10">
        <div className="space-y-8">
          {/* About */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">About</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
              {bio}
            </p>
          </div>

          {/* Subjects, classes, mode */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Subjects &amp; Classes
            </h2>

            <div className="mt-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Subjects
              </div>
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-3 py-1.5 text-sm font-medium"
                    style={{ backgroundColor: "#EEEAFC", color: PURPLE_DARK }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Classes
              </div>
              <div className="flex flex-wrap gap-2">
                {classes.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Teaching Mode
              </div>
              <div className="flex flex-wrap gap-2">
                {mode.map((m) => (
                  <span
                    key={m}
                    className="flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-600"
                  >
                    {m === "online" ? (
                      <Wifi className="h-3.5 w-3.5" />
                    ) : (
                      <HomeIcon className="h-3.5 w-3.5" />
                    )}
                    {m === "online" ? "Online" : "Home Tuition"}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Education</h2>
            <div className="mt-4 space-y-5">
              {education.length === 0 && (
                <p className="text-sm text-slate-400">
                  No education details added yet.
                </p>
              )}
              {education.map((ed, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                    <GraduationCap className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {ed.degree}
                    </div>
                    <div className="text-sm text-slate-500">
                      {ed.institute}
                      {ed.year ? ` • ${ed.year}` : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Experience</h2>
            <div className="mt-4 space-y-5">
              {experienceDetails.length === 0 && (
                <p className="text-sm text-slate-400">
                  No experience details added yet.
                </p>
              )}
              {experienceDetails.map((exp, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                    <Briefcase className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {exp.institution}
                    </div>
                    <div className="text-sm text-slate-500">
                      {exp.years} {exp.years === 1 ? "year" : "years"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Student Reviews
              </h2>
              <div className="flex items-center gap-1.5 text-sm">
                {renderStars(rating)}
                <span className="font-semibold text-slate-700">
                  {Number(rating).toFixed(1)}
                </span>
                <span className="text-slate-400">({totalReviews})</span>
              </div>
            </div>

            {totalReviews > 0 ? (
              <div className="mt-5 space-y-5 divide-y divide-slate-100">
                {SAMPLE_REVIEWS.map((r) => (
                  <div key={r.name} className="pt-5 first:pt-0 first:border-0">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-slate-900">
                        {r.name}
                      </div>
                      <div className="flex">{renderStars(r.rating)}</div>
                    </div>
                    <p className="mt-1.5 text-sm text-slate-500">{r.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-400">
                No reviews yet. Be the first to book a session and share your
                feedback.
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="mt-8 lg:mt-0">
          <div className="space-y-6 lg:sticky lg:top-6">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900">
                  ₹{hourelyfee}
                </span>
                <span className="text-sm text-slate-400">/ hour</span>
              </div>

              <button
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white"
                style={{ backgroundColor: PURPLE }}
              >
                <CalendarCheck className="h-4 w-4" /> Book a Session
              </button>
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                <MessageCircle className="h-4 w-4" /> Message Teacher
              </button>

              <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm">
                {teacherLocation && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    {teacherLocation}
                  </div>
                )}
                {tutor.email && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    {tutor.email}
                  </div>
                )}
                {tutor.phone && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400" />
                    {tutor.phone}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Users className="h-4 w-4 text-violet-600" />
                Why students choose {tutor.name?.split(" ")[0] || "this teacher"}
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-500">
                <li className="flex gap-2">
                  <BadgeCheck className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                  {isVerifiedTeacher
                    ? "Identity & qualifications verified"
                    : "Profile under review"}
                </li>
                <li className="flex gap-2">
                  <BadgeCheck className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                  {totalExperience > 0
                    ? `${totalExperience}+ years of teaching experience`
                    : "Building teaching experience"}
                </li>
                <li className="flex gap-2">
                  <BadgeCheck className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                  Responds quickly to messages
                </li>
              </ul>
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