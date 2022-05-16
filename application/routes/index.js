var express = require("express");
var router = express.Router();
const search = require('./search');
const sessions = require('../sessions');

/*
  Home Page rendering
*/

router.get("/", function (req, res, next) {
  res.render("home");
});

router.get("/home", function (req, res, next) {
  res.render("home");
});

module.exports = router;
