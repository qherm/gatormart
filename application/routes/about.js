const express = require('express');
const router = express.Router();
const app = require('../app');

/*
  Define about page routes
*/
router.get("/", function (req, res, next) {
    res.render("about");
});
  
router.get("/aboutMelissa", function (req, res, next) {
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

module.exports = router;