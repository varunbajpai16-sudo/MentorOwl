import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  MapPin,
  ShieldCheck,
  Users,
  Award,
  Calendar,
  Star,
  ArrowRight,
  Calculator,
  FlaskConical,
  Atom,
  CheckCircle2,
  Clock,
  MessageCircle,
  Briefcase,
  Languages,
  Laptop,
  Building2,
  ChevronRight,
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

// In a real app this would come from props / route params / an API call
const teacher = {
  name: "Priya Sharma",
  title: "Mathematics Tutor",
  img: "https://i.pravatar.cc/300?img=47",
  rating: "4.9",
  reviews: "120",
  experience: "5+ Years",
  students: "340+",
  responseTime: "Under 2 hrs",
  location: "Meerut, Uttar Pradesh",
  price: "₹500",
  languages: ["English", "Hindi"],
  subjects: [
    {
      name: "Mathematics",
      icon: Calculator,
      bg: "bg-indigo-100",
      color: "text-indigo-600",
    },
    {
      name: "Algebra",
      icon: FlaskConical,
      bg: "bg-emerald-100",
      color: "text-emerald-600",
    },
    { name: "Calculus", icon: Atom, bg: "bg-rose-100", color: "text-rose-500" },
  ],
  about:
    "I'm a passionate mathematics educator with over five years of experience helping students build confidence and clarity in problem solving. My sessions focus on strong fundamentals, exam strategy, and making maths genuinely enjoyable. I've helped students move from struggling grades to top ranks in their board and competitive exams.",
  education: [
    {
      degree: "M.Sc. Mathematics",
      school: "Delhi University",
      year: "2017 - 2019",
    },
    {
      degree: "B.Sc. Mathematics (Hons)",
      school: "Meerut College",
      year: "2014 - 2017",
    },
  ],
  workExperience: [
    {
      role: "Senior Mathematics Tutor",
      place: "TutorMate Independent",
      duration: "2021 - Present",
    },
    {
      role: "Mathematics Faculty",
      place: "Bright Minds Academy",
      duration: "2019 - 2021",
    },
  ],
  modes: [
    { label: "Online Classes", icon: Laptop },
    { label: "In-Person Classes", icon: Building2 },
  ],
};

const stats = [
  {
    icon: Briefcase,
    bg: "bg-indigo-100",
    color: "text-indigo-600",
    label: "Experience",
    value: teacher.experience,
  },
  {
    icon: Users,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
    label: "Students Taught",
    value: teacher.students,
  },
  {
    icon: Star,
    bg: "bg-amber-100",
    color: "text-amber-500",
    label: "Avg. Rating",
    value: `${teacher.rating} / 5`,
  },
  {
    icon: Clock,
    bg: "bg-rose-100",
    color: "text-rose-500",
    label: "Response Time",
    value: teacher.responseTime,
  },
];

const reviews = [
  {
    name: "Anita Kapoor",
    role: "Parent of Class 10 Student",
    img: "https://i.pravatar.cc/100?img=32",
    rating: 5,
    date: "2 weeks ago",
    text: "Priya ma'am explains concepts so clearly that my daughter actually looks forward to her maths classes now. Her marks have improved a lot in just a few months.",
  },
  {
    name: "Rohit Singh",
    role: "Class 12 Student",
    img: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    date: "1 month ago",
    text: "Best maths teacher I've had. Patient, well prepared, and always ready to repeat a topic until it actually makes sense.",
  },
  {
    name: "Sunita Rao",
    role: "Parent of Class 8 Student",
    img: "https://i.pravatar.cc/100?img=45",
    rating: 4,
    date: "2 months ago",
    text: "Good teaching style and very punctual. Would love even more practice worksheets between sessions.",
  },
];

const availability = [
  { day: "Mon", available: true },
  { day: "Tue", available: true },
  { day: "Wed", available: false },
  { day: "Thu", available: true },
  { day: "Fri", available: true },
  { day: "Sat", available: true },
  { day: "Sun", available: false },
];

const similarTeachers = [
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

export default function TeacherProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Header - identical to homepage for a consistent shell */}
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

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-5 lg:px-10">
        <div className="flex items-center gap-1.5 text-sm text-slate-400">
          <span
            onClick={() => navigate("/")}
            className="hover:cursor-pointer hover:text-violet-600"
          >
            Home
          </span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span
            onClick={() => navigate("/findteacher")}
            className="hover:cursor-pointer hover:text-violet-600"
          >
            Find Teachers
          </span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-slate-600">{teacher.name}</span>
        </div>
      </div>

      {/* Profile hero */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{ backgroundColor: "#F4F2FC" }}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative mx-auto flex-shrink-0 sm:mx-0">
              <img
                src={teacher.img}
                alt={teacher.name}
                className="h-32 w-32 rounded-full object-cover ring-4 ring-white shadow-md sm:h-36 sm:w-36"
              />
              <div
                className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white"
                style={{ backgroundColor: PURPLE }}
                title="Verified Teacher"
              >
                <CheckCircle2 className="h-4 w-4 text-white" />
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                  {teacher.name}
                </h1>
                <span
                  className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold"
                  style={{ color: PURPLE }}
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
                <span className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-amber-500">
                  <Award className="h-3.5 w-3.5" />
                  Top Rated
                </span>
              </div>
              <p className="mt-1 text-lg font-medium" style={{ color: PURPLE }}>
                {teacher.title}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-sm text-slate-500 sm:justify-start">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-700">
                    {teacher.rating}
                  </span>
                  <span>({teacher.reviews} Reviews)</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {teacher.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  {teacher.experience} Experience
                </span>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                {teacher.subjects.map((s) => (
                  <span
                    key={s.name}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-shrink-0 flex-col gap-3 sm:w-48">
              <button
                className="flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
                style={{ backgroundColor: PURPLE }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = PURPLE_DARK)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = PURPLE)
                }
              >
                <Calendar className="h-4 w-4" />
                Book a Trial Class
              </button>
              <button
                className="flex items-center justify-center gap-2 rounded-lg border bg-white px-5 py-3 text-sm font-medium transition-colors hover:bg-indigo-50"
                style={{ borderColor: "#D9D2F5", color: PURPLE }}
              >
                <MessageCircle className="h-4 w-4" />
                Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats row - same card language as the homepage features section */}
      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-10">
        <div className="grid gap-8 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white px-6 py-8 shadow-sm sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`flex items-center gap-4 pt-8 sm:pt-0 ${i === 0 ? "" : "sm:pl-8"}`}
              >
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${s.bg}`}
                >
                  <Icon className={`h-6 w-6 ${s.color}`} />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900">
                    {s.value}
                  </div>
                  <div className="text-sm text-slate-500">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.65fr_1fr]">
          {/* LEFT column */}
          <div className="space-y-8">
            {/* About */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-slate-900">About Me</h2>
              <p className="mt-3 leading-relaxed text-slate-500">
                {teacher.about}
              </p>
            </div>

            {/* Subjects & Expertise */}
            <div>
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                Subjects &amp; Expertise
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {teacher.subjects.map((s) => {
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
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Education */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-slate-900">
                Education &amp; Qualifications
              </h2>
              <div className="mt-5 space-y-5">
                {teacher.education.map((e) => (
                  <div key={e.degree} className="flex gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                      <GraduationCap className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {e.degree}
                      </div>
                      <div className="text-sm text-slate-500">{e.school}</div>
                      <div className="text-xs text-slate-400">{e.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-slate-900">
                Teaching Experience
              </h2>
              <div className="mt-5 space-y-5">
                {teacher.workExperience.map((w) => (
                  <div key={w.role} className="flex gap-4">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <Briefcase className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {w.role}
                      </div>
                      <div className="text-sm text-slate-500">{w.place}</div>
                      <div className="text-xs text-slate-400">{w.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  Student Reviews
                </h2>
                <div className="flex items-center gap-1.5 text-sm">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-700">
                    {teacher.rating}
                  </span>
                  <span className="text-slate-400">
                    ({teacher.reviews} Reviews)
                  </span>
                </div>
              </div>
              <div className="mt-5 divide-y divide-slate-100">
                {reviews.map((r, i) => (
                  <div key={r.name} className={i === 0 ? "pb-5" : "py-5"}>
                    <div className="flex items-start gap-3">
                      <img
                        src={r.img}
                        alt={r.name}
                        className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <div className="text-sm font-semibold text-slate-900">
                              {r.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              {r.role}
                            </div>
                          </div>
                          <span className="text-xs text-slate-400">
                            {r.date}
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`h-3.5 w-3.5 ${idx < r.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
                            />
                          ))}
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-slate-500">
                          {r.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900">
                  {teacher.price}
                </span>
                <span className="text-sm text-slate-400">/ hour</span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Trial class available at a discounted rate.
              </p>
              <button
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
                style={{ backgroundColor: PURPLE }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = PURPLE_DARK)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = PURPLE)
                }
              >
                <Calendar className="h-4 w-4" />
                Book a Trial Class
              </button>
            </div>

            {/* Availability */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900">
                Weekly Availability
              </h3>
              <div className="mt-4 grid grid-cols-7 gap-1.5">
                {availability.map((d) => (
                  <div
                    key={d.day}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <span className="text-xs text-slate-400">{d.day}</span>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                        d.available
                          ? "text-white"
                          : "bg-slate-100 text-slate-300"
                      }`}
                      style={d.available ? { backgroundColor: PURPLE } : {}}
                    >
                      {d.available ? <CheckCircle2 className="h-4 w-4" /> : "–"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900">Details</h3>
              <div className="mt-4 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Languages className="h-4 w-4 flex-shrink-0 text-slate-400" />
                  <span className="text-slate-600">
                    {teacher.languages.join(", ")}
                  </span>
                </div>
                {teacher.modes.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="flex items-center gap-3">
                      <Icon className="h-4 w-4 flex-shrink-0 text-slate-400" />
                      <span className="text-slate-600">{m.label}</span>
                    </div>
                  );
                })}
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 flex-shrink-0 text-slate-400" />
                  <span className="text-slate-600">
                    Responds {teacher.responseTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Similar Teachers */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">
                  Similar Teachers
                </h3>
                <a
                  onClick={() => navigate("/findteacher")}
                  className="flex items-center gap-1 text-xs font-medium hover:cursor-pointer hover:underline"
                  style={{ color: PURPLE }}
                >
                  View All <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="space-y-4">
                {similarTeachers.map((t) => (
                  <div
                    key={t.name}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
                  >
                    <img
                      src={t.img}
                      alt={t.name}
                      className={`h-12 w-12 flex-shrink-0 rounded-full object-cover ring-2 ${t.ring}`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-slate-900">
                        {t.name}
                      </div>
                      <div className="truncate text-xs text-slate-500">
                        {t.subject} <span className="text-slate-300">•</span>{" "}
                        {t.exp}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1 text-xs">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-slate-700">
                          {t.rating}
                        </span>
                        <span className="text-slate-400">({t.reviews})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
