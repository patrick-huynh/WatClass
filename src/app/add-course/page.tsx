'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import Image from 'next/image';

export default function AddCoursePage() {
  const [course, setCourse] = useState({
    cId: '',
    name: '',
    subject: '',
    analyticalThinking: '',
    creativity: '',
    collaboration: '',
    difficulty: '',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    // Ensure rating values stay within 1-10 range
    if (['analyticalThinking', 'creativity', 'collaboration', 'difficulty'].includes(name)) {
      const numValue = Math.max(1, Math.min(10, Number(value))); // Clamp value between 1-10
      setCourse({ ...course, [name]: numValue.toString() });
    } else {
      setCourse({ ...course, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/add_course', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course),
    });
    if (response.ok) {
      alert('Course added successfully!'); // TODO: maybe customize
      setCourse({
        cId: '',
        name: '',
        subject: '',
        analyticalThinking: '',
        creativity: '',
        collaboration: '',
        difficulty: '',
      });
    } else if(response.status == 409){
      alert(`Failed to add course: Course with code ${course.cId} already exists`);
    } else if (response.status == 405) {
      alert ('Failed to add course: Course code must be formatted as capital letters followed immediately by digits');
    } else {
      alert('Failed to add course.');
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
      <div className="p-6 w-full max-w-2xl mx-auto bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-center">Add a New Course</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label className="block font-medium">Course Code</label>
          <input
            type="text"
            name="cId"
            placeholder="Course Code"
            value={course.cId}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <label className="block font-medium">Course Name</label>
          <input
            type="text"
            name="name"
            placeholder="Course Name"
            value={course.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <label className="block font-medium">Course Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={course.subject}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <label className="block font-medium">Analytical Thinking</label>
          <input
            type="number"
            name="analyticalThinking"
            placeholder="Analytical Thinking"
            value={course.analyticalThinking}
            onChange={handleChange}
            min="1"
            max="10"
            className="border p-2 rounded"
            required
          />
          <label className="block font-medium">Creativity</label>
          <input
            type="number"
            name="creativity"
            placeholder="Creativity"
            value={course.creativity}
            onChange={handleChange}
            min="1"
            max="10"
            className="border p-2 rounded"
            required
          />
          <label className="block font-medium">Collaboration</label>
          <input
            type="number"
            name="collaboration"
            placeholder="Collaboration"
            value={course.collaboration}
            onChange={handleChange}
            min="1"
            max="10"
            className="border p-2 rounded"
            required
          />
          <label className="block font-medium">Difficulty</label>
          <input
            type="number"
            name="difficulty"
            placeholder="Difficulty"
            value={course.difficulty}
            onChange={handleChange}
            min="1"
            max="10"
            className="border p-2 rounded"
            required
          />
          <Button type="submit" title="Update" />
        </form>
      </div>
    </main>
  );
}
