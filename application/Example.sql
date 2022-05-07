DROP DATABASE IF EXISTS Example;
CREATE DATABASE Example;
USE Example;
DROP TABLE IF EXISTS Posting;


-- @backend team: use "Title" instead of name, and "description" instead of "comment"
CREATE TABLE Posting (
ID int,
Name varchar(255),
Category varchar(16),
UserID int,
Comment varchar(255),
Price double
ImageLocation varchar(255)
);

-- @backend team: add valid image locations to the end of each of these items (add them in the empty string I appended)
-- (the path should be an absolute path, and the image should be stored in images):
INSERT INTO posting (ID, Name, Category, UserID, Comment, Price, ImageLocation)
VALUES
(1, 'Learning Life: The Path to Academic Success and Personal Happiness', 'Textbook', 1, 'Textbook for Self Improvement class, it`s just like new!', 20, ''),
(2, 'Calculus: Early Transcendentals', 'Textbook', 2, 'Textbook for Calculus, it is slightly used..', 12, ''),
(3, 'Physics for Scientists and Engineers: A Strategic Approach', 'Textbook', 3, 'Textbook for physics, it is used/damaged', 5, ''),
(4, 'Understanding and Using English Grammar', 'Textbook', 4, 'Book for english class, good Condition, can have for free', 0, ''),
(5, 'CSC 648 Notes', 'Notes', 5, 'Notes for Software Engineering, incredibly indepth', 100, ''),
(6, 'CSC 665 Notes', 'Notes', 6, 'Notes for Artifical Intelligence, not much written', 5, ''),
(7, 'CSC 642 Notes', 'Notes', 7, 'Notes for Human Computer Interaction, simple', 3, ''),
(8, 'Coffee Table', 'Furniture', 8, 'Slightly stained coffee table, no damage, need gone ASAP!', 7, ''),
(9, 'Computer Chair', 'Furniture', 9, 'Old computer chair; crusty, but comfortable!', 15, ''),
(10, 'Couch', 'Furniture', 10, 'Freshly bought couch, doesnt fit in my dorm!', 30, '');

SELECT * FROM Example.Posting;