SELECT * FROM Courses WHERE cId = "CS341";
SELECT * FROM CourseRatings WHERE cId = "CS341";

UPDATE Courses
SET name = "Algorithms I"
WHERE cId = "CS341";

UPDATE CourseRatings
SET
  analyticalThinking = 5,
  creativity = 5,
  collaboration = 5,
  difficulty = 5
WHERE cId = "CS341";

SELECT * FROM Courses WHERE cId = "CS341";
SELECT * FROM CourseRatings WHERE cId = "CS341";