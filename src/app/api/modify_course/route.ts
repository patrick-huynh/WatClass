import { createConnection } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from 'mysql2';

interface CoursePayload {
  cId: string;
  name: string;
  subject: string;
  analyticalThinking: number;
  creativity: number;
  collaboration: number;
  difficulty: number;
}

export const PUT = async (req: NextRequest) => {
  const connection = await createConnection();
  const body = (await req.json()) as CoursePayload;
  const { cId, name, analyticalThinking, creativity, collaboration, difficulty } = body;

  try {
    if (!cId || !name || !analyticalThinking || !creativity || !collaboration || !difficulty) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updateCourses = `UPDATE Courses SET name = ? WHERE cId = ?;`;
    const updateRatings = `UPDATE CourseRatings SET analyticalThinking = ?, creativity = ?, collaboration = ?, difficulty = ? WHERE cId = ?`;

    await connection.beginTransaction();
    await connection.execute(updateCourses, [name, cId]);
    await connection.execute(updateRatings, [analyticalThinking, creativity, collaboration, difficulty, cId]);
    await connection.commit();

    return NextResponse.json({ message: "Course updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    await connection.rollback();

    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { message: 'Duplicate entry error' },
        { status: 409 }
      );
    } else if (error.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {
      return NextResponse.json(
        { message: 'Formatting error' },
        { status: 405 }
      );
    }

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
};
