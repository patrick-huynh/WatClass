'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Image from 'next/image';

export default function EditCoursePage() {
  const params = useParams() as { cId: string };
  const cId = params.cId;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<any>(null);

  const [name, setName] = useState('');
  const [analyticalThinking, setAnalyticalThinking] = useState(0);
  const [creativity, setCreativity] = useState(0);
  const [collaboration, setCollaboration] = useState(0);
  const [difficulty, setDifficulty] = useState(0);

  useEffect(() => {
    if (cId) {
      fetch(`/api/course?cId=${cId}`)
        .then((res) => res.json())
        .then((data) => {
          setCourse(data);
          setName(data.name);
          setAnalyticalThinking(data.analyticalThinking);
          setCreativity(data.creativity);
          setCollaboration(data.collaboration);
          setDifficulty(data.difficulty);
          setLoading(false);
        });
    }
  }, [cId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      cId,
      name,
      analyticalThinking,
      creativity,
      collaboration,
      difficulty,
    };

    const res = await fetch('/api/modify_course', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert('Course successfully updated!');
      router.push('/view-courses');
    } else if (res.status == 405) {
      alert ('Failed to update course: Course rating must be between 1 and 10');
    } else {
      alert('Failed to update course.');
    }
  };

  if (!cId) return <div className="p-4">Missing course ID.</div>;
  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex justify-between items-center gap-4 mb-10 pr-10 shadow-md">
        <Image src="/Logo.svg" alt="logo" width={150} height={150} />
        <div className="h-full flex flex-row gap-4">
          <Button onClick={() => router.push('/')} title="Back to Home" />
        </div>
      </div>
      <div className="p-6 w-full max-w-2xl mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center">Edit Course: {cId}</h1>
        <form onSubmit={handleUpdate} className="flex flex-col gap-2">
          <label className="block font-medium">Course Code</label>
          <input
            type="text"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="block font-medium">Analytical Thinking</label>
          <input
            type="number"
            className="border p-2 rounded"
            value={analyticalThinking}
            onChange={(e) => setAnalyticalThinking(Number(e.target.value))}
          />
          <label className="block font-medium">Creativity</label>
          <input
            type="number"
            className="border p-2 rounded"
            value={creativity}
            onChange={(e) => setCreativity(Number(e.target.value))}
          />
          <label className="block font-medium">Collaboration</label>
          <input
            type="number"
            className="border p-2 rounded"
            value={collaboration}
            onChange={(e) => setCollaboration(Number(e.target.value))}
          />
          <label className="block font-medium">Difficulty</label>
          <input
            type="number"
            className="border p-2 rounded"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
          />
          <Button type="submit" title="Update" />
        </form>
      </div>
    </main>
  );
}
