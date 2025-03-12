-- Run this script to update db if it was setup using create_db from milestone 1
USE WatClass;

ALTER TABLE
  CourseWishlist RENAME TO CoursePinned;

DROP TABLE IF EXISTS CourseTaken;