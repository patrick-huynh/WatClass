'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Course {
  cId: string;
  name: string;
  subject: string;
  analyticalThinking: number;
  creativity: number;
  collaboration: number;
  difficulty: number;
}

export default function EditTable() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/courses_details')
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Course ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Analytical Thinking</th>
            <th className="border px-4 py-2">Creativity</th>
            <th className="border px-4 py-2">Collaboration</th>
            <th className="border px-4 py-2">Difficulty</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.cId} className="text-center">
              <td className="border px-4 py-2">{course.cId}</td>
              <td className="border px-4 py-2">{course.name}</td>
              <td className="border px-4 py-2">{course.subject}</td>
              <td className="border px-4 py-2">{course.analyticalThinking}</td>
              <td className="border px-4 py-2">{course.creativity}</td>
              <td className="border px-4 py-2">{course.collaboration}</td>
              <td className="border px-4 py-2">{course.difficulty}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => router.push(`/edit-course/${course.cId}`)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
