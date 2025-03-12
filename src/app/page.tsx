import React from "react";
import CoursesList from "./components/CoursesList";
import AggregateStats from "./components/AggregateStats";
import AddCourseButton from "./components/AddCourse";
import GetFormButton from "./components/RecForm";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-2xl font-bold mb-4">Course and Stats Viewer</h1>
        <CoursesList />
        <AggregateStats />
        <AddCourseButton />
        <GetFormButton />
      </div>
    </main>
  );
}
