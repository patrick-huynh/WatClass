INSERT INTO
  CoursePinned (uId, cId)
VALUES
  (1, "CS 115");

SELECT
  *
FROM
  CoursePinned;

DELETE FROM
  CoursePinned
WHERE
  uId = 1
  AND cId = "CS 115";

SELECT
  *
FROM
  CoursePinned;