/**
 * Short Description of file:
 * Used in getting information needed for rendering a userpage, this file is mainly used in
 * gathering information about a relevant user's profile page. This file also ensures that
 * unregistered users may not look at a user's profile page and redirects them to log-in.
 * 
 * Created by the backend team and the team-lead for CSC648 Software Engineering.
 * Shane Waxler - Team Lead - Email: SWaxler@mail.sfsu.edu
 * Robert Garcia - Backend Lead - Email: RGarcia35@mail.sfsu.edu
 * Minggu Ma - Backend Member - Email: 	MMa4@mail.sfsu.edu
 * Joe Guan - Backend Member - Email: JGuan8@mail.sfsu.edu
*/
const express = require('express');
const router = express.Router();
const app = require('../app')
const database = require('../db/db.js');
const sessions = require('../sessions');

class UserDetails {
    /**
     * Short Description of function:
     * After a user's relevant information is found from the findUser function, this method continues to find posts
     * and its images made by said user. This function is used in rendering the past posts made by a user.
    */
    getPostsAndImagesFromUserId(req,res,next){
        let query =
        `SELECT posts.id, posts.user_id, posts.title, posts.category, posts.description, posts.price, images.image_link
        FROM posts
        JOIN images
        ON images.post_id = posts.id
        WHERE posts.user_id = '` + req.userId + `'`;
        if(!req.show_unapproved){
            query += ` AND posts.admin_approved = 1`;
        }
        database.query(query, (err, results) => {
            if (err){
                throw err;
            } else{
                res.locals.posts = results;
                next();
            }
        });
    }

    /**
     * Short Description of function:
     * When clicking a userpage that routes to /user?=id={id_number}, this function checks
     * if there is a relevant user who has that ID and returns the information needed to
     * render that user's profile page. If that user is not found, we route the current
     * user back to the homepage.
    */
    findUser(req, res, next) {
        const query = 
            `SELECT full_name, email, username, bio FROM users WHERE id = '` + req.userId + `'`;

        database.query(query, (err, results) => {
            if (err){
                throw err;
            } else if (results.length==0){
                res.redirect('/');
                return;
            } else{
                if(!req.query.id || parseInt(req.query.id) === req.session.user_id){
                    res.locals.show_settings = true;
                }
                res.locals.full_name = results[0].full_name;
                res.locals.email = results[0].email;
                res.locals.username = results[0].username;
                res.locals.bio = results[0].bio;
                next();
            }
        });
    }

    /**
     * Short Description of function:
     * When clicking a userpage that routes to /user, this function checks to see if the
     * user is logged in, if they are, this should route them to their homepage, if not
     * it will route them to a login page 
    */
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
            req.show_unapproved = true;
        } else{
            req.userId = req.query.id;
            req.show_unapproved = (parseInt(req.userId)===req.session.user_id);
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

module.exports = router;