var express = require('express');
var router = express.Router();
// var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
// var { getRecentPosts, getPostById, getCommentsByPostId } = require('../middleware/postsmiddleware');
// var db = require('../config/database');


router.get('/', function (req, res, next) {
  res.render('home');
});

router.get('/home', function (req, res, next) {
  res.render('home');
});

router.get('/aboutUs', function (req, res, next) {
  res.render('aboutUs');
});

router.get('/login', (req, res, next) => {
  res.render("login");
})

router.get('/registration', (req, res, next) => {
  res.render("registration");
})

router.get('/productDetail', (req, res, next) => {
    res.render("productDetail");
  })

// router.use("/postItem", isLoggedIn);
router.get('/postItem', (req, res, next) => {
  res.render("postItem");
})

// router.use("/userPage", isLoggedIn);
router.get('/userPage', (req, res, next) => {
  res.render("userPage");
})

// router.get('/posts/:id(\\d+)', (req, res, next) => {
//   res.render('imagepost', { title: `Post ${req.params.id}` });
// });

module.exports = router;
