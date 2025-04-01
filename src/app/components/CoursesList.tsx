"use client";

import React, { useState } from "react";
import DataTable from "./DataTable";
import Button from "./Button";
import { mapColumns } from "../constants/ColumnMappings";

interface CoursesListProps {
  uId: number;
}

export default function CoursesList({ uId }: CoursesListProps) {
  const [courses, setCourses] = useState<any[]>([]);
  const [btnTitle, setBtnTitle] = useState("Show all courses");

  const fetchCourses = async () => {
    if (courses.length > 0) {
      setCourses([]);
      setBtnTitle("Show all courses");
    } else {
      try {
        const response = await fetch("/api/courses");
        const data = await response.json();
        const mappedData = mapColumns(data);
        setCourses(mappedData);
        setBtnTitle("Hide all courses");
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

  };

  return (
    <div className="text-center mt-4">
      <Button onClick={fetchCourses} title={btnTitle} />
      {courses.length > 0 && (
        <DataTable uId={uId} courses={courses} includeFavourites={true} />
      )}
    </div>
  );
}
