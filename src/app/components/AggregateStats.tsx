"use client";

import React, { useState } from "react";
import Button from "./Button";
import DataTable from "./DataTable";
import { mapColumns } from "../constants/ColumnMappings";

export default function AggregateStats() {
  const [aggregate, setAggregate] = useState<any[]>([]);

  const fetchAggregate = async () => {
    const response = await fetch("/api/aggregate");
    const data = await response.json();
    const mappedData = mapColumns(data);
    setAggregate(mappedData);
  };

  return (
    <div className="text-center mt-4">
      <Button onClick={fetchAggregate} title="Get average stats" />
      {aggregate.length > 0 ? (
        <DataTable courses={aggregate} />
      ) : (
        <p className="text-gray-500 mt-4">No data available</p>
      )}
    </div>
  );
}
