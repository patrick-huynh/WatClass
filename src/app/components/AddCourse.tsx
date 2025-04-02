"use client";

import { useRouter } from 'next/navigation';
import Button from "./Button";
import Link from 'next/link';

export default function AddCourseButton() {
  const router = useRouter();

  return (
    <div>
      <Link href="/add-course">
        <Button title="Add Course" onClick={() => {}} />
      </Link>
    </div>
  );
}
