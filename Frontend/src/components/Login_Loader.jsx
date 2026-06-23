import { ShieldCheck, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";

export default function LoginLoader() {
  const messages = [
    "🔐 Verifying your account...",
    "🎓 Preparing your dashboard...",
    "✨ Signing you in securely...",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-white">
      <div className="text-center">
        {/* Icon Container */}
        <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 animate-ping rounded-full bg-violet-300 opacity-20"></div>

          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-2xl">
            <ShieldCheck className="h-12 w-12 text-white" />
          </div>

          <GraduationCap className="absolute -right-2 -top-2 h-8 w-8 animate-bounce text-amber-400" />
        </div>

        {/* Brand */}
        <h1 className="mt-8 text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
          TutorMate
        </h1>

        <p className="mt-4 text-lg font-medium text-slate-600 min-h-[30px]">
          {messages[messageIndex]}
        </p>

        {/* Progress Bar */}
        <div className="mx-auto mt-8 h-2 w-64 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-1/2 animate-[loading_2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"></div>
        </div>

        <p className="mt-6 text-sm text-slate-400">
          Secure Google Authentication
        </p>
      </div>
    </div>
  );
}