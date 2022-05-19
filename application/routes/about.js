/**
 * Short Description of file:
 * Used in the functionalities needed for the about page. It contains the routes to 
 * each page for each member of the team.
 * 
 * Created by the backend team and the team-lead for CSC648 Software Engineering.
 * Shane Waxler - Team Lead - Email: SWaxler@mail.sfsu.edu
 * Robert Garcia - Backend Lead - Email: RGarcia35@mail.sfsu.edu
 * Minggu Ma - Backend Member - Email: 	MMa4@mail.sfsu.edu
 * Joe Guan - Backend Member - Email: JGuan8@mail.sfsu.edu
*/
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
