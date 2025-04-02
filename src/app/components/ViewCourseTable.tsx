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
    <div className="mt-6">
      <table className="min-w-full bg-white">
        <thead>
          <tr className='bg-main text-white'>
            <th className="p-3 text-center">Course ID</th>
            <th className="p-3 text-center">Name</th>
            <th className="p-3 text-center">Subject</th>
            <th className="p-3 text-center">Analytical Thinking</th>
            <th className="p-3 text-center">Creativity</th>
            <th className="p-3 text-center">Collaboration</th>
            <th className="p-3 text-center">Difficulty</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.cId} className="text-center">
              <td className="p-3 text-center">{course.cId}</td>
              <td className="p-3 text-center">{course.name}</td>
              <td className="p-3 text-center">{course.subject}</td>
              <td className="p-3 text-center">{course.analyticalThinking}</td>
              <td className="p-3 text-center">{course.creativity}</td>
              <td className="p-3 text-center">{course.collaboration}</td>
              <td className="p-3 text-center">{course.difficulty}</td>
              <td className="p-3 text-center">
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
