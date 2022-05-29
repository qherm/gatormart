--- DB Model for Gatormart DB

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
  category VARCHAR(225) NOT NULL,
PRIMARY KEY (category));

-- -----------------------------------------------------
-- Table gatormartdb.post
-- -----------------------------------------------------
DROP TABLE IF EXISTS gatormartdb.posts;

CREATE TABLE IF NOT EXISTS gatormartdb.posts (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(225) NOT NULL,
  featured INT NOT NULL DEFAULT 0,
  admin_approved INT NOT NULL DEFAULT 0,
  category VARCHAR(255) NOT NULL,
  available INT NOT NULL,
  quality VARCHAR(255) NOT NULL,
  description VARCHAR(225) NOT NULL,
  creation_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  price FLOAT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category) REFERENCES categories(category) ON DELETE CASCADE
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
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Table gatormartdb.messages
-- -----------------------------------------------------
DROP TABLE IF EXISTS gatormartdb.messages;

CREATE TABLE IF NOT EXISTS gatormartdb.messages (
  id INT NOT NULL AUTO_INCREMENT,
  body VARCHAR(10000) NOT NULL,
  post_id INT NOT NULL,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  creation_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
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
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);


-- ---------------------------------------------------------------------------------------------------------- --
-- 								DATA INSERTS                                                                  --
-- ---------------------------------------------------------------------------------------------------------- --
INSERT INTO users (full_name, email, username, passwd, bio, phone_number)
VALUES
('Linor Shire', 'lshire1@mail.sfsu.edu', 'LShire1', 'UniquePassword1', 'Just a senior at SFSU!', '(111) 111 - 1111'),
('Iglas Dunagan', 'idunagan2@mail.sfsu.edu', 'IDunagan2', 'UniquePassword2', 'Just a junior at SFSU!', '(222) 222 - 222'),
('Craymor Gresham', 'cgresham3@mail.sfsu.edu', 'CGresham3', 'UniquePassword3', 'Just a sophomore at SFSU!', '(333) 333 - 3333'),
('Nicholas Briones', 'nbriones4@mail.sfsu.edu', 'NBriones4', 'UniquePassword4', 'Just a freshman at SFSU!', '(444) 444 - 4444'),
('Alex Glover', 'aglover5@mail.sfsu.edu', 'AGlover5', 'UniquePassword5', 'Just a teacher at SFSU!', '(555) 555 - 5555'),
('Linus Griffin', 'lgriffin6@mail.sfsu.edu', 'LGriffin6', 'UniquePassword6', 'Just a faculty member at SFSU!', '(666) 666 - 6666'),
('Mo Maurice', 'mmaurice7@mail.sfsu.edu', 'MMaurice7', 'UniquePassword7', 'Just another senior at SFSU!', '(777) 777 - 7777'),
('Alex Gomez', 'agomez8@mail.sfsu.edu', 'AGpomez8', 'UniquePassword8', 'Just another junior at SFSU!', '(888) 888 - 8888'),
('Ricky Guillotte', 'rguillotte9@mail.sfsu.edu', 'RGuillotte9', 'UniquePassword9', 'Just another sophomore at SFSU!', '(999) 999 - 9999'),
('Leandro Brode', 'lbrode10@mail.sfsu.edu', 'LBrode10', 'UniquePassword10', 'Just another freshman at SFSU!', '(000) 000 - 0000');

-- ---------------------------------------------------------------------------------------------------------- --
INSERT INTO categories(category)
VALUES
('Books'),
('Notes'),
('School Supplies'),
('Art'),
('Fashion'),
('Furniture'),
('Electronics'),
('CDs & Vinyl'),
('Movies & TV'),
('Video Games'),
('Sports and Outdoor'),
('Toys, Hobby & DIY'),
('Help Wanted'),
('Services'),
('Miscellaneous')
;

-- ---------------------------------------------------------------------------------------------------------- --
INSERT INTO posts (user_id, title, category, available, quality, description, price, featured, admin_approved)
VALUES
(1, 'Learning Life: The Path to Academic Success and Personal Happiness', 'Books', 1, 'Okay Quality', 'For self improvement class, okay quality.', 20, 0, 1),
(2, 'Calculus: Early Transcendentals', 'Books', 1, 'Decent Quality', 'For Calculus, it is slightly used..', 12, 0, 1),
(3, 'Physics for Scientists and Engineers: A Strategic Approach', 'Books', 1, 'Damaged', 'For physics, it is used/damaged.', 5, 0, 1),
(4, 'Understanding and Using English Grammar', 'Books', 1, 'Like new', 'For English, it`s just like new!', 10, 0, 1), 
(5, 'CSC 648 Notes', 'Services', 1, 'Good quality', 'For Software Engineering, incredibly indepth!', 100, 0, 1),
(6, 'CSC 665 Notes', 'Services', 1, 'Great Quality', 'For Artifical Intelligence, not much written.', 5, 1, 1),
(7, 'CSC 642 Notes', 'Services', 1, 'OK Quality', 'For Human Computer Interaction, simple', 3, 0, 1),
(8, 'Coffee Table', 'Furniture', 1, 'Slightly Used', 'Slightly stained coffee table, no damage, need gone ASAP!', 7, 1, 1),
(9, 'Computer Chair', 'Furniture', 1, 'Old', 'Old computer chair; crusty, but comfortable!', 15, 1, 1),
(10, 'Couch', 'Furniture', 1, 'New', 'Freshly bought couch, doesnt fit in my dorm!', 30, 1, 1);

-- ---------------------------------------------------------------------------------------------------------- --
INSERT INTO messages (body, post_id, sender_id, receiver_id)
VALUES
('I would like to buy this item', 1, 1, 2);

-- ---------------------------------------------------------------------------------------------------------- --
INSERT INTO images (post_id, image_link)
VALUES
(1, '/public/images/BookSelfImprove.jpg'),
(2, '/public/images/BookCalculus.jpg'),
(3, '/public/images/BookPhysics.jpg'),
(4, '/public/images/BookEnglish.jpg'),
(5, '/public/images/NotesCSC648.jpg'),
(6, '/public/images/NotesCSC665.jpg'),
(7, '/public/images/NotesCSC642.jpg'),
(8, '/public/images/FurnitureTable.jpg'),
(9, '/public/images/FurnitureChair.jpg'),
(10, '/public/images/FurnitureCouch.jpg');
