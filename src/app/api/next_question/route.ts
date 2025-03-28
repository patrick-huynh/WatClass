import { createConnection } from "@/db";
import { NextResponse, NextRequest } from "next/server";
import { RowDataPacket } from 'mysql2';

export const GET = async (request: NextRequest) => {
  try {
    const connection = await createConnection();
    const { searchParams } = new URL(request.url);
    const qid = searchParams.get('qid');
    const answer = searchParams.get('answer');
    if (qid === null || answer === null) {
      throw new Error('Missing required query parameters: qid or answer');
    }
    
    const sqlQuery = `SELECT
    qid,
    questionText
    FROM
    Questions
    WHERE
    qid = (
        SELECT
        nextQuestion
        FROM
        NextQuestionLookup
        WHERE
        qid = ${qid}
        AND expectedAnswer = ${answer}
    );`;
    const [rows] = await connection.query<RowDataPacket[]>(sqlQuery);

    let formattedData = null;
    if (rows.length > 0) {
      formattedData = {
        qid: rows[0].qid,
        questionText: rows[0].questionText,
      };
    }

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
};
