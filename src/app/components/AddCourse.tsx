"use client";

import { useRouter } from 'next/navigation';
import Button from "./Button";

export default function AddCourseButton() {
  const router = useRouter();

  return (
    <div>
      <Button title="Add Course" onClick={() => router.push('/add-course')} />
    </div>
  );
}
