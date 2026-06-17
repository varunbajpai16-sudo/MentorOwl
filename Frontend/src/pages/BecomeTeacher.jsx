import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  ShieldCheck,
  CalendarDays,
  Users,
  MapPin,
  Award,
  Upload,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
} from "lucide-react";

const PURPLE = "#6C5DD3";
const PURPLE_DARK = "#5A4BC4";
const PURPLE_LIGHT = "#F4F2FC";
const PURPLE_MID = "#EDE8FC";

const navLinks = [
  { label: "Home", link: "/" },
  { label: "Find Teachers", link: "/findteacher" },
  { label: "Subjects", link: "/subjects" },
  { label: "How it Works", link: "/howitwork" },
  { label: "Become a Teacher", link: "/becomeateacher" },
];
const stats = [
  { value: "12K+", label: "Active Teachers", color: PURPLE },
  { value: "₹45K", label: "Avg. Monthly Earnings", color: "#10B981" },
  { value: "98%", label: "Teacher Satisfaction", color: "#F59E0B" },
  { value: "1L+", label: "Students Learning", color: "#EF4444" },
];

const benefits = [
  {
    icon: CalendarDays,
    bg: "bg-indigo-100",
    color: "text-indigo-600",
    title: "Flexible Schedule",
    desc: "Teach on your own time. Morning, evening, weekends — you decide.",
  },
  {
    icon: TrendingUp,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
    title: "Set Your Own Rates",
    desc: "You control your fees. Earn what you deserve based on your expertise.",
  },
  {
    icon: Users,
    bg: "bg-amber-100",
    color: "text-amber-500",
    title: "Reach More Students",
    desc: "Access a large network of verified students actively looking for tutors.",
  },
  {
    icon: ShieldCheck,
    bg: "bg-rose-100",
    color: "text-rose-500",
    title: "Verified & Trusted",
    desc: "Your verified badge builds trust and helps you get hired faster.",
  },
  {
    icon: MapPin,
    bg: "bg-sky-100",
    color: "text-sky-500",
    title: "Teach Near You",
    desc: "Connect with students in your neighbourhood. Online or home visits.",
  },
  {
    icon: Award,
    bg: "bg-purple-100",
    color: "text-purple-600",
    title: "Build Your Reputation",
    desc: "Get reviews, ratings, and grow a strong teaching profile over time.",
  },
];

const steps = [
  {
    num: "1",
    title: "Create Your Profile",
    desc: "Fill in your details, subjects, experience, and upload your qualifications.",
  },
  {
    num: "2",
    title: "Get Verified",
    desc: "Our team reviews your profile and verifies your credentials within 48 hours.",
  },
  {
    num: "3",
    title: "Start Teaching",
    desc: "Students contact you directly. Accept bookings and start earning.",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Maths Teacher · Meerut",
    initials: "PS",
    bg: "bg-indigo-100",
    text: "TutorMate helped me grow from 2 students to 18 in just three months. The platform is simple and students reach out quickly.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Physics Teacher · Delhi",
    initials: "RV",
    bg: "bg-emerald-100",
    text: "I love that I can set my own rates and schedule. I now earn more than my previous full-time job while working fewer hours.",
    rating: 5,
  },
  {
    name: "Anjali Mehta",
    role: "English Teacher · Lucknow",
    initials: "AM",
    bg: "bg-amber-100",
    text: "The verification badge made a huge difference — parents trust me right away. Getting my first 5 students took less than a week!",
    rating: 5,
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function BecomeATeacher() {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      document
        .getElementById("success-msg")
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* ── HEADER ── */}
      <header className="border-b border-slate-100 bg-white sticky top-0 z-50">
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

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
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
              className="hidden items-center gap-1.5 text-sm font-medium text-slate-700 sm:flex hover:cursor-pointer hover:text-violet-600 "
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

      {/* ── HERO ── */}
      <section style={{ backgroundColor: PURPLE_LIGHT }}>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-10 lg:py-20">
          <div>
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
              style={{ backgroundColor: PURPLE_MID, color: PURPLE }}
            >
              <Star className="h-3.5 w-3.5 fill-current" />
              Join 12,000+ teachers on TutorMate
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.15] tracking-tight text-slate-900 lg:text-6xl">
              Share Your Knowledge,
              <br />
              <span style={{ color: PURPLE }}>Inspire Students</span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-500">
              Join TutorMate as a teacher and connect with thousands of eager
              students near you. Set your own schedule, rates, and subjects —
              and start earning today.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors"
                style={{ backgroundColor: PURPLE }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = PURPLE_DARK)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = PURPLE)
                }
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </a>
              <button
                onClick={() => navigate("/howitwork")}
                className="inline-flex items-center gap-2 rounded-lg hover:cursor-pointer border px-6 py-3 text-sm font-semibold transition-colors hover:bg-indigo-200"
                style={{ borderColor: "#D9D2F5", color: PURPLE }}
              >
                Learn How It Works
              </button>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <div
                  className="text-3xl font-extrabold"
                  style={{ color: s.color }}
                >
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY TEACH ── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Why teach on TutorMate?
          </h2>
          <p className="mt-3 text-base text-slate-500">
            Everything you need to grow as a teacher and earn on your terms.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${b.bg}`}
                >
                  <Icon className={`h-6 w-6 ${b.color}`} />
                </div>
                <div className="font-semibold text-slate-900">{b.title}</div>
                <div className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  {b.desc}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ backgroundColor: PURPLE_LIGHT }} className="px-6 py-16">
        <div className="mx-auto max-w-7xl lg:px-10">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">
              How to get started
            </h2>
            <p className="mt-3 text-base text-slate-500">
              Three simple steps to start earning as a tutor.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.num}
                className="rounded-2xl border border-white bg-white p-8 text-center shadow-sm"
              >
                <div
                  className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full text-xl font-extrabold text-white"
                  style={{ backgroundColor: PURPLE }}
                >
                  {s.num}
                </div>
                <div className="font-semibold text-slate-900">{s.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-slate-500">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section id="apply" className="px-6 py-16">
        <div className="mx-auto max-w-2xl lg:px-0">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Apply to become a teacher
            </h2>
            <p className="mt-3 text-base text-slate-500">
              Fill in the details below and we'll get back to you within 48
              hours.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm"
          >
            {/* Row 1 */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  required
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="yourname@email.com"
                  required
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  City / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Meerut, Uttar Pradesh"
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Subject(s) You Teach
                </label>
                <select
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="">Select primary subject</option>
                  {[
                    "Mathematics",
                    "Physics",
                    "Chemistry",
                    "Biology",
                    "English",
                    "Computer Science",
                    "History",
                    "Geography",
                    "Hindi",
                    "Economics",
                  ].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Years of Experience
                </label>
                <select className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100">
                  <option value="">Select experience</option>
                  {[
                    "Less than 1 year",
                    "1–3 years",
                    "3–5 years",
                    "5–10 years",
                    "10+ years",
                  ].map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4 */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Highest Qualification
                </label>
                <select className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100">
                  <option value="">Select qualification</option>
                  {[
                    "12th Pass",
                    "Diploma",
                    "Bachelor's Degree",
                    "Master's Degree",
                    "B.Ed / M.Ed",
                    "PhD",
                  ].map((q) => (
                    <option key={q}>{q}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Teaching Mode
                </label>
                <select className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100">
                  <option value="">Select mode</option>
                  {[
                    "Home Visits (Student's Home)",
                    "Home Tuition (My Home)",
                    "Online Only",
                    "Both Online & In-person",
                  ].map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Hourly rate */}
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Expected Hourly Rate (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 500"
                min="100"
                step="50"
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Bio */}
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Brief Introduction
              </label>
              <textarea
                rows={4}
                placeholder="Tell students about yourself, your teaching style, and your achievements..."
                className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* File upload */}
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Upload Qualification / ID Proof
              </label>
              <label
                htmlFor="file-upload"
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) setFileName(file.name);
                }}
                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition ${
                  dragOver
                    ? "border-indigo-400 bg-indigo-50"
                    : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/40"
                }`}
              >
                <Upload className="h-7 w-7 text-slate-400" />
                {fileName ? (
                  <span
                    className="text-sm font-medium"
                    style={{ color: PURPLE }}
                  >
                    {fileName}
                  </span>
                ) : (
                  <>
                    <span className="text-sm text-slate-500">
                      Drag & drop files here, or{" "}
                      <span style={{ color: PURPLE }} className="font-medium">
                        browse
                      </span>
                    </span>
                    <span className="text-xs text-slate-400">
                      PDF, JPG, PNG up to 5 MB
                    </span>
                  </>
                )}
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFileName(file.name);
                  }}
                />
              </label>
            </div>

            {/* Consent */}
            <div className="mt-5 flex items-start gap-3">
              <input
                id="consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer rounded accent-indigo-600"
              />
              <label
                htmlFor="consent"
                className="cursor-pointer text-sm leading-relaxed text-slate-500"
              >
                I agree to the{" "}
                <a
                  href="#"
                  style={{ color: PURPLE }}
                  className="font-medium hover:underline"
                >
                  Terms & Conditions
                </a>{" "}
                and confirm that the information provided is accurate. I consent
                to a background verification check.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-sm transition-colors"
              style={{ backgroundColor: PURPLE }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = PURPLE_DARK)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = PURPLE)
              }
            >
              Submit Application <ArrowRight className="h-4 w-4" />
            </button>

            {/* Success */}
            {submitted && (
              <div
                id="success-msg"
                className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3.5 text-sm font-medium text-emerald-700"
              >
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                Application submitted! We'll reach out within 48 hours.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ backgroundColor: PURPLE_LIGHT }} className="px-6 py-16">
        <div className="mx-auto max-w-7xl lg:px-10">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Hear from our teachers
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-white bg-white p-6 shadow-sm"
              >
                <StarRating count={t.rating} />
                <p className="text-sm leading-relaxed text-slate-500">
                  "{t.text}"
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${t.bg}`}
                    style={{ color: PURPLE }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div
          className="rounded-3xl px-8 py-14 text-center"
          style={{ backgroundColor: PURPLE }}
        >
          <h2 className="text-3xl font-extrabold text-white">
            Ready to start teaching?
          </h2>
          <p className="mt-3 text-base text-indigo-200">
            Join thousands of teachers already earning on TutorMate.
          </p>
          <a
            href="#apply"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-3.5 text-sm font-bold transition hover:bg-indigo-50"
            style={{ color: PURPLE }}
          >
            Apply Now — It's Free
          </a>
        </div>
      </section>
    </div>
  );
}
