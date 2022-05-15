const express = require('express');
const router = express.Router();
const app = require('../app');

/*
  Define about page routes
*/
router.get("/", function (req, res, next) {
    res.render("about");
});

router.get("/Melissa", function (req, res, next) {
    res.render("Melissa");
  });
  
  router.get("/Shane", function (req, res, next) {
    res.render("Shane");
  });
  
  router.get("/Minggu", function (req, res, next) {
    res.render("Minggu");
  });
  
  router.get("/Chuting", function (req, res, next) {
    res.render("Chuting");
  });
  
  router.get("/Robert", function (req, res, next) {
    res.render("Robert");
  });
  
  router.get("/Joe", function (req, res, next) {
    res.render("Joe");
  });
  
  router.get("/Xiaoqing", function (req, res, next) {
    res.render("Xiaoqing");
  });

  module.exports = router;
