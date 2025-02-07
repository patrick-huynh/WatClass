SELECT
  qId,
  questionText
FROM
  Questions
WHERE
  qId = (
    SELECT
      nextQuestion
    FROM
      NextQuestionLookup
    WHERE
      qId = 1
      AND expectedAnswer = 5
  );
