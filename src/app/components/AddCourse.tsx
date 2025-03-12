"use client";

import Link from 'next/link';
import Button from "./Button";


export default function AddCourseButton() {
  return (
    <div>
      <Link href="/add-course">
        <Button title="Add Course" onClick={() => {}} />
      </Link>
    </div>
  );
}
