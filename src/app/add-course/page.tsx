'use client';

import { useState } from 'react';

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
      alert('Failed to add course.'); // TODO: maybe customize
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-lg font-bold mb-4">Add a New Course</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="cId"
          placeholder="Course Code"
          value={course.cId}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={course.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={course.subject}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <h2 className="text-sm font-semibold mt-2">Ratings (1-10)</h2>
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

        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}
