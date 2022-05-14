const database = require('../db/db.js');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

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
        console.log(req.file)
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

router.use(fileUpload({
    limits: {fileSize: 20000000} // 20 MB file upload limit
}))

router.get("/", post.renderItemPage);

router.get('/post', (req, res) => {
    res.render('post');
});

router.post('/grog', (req,res)=> {
    console.log(req.files)
    res.send("temp")
});

router.post('/post',fileUpload({
    limits: {fileSize: 20000000} // 20 MB file upload limit
}),  bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}), post.postItem);
// router.post('/post', bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}), post.postItem);

module.exports = router;