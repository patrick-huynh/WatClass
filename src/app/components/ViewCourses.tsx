"use client";

import { useRouter } from 'next/navigation';
import Button from "./Button";
import Link from 'next/link';

export default function ViewCoursesButton() {
  const router = useRouter();

  return (
    <div>
      <Link href="/view-courses">
        <Button title="View Course Details" onClick={() => {}} />
      </Link>
    </div>
  );
}
