import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  GraduationCap,
  ShieldCheck,
  BookOpen,
  MapPin,
  Search,
  ChevronDown,
  Star,
  SlidersHorizontal,
  X,
  Brain,
} from "lucide-react";

const PURPLE = "#6C5DD3";
const PURPLE_DARK = "#5A4BC4";

const navLinks = [
  { label: "Home", active: true, link: "/" },
  { label: "Find Teachers", link: "/findteacher" },
  { label: "Subjects", link: "/subjects" },
  { label: "How it Works", link: "/howitwork" },
  { label: "Become a Teacher", link: "/teacher" },
];

const DEFAULT_SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
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

const experienceOptions = [
  { value: "1-3", label: "1 - 3 Years" },
  { value: "3-5", label: "3 - 5 Years" },
  { value: "5-10", label: "5 - 10 Years" },
  { value: "10+", label: "10+ Years" },
];

const priceOptions = [
  { value: "under300", label: "Under ₹300/hr" },
  { value: "300-600", label: "₹300 - ₹600/hr" },
  { value: "600-1000", label: "₹600 - ₹1000/hr" },
  { value: "above1000", label: "Above ₹1000/hr" },
];

const modeOptions = [
  { value: "Online", label: "Online" },
  { value: "Offline", label: "Offline" },
];

const ratingOptions = [
  { value: "4.5", label: "4.5 & above" },
  { value: "4.0", label: "4.0 & above" },
  { value: "3.5", label: "3.5 & above" },
];

const experienceLabels = Object.fromEntries(
  experienceOptions.map((o) => [o.value, o.label]),
);
const priceLabels = Object.fromEntries(
  priceOptions.map((o) => [o.value, o.label]),
);
const ratingLabels = Object.fromEntries(
  ratingOptions.map((o) => [o.value, o.label]),
);

function getExperienceBracket(years) {
  if (years <= 3) return "1-3";
  if (years <= 5) return "3-5";
  if (years <= 10) return "5-10";
  return "10+";
}

function getPriceBracket(price) {
  if (price < 300) return "under300";
  if (price < 600) return "300-600";
  if (price < 1000) return "600-1000";
  return "above1000";
}

function toggleInArray(arr, value) {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

// --- Real data mapping -----------------------------------------------

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Converts a raw teacher record (the shape stored in localStorage under
// "localteacher") into the flat shape this page's UI expects.
function normalizeTeacher(raw) {
  const user = raw.userid || {};
  const subjects =
    Array.isArray(raw.subjects) && raw.subjects.length
      ? raw.subjects
      : ["General"];
  const mode = Array.isArray(raw.mode) ? raw.mode.map(capitalize) : [];
  const experienceYears =
    Array.isArray(raw.experienceDetails) && raw.experienceDetails.length
      ? Math.max(...raw.experienceDetails.map((e) => e.years || 0))
      : 0;

  return {
    id: raw._id,
    name: user.name || "Unnamed Teacher",
    subjects,
    experienceYears,
    rating: typeof raw.rating === "number" ? raw.rating : 0,
    reviews: raw.totalReviews ?? 0,
    price: raw.hourelyfee ?? 0,
    location: raw.location || "Location not specified",
    mode,
    bio: raw.bio || "",
    img: user.avatar || "https://i.pravatar.cc/150",
    verified: Boolean(raw.isVerifiedTeacher),
  };
}

// -----------------------------------------------------------------------

function FilterGroup({ title, options, selected, onToggle, counts, isFirst }) {
  return (
    <div className={`border-b border-slate-100 py-5 ${isFirst ? "pt-0" : ""}`}>
      <h3 className="mb-3 text-sm font-semibold text-slate-900">{title}</h3>
      <div className="space-y-2.5">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="group flex cursor-pointer items-center justify-between"
          >
            <span className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => onToggle(opt.value)}
                style={{ accentColor: PURPLE }}
                className="h-4 w-4 rounded border-slate-300"
              />
              <span className="text-sm text-slate-600 group-hover:text-slate-900">
                {opt.label}
              </span>
            </span>
            {counts && counts[opt.value] !== undefined && (
              <span className="text-xs text-slate-400">
                {counts[opt.value]}
              </span>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}

function TeacherCard({ teacher }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4">
        {teacher.userid?.avatar ? (
          <img
            src={teacher.userid.avatar}
            alt={teacher.userid.name}
            className="h-16 w-16 flex-shrink-0 rounded-full object-cover ring-2 ring-slate-100"
          />
        ) : (
          <div className="h-16 w-16 flex-shrink-0 rounded-full bg-slate-200 flex items-center justify-center ring-2 ring-slate-100 text-xs font-semibold text-slate-700 text-center p-1">
            {teacher.userid?.name}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-semibold text-slate-900">
              {teacher.userid.name}
            </h3>
            {teacher.verified && (
              <ShieldCheck className="h-4 w-4 flex-shrink-0 text-emerald-500" />
            )}
          </div>
          <div className="mt-0.5 text-sm text-slate-500">
            {Math.max(
              ...(teacher.experienceDetails?.map((e) => e.years) ?? [0]),
            )}
            + Years Exp.
          </div>
          <div className="mt-1 flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-700">
              {teacher.rating}
            </span>
            <span className="text-slate-400">({teacher.reviews} Reviews)</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-500">
        {teacher.bio.length > 100
          ? teacher.bio.slice(0, 100) + "..."
          : teacher.bio}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {teacher.subjects.map((subj) => {
          const style = subjectStyles[subj] || {
            bg: "bg-slate-100",
            text: "text-slate-600",
          };
          return (
            <span
              key={subj}
              className={`rounded-full px-3 py-1 text-xs font-medium ${style.bg} ${style.text}`}
            >
              {subj}
            </span>
          );
        })}
        {teacher.mode.map((m) => (
          <span
            key={m}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500"
          >
            {m}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-sm text-slate-500">
        <MapPin className="h-4 w-4 flex-shrink-0 text-slate-400" />
        <span className="truncate">{teacher.location}</span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <span className="text-lg font-bold text-slate-900">
            ₹{teacher.hourelyfee}
          </span>
          <span className="text-sm text-slate-400">/hr</span>
        </div>
        <button
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors hover:cursor-pointer"
          onClick={() => navigate("/teacherprofile", { state: teacher })}
          style={{ backgroundColor: PURPLE }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = PURPLE_DARK)
          }
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PURPLE)}
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default function FindTeachersPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [nameQuery, setNameQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedModes, setSelectedModes] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const user = useSelector((state) => state.auth.user);

  // Load real teacher data from localStorage on mount
  const teachers = useSelector((state) => state.teachers.teachers);
  console.log(teachers);

  // Build the subject list from whatever subjects actually exist in the
  // stored data, falling back to a sensible default if storage is empty.
  const subjectList = useMemo(() => {
    if (!teachers.length) return DEFAULT_SUBJECTS;
    const unique = new Set();
    teachers.forEach((t) => t.subjects.forEach((s) => unique.add(s)));
    return Array.from(unique).sort();
  }, [teachers]);

  const subjectCounts = useMemo(
    () =>
      Object.fromEntries(
        subjectList.map((s) => [
          s,
          teachers.filter((t) => t.subjects.includes(s)).length,
        ]),
      ),
    [subjectList, teachers],
  );
  const modeCounts = useMemo(
    () =>
      Object.fromEntries(
        modeOptions.map((o) => [
          o.value,
          teachers.filter((t) => t.mode.includes(o.value)).length,
        ]),
      ),
    [teachers],
  );

  const hasActiveFilters =
    nameQuery ||
    locationQuery ||
    selectedSubjects.length ||
    selectedModes.length ||
    selectedExperience.length ||
    selectedPrices.length ||
    selectedRatings.length;

  const clearAllFilters = () => {
    setNameQuery("");
    setLocationQuery("");
    setSelectedSubjects([]);
    setSelectedModes([]);
    setSelectedExperience([]);
    setSelectedPrices([]);
    setSelectedRatings([]);
  };

  const filteredTeachers = useMemo(() => {
    let list = teachers.filter((t) => {
      if (nameQuery && !t.name.toLowerCase().includes(nameQuery.toLowerCase()))
        return false;
      if (
        locationQuery &&
        !t.location.toLowerCase().includes(locationQuery.toLowerCase())
      )
        return false;
      if (
        selectedSubjects.length &&
        !t.subjects.some((s) => selectedSubjects.includes(s))
      )
        return false;
      if (
        selectedModes.length &&
        !t.mode.some((m) => selectedModes.includes(m))
      )
        return false;
      if (
        selectedExperience.length &&
        !selectedExperience.includes(getExperienceBracket(t.experienceYears))
      )
        return false;
      if (
        selectedPrices.length &&
        !selectedPrices.includes(getPriceBracket(t.price))
      )
        return false;
      if (selectedRatings.length) {
        const minThreshold = Math.min(
          ...selectedRatings.map((r) => parseFloat(r)),
        );
        if (t.rating < minThreshold) return false;
      }
      return true;
    });

    list = [...list];
    switch (sortBy) {
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "experience":
        list.sort((a, b) => b.experienceYears - a.experienceYears);
        break;
      case "reviews":
        list.sort((a, b) => b.reviews - a.reviews);
        break;
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return list;
  }, [
    teachers,
    nameQuery,
    locationQuery,
    selectedSubjects,
    selectedModes,
    selectedExperience,
    selectedPrices,
    selectedRatings,
    sortBy,
  ]);

  const activeChips = [];
  if (nameQuery)
    activeChips.push({
      key: "name",
      label: `"${nameQuery}"`,
      onRemove: () => setNameQuery(""),
    });
  if (locationQuery)
    activeChips.push({
      key: "location",
      label: locationQuery,
      onRemove: () => setLocationQuery(""),
    });
  selectedSubjects.forEach((s) =>
    activeChips.push({
      key: `subj-${s}`,
      label: s,
      onRemove: () => setSelectedSubjects(toggleInArray(selectedSubjects, s)),
    }),
  );
  selectedModes.forEach((m) =>
    activeChips.push({
      key: `mode-${m}`,
      label: m,
      onRemove: () => setSelectedModes(toggleInArray(selectedModes, m)),
    }),
  );
  selectedExperience.forEach((e) =>
    activeChips.push({
      key: `exp-${e}`,
      label: experienceLabels[e],
      onRemove: () =>
        setSelectedExperience(toggleInArray(selectedExperience, e)),
    }),
  );
  selectedPrices.forEach((p) =>
    activeChips.push({
      key: `price-${p}`,
      label: priceLabels[p],
      onRemove: () => setSelectedPrices(toggleInArray(selectedPrices, p)),
    }),
  );
  selectedRatings.forEach((r) =>
    activeChips.push({
      key: `rating-${r}`,
      label: ratingLabels[r],
      onRemove: () => setSelectedRatings(toggleInArray(selectedRatings, r)),
    }),
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <div
              onClick={() => navigate("/")}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-lg"
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
            <>
              <div className="flex items-center gap-3 cursor-pointer">
                <button
                  onClick={() => navigate("/login")}
                  className="hidden items-center gap-1.5 text-sm font-medium text-slate-700 sm:flex hover:text-violet-600"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Login
                </button>

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

      {/* Page intro + search */}
      <section
        style={{ backgroundColor: "#F4F2FC" }}
        className="border-b border-indigo-50"
      >
        <div className="mx-auto max-w-4xl px-6 py-12 text-center lg:px-10">
          <p className="text-sm text-slate-400">
            Home <span className="mx-1">/</span>{" "}
            <span className="font-medium text-slate-600">Find Teachers</span>
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl">
            Find Your Perfect Tuition Teacher
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            Browse verified, experienced teachers and filter by subject,
            location, price and more.
          </p>

          <div className="mt-7 rounded-2xl bg-white p-4 text-left shadow-xl shadow-indigo-100/70 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <select
                  value={selectedSubjects[0] || ""}
                  onChange={(e) =>
                    setSelectedSubjects(e.target.value ? [e.target.value] : [])
                  }
                  className="
                w-full appearance-none rounded-xl
                border border-slate-200
                bg-white
                py-3 pl-4 pr-10
                text-sm font-medium text-slate-700
                shadow-sm
                transition-all duration-200
                focus:border-indigo-300
                focus:outline-none
                focus:ring-4 focus:ring-indigo-100
              "
                >
                  <option value="">Select Subject</option>

                  {subjectList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  className="
          pointer-events-none
          absolute right-3 top-1/2
          h-4 w-4 -translate-y-1/2
          text-indigo-500
        "
                />
              </div>
              <div className="relative flex-1">
                <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-500" />

                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="Enter Location"
                  className="
      w-full rounded-xl
      border border-slate-200
      bg-white
      py-3 pl-11 pr-4
      text-sm font-medium text-slate-700
      shadow-sm
      transition-all duration-200
      focus:border-indigo-300
      focus:outline-none
      focus:ring-4 focus:ring-indigo-100
    "
                />
              </div>
              <button
                className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-6 py-3 hover:cursor-pointer text-sm font-semibold text-white"
                style={{ backgroundColor: PURPLE }}
              >
                <Search className="h-4 w-4" />
                Search Teachers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl gap-8 px-6 py-10 lg:flex lg:px-10">
        {/* Sidebar */}
        <aside className="flex-shrink-0 lg:w-72">
          <button
            onClick={() => setShowMobileFilters((s) => !s)}
            className="mb-4 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 lg:hidden"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${showMobileFilters ? "rotate-180" : ""}`}
            />
          </button>

          <div
            className={`${showMobileFilters ? "block" : "hidden"} rounded-2xl border border-slate-100 bg-white p-5 lg:sticky lg:top-6 lg:block`}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold text-slate-900">Filters</h2>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-medium"
                  style={{ color: PURPLE }}
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="relative mb-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
                placeholder="Search by teacher name"
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <FilterGroup
              title="Subject"
              options={subjectList.map((s) => ({ value: s, label: s }))}
              selected={selectedSubjects}
              onToggle={(v) =>
                setSelectedSubjects(toggleInArray(selectedSubjects, v))
              }
              counts={subjectCounts}
            />
            <FilterGroup
              title="Experience"
              options={experienceOptions}
              selected={selectedExperience}
              onToggle={(v) =>
                setSelectedExperience(toggleInArray(selectedExperience, v))
              }
            />
            <FilterGroup
              title="Price Range"
              options={priceOptions}
              selected={selectedPrices}
              onToggle={(v) =>
                setSelectedPrices(toggleInArray(selectedPrices, v))
              }
            />
            <FilterGroup
              title="Teaching Mode"
              options={modeOptions}
              selected={selectedModes}
              onToggle={(v) =>
                setSelectedModes(toggleInArray(selectedModes, v))
              }
              counts={modeCounts}
            />
            <div className="pb-0 pt-5">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">
                Rating
              </h3>
              <div className="space-y-2.5">
                {ratingOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className="group flex cursor-pointer items-center gap-2.5"
                  >
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(opt.value)}
                      onChange={() =>
                        setSelectedRatings(
                          toggleInArray(selectedRatings, opt.value),
                        )
                      }
                      style={{ accentColor: PURPLE }}
                      className="h-4 w-4 rounded border-slate-300"
                    />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900">
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="mt-6 flex-1 lg:mt-0">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-900">
                {filteredTeachers.length}
              </span>{" "}
              {filteredTeachers.length === 1 ? "Teacher" : "Teachers"} Found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="reviews">Most Reviewed</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {activeChips.length > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {activeChips.map((chip) => (
                <span
                  key={chip.key}
                  className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700"
                >
                  {chip.label}
                  <button
                    onClick={chip.onRemove}
                    className="rounded-full hover:bg-indigo-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-xs font-medium text-slate-500 underline hover:text-slate-700"
              >
                Clear all
              </button>
            </div>
          )}

          {teachers.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
              <Search className="h-10 w-10 text-slate-300" />
              <h3 className="mt-4 font-semibold text-slate-900">
                No teacher data found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                No teachers were found in local storage under the key
                "localteacher".
              </p>
            </div>
          ) : filteredTeachers.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
              <Search className="h-10 w-10 text-slate-300" />
              <h3 className="mt-4 font-semibold text-slate-900">
                No teachers match your filters
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try adjusting or clearing your filters to see more results.
              </p>
              <button
                onClick={clearAllFilters}
                className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold text-white"
                style={{ backgroundColor: PURPLE }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTeachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          )}
        </div>
      </section>
      {/* AI Tutor Assistant Button */}
      <button
        onClick={() => navigate("/chatbot")}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Blinking Ring */}
          <span className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-30"></span>

          {/* Hover Text */}
          <div className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-violet-100 bg-white px-4 py-2 shadow-lg opacity-0 invisible translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-x-0">
            <p className="text-sm font-semibold text-slate-800">
              Talk to AI Teacher
            </p>
            <p className="text-xs text-slate-500">Ask doubts anytime</p>
          </div>

          {/* Button */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-xl transition-all duration-300 hover:scale-110">
            <Brain className="h-8 w-8 text-amber-300" />
          </div>
        </div>
      </button>
    </div>
  );
}
