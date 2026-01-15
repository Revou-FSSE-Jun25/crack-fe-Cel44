"use client";

import React, { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="w-full max-w-sm bg-gray-200 shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
              value={password}
              required
              minLength={8}
              maxLength={16}
              title="Password must be 8-16 characters long and include at least one uppercase and one lowercase letter"
              pattern="(?=.*[a-z])(?=.*[A-Z]).+"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-800 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
