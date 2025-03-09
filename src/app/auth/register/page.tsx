"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await auth?.register(email, password, username);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-teal-400">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-700 rounded bg-zinc-700 text-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-700 rounded bg-zinc-700 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-700 rounded bg-zinc-700 text-white"
        />
        <button onClick={handleRegister} className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600">
          Register
        </button>
        <p className="mt-4 text-center text-gray-400">
          Already have an account? <Link href="/auth/login" className="text-teal-400">Login</Link>
        </p>
      </div>
    </div>
  );
}