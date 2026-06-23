import { BookOpen, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePageLoader() {
  const messages = [
    "📚 Loading Tutors...",
    "🎓 Verifying Teachers...",
    "✨ Preparing Learning Experience...",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-white">
      
      {/* Floating Graduation Cap */}
      <GraduationCap className="absolute top-24 left-1/4 h-12 w-12 animate-bounce text-violet-300" />

      {/* Floating Circle */}
      <div className="absolute right-24 top-32 h-24 w-24 rounded-full bg-violet-200/30 blur-xl"></div>
      <div className="absolute bottom-32 left-24 h-32 w-32 rounded-full bg-indigo-200/30 blur-xl"></div>

      {/* Book Animation */}
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-violet-300 opacity-20"></div>

        <div className="book-animation flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-2xl">
          <BookOpen className="h-14 w-14 text-amber-300" />
        </div>
      </div>

      {/* Logo */}
      <h1 className="mt-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 bg-clip-text text-5xl font-extrabold text-transparent">
        TutorMate
      </h1>

      {/* Animated Text */}
      <p className="mt-4 min-h-[28px] text-lg font-medium text-slate-600 transition-all duration-500">
        {messages[messageIndex]}
      </p>

      {/* Loading Dots */}
      <div className="mt-6 flex gap-2">
        <span className="h-3 w-3 animate-bounce rounded-full bg-violet-500"></span>
        <span
          className="h-3 w-3 animate-bounce rounded-full bg-violet-500"
          style={{ animationDelay: "0.15s" }}
        ></span>
        <span
          className="h-3 w-3 animate-bounce rounded-full bg-violet-500"
          style={{ animationDelay: "0.3s" }}
        ></span>
      </div>

      <p className="mt-8 text-sm text-slate-400">
        Connecting students with great teachers
      </p>
    </div>
  );
}