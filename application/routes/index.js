var express = require("express");
var router = express.Router();
const search = require('./search');
const sessions = require('../sessions');

/*
  Home Page
*/
router.get("/", function (req, res, next) {
  console.log(req.session.user_id)
  res.render("home");
});

router.get("/home", function (req, res, next) {
  res.render("home");
});

/*
  Authentication
*/
// router.get("/login", (req, res, next) => {
//   res.render("login");
// });

// router.get("/registration", (req, res, next) => {
//   res.render("registration");
// });

// /*
//   Products
// */
// router.get("/item", (req, res, next) => {
//   res.render("item");
// });

// router.get("/message", (req, res, next) => {
//   res.render("message");
// });

// router.get("/postItem", (req, res, next) => {
//   res.render("postItem");
// });

// router.get("/user", (req, res, next) => {
//   res.render("user");
// });

module.exports = router;
