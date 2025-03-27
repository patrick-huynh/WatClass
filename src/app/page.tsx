'use client'

import React, { useState } from "react";
import CoursesList from "./components/CoursesList";
import AggregateStats from "./components/AggregateStats";
import Image from "next/image";
import AddCourseButton from "./components/AddCourse";
import GetFormButton from "./components/RecForm";
import Button from "./components/Button";

export default function HomePage() {
  const [uId, setUId] = useState(1);
  const [user, setUser] = useState('student'); // TODO: add login/signup

  return (
    <main className="flex min-h-screen flex-col  p-6">
      <div className="flex justify-between items-center gap-4 mb-10 pr-10 shadow-md">
        <Image src="/Logo.svg" alt="logo" width={150} height={150} />
        <div className="h-full flex flex-row gap-4">
          {user == 'professor' && <AddCourseButton />}
          {user != 'professor' && <GetFormButton />}
          {
            user == ''
            ? (<Button onClick={() => setUser('student')} title="Login" />)
            : (<Button onClick={() => setUser('')} title="Logout" />)
          }
          <Button onClick={() => console.log('signup')} title="Signup" />
        </div>
      </div>

      <div className="flex flex-row justify-center items-center gap-4">
      <div className="max-w-4xl text-center">
        <h1 className="text-2xl font-bold mb-4">Course and Stats Viewer</h1>
        <CoursesList uId={uId} />
        <AggregateStats />
      </div>
      </div>
    </main>
  );
}
