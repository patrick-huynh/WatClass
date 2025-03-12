import { createConnection } from "@/db";
import { RowDataPacket } from "mysql2";
import { NextResponse, NextRequest } from "next/server";

interface Args {
  params: Promise<{
    uId: string;
  }>;
}

export const GET = async (request: NextRequest, { params }: Args) => {
  try {
    const connection = await createConnection();
    const { uId } = await params;
    const [rows] = await connection.query<RowDataPacket[]>("SELECT * FROM CoursePinned WHERE uid = ?", [uId]);
    const cIds = rows.map((row) => row.cId);
    return NextResponse.json({ cIds }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
