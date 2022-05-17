const express = require('express');
const router = express.Router();
const app = require('../app')
const database = require('../db/db.js');
const sessions = require('../sessions');

class UserDetails {
    getPostsAndImagesFromUserId(req,res,next){
        let query =
        `SELECT posts.id, posts.user_id, posts.title, posts.category, posts.description, posts.price, images.image_link
        FROM posts
        JOIN images
        ON images.post_id = posts.id
        WHERE posts.user_id = '` + req.userId + `'`;;
        database.query(query, (err, results) => {
            if (err){
                throw err;
            } else{
                console.log(results);
                res.locals.posts = results;
                next();
            }
        });
    }

    findUser(req, res, next) {
        const query = 
            `SELECT full_name, email, username, bio FROM users WHERE id = '` + req.userId + `'`;

        database.query(query, (err, results) => {
            if (err){
                throw err;
            } else{
                console.log(results)
                res.locals.full_name = results[0].full_name;
                res.locals.email = results[0].email;
                res.locals.username = results[0].username;
                res.locals.bio = results[0].bio;
                next();
            }
        });
    }

    userExists(req,res,next){
        if(req.query.id == 0){
            res.redirect("/");
            return;
        } else if(!req.query.id && !req.session.user_id){
            req.session.last_visited = "/user" + req.url.substring(1);
            res.redirect("/auth/login");
            return;
        } else if(!req.query.id && req.session.user_id){
            req.userId = req.session.user_id;
        } else{
            req.userId = req.query.id;
        }
        next();
    }
}

const user = new UserDetails();

router.get('/', user.userExists, user.findUser, user.getPostsAndImagesFromUserId, (req,res,next)=>{
    if(req.session.user_id){
        res.render('user');
    } else{
        req.session.last_visited = "/user" + req.url.substring(1);
        res.redirect("/auth/login");
    }
});
// router.get('/json', User.findUser);

module.exports = router;