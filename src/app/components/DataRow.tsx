"use client";

import React from "react";

export default function DataRow({ course, index }: { course: any; index: number }) {
  const rowColor = index % 2 === 0 ? "bg-gray-200" : "bg-gray-300";

  return (
    <tr className={`border-b border-gray-300 ${rowColor}`}>
      <td className="p-2">{JSON.stringify(course)}</td>
    </tr>
  );
}
