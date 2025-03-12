SELECT
  *
FROM
  Courses
  JOIN CourseRatings ON Courses.cId = CourseRatings.cId;

INSERT INTO
  Courses (cId, name, subject)
VALUES
  (
    'ECON 101',
    'Introduction to Microeconomics',
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
  ('ECON 101', 4, 1, 2, 2);

SELECT
  *
FROM
  Courses
  JOIN CourseRatings ON Courses.cId = CourseRatings.cId;
