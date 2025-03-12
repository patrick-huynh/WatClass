import { createConnection } from "@/db";
import { NextResponse, NextRequest } from "next/server";

interface Args {
  params: Promise<{
    uId: string;
    cId: string;
  }>;
}

export const PATCH = async (request: NextRequest, { params }: Args) => {
  try {
    const connection = await createConnection();
    const { uId, cId } = await params;
    const body = await request.json();
    const { pinCourse } = body;
    let sqlQuery;
    if (pinCourse) {
      sqlQuery = `
        INSERT INTO CoursePinned (uid, cid)
        VALUES (?, ?);
      `;
    } else {
      sqlQuery = `
        DELETE FROM CoursePinned
        WHERE uid = ? AND cid = ?;
      `;
    }
    await connection.execute(sqlQuery, [uId, cId]);
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
