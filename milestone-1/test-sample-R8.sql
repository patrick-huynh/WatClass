SELECT
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
      qid = 1
      AND expectedAnswer = 5
  );
