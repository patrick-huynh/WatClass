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
  courseId VARCHAR(20) PRIMARY KEY,
  courseName VARCHAR(255) NOT NULL,
  courseSubject VARCHAR(100) NOT NULL
);

CREATE TABLE Questions (
  questionId INT PRIMARY KEY AUTO_INCREMENT,
  question TEXT NOT NULL
);

CREATE TABLE CourseRatings (
  courseId VARCHAR(20) PRIMARY KEY,
  analyticalThinking INT CHECK (analyticalThinking BETWEEN 1 AND 5),
  creativity INT CHECK (creativity BETWEEN 1 AND 5),
  collaboration INT CHECK (collaboration BETWEEN 1 AND 5),
  trivia INT CHECK (trivia BETWEEN 1 AND 5),
  difficulty INT CHECK (difficulty BETWEEN 1 AND 5),
  FOREIGN KEY (courseId) REFERENCES Courses (courseId)
);

CREATE TABLE Users (
  userId INT PRIMARY KEY AUTO_INCREMENT,
  userName VARCHAR(255) NOT NULL,
  term VARCHAR(3) CHECK (
    term IN ('1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B')
  ),
  role VARCHAR(20) CHECK (role IN ('student', 'professor', 'admin')) NOT NULL
);

CREATE TABLE NextQuestionLookup (
  questionId INT,
  expectedAnswer INT CHECK (expectedAnswer BETWEEN 1 AND 10),
  nextQuestion INT,
  PRIMARY KEY (questionId, expectedAnswer),
  FOREIGN KEY (questionId) REFERENCES Questions (questionId),
  FOREIGN KEY (nextQuestion) REFERENCES Questions (questionId)
);

CREATE TABLE Answers (
  userId INT,
  questionId INT,
  userAnswer INT CHECK (userAnswer BETWEEN 1 AND 10),
  PRIMARY KEY (userId, questionId),
  FOREIGN KEY (userId) REFERENCES Users (userId),
  FOREIGN KEY (questionId) REFERENCES Questions (questionId)
);

CREATE TABLE CourseTaken (
  courseId VARCHAR(20),
  userId INT,
  PRIMARY KEY (courseId, userId),
  FOREIGN KEY (courseId) REFERENCES Courses (courseId),
  FOREIGN KEY (userId) REFERENCES Users (userId)
);

CREATE TABLE CourseWishlist (
  courseId VARCHAR(20),
  userId INT,
  PRIMARY KEY (courseId, userId),
  FOREIGN KEY (courseId) REFERENCES Courses (courseId),
  FOREIGN KEY (userId) REFERENCES Users (userId)
);

CREATE TABLE CourseRecommended (
  courseId VARCHAR(20),
  userId INT,
  PRIMARY KEY (courseId, userId),
  FOREIGN KEY (courseId) REFERENCES Courses (courseId),
  FOREIGN KEY (userId) REFERENCES Users (userId)
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
