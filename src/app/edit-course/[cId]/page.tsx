'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/app/components/Button';

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

  const handleUpdate = async () => {
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
      alert('Course updated!');
      router.push('/view-courses');
    } else {
      alert('Failed to update course.');
    }
  };

  if (!cId) return <div className="p-4">Missing course ID.</div>;
  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Course: {cId}</h1>
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Course Name</label>
          <input
            className="border px-2 py-1 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Analytical Thinking</label>
          <input
            type="number"
            className="border px-2 py-1 w-full"
            value={analyticalThinking}
            onChange={(e) => setAnalyticalThinking(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block font-medium">Creativity</label>
          <input
            type="number"
            className="border px-2 py-1 w-full"
            value={creativity}
            onChange={(e) => setCreativity(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block font-medium">Collaboration</label>
          <input
            type="number"
            className="border px-2 py-1 w-full"
            value={collaboration}
            onChange={(e) => setCollaboration(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block font-medium">Difficulty</label>
          <input
            type="number"
            className="border px-2 py-1 w-full"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
          />
        </div>
        <Button onClick={handleUpdate} title="Update" />
      </div>
    </div>
  );
}
