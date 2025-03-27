import { createConnection } from "@/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: Request) => {
  try {
    const { username, password, role, term } = await request.json();
    const connection = await createConnection();

    // Check if user already exists
    const [existingUsers] = await connection.query(
      "SELECT * FROM Users WHERE name = ?",
      [username]
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const [result] = await connection.query(
      "INSERT INTO Users (name, password, role, term) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, role, term]
    );

    // Get the inserted user's ID
    const [newUser] = await connection.query(
      "SELECT * FROM Users WHERE name = ?",
      [username]
    );

    return NextResponse.json({
      userId: (newUser as any[])[0].uId,
      username: (newUser as any[])[0].name,
      role: (newUser as any[])[0].role,
      term: (newUser as any[])[0].term,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
