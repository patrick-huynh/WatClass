"use client";

import { useRouter } from 'next/navigation';
import Button from "./Button";

export default function ViewCoursesButton() {
  const router = useRouter();

  return (
    <div>
      <Button title="View Course Details" onClick={() => router.push('/view-courses')} />
    </div>
  );
}
