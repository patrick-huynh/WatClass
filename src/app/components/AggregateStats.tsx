"use client";

import React, { useState } from "react";
import Button from "./Button";
import DataTable from "./DataTable";
import { mapColumns } from "../constants/ColumnMappings";

export default function AggregateStats() {
  const [aggregate, setAggregate] = useState<any[]>([]);
  const [btnTitle, setBtnTitle] = useState("Get average course stats by subject");

  const fetchAggregate = async () => {
    if (aggregate.length > 0) {
      setAggregate([]);
      setBtnTitle("Get average course stats by subject");
      return;
    } else {
      try {
        const response = await fetch("/api/aggregate");
        const data = await response.json();
        const mappedData = mapColumns(data);
        setAggregate(mappedData);
        setBtnTitle("Hide average course stats");
      } catch (error) {
        console.error("Error fetching aggregate stats:", error);
      }
    }
  };

  return (
    <div className="text-center mt-4">
      <Button onClick={fetchAggregate} title={btnTitle} />
      {aggregate.length > 0 && (
        <DataTable courses={aggregate} />
      )}
    </div>
  );
}
