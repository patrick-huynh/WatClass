"use client";

import React, { useState } from "react";
import { FaHeart, FaSortUp, FaSortDown } from "react-icons/fa";

interface DataTableProps {
  uId?: number;
  courses: any[];
  columnNames?: string[];
  includeFavourites?: boolean;
}

export default function DataTable({ uId, courses, columnNames, includeFavourites = false }: DataTableProps) {
  if (!courses || courses.length === 0) {
    return <p className="text-gray-500 mt-4">No data available</p>;
  }

  const allColumnNames = Object.keys(courses[0]);
  const displayedColumns = columnNames ?? allColumnNames;

  // Store favourites as a map of cId -> boolean
  const [favourites, setFavourites] = useState<{ [cId: string]: boolean }>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" | null } | null>(null);

  // Fetch favourites on mount
  React.useEffect(() => {
    const fetchFavourites = async () => {
      const response = await fetch(`/api/users/${uId}/coursePinned`);
      const data = await response.json();
      const newFavourites: { [cId: string]: boolean } = {};
      data.cIds.forEach((cId: string) => {
        newFavourites[cId] = true;
      });
      setFavourites(newFavourites);
    };
    fetchFavourites();
  }, [uId]);

  const toggleFavourite = async (cId: string) => {
    const prevStatus = favourites[cId];
    setFavourites({ ...favourites, [cId]: !prevStatus });
    await fetch(`/api/users/${uId}/coursePinned/${cId}`, {
      method: "PATCH",
      body: JSON.stringify({ pinCourse: !prevStatus }),
    });
  };

  const getFavouriteCIds = () => {
    return Object.keys(favourites).filter((cId) => favourites[cId]);
  };

  const sortedCourses = [...courses];
  if (sortConfig && sortConfig.direction !== null) {
    sortedCourses.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (col: string) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== col) {
        return { key: col, direction: "asc" };
      }
      if (prev.direction === "asc") {
        return { key: col, direction: "desc" };
      }
      return null;
    });
  };

  const getSortIcon = (col: string) => {
    if (!sortConfig || sortConfig.key !== col) return null;
    return sortConfig.direction === "asc" ? (
      <FaSortUp className="inline ml-2 text-gray-800" />
    ) : (
      <FaSortDown className="inline ml-2 text-gray-800" />
    );
  };

  return (
    <div className="mt-4">
      {/* Display Favourited cId List */}
      {includeFavourites && getFavouriteCIds().length > 0 && (
        <div className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded">
          <p className="font-semibold">Favourited Course IDs:</p>
          <p className="text-gray-800">{getFavouriteCIds().join(", ")}</p>
        </div>
      )}

      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-main text-white border-b border-gray-400">
            {displayedColumns.map((col) => (
              <th key={col} className="p-3 text-center cursor-pointer" onClick={() => handleSort(col)}>
                {col} {getSortIcon(col)}
              </th>
            ))}
            {includeFavourites && <th className="p-3 text-center">Favourites</th>}
          </tr>
        </thead>
        <tbody>
          {sortedCourses.map((course, rowIndex) => {
            const rowKey = course['Course Code'] ?? course['Subject'];

            return (
              <tr key={rowKey} className="border-b border-gray-300 hover:bg-gray-100">
                {displayedColumns.map((col) => (
                  <td key={`${col}-${rowKey}`} className="p-3 text-center">{course[col]}</td>
                ))}
                {includeFavourites && (
                  <td key={`fav-${rowKey}`} className="p-3 text-center">
                    <button onClick={() => toggleFavourite(rowKey)} className="flex justify-center items-center w-full">
                      <FaHeart className={`cursor-pointer text-2xl transition-colors ${favourites[rowKey] ? "text-red-500" : "text-gray-300"}`} />
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
