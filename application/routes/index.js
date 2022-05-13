var express = require("express");
var router = express.Router();
const search = require('./search');

/*
  Home Page
*/
router.get("/", function (req, res, next) {
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
// router.get("/productDetail", (req, res, next) => {
//   res.render("productDetail");
// });

// router.get("/message", (req, res, next) => {
//   res.render("message");
// });

// router.get("/postItem", (req, res, next) => {
//   res.render("postItem");
// });

// router.get("/userPage", (req, res, next) => {
//   res.render("userPage");
// });

module.exports = router;
