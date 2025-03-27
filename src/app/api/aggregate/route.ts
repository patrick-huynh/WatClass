import { createConnection } from "@/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const connection = await createConnection();
    const sqlQuery = `SELECT subject, 
    AVG(difficulty), 
    AVG(analyticalThinking), 
    AVG(creativity), 
    AVG(collaboration) 
    FROM CourseRatingView
    GROUP BY subject;`
    const [rows] = await connection.query(sqlQuery);
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
