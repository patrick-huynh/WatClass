'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import Image from 'next/image';
import { useUser } from '../hooks/useUser';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role
  const [term, setTerm] = useState('1A'); // Default term
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password || username.trim() === '' || password.trim() === '') {
      setError('Username or password cannot be empty');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role, term }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Signup failed');
        return;
      }

      // If signup successful, log the user in
      login(data.userId, data.username, data.role);
      router.push('/');
    } catch (err) {
      setError('An error occurred during signup');
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex justify-between items-center gap-4 mb-10 pr-10 shadow-md">
        <Image src="/Logo.svg" alt="logo" width={150} height={150} />
        <div className="h-full flex flex-row gap-4">
          <Button onClick={() => router.push('/')} title="Back to Home" />
        </div>
      </div>

      <div className="flex flex-row justify-center items-center gap-4">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>
          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-t relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="role" className="sr-only">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="professor">Professor</option>
                </select>
              </div>
              {role === 'student' && (
                <div>
                  <label htmlFor="term" className="sr-only">
                    Term
                  </label>
                  <select
                    id="term"
                    name="term"
                    required
                    className="appearance-none rounded-b relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                  >
                    <option value="1A">1A</option>
                    <option value="1B">1B</option>
                    <option value="2A">2A</option>
                    <option value="2B">2B</option>
                    <option value="3A">3A</option>
                    <option value="3B">3B</option>
                    <option value="4A">4A</option>
                    <option value="4B">4B</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Button title="Sign up" onClick={() => handleSubmit(new Event('submit') as any)} />
              <Button onClick={() => router.push('/login')} title="Already have an account?" />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
