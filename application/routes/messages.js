const express = require('express');
const router = express.Router();
const app = require('../app');
const database = require('../db/db.js');


router.get('/', (req,res) => {
    res.render('message');
});

module.exports = router;