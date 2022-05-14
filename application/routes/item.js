const database = require('../db/db.js');
const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

/* 
    Methodology:
        1. item.hbs will have an onload function which
        makes a post request asking for information about the post.
        2. /postItem will be a post request which adds an item to the 
        database
            a. On success, redirect to get request for item
                i. This get request will render the page
*/

class Post {
    static uploadPath = path.join(__dirname+"/../public/images/");
    // constructor(){
        
    // }
    
    getItemInfo (req,res){
        const id = req.query.id;
        let query = "";

        if(id){
            query = `SELECT * FROM posts JOIN images ON images.post_id = posts.id JOIN users ON users.id = posts.user_id WHERE posts.id = '` + id + `'`;
        }
        console.log(query)
        database.query(query, (err, results) => {
            if (err){
                console.log("error")
                res.json({})
            } else{
                console.log(results)
                res.json({itemInfo:results});
            }
        });
    }

    uploadImage(req, res){
        let query;
        let user_id = 1; // GET THIS FROM SESSION
        const file = req.files.picture;
        const fileName = file.name;
        
        if(!req.files || Object.keys(req.files).length === 0 || !fileName){
            query = `INSERT INTO images (post_id, image_link)
            VALUES
            (${res.locals.post_id}, '/public/images/temp_image.jpg')`
        } else {
            query = `INSERT INTO images (post_id, image_link)
            VALUES
            (${res.locals.post_id}, '/public/images/${fileName}')`;
        }
        console.log(Post.uploadPath)
        file.mv(path.join(Post.uploadPath, fileName), (err) => {
            console.log(err)
            if(err){
                res.send(err);
            }
        });

        database.query(query, (err, result) => {
            if(err){
                res.send(err);
            } else{
                // res.json({post_id: res.locals.post_id});
                res.redirect(`/item?id=${res.locals.post_id}`);
            }
        })
    }

    getPostId(req,res,next){
        database.query("SELECT LAST_INSERT_ID();", (err, [result]) => {
            if(err){
                res.send(err)
            } else{
                console.log(result["LAST_INSERT_ID()"]);
                res.locals.post_id = result["LAST_INSERT_ID()"];
                next()
            }
        })
    }

    postItem(req, res, next){
        // GET USER ID FROM SESSION
        const user_id = 1;
        let price = parseInt(req.body.price);
        price = price ? price : 0;
        let query = `INSERT INTO posts (user_id, title, category, available, quality, description, price) VALUES
        (${user_id}, "${req.body.title}", "${req.body.category}", 1, "${req.body.condition}", "${req.body.description}", ${price});`;
        database.query(query, (err, result) => {
            if(err){
                res.send(err);
            } else{
                next();
            }
        })
    }
}

const post = new Post();

// Handle file uploads and post bodies
router.use(fileUpload({
    limits: {fileSize: 20000000} // 20 MB file upload limit
}));
router.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));


router.get("/", (req,res) => {
    res.render("item");
    // console.log(res)
});
router.get("/json", post.getItemInfo);

router.get('/post', (req, res) => {
    res.render('post');
});

router.post('/post', post.postItem, post.getPostId, post.uploadImage);

// router.post('/grog', (req,res)=> {
//     console.log(req.files)
//     res.send("temp")
// });

// router.post('/post',fileUpload({
//     limits: {fileSize: 20000000} // 20 MB file upload limit
// }),  bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}), post.postItem);


module.exports = router;