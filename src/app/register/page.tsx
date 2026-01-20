'use client'

import { useState } from 'react';
import { registerUser } from '../lib/api';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.target;

    try {
      await registerUser({
        email: form.email.value,
        password: form.password.value,
      });

      alert('User registered successfully');
      form.reset();

      router.push('/login'); // redirect ke login page
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input name="email"
        placeholder="Email"
        type="email"
        className="border px-3 py-2 rounded-md" />

        <input name="password"
        placeholder="Password"
        type="password"
        className="border px-3 py-2 rounded-md" />

        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          {loading ? 'Registering...' : 'Register'}
        </button>

      </form>
    </div>
  );
}
