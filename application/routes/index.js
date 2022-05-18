var express = require("express");
var router = express.Router();
const search = require('./search');
const sessions = require('../sessions');
const database = require('../db/db')

/*
  Home Page rendering
*/

const getFeaturedItems = (req,res,next) => {
  let query = `SELECT posts.id, posts.user_id, posts.title, posts.category, posts.price,
              users.username, images.image_link
    FROM posts JOIN images ON images.post_id = posts.id JOIN users ON users.id=posts.user_id WHERE posts.featured=1`;
  
  database.query(query, (err, results) => {
      if (err){
        next();
      } else{
        res.locals.featured_posts=results;
        next();
      }
  });
}

router.get("/", getFeaturedItems, (req, res, next) => {
  res.render("home");
});
router.get("/home", function (req, res, next) {
  res.render("home");
});

module.exports = router;
