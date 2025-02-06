DROP TABLE IF EXISTS CourseRecommended;

DROP TABLE IF EXISTS CourseWishlist;

DROP TABLE IF EXISTS CourseTaken;

DROP TABLE IF EXISTS Answers;

DROP TABLE IF EXISTS NextQuestionLookup;

DROP TABLE IF EXISTS Users;

DROP TABLE IF EXISTS CourseRatings;

DROP TABLE IF EXISTS Questions;

DROP TABLE IF EXISTS Courses;

CREATE TABLE Courses (
  cId VARCHAR(20) CHECK (cId regexp '^[A-Z]+ [0-9]+$') PRIMARY KEY, -- course code
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(10) NOT NULL
);

CREATE TABLE Questions (
  qId INT PRIMARY KEY AUTO_INCREMENT,
  questionText VARCHAR(255) NOT NULL
);

CREATE TABLE CourseRatings (
  cId VARCHAR(20) PRIMARY KEY,
  analyticalThinking INT CHECK (analyticalThinking BETWEEN 1 AND 5),
  creativity INT CHECK (creativity BETWEEN 1 AND 5),
  collaboration INT CHECK (collaboration BETWEEN 1 AND 5),
  difficulty INT CHECK (difficulty BETWEEN 1 AND 5),
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
  expectedAnswer INT CHECK (expectedAnswer BETWEEN 1 AND 10),
  nextQuestion INT,
  PRIMARY KEY (qId, expectedAnswer),
  FOREIGN KEY (qId) REFERENCES Questions (qId),
  FOREIGN KEY (nextQuestion) REFERENCES Questions (qId)
);

CREATE TABLE Answers (
  uId INT,
  qId INT,
  userAnswer INT CHECK (userAnswer BETWEEN 1 AND 10),
  PRIMARY KEY (uId, qId),
  FOREIGN KEY (uId) REFERENCES Users (uId),
  FOREIGN KEY (qId) REFERENCES Questions (qId)
);

CREATE TABLE CourseTaken (
  uId INT,
  cId VARCHAR(20),
  PRIMARY KEY (uId, cId),
  FOREIGN KEY (uId) REFERENCES Users (uId),
  FOREIGN KEY (cId) REFERENCES Courses (cId)
);

CREATE TABLE CourseWishlist (
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
  Courses
VALUES
  (
    'CS 115',
    'Introduction to Computer Science 1',
    'CS'
  );
