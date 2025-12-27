"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user to PostgreSQL via backend
      await fetch("http://localhost:8080/api/saveUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.uid, email: user.email }),
      });

      setMessage("Account created successfully! 🎉");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await fetch("http://localhost:8080/api/saveUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.uid, email: user.email }),
      });

      setMessage("Signed up successfully with Google! 🎉");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 via-gray-900 to-black text-white px-6">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-purple-500/20 text-center">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-2">
          Create your QuickAI Account
        </h1>
        <p className="text-gray-400 mb-8">
          Join and explore amazing AI tools ✨
        </p>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-white/10 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-purple-500/30"
          >
            Sign Up
          </button>
        </form>

        <button
          onClick={handleGoogleSignup}
          className="mt-5 flex items-center justify-center gap-2 bg-white text-gray-800 hover:bg-gray-200 transition-all duration-300 py-3 w-full rounded-lg font-medium"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>

        {message && <p className="mt-4 text-sm text-purple-300">{message}</p>}

        <p className="mt-6 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
