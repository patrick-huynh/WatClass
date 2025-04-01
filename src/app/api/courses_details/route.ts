import { createConnection } from "@/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export const GET = async () => {
  try {
    const connection = await createConnection();

    const sqlQuery = `
      SELECT 
        Courses.cId, 
        Courses.name, 
        Courses.subject,
        CourseRatings.analyticalThinking,
        CourseRatings.creativity,
        CourseRatings.collaboration,
        CourseRatings.difficulty
      FROM Courses
      JOIN CourseRatings ON Courses.cId = CourseRatings.cId;
    `;

    const [rows] = await connection.query<RowDataPacket[]>(sqlQuery);

    const formattedData = rows.map((row: any) => ({
      cId: row.cId,
      name: row.name,
      subject: row.subject,
      analyticalThinking: row.analyticalThinking,
      creativity: row.creativity,
      collaboration: row.collaboration,
      difficulty: row.difficulty,
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
