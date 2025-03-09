"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const auth = useAuth();
  const route = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await auth?.login(`${username}@spiritx.com`, password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    if (auth?.role) {
      route.push("/dashboard");
    }
  }, [auth?.role, route]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-teal-400">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-700 rounded bg-zinc-700 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-700 rounded bg-zinc-700 text-white"
        />
        <button onClick={handleLogin} className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600">
          Login
        </button>
        <p className="mt-4 text-center text-gray-400">
          Don&apos;t have an account? <Link href="/auth/register" className="text-teal-400">Register</Link>
        </p>
      </div>
    </div>
  );
}