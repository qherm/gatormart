const database = require('../db/db.js');
const express = require('express');
const router = express.Router();
let bodyParser = require('body-parser');
// let jsonParser = bodyParser.json();

/* 
    Methodology:
        1. productDetail.hbs will have an onload function which
        makes a post request asking for information about the post.
        2. /postItem will be a post request which adds an item to the 
        database
            a. On success, redirect to get request for productDetail
                i. This get request will render the page
*/

class Post {
    renderItemPage(req, res){
        // Get params
        res.render('post?');
    }
    postItem(req, res){
        // Get params
        console.log(req.body);
        let query = "";
        database.query(query, (err, result) => {
            if(err){
                res.send("error")
            } else{
                res.redirect('/post?');
            }
        })
    }
}

const post = new Post();

router.get("/", post.renderItemPage);

router.get('/post', (req, res) => {
    res.render('post');
});
router.post('/post', bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}), post.postItem);

module.exports = router;