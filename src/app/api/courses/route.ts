import { createConnection } from "@/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from 'mysql2';

export const GET = async () => {
  try {
    const connection = await createConnection();
    const sqlQuery = "SELECT * FROM Courses;";
    const [rows] = await connection.query<RowDataPacket[]>(sqlQuery);

    const formattedData = rows.map((row: any) => ({
      cId: row.cId,
      name: row.name,
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
