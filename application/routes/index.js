var express = require("express");
var router = express.Router();
// var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
// var { getRecentPosts, getPostById, getCommentsByPostId } = require('../middleware/postsmiddleware');
// var db = require('../config/database');

router.get("/", function (req, res, next) {
  res.render("home");
});

router.get("/home", function (req, res, next) {
  res.render("home");
});

router.get("/about", function (req, res, next) {
  res.render("about");
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.get("/registration", (req, res, next) => {
  res.render("registration");
});

router.get("/pdetail", (req, res, next) => {
  res.render("pdetail");
});

router.get("/message", (req, res, next) => {
  res.render("message");
});

router.get("/result", (req, res, next) => {
  res.render("result");
});

router.get("/mreceived", (req, res, next) => {
  res.render("mreceived");
});

// router.use("/postItem", isLoggedIn);
router.get("/post", (req, res, next) => {
  res.render("post");
});

// router.use("/userPage", isLoggedIn);
router.get("/profile", (req, res, next) => {
  res.render("profile");
});

// router.get('/posts/:id(\\d+)', (req, res, next) => {
//   res.render('imagepost', { title: `Post ${req.params.id}` });
// });

module.exports = router;
