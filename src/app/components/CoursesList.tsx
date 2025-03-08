"use client";

import React, { useState } from "react";
import DataTable from "./DataTable";
import Button from "./Button";
import { mapColumns } from "../constants/ColumnMappings";

export default function CoursesList() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      const data = await response.json();
      const mappedData = mapColumns(data);
      setCourses(mappedData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <div className="text-center mt-4">
      <Button onClick={fetchCourses} title="Get all courses" />
      {courses.length > 0 ? (
        <DataTable courses={courses} includeFavourites={true} />
      ) : (
        <p className="text-gray-500 mt-4">No courses available</p>
      )}
    </div>
  );
}
