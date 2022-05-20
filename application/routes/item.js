/**
 * Short Description of file:
 * Used in rendering the specific page for a given item, this file contains a number of functions
 * that have to do with getting the relevant information for a given item as well as adding a new
 * item and deleting an item.
 * 
 * Created by the backend team and the team-lead for CSC648 Software Engineering.
 * Shane Waxler - Team Lead - Email: SWaxler@mail.sfsu.edu
 * Robert Garcia - Backend Lead - Email: RGarcia35@mail.sfsu.edu
 * Minggu Ma - Backend Member - Email: 	MMa4@mail.sfsu.edu
 * Joe Guan - Backend Member - Email: JGuan8@mail.sfsu.edu
*/

const database = require('../db/db.js');
const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const sessions = require('../sessions');

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


    /**
     * Short Description of function:
     * Used when rendering an items page with /item?id={id}, this function gets the post and its information
     * relevant to that id.
    */
    getItemInfo (req,res,next){
        const id = req.query.id;
        let query = "";

        if(id){
            
            query = `
            SELECT
            posts.user_id, posts.title, posts.admin_approved, posts.category, posts.available, posts.quality, posts.description, posts.creation_time, posts.price,
            images.image_link, images.post_id,
            users.id, users.username, users.email, users.phone_number
            FROM posts 
            JOIN images ON images.post_id = posts.id 
            JOIN users ON users.id = posts.user_id
            WHERE posts.id = '` + id + `'`;
        }
        database.query(query, (err, results) => {
            if (err){
                
                res.send(err);
            } else{
                if(results.length==0){
                    res.redirect('/result');
                    return;
                } else if(results[0].user_id!=req.session.user_id && !results[0].admin_approved){
                    res.redirect("/result");
                } else{
                    res.locals.item_info = results[0];
                    let creationTime = JSON.stringify(res.locals.item_info.creation_time).split("T")[0].substring(1);
                    res.locals.item_info.creation_time = creationTime;
                    next();
                }
            }
        });
    }

    /**
     * Short Description of function:
     * Used when posting a new item, this function adds the image to the server, and adds it to
     * the image table pointing to the relevant ID.
    */
    uploadImage(req, res){
        let query;
        // let user_id = 1; // GET THIS FROM SESSION
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

        let test = "First";

        file.mv(path.join(Post.uploadPath, fileName), (err) => {
            if(err){
                throw err;
            }
        });

        database.query(query, (err, result) => {
            if(err){
                res.send(err);
            } else{
                // res.json({post_id: res.locals.post_id});
                res.redirect(`/item?id=${res.locals.post_id}`);
            }
        });
    }

    /**
     * Short Description of function:
     * Used when posting a new item, this function is used immediately after a user posts
     * a new listing; It redirects them to the new page that lists the information for the
     * item they posted.
    */
    getPostId(req,res,next){
        database.query("SELECT LAST_INSERT_ID();", (err, [result]) => {
            if(err){
                res.send(err)
            } else{
                res.locals.post_id = result["LAST_INSERT_ID()"];
                next()
            }
        })
    }

    /**
     * Short Description of function:
     * Used when posting a new item, this function is used immediately after a user posts
     * a new listing; It inserts the items information into the table.
    */
    postItem(req, res, next){
        let price = parseInt(req.body.price);
        price = price ? price : 0;
        let query = `INSERT INTO posts (user_id, title, category, available, quality, description, price) VALUES
        (${req.session.user_id}, "${req.body.title}", "${req.body.category}", 1, "${req.body.quality}", "${req.body.description}", ${price});`;
        database.query(query, (err, result) => {
            if(err){
                res.send(err);
            } else{
                next();
            }
        })
    }

    /**
     * Short Description of function:
     * Used when checking whether an item belongs to the logged in user. If it doesn't, this function should
     * redirect the user to their own page.
    */
    checkItemBelongsToUser(req,res,next){
        database.query("SELECT user_id FROM posts WHERE id="+req.body.post_id, (err,[result]) => {
            if(err){
                res.redirect('/user?id=' + req.session.user_id);
                return;
            } else if(result.user_id !== req.session.user_id){
                res.redirect('/user?id=' + req.session.user_id);
            } else {
                next();
            }
        })
    }

    /**
     * Short Description of function:
     * Used when deleting an item on a user's homepage; this function allows users to delete any previous listing
     * that they had.
    */
    deleteItem(req,res,next){
        database.query("DELETE FROM posts WHERE id="+req.body.post_id, (err, result) => {
            if(err){
                res.redirect('/user?id=' + req.session.user_id);
                return;
            } else{
                next();
            }
        });
    }
}

const post = new Post();

// Handle file uploads and post bodies
router.use(fileUpload({
    limits: {fileSize: 20000000} // 20 MB file upload limit
}));
router.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

router.get("/", post.getItemInfo, (req,res) => {
    res.render("item");
});
// router.get("/json", post.getItemInfo);

router.post("/delete", post.checkItemBelongsToUser, post.deleteItem, (req,res,next) => {
    res.redirect('/user');
});


router.get('/post', (req, res) => {
    if(!req.session.user_id){
        req.session.last_visited = "/item/post";
        res.redirect('/auth/login');
    } else{
        res.render('post');
    }
});

router.post('/post', post.postItem, post.getPostId, post.uploadImage);

module.exports = router;