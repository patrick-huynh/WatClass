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

export const POST = async (req: NextRequest) => {
  const connection = await createConnection();
  const body = (await req.json()) as CoursePayload;
  const { cId, name, subject, analyticalThinking, creativity, collaboration, difficulty } = body;
  try {
    if( !cId || ! name || !subject || !analyticalThinking || !creativity || !collaboration || !difficulty) 
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    const insertCourses = `INSERT INTO Courses (cId, name, subject) VALUES (?, ?, ?);`;
    const insertRatings = `INSERT INTO CourseRatings (cId, analyticalThinking, creativity, collaboration, difficulty) VALUES (?, ?, ?, ?, ?)`;
    await connection.beginTransaction()
    await connection.execute(insertCourses, [cId, name, subject]); 
    await connection.execute(insertRatings, [cId, analyticalThinking, creativity, collaboration, difficulty]);
    await connection.commit()
    return NextResponse.json({ message: "Course added successfully"}, { status: 201 });
  } catch (error: any) {
    console.log(error);
    await connection.rollback();
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { message: 'Duplicate entry error' },
        { status: 409 } // Conflict status code for duplicate entries
      );
    } else if (error.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {
      return NextResponse.json(
        { message: 'Formatting error' },
        { status: 405 }
      );
    }
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 } // Set explicit status code for internal server errors
    );
  }
};
