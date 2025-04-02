'use client';

import { useRouter } from "next/navigation";
import ViewCourseTable from "../components/ViewCourseTable";
import Image from "next/image";
import Button from "../components/Button";

export default function ViewCoursesPage() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex justify-between items-center gap-4 mb-10 pr-10 shadow-md">
        <Image src="/Logo.svg" alt="logo" width={150} height={150} />
        <div className="h-full flex flex-row gap-4">
          <Button onClick={() => router.push('/')} title="Back to Home" />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-center">View Courses</h1>
      <ViewCourseTable />
    </main>
  );
}
