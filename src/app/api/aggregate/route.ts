import { createConnection } from "@/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const connection = await createConnection();
    const sqlQuery = `SELECT c.subject, 
    AVG(r.difficulty), 
    AVG(r.analyticalThinking), 
    AVG(r.creativity), 
    AVG(r.collaboration) 
    FROM 
    (CourseRatings r JOIN Courses c on r.cId = c.cId) 
    GROUP BY c.subject;`;
    const [rows] = await connection.query(sqlQuery);
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
