// app/page.tsx
"use client";
import React, { useState } from "react";

export default function HomePage() {
  const [courses, setCourses] = useState();
  const [aggregate, setAggregate] = useState();
  const fetchCourses = async () => {
    const response = await fetch("api/courses");
    const data = await response.json();
    setCourses(data);
  };
  const fetchAggregate = async () => {
    const response = await fetch("api/aggregate");
    const data = await response.json();
    setAggregate(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-4xl text-center">
        <button className='bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-700' onClick={fetchCourses}>
          Get all courses
        </button>
        <div className="text-black">
          {JSON.stringify(courses)}
        </div>
        <button className='bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-700' onClick={fetchAggregate}>
          Get average stats
        </button>
        <div className="text-black">
          {JSON.stringify(aggregate)}
        </div>
      </div>
    </main>
  );
}
