SELECT
  *
FROM
  Courses
  JOIN CourseRatings ON Courses.cId = CourseRatings.cId
WHERE
  subject = "ECON";

INSERT INTO
  Courses (cId, name, subject)
VALUES
  (
    'ECON103',
    'Introduction to Microeconomics II',
    'ECON'
  );

INSERT INTO
  CourseRatings (
    cId,
    analyticalThinking,
    creativity,
    collaboration,
    difficulty
  )
VALUES
  ('ECON103', 4, 1, 2, 2);

SELECT
  *
FROM
  Courses
  JOIN CourseRatings ON Courses.cId = CourseRatings.cId
WHERE
  subject = "ECON";
