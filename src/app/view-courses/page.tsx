'use client';
import ViewCourseTable from "../components/ViewCourseTable";

export default function ViewCoursesPage() {
  return (
    <main className="max-w-7xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">View Courses</h1>
      <ViewCourseTable />
    </main>
  );
}
