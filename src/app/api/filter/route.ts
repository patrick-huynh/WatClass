import { createConnection } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from 'mysql2';

interface FilterPayload {
  analyticalThinking: [number, number];
  creativity: [number, number];
  collaboration: [number, number];
  difficulty: [number];
}

export const POST = async (req: NextRequest) => {
  const connection = await createConnection();
  try {
    const body = (await req.json()) as FilterPayload;
    const { analyticalThinking, creativity, collaboration, difficulty } = body;
    if(!analyticalThinking || !creativity || !collaboration || !difficulty)
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    const sqlQuery = `SELECT * FROM (Courses c JOIN CourseRatings r on r.cId = c.cId)
    WHERE
    ? <= r.analyticalThinking AND r.analyticalThinking <= ? AND
    ? <= r.creativity AND r.creativity <= ? AND
    ? <= r.collaboration AND r.collaboration <= ? AND
    ? <= r.difficulty;`;
    const [rows] = await connection.query<RowDataPacket[]>(sqlQuery, [analyticalThinking[0], analyticalThinking[1], creativity[0], creativity[1], collaboration[0], collaboration[1], difficulty[0]]);

    const formattedData = rows.map((row: any) => ({
      cId: row.cId,
      name: row.name,
      analyticalThinking: row.analyticalThinking,
      creativity: row.creativity,
      collaboration: row.collaboration,
      difficulty: row.difficulty
    }));
    return NextResponse.json(formattedData);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
