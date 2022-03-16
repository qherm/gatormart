DROP DATABASE IF EXISTS Example;
CREATE DATABASE Example;
USE Example;
DROP TABLE IF EXISTS Posting;

CREATE TABLE Posting (
ID int,
Name varchar(255),
Category varchar(16),
UserID int,
Comment varchar(255),
Price double
);

INSERT INTO posting (ID, Name, Category, UserID, Comment, Price)
VALUES
(1, 'Learning Life: The Path to Academic Success and Personal Happiness', 'Textbook', 1, 'Just like new!', 20),
(2, 'Calculus: Early Transcendentals', 'Textbook', 2, 'Slightly used..', 12),
(3, 'Physics for Scientists and Engineers: A Strategic Approach', 'Textbook', 3, 'Used/Damaged', 5),
(4, 'Understanding and Using English Grammar', 'Textbook', 4, 'Good Condition, can have for free', 0),
(5, 'CSC 648 Notes', 'Notes', 5, 'Notes for Software Engineering', 100),
(6, 'CSC 665 Notes', 'Notes', 6, 'Notes for Artifical Intelligence', 5),
(7, 'CSC 642 Notes', 'Notes', 7, 'Notes for Human Computer Interaction', 3),
(8, 'Coffee Table', 'Furniture', 8, 'No damage, need gone ASAP!', 7),
(9, 'Computer Chair', 'Furniture', 9, 'Crusty, but comfortable!', 15),
(10, 'Couch', 'Furniture', 10, 'Just bought it, doesnt fit in my dorm!', 30);

SELECT * FROM example.posting;