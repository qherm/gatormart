const express = require('express');
const router = express.Router();
const app = require('../app')
const database = require('../db/db.js');
const sessions = require('../sessions');

class UserDetails {
    findUser(req, res) {
        let userId = req.query.id;
        let query = "";
        
        if(userId==="null" || parseInt(userId)==req.session.user_id){
            userId = req.session.user_id;
        }

        query = 
            `SELECT users.full_name, users.email, users.username, users.bio, posts.id, posts.title, posts.category, posts.description, posts.price, images.image_link
            FROM users 
            JOIN posts
            ON posts.user_id = users.id 
            JOIN images
            ON images.post_id = posts.id
            WHERE users.id = '` + userId + `'`;

        database.query(query, (err, results, next) => {
            if (err){
                res.json({});
            } else{
                res.json({
                    userInfo:results
                });
            }
        });
    }
}

const User = new UserDetails();

router.get('/', (req,res)=>{
    if(req.session.user_id){
        res.render('user');
    } else{
        req.session.last_visited = "/user" + req.url.substring(1);
        res.redirect("/auth/login");
    }
});
router.get('/json', User.findUser);

module.exports = router;