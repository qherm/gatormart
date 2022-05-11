-- MySQL Script generated by MySQL Workbench
-- Sun Apr 10 18:25:15 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

-- -----------------------------------------------------
-- Schema GatorMatorDB
-- -----------------------------------------------------
DROP DATABASE IF EXISTS gatormartdb;

-- -----------------------------------------------------
-- Schema GatorMatorDB
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS gatormartdb DEFAULT CHARACTER SET utf8 ;
USE gatormartdb ;


-- -----------------------------------------------------
-- Table gatormartdb.users
-- -----------------------------------------------------
DROP TABLE IF EXISTS gatormartdb.users ;

CREATE TABLE IF NOT EXISTS gatormartdb.users (
  id INT NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(225) NOT NULL,
  email VARCHAR(225) UNIQUE NOT NULL,
  username VARCHAR(225) UNIQUE NOT NULL,
  passwd VARCHAR(225) NOT NULL,
  bio VARCHAR(225) NOT NULL,
  phone_number VARCHAR(225) NOT NULL,
  PRIMARY KEY (id));

-- -----------------------------------------------------
-- Table gatormartdb.categories
-- -----------------------------------------------------
DROP TABLE IF EXISTS gatormartdb.categories ;

CREATE TABLE IF NOT EXISTS gatormartdb.categories (
  id INT NOT NULL AUTO_INCREMENT,
  category VARCHAR(225) NOT NULL,
PRIMARY KEY (id));

-- -----------------------------------------------------
-- Table gatormartdb.post
-- -----------------------------------------------------
DROP TABLE IF EXISTS gatormartdb.posts;

CREATE TABLE IF NOT EXISTS gatormartdb.posts (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(225) NOT NULL,
  category_id INT NOT NULL,
  available BIT NOT NULL,
  description VARCHAR(225) NOT NULL,
  price FLOAT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- -----------------------------------------------------
-- Table gatormartdb.post
-- -----------------------------------------------------
DROP TABLE IF EXISTS gatormartdb.images;

CREATE TABLE IF NOT EXISTS gatormartdb.images(
  id INT NOT NULL AUTO_INCREMENT,
  post_id INT NOT NULL,
  image_link VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (post_id) REFERENCES posts(id)
);

-- -----------------------------------------------------
-- Table gatormartdb.messages
-- -----------------------------------------------------
DROP TABLE IF EXISTS gatormartdb.messages;

CREATE TABLE IF NOT EXISTS gatormartdb.messages (
  id INT NOT NULL AUTO_INCREMENT,
  body VARCHAR(255) NOT NULL,
  post_id INT NOT NULL,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);

-- -----------------------------------------------------
-- Table gatormartdb.reviews
-- -----------------------------------------------------
DROP TABLE IF EXISTS gatormartdb.reviews;

CREATE TABLE IF NOT EXISTS gatormartdb.reviews (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  is_buyer BIT NOT NULL,
  review VARCHAR(225) NOT NULL,
  rating INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (post_id) REFERENCES posts(id)
);


-- ---------------------------------------------------------------------------------------------------------- --
-- 								DATA INSERTS                                                                  --
-- ---------------------------------------------------------------------------------------------------------- --

-- ---------------------------------------------------------------------------------------------------------- --
INSERT INTO users (full_name, email, username, passwd, bio, phone_number)
VALUES
('Linor Shire', 'LShire1@mail.sfsu.edu', 'LShire1', 'UniquePassword1', 'Just a senior at SFSU!', '(111) 111 - 1111'),
('Iglas Dunagan', 'IDunagan2@mail.sfsu.edu', 'IDunagan2', 'UniquePassword2', 'Just a junior at SFSU!', '(222) 222 - 222'),
('Craymor Gresham', 'CGresham3@mail.sfsu.edu', 'CGresham3', 'UniquePassword3', 'Just a sophomore at SFSU!', '(333) 333 - 3333'),
('Nicholas Briones', 'NBriones4@mail.sfsu.edu', 'NBriones4', 'UniquePassword4', 'Just a freshman at SFSU!', '(444) 444 - 4444'),
('Alex Glover', 'AGlover5@mail.sfsu.edu', 'AGlover5', 'UniquePassword5', 'Just a teacher at SFSU!', '(555) 555 - 5555'),
('Linus Griffin', 'LGriffin6@mail.sfsu.edu', 'LGriffin6', 'UniquePassword6', 'Just a faculty member at SFSU!', '(666) 666 - 6666'),
('Mo Maurice', 'MMaurice7@mail.sfsu.edu', 'MMaurice7', 'UniquePassword7', 'Just another senior at SFSU!', '(777) 777 - 7777'),
('Alex Gomez', 'AGomez8@mail.sfsu.edu', 'AGpomez8', 'UniquePassword8', 'Just another junior at SFSU!', '(888) 888 - 8888'),
('Ricky Guillotte', 'RGuillotte9@mail.sfsu.edu', 'RGuillotte9', 'UniquePassword9', 'Just another sophomore at SFSU!', '(999) 999 - 9999'),
('Leandro Brode', 'LBrode10@mail.sfsu.edu', 'LBrode10', 'UniquePassword10', 'Just another freshman at SFSU!', '(000) 000 - 0000');
-- ---------------------------------------------------------------------------------------------------------- --
INSERT INTO categories(category)
VALUES
('Textbooks'),
('Notes'),
('Furniture'),
('Electronics'),
('Fashion'),
('Toys, Hobby & DIY'),
('Art'),
('Sports and Outdoor')
;

-- ---------------------------------------------------------------------------------------------------------- --
INSERT INTO posts (user_id, title, category_id, available, description, price)
VALUES
(1, 'Learning Life: The Path to Academic Success and Personal Happiness', 1, 1, 'For self improvement class, okay quality.', 20),
(2, 'Calculus: Early Transcendentals', 1, 1, 'For Calculus, it is slightly used..', 12),
(3, 'Physics for Scientists and Engineers: A Strategic Approach', 1, 1, 'For physics, it is used/damaged.', 5),
(4, 'Understanding and Using English Grammar', 1, 1, 'For English, it`s just like new!', 10), 
(5, 'CSC 648 Notes', 2, 1, 'For Software Engineering, incredibly indepth!', 100),
(6, 'CSC 665 Notes', 2, 1, 'For Artifical Intelligence, not much written.', 5),
(7, 'CSC 642 Notes', 2, 1, 'For Human Computer Interaction, simple', 3),
(8, 'Coffee Table', 3, 1, 'Slightly stained coffee table, no damage, need gone ASAP!', 7),
(9, 'Computer Chair', 3, 1, 'Old computer chair; crusty, but comfortable!', 15),
(10, 'Couch', 3, 1, 'Freshly bought couch, doesnt fit in my dorm!', 30);

-- ---------------------------------------------------------------------------------------------------------- --
INSERT INTO messages (body, post_id, sender_id, receiver_id)
VALUES
('I would like to buy this item', 1, 1, 2);