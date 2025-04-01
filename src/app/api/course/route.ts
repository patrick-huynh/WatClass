import { createConnection } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const connection = await createConnection();
  const { searchParams } = new URL(req.url);
  const cId = searchParams.get('cId');

  if (!cId) {
    return NextResponse.json({ error: 'Missing course ID' }, { status: 400 });
  }

  try {
    const [rows] = await connection.query(
      `
      SELECT * 
      FROM Courses
      JOIN CourseRatings ON Courses.cId = CourseRatings.cId
      WHERE Courses.cId = ?
      `,
      [cId]
    );

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
