import { createConnection } from "@/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const connection = await createConnection();
    const sqlQuery = "SELECT * FROM student";
    const [rows] = await connection.query(sqlQuery);
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
