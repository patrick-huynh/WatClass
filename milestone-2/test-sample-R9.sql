SELECT * FROM Courses WHERE cId = "CS 341";
SELECT * FROM CourseRatings WHERE cId = "CS 341";

UPDATE Courses
SET name = "Algorithms I"
WHERE cId = "CS 341";

UPDATE CourseRatings
SET
  analyticalThinking = 5,
  creativity = 5,
  collaboration = 5,
  difficulty = 5
WHERE cId = "CS 341";

SELECT * FROM Courses WHERE cId = "CS 341";
SELECT * FROM CourseRatings WHERE cId = "CS 341";