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

router.get("/about", function (req, res, next) {
  res.render("aboutMelissa");
});

router.get("/aboutShane", function (req, res, next) {
  res.render("aboutShane");
});

router.get("/aboutMinggu", function (req, res, next) {
  res.render("aboutMinggu");
});

router.get("/aboutChuting", function (req, res, next) {
  res.render("aboutChuting");
});

router.get("/aboutRobert", function (req, res, next) {
  res.render("aboutRobert");
});

router.get("/aboutJoe", function (req, res, next) {
  res.render("aboutJoe");
});

router.get("/aboutXiaoqing", function (req, res, next) {
  res.render("aboutXiaoqing");
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.get("/registration", (req, res, next) => {
  res.render("registration");
});

router.get("/productDetail", (req, res, next) => {
  res.render("productDetail");
});

router.get("/message", (req, res, next) => {
  res.render("message");
});

router.get("/searchResult", (req, res, next) => {
  res.render("searchResult");
});

// router.use("/postItem", isLoggedIn);
router.get("/postItem", (req, res, next) => {
  res.render("postItem");
});

// router.use("/userPage", isLoggedIn);
router.get("/userPage", (req, res, next) => {
  res.render("userPage");
});

module.exports = router;
