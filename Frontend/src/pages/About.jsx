import React from "react";
import { useNavigate } from "react-router";
import {
  Search,
  UserCheck,
  MessageCircle,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Award,
  Calendar,
  TrendingUp,
} from "lucide-react";

const PURPLE = "#6C5DD3";

const steps = [
  {
    icon: Search,
    title: "Search Teachers",
    description:
      "Select your subject and location to discover qualified tutors near you.",
  },
  {
    icon: UserCheck,
    title: "Compare Profiles",
    description:
      "Review teacher experience, ratings, qualifications, and teaching expertise.",
  },
  {
    icon: MessageCircle,
    title: "Connect & Discuss",
    description:
      "Contact your preferred teacher and discuss learning goals and schedules.",
  },
  {
    icon: GraduationCap,
    title: "Start Learning",
    description:
      "Begin personalized tuition classes and achieve better academic results.",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Verified Teachers",
    desc: "Every tutor is carefully verified before joining the platform.",
  },
  {
    icon: Award,
    title: "Qualified Experts",
    desc: "Learn from experienced teachers with proven teaching records.",
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    desc: "Choose timings that perfectly fit your routine.",
  },
  {
    icon: TrendingUp,
    title: "Better Results",
    desc: "Personalized learning helps students improve faster.",
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20" style={{ backgroundColor: "#F4F2FC" }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <span
            className="rounded-full px-4 py-2 text-sm font-semibold"
            style={{
              backgroundColor: "#EEEAFC",
              color: PURPLE,
            }}
          >
            Simple Learning Process
          </span>

          <h1 className="mt-6 text-5xl font-extrabold text-slate-900">
            How TutorMate Works
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-500">
            Finding the right tutor has never been easier. Follow four simple
            steps and start learning with experienced teachers near you.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Get Started in 4 Easy Steps
          </h2>
          <p className="mt-3 text-slate-500">
            From searching tutors to achieving better results.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition hover:shadow-lg"
              >
                <div
                  className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: PURPLE }}
                >
                  {index + 1}
                </div>

                <div
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: "#EEEAFC" }}
                >
                  <Icon className="h-8 w-8" style={{ color: PURPLE }} />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 leading-relaxed text-slate-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-20" style={{ backgroundColor: "#F4F2FC" }}>
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="rounded-3xl bg-white p-10 shadow-sm">
            <div className="grid gap-8 md:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.title}
                    className="flex flex-col items-center text-center"
                  >
                    <div
                      className="flex h-20 w-20 items-center justify-center rounded-full"
                      style={{ backgroundColor: "#EEEAFC" }}
                    >
                      <Icon className="h-10 w-10" style={{ color: PURPLE }} />
                    </div>

                    <h4 className="mt-5 font-semibold text-slate-900">
                      {step.title}
                    </h4>

                    {index !== steps.length - 1 && (
                      <ArrowRight className="mt-6 hidden h-5 w-5 text-slate-400 md:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Why Students Choose TutorMate
          </h2>

          <p className="mt-4 text-slate-500">
            Trusted by students looking for quality education.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#EEEAFC" }}
                >
                  <Icon className="h-7 w-7" style={{ color: PURPLE }} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-slate-500">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#F4F2FC" }}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-extrabold text-slate-900">
            Ready to Find Your Perfect Tutor?
          </h2>

          <p className="mt-5 text-lg text-slate-500">
            Browse qualified teachers and start your learning journey today.
          </p>

          <button
            className="mt-8 rounded-xl px-8 py-4 font-semibold text-white transition hover:cursor-pointer"
            style={{ backgroundColor: PURPLE }}
            onClick={() => navigate("/findteacher")}
          >
            Find Teachers
          </button>
        </div>
      </section>
    </div>
  );
}
