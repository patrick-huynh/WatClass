// app/page.tsx
import React from 'react';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Your Next.js App! 🚀
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Get started by editing <code className="bg-gray-200 px-2 py-1 rounded">app/page.tsx</code>.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="https://nextjs.org/docs"
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js Documentation
          </a>
          <a
            href="https://github.com/vercel/next.js"
            className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repository
          </a>
        </div>
      </div>
    </main>
  );
}
