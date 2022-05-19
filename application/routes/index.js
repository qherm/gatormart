/**
 * Short Description of file:
 * Used in rendering the front page. All this file really does is update the front page to
 * have a list of featurued items.
 * 
 * Created by the backend team and the team-lead for CSC648 Software Engineering.
 * Shane Waxler - Team Lead - Email: SWaxler@mail.sfsu.edu
 * Robert Garcia - Backend Lead - Email: RGarcia35@mail.sfsu.edu
 * Minggu Ma - Backend Member - Email: 	MMa4@mail.sfsu.edu
 * Joe Guan - Backend Member - Email: JGuan8@mail.sfsu.edu
*/
var express = require("express");
var router = express.Router();
const search = require('./search');
const sessions = require('../sessions');
const database = require('../db/db')

/*
  Home Page rendering
*/

    /**
     * Short Description of function:
     * Used when rendering the home page, this function gets the list of items in our posts table that are listed
     * as featured.
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
