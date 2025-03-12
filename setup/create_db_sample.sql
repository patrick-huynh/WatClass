DROP DATABASE IF EXISTS WatClass;

CREATE DATABASE WatClass;

USE WatClass;

DROP TABLE IF EXISTS CourseRecommended;

DROP TABLE IF EXISTS CoursePinned;

DROP TABLE IF EXISTS Answers;

DROP TABLE IF EXISTS NextQuestionLookup;

DROP TABLE IF EXISTS Users;

DROP TABLE IF EXISTS CourseRatings;

DROP TABLE IF EXISTS Questions;

DROP TABLE IF EXISTS Courses;

CREATE TABLE Courses (
  cId VARCHAR(20) CHECK (cId regexp '^[A-Z]+ [0-9]+$') PRIMARY KEY,
  -- course code
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(10) NOT NULL
);

CREATE TABLE Questions (
  qId INT PRIMARY KEY AUTO_INCREMENT,
  questionText VARCHAR(255) NOT NULL
);

CREATE TABLE CourseRatings (
  cId VARCHAR(20) PRIMARY KEY,
  analyticalThinking INT CHECK (
    analyticalThinking BETWEEN 1
    AND 10
  ),
  creativity INT CHECK (
    creativity BETWEEN 1
    AND 10
  ),
  collaboration INT CHECK (
    collaboration BETWEEN 1
    AND 10
  ),
  difficulty INT CHECK (
    difficulty BETWEEN 1
    AND 10
  ),
  FOREIGN KEY (cId) REFERENCES Courses (cId)
);

CREATE TABLE Users (
  uId INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  term VARCHAR(3) CHECK (
    term IN ('1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B')
  ),
  role VARCHAR(20) CHECK (role IN ('student', 'professor', 'admin')) NOT NULL
);

CREATE TABLE NextQuestionLookup (
  qId INT,
  expectedAnswer INT CHECK (
    expectedAnswer BETWEEN 1
    AND 10
  ),
  nextQuestion INT,
  PRIMARY KEY (qId, expectedAnswer),
  FOREIGN KEY (qId) REFERENCES Questions (qId),
  FOREIGN KEY (nextQuestion) REFERENCES Questions (qId)
);

CREATE TABLE Answers (
  uId INT,
  qId INT,
  userAnswer INT CHECK (
    userAnswer BETWEEN 1
    AND 10
  ),
  PRIMARY KEY (uId, qId),
  FOREIGN KEY (uId) REFERENCES Users (uId),
  FOREIGN KEY (qId) REFERENCES Questions (qId)
);

CREATE TABLE CoursePinned (
  uId INT,
  cId VARCHAR(20),
  PRIMARY KEY (uId, cId),
  FOREIGN KEY (uId) REFERENCES Users (uId),
  FOREIGN KEY (cId) REFERENCES Courses (cId)
);

CREATE TABLE CourseRecommended (
  uId INT,
  cId VARCHAR(20),
  PRIMARY KEY (uId, cId),
  FOREIGN KEY (uId) REFERENCES Users (uId),
  FOREIGN KEY (cId) REFERENCES Courses (cId)
);

-- Load sample data
INSERT INTO
  Courses (cId, name, subject)
VALUES
  (
    'CS 115',
    'Introduction to Computer Science 1',
    'CS'
  ),
  ('CS 341', 'Algorithms', 'CS'),
  ('CS 350', 'Operating Systems', 'CS'),
  ('STAT 230', 'Probability', 'STAT'),
  ('STAT 231', 'Statistics', 'STAT'),
  (
    'MATH 135',
    'Algebra for Honours Mathematics',
    'MATH'
  ),
  (
    'MATH 137',
    'Calculus 1 for Honours Mathematics',
    'MATH'
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
  ('CS 115', 4, 3, 5, 2),
  ('CS 341', 5, 4, 5, 4),
  ('CS 350', 4, 5, 4, 5),
  ('STAT 230', 2, 3, 4, 3),
  ('STAT 231', 3, 4, 3, 3),
  ('MATH 135', 4, 4, 4, 4),
  ('MATH 137', 5, 5, 5, 4);

INSERT INTO
  Users (name, term, role)
VALUES
  ('test', '1A', 'student');

INSERT INTO
  Questions (questionText)
VALUES
  (
    'How much time do you want to commit to this course?'
  ),
  ('How much do you enjoy working with others?');

INSERT INTO
  NextQuestionLookup (qId, expectedAnswer, nextQuestion)
VALUES
  (1, 5, 2);