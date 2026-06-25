import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../services/axios";
import LoginLoader from "../components/Login_Loader";
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
  Brain,
  TrendingUp,
  X,
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
  { label: "Become a Teacher", link: "/teacher" },
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

const SUBJECTS = [
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
  "Coding",
  "Web Development",
];

const CLASSES = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "JEE",
  "NEET",
  "CBSE",
  "ICSE",
  "State Board",
];

const TEACHING_MODES = [
  { label: "Online Only", value: "online" },
  { label: "Offline (Home Visits)", value: "offline" },
  { label: "Both Online & Offline", value: "both" },
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
  const user = useSelector((state) => state.auth.user);

  // Form state aligned with schema
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
    subjects: [],
    classes: [],
    hourelyfee: "",
    bio: "",
    mode: [],
    education: [{ degree: "", institute: "", year: "" }],
    experienceDetails: [{ institution: "", years: "" }],
  });

  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState("");
  const [consent, setConsent] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [loading,setloading] = useState(false);
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle multi-select for subjects
  const handleSubjectToggle = (subject) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  // Handle multi-select for classes
  const handleClassToggle = (cls) => {
    setFormData((prev) => ({
      ...prev,
      classes: prev.classes.includes(cls)
        ? prev.classes.filter((c) => c !== cls)
        : [...prev.classes, cls],
    }));
  };

  // Handle multi-select for teaching modes
  const handleModeToggle = (mode) => {
    setFormData((prev) => ({
      ...prev,
      mode: prev.mode.includes(mode)
        ? prev.mode.filter((m) => m !== mode)
        : [...prev.mode, mode],
    }));
  };

  // Handle education array
  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      education: newEducation,
    }));
  };

  const addEducationField = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", institute: "", year: "" }],
    }));
  };

  const removeEducationField = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  // Handle experience array
  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...formData.experienceDetails];
    newExperience[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      experienceDetails: newExperience,
    }));
  };

  const addExperienceField = () => {
    setFormData((prev) => ({
      ...prev,
      experienceDetails: [
        ...prev.experienceDetails,
        { institution: "", years: "" },
      ],
    }));
  };

  const removeExperienceField = (index) => {
    setFormData((prev) => ({
      ...prev,
      experienceDetails: prev.experienceDetails.filter((_, i) => i !== index),
    }));
  };

  // Get user coordinates
  const getCoordinates = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;

          setCoordinates([longitude, latitude]);

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            );

            const data = await res.json();

            const address = data.address;

            setFormData((prev) => ({
              ...prev,
              location: `${address.city || address.town || address.village}, ${address.state}`,
            }));

            resolve([longitude, latitude]);
          } catch (err) {
            reject(err);
          }
        },
        (err) => reject(err),
      );
    });
  };

  useEffect(() => {
    getCoordinates().catch(() => {
      console.log("Location permission denied");
    });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coordinates) {
      try {
        await getCoordinates();
      } catch {
        alert("Please allow location access.");
        return;
      }
    }

    // Validate required fields
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.location ||
      formData.subjects.length === 0 ||
      formData.classes.length === 0 ||
      !formData.hourelyfee ||
      !formData.bio ||
      formData.mode.length === 0
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (!consent) {
      alert("Please agree to terms and conditions");
      return;
    }

    // Prepare data matching schema
    const teacherData = {
      subjects: formData.subjects,
      classes: formData.classes,
      hourelyfee: Number(formData.hourelyfee),
      location: formData.location,
      bio: formData.bio,
      mode: formData.mode,
      education: formData.education.filter((e) => e.degree && e.institute),
      experienceDetails: formData.experienceDetails.filter(
        (exp) => exp.institution && exp.years,
      ),
      coordinates: {
        type: "Point",
        coordinates,
      },
    };

    try {
      setloading(true)
      const res = await api.post("user/registerteacher", teacherData);
      console.log(res.data);
      navigate("/", {
        state: {
          accountCreated: true,
        },
      });
      setloading(false);
    } catch (error) {
      setloading(false);
      alert(error);
    }

    setSubmitted(true);
    setTimeout(() => {
      document
        .getElementById("success-msg")
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  if (loading) {
    return <LoginLoader />;
  }

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* ── HEADER ── */}
      <header className="border-b border-slate-100 bg-white sticky top-0 z-50">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <div
              onClick={() => navigate("/")}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-lg cursor-pointer"
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

          {user ? (
            <div
              onClick={() => navigate("/login")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-sm font-bold text-white shadow-md">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
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
            {/* Row 1 - Basic Info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Priya Sharma"
                  required
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
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
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  City / Location <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    name="location"
                    value={formData.location}
                    readOnly
                    placeholder="Detecting location..."
                    required
                    className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                  <button
                    type="button"
                    onClick={getCoordinates}
                    className="px-3 py-2.5 rounded-lg text-xs font-semibold text-white transition-colors"
                    style={{ backgroundColor: PURPLE }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = PURPLE_DARK)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = PURPLE)
                    }
                    title="Get your coordinates"
                  >
                    📍
                  </button>
                </div>
                {coordinates && (
                  <p className="mt-1 text-xs text-slate-400">
                    Coordinates captured: {coordinates[1].toFixed(4)},{" "}
                    {coordinates[0].toFixed(4)}
                  </p>
                )}
              </div>
            </div>

            {/* Subjects - Multi-select */}
            <div className="mt-4">
              <label className="mb-2.5 block text-sm font-medium text-slate-700">
                Subject(s) You Teach <span className="text-red-500">*</span>
              </label>
              <div className="grid gap-2 sm:grid-cols-2">
                {SUBJECTS.map((subject) => (
                  <label
                    key={subject}
                    className="flex items-center gap-2 cursor-pointer rounded-lg border border-slate-200 px-3 py-2.5 transition hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.subjects.includes(subject)}
                      onChange={() => handleSubjectToggle(subject)}
                      className="w-4 h-4 rounded accent-indigo-600"
                    />
                    <span className="text-sm text-slate-700">{subject}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Classes - Multi-select */}
            <div className="mt-4">
              <label className="mb-2.5 block text-sm font-medium text-slate-700">
                Classes/Grades You Teach <span className="text-red-500">*</span>
              </label>
              <div className="grid gap-2 sm:grid-cols-3">
                {CLASSES.map((cls) => (
                  <label
                    key={cls}
                    className="flex items-center gap-2 cursor-pointer rounded-lg border border-slate-200 px-3 py-2.5 transition hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.classes.includes(cls)}
                      onChange={() => handleClassToggle(cls)}
                      className="w-4 h-4 rounded accent-indigo-600"
                    />
                    <span className="text-sm text-slate-700">{cls}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Teaching Mode - Multi-select */}
            <div className="mt-4">
              <label className="mb-2.5 block text-sm font-medium text-slate-700">
                Teaching Mode <span className="text-red-500">*</span>
              </label>
              <div className="grid gap-2 sm:grid-cols-3">
                {TEACHING_MODES.map((mode) => (
                  <label
                    key={mode.value}
                    className="flex items-center gap-2 cursor-pointer rounded-lg border border-slate-200 px-3 py-2.5 transition hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.mode.includes(mode.value)}
                      onChange={() => handleModeToggle(mode.value)}
                      className="w-4 h-4 rounded accent-indigo-600"
                    />
                    <span className="text-sm text-slate-700">{mode.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Hourly Rate */}
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Expected Hourly Rate (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="hourelyfee"
                value={formData.hourelyfee}
                onChange={handleInputChange}
                placeholder="e.g. 500"
                min="100"
                step="50"
                required
                className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* Education Details */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-slate-700">
                  Education Details
                </label>
                <button
                  type="button"
                  onClick={addEducationField}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-colors"
                  style={{ backgroundColor: PURPLE }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = PURPLE_DARK)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = PURPLE)
                  }
                >
                  + Add Education
                </button>
              </div>
              {formData.education.map((edu, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 rounded-lg border border-slate-200 bg-slate-50"
                >
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-600">
                        Degree
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          handleEducationChange(index, "degree", e.target.value)
                        }
                        placeholder="e.g. B.Sc, M.Sc"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-600">
                        Institute
                      </label>
                      <input
                        type="text"
                        value={edu.institute}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "institute",
                            e.target.value,
                          )
                        }
                        placeholder="e.g. Delhi University"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="mb-1.5 block text-xs font-medium text-slate-600">
                          Year
                        </label>
                        <input
                          type="number"
                          value={edu.year}
                          onChange={(e) =>
                            handleEducationChange(index, "year", e.target.value)
                          }
                          placeholder="2022"
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                      {formData.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEducationField(index)}
                          className="mt-6 flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-slate-600 hover:bg-red-50 hover:border-red-200 transition"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Experience Details */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-slate-700">
                  Teaching Experience
                </label>
                <button
                  type="button"
                  onClick={addExperienceField}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-colors"
                  style={{ backgroundColor: PURPLE }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = PURPLE_DARK)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = PURPLE)
                  }
                >
                  + Add Experience
                </button>
              </div>
              {formData.experienceDetails.map((exp, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 rounded-lg border border-slate-200 bg-slate-50"
                >
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-xs font-medium text-slate-600">
                        Institution / Organization
                      </label>
                      <input
                        type="text"
                        value={exp.institution}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "institution",
                            e.target.value,
                          )
                        }
                        placeholder="e.g. Delhi Public School"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="mb-1.5 block text-xs font-medium text-slate-600">
                          Years
                        </label>
                        <input
                          type="number"
                          value={exp.years}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "years",
                              e.target.value,
                            )
                          }
                          placeholder="2"
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                      {formData.experienceDetails.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExperienceField(index)}
                          className="mt-6 flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-slate-600 hover:bg-red-50 hover:border-red-200 transition"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Brief Introduction <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell students about yourself, your teaching style, and your achievements..."
                required
                className="w-full resize-none rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* File Upload */}
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

            {/* Success Message */}
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
