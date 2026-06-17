import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Users,
  MapPin,
  ChevronDown,
  Navigation,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
} from "lucide-react";

const PURPLE = "#6C5DD3";
const PURPLE_DARK = "#5A4BC4";

const childClassOptions = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);

const locationOptions = ["Meerut", "Delhi", "Noida", "Ghaziabad", "Gurgaon", "Lucknow"];

const subjectList = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
];

export default function RegisterParentPage() {
  const navigate = useNavigate();
  const nextChildId = useRef(2);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
  });
  const [children, setChildren] = useState([{ id: 1, name: "", class: "", subjects: [] }]);
  const [coordinates, setCoordinates] = useState(null); // [lng, lat]
  const [locationStatus, setLocationStatus] = useState("idle"); // idle | loading | success | error
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addChild = () => {
    setChildren((prev) => [
      ...prev,
      { id: nextChildId.current++, name: "", class: "", subjects: [] },
    ]);
  };

  const removeChild = (id) => {
    setChildren((prev) => (prev.length > 1 ? prev.filter((c) => c.id !== id) : prev));
  };

  const updateChild = (id, field, value) => {
    setChildren((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const toggleChildSubject = (id, subject) => {
    setChildren((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              subjects: c.subjects.includes(subject)
                ? c.subjects.filter((s) => s !== subject)
                : [...c.subjects, subject],
            }
          : c,
      ),
    );
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      return;
    }
    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoordinates([pos.coords.longitude, pos.coords.latitude]);
        setLocationStatus("success");
      },
      () => setLocationStatus("error"),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = "Full name is required";
    if (!formData.email.trim()) next.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) next.email = "Enter a valid email";
    if (!formData.password) next.password = "Password is required";
    else if (formData.password.length < 6) next.password = "Use at least 6 characters";
    if (formData.confirmPassword !== formData.password)
      next.confirmPassword = "Passwords do not match";

    const childErrors = {};
    children.forEach((child) => {
      const ce = {};
      if (!child.name.trim()) ce.name = "Name is required";
      if (!child.class) ce.class = "Select a class";
      if (child.subjects.length === 0) ce.subjects = "Select at least one subject";
      if (Object.keys(ce).length) childErrors[child.id] = ce;
    });
    if (Object.keys(childErrors).length) next.children = childErrors;

    if (!formData.location) next.location = "Select your city";
    if (!coordinates) next.coordinates = "Share your location so we can find nearby tutors";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "parent",
        children: children.map(({ id, ...rest }) => rest),
        location: formData.location,
        coordinates: { type: "Point", coordinates },
      };

      const res = await fetch("/api/auth/register/parent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      navigate("/login");
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "w-full rounded-lg border bg-white pl-10 pr-4 py-3 text-sm font-medium text-slate-700 outline-none transition-colors focus:ring-2 focus:ring-violet-100";

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
            className="hidden items-center gap-1.5 text-sm font-medium text-slate-700 sm:flex hover:cursor-pointer hover:text-violet-600"
          >
            Already have an account? <span style={{ color: PURPLE }}>Log In</span>
          </a>
        </div>
      </header>

      {/* Form */}
      <section className="flex flex-1 justify-center px-6 py-12" style={{ backgroundColor: "#F4F2FC" }}>
        <div className="w-full max-w-2xl">
          <button
            onClick={() => navigate("/rolechoose")}
            className="mb-6 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:cursor-pointer hover:text-violet-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-xl shadow-indigo-100/70">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
              <Users className="h-7 w-7 text-amber-500" />
            </div>
            <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900">
              Create your Parent account
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
              Add your child's details so we can match them with the right
              tutors nearby.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
              {/* Account details */}
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: PURPLE }}
                >
                  Account Details
                </span>

                <div className="mt-4 space-y-4">
                  <div>
                    <div className="relative flex items-center">
                      <User className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full name"
                        className={`${inputBase} ${
                          errors.name ? "border-rose-300" : "border-slate-200 focus:border-violet-400"
                        }`}
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
                  </div>

                  <div>
                    <div className="relative flex items-center">
                      <Mail className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email address"
                        className={`${inputBase} ${
                          errors.email ? "border-rose-300" : "border-slate-200 focus:border-violet-400"
                        }`}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="relative flex items-center">
                        <Lock className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
                        <input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password"
                          className={`${inputBase} pr-10 ${
                            errors.password ? "border-rose-300" : "border-slate-200 focus:border-violet-400"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3.5 text-slate-400 hover:cursor-pointer hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-xs text-rose-500">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <div className="relative flex items-center">
                        <Lock className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
                        <input
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm password"
                          className={`${inputBase} pr-10 ${
                            errors.confirmPassword
                              ? "border-rose-300"
                              : "border-slate-200 focus:border-violet-400"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((v) => !v)}
                          className="absolute right-3.5 text-slate-400 hover:cursor-pointer hover:text-slate-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-xs text-rose-500">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Children */}
              <div className="border-t border-slate-100 pt-6">
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: PURPLE }}
                >
                  Your Children
                </span>

                <div className="mt-4 space-y-4">
                  {children.map((child, index) => {
                    const childErr = errors.children?.[child.id] || {};
                    return (
                      <div
                        key={child.id}
                        className="rounded-xl border border-slate-100 bg-slate-50/60 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-700">
                            Child {index + 1}
                          </span>
                          {children.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeChild(child.id)}
                              className="flex items-center gap-1 text-xs font-medium text-rose-500 hover:cursor-pointer hover:text-rose-600"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          <div>
                            <div className="relative flex items-center">
                              <User className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
                              <input
                                value={child.name}
                                onChange={(e) => updateChild(child.id, "name", e.target.value)}
                                placeholder="Child's name"
                                className={`${inputBase} ${
                                  childErr.name
                                    ? "border-rose-300"
                                    : "border-slate-200 focus:border-violet-400"
                                }`}
                              />
                            </div>
                            {childErr.name && (
                              <p className="mt-1 text-xs text-rose-500">{childErr.name}</p>
                            )}
                          </div>

                          <div>
                            <div className="relative flex items-center">
                              <BookOpen className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
                              <select
                                value={child.class}
                                onChange={(e) => updateChild(child.id, "class", e.target.value)}
                                className={`${inputBase} appearance-none pr-10 hover:cursor-pointer ${
                                  childErr.class
                                    ? "border-rose-300"
                                    : "border-slate-200 focus:border-violet-400"
                                }`}
                              >
                                <option value="">Select class</option>
                                {childClassOptions.map((c) => (
                                  <option key={c} value={c}>
                                    {c}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-3.5 h-4 w-4 text-slate-400" />
                            </div>
                            {childErr.class && (
                              <p className="mt-1 text-xs text-rose-500">{childErr.class}</p>
                            )}
                          </div>
                        </div>

                        <div className="mt-3">
                          <p className="text-xs font-medium text-slate-500">Subjects needed</p>
                          <div className="mt-1.5 flex flex-wrap gap-2">
                            {subjectList.map((subject) => {
                              const isSelected = child.subjects.includes(subject);
                              return (
                                <button
                                  key={subject}
                                  type="button"
                                  onClick={() => toggleChildSubject(child.id, subject)}
                                  className="rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors hover:cursor-pointer"
                                  style={
                                    isSelected
                                      ? {
                                          borderColor: PURPLE,
                                          backgroundColor: "#EEEAFC",
                                          color: PURPLE,
                                        }
                                      : { borderColor: "#E2E8F0", color: "#475569" }
                                  }
                                >
                                  {subject}
                                </button>
                              );
                            })}
                          </div>
                          {childErr.subjects && (
                            <p className="mt-1.5 text-xs text-rose-500">{childErr.subjects}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={addChild}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed py-3 text-sm font-medium transition-colors hover:cursor-pointer hover:bg-violet-50"
                  style={{ borderColor: "#D9D2F5", color: PURPLE }}
                >
                  <Plus className="h-4 w-4" />
                  Add another child
                </button>
              </div>

              {/* Location */}
              <div className="border-t border-slate-100 pt-6">
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: PURPLE }}
                >
                  Your Location
                </span>

                <div className="mt-4">
                  <div className="relative flex items-center">
                    <MapPin className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`${inputBase} appearance-none pr-10 hover:cursor-pointer ${
                        errors.location ? "border-rose-300" : "border-slate-200 focus:border-violet-400"
                      }`}
                    >
                      <option value="">Select your city</option>
                      {locationOptions.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 h-4 w-4 text-slate-400" />
                  </div>
                  {errors.location && (
                    <p className="mt-1 text-xs text-rose-500">{errors.location}</p>
                  )}
                </div>

                <div className="mt-4">
                  <p className="text-xs text-slate-400">
                    We use your coordinates to match you with tutors near you.
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={requestLocation}
                      className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:cursor-pointer"
                      style={{ borderColor: "#D9D2F5", color: PURPLE }}
                    >
                      {locationStatus === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Navigation className="h-4 w-4" />
                      )}
                      Use my current location
                    </button>

                    {locationStatus === "success" && (
                      <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                        <CheckCircle2 className="h-4 w-4" />
                        Location detected
                      </span>
                    )}
                    {locationStatus === "error" && (
                      <span className="flex items-center gap-1 text-sm font-medium text-rose-500">
                        <AlertCircle className="h-4 w-4" />
                        Couldn't access location
                      </span>
                    )}
                  </div>
                  {errors.coordinates && (
                    <p className="mt-1.5 text-xs text-rose-500">{errors.coordinates}</p>
                  )}
                </div>
              </div>

              {submitError && (
                <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors disabled:opacity-60"
                style={{ backgroundColor: PURPLE }}
                onMouseEnter={(e) => {
                  if (!submitting) e.currentTarget.style.backgroundColor = PURPLE_DARK;
                }}
                onMouseLeave={(e) => {
                  if (!submitting) e.currentTarget.style.backgroundColor = PURPLE;
                }}
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-slate-500 sm:hidden">
                Already have an account?{" "}
                <a
                  onClick={() => navigate("/login")}
                  className="font-medium hover:cursor-pointer"
                  style={{ color: PURPLE }}
                >
                  Log In
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}