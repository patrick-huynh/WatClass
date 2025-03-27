'use client'

import React from "react";
import CoursesList from "./components/CoursesList";
import AggregateStats from "./components/AggregateStats";
import Image from "next/image";
import AddCourseButton from "./components/AddCourse";
import GetFormButton from "./components/RecForm";
import Button from "./components/Button";
import { useUser } from "./hooks/useUser";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user, logout } = useUser();
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col  p-6">
      <div className="flex justify-between items-center gap-4 mb-10 pr-10 shadow-md">
        <div className="flex flex-row gap-4 items-center">
          <Image src="/Logo.svg" alt="logo" width={150} height={150} />
          {user.isAuthenticated && <h1 className="text-xl">{user.username}</h1>}
        </div>
        <div className="h-full flex flex-row gap-4">
          {user.role === 'professor' && <AddCourseButton />}
          {user.role === 'student' && <GetFormButton />}
          {
            !user.isAuthenticated
            ? (<Button onClick={() => router.push('/login')} title="Login" />)
            : (<Button onClick={() => {
                logout();
                router.push('/login');
              }} title="Logout" />)
          }
          {
            !user.isAuthenticated && (<Button onClick={() => router.push('/signup')} title="Signup" />)
          }
        </div>
      </div>

      {
        !user.isAuthenticated
        ? (
          <div className="flex flex-row justify-center items-center gap-4">
            <div className="max-w-4xl text-center">
              <h1 className="text-2xl font-bold mb-4">Please login/signup to continue</h1>
            </div>
          </div>
        )
        : (
          <div className="flex flex-row justify-center items-center gap-4">
            <div className="max-w-4xl text-center">
              <h1 className="text-2xl font-bold mb-4">Course and Stats Viewer</h1>
              <CoursesList uId={user.userId!} />
              <AggregateStats />
            </div>
          </div>
        )
      }
    </main>
  );
}
