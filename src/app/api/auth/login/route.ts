import { createConnection } from "@/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: Request) => {
  try {
    const { username, password } = await request.json();
    const connection = await createConnection();

    // Check if user exists
    const [users] = await connection.query(
      "SELECT * FROM Users WHERE name = ?",
      [username]
    );

    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    // Authenticate
    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      userId: user.uId,
      username: user.name,
      role: user.role,
      term: user.term,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
