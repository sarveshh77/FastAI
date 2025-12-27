import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#0B0F19] to-[#020617] font-sans text-white">
      <main className="flex flex-col items-center justify-center text-center p-10 rounded-3xl shadow-2xl bg-gradient-to-br from-[#0F172A]/90 to-[#1E1B4B]/90 backdrop-blur-xl w-[90%] max-w-3xl border border-purple-800/20">
        
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-6">
          <Image
            src="/logo.png"
            alt="QuickAI Logo"
            width={65}
            height={65}
            className="rounded-full"
          />
          <h1 className="ml-3 text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent tracking-tight">
            QuickAI
          </h1>
        </div>

        {/* Headline */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-100 leading-snug mb-3">
          Smart Tools for a Smarter You 💡
        </h2>
        <p className="text-gray-400 max-w-md mb-8">
          Create content, generate images, and explore AI-powered tools — all in one place.  
          Sign up today and unlock the full potential of QuickAI!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/signup"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-7 py-3 rounded-full shadow-lg shadow-purple-900/40 transition-all duration-300"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="border border-purple-500 text-purple-300 hover:bg-purple-600/10 font-semibold px-7 py-3 rounded-full transition-all duration-300"
          >
            Login
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-500 mt-10 tracking-wide">
          © {new Date().getFullYear()} <span className="text-purple-400 font-semibold">QuickAI</span> — Empowering Creators with Intelligence ✨
        </p>
      </main>
    </div>
  );
}
