const express = require('express');
const router = express.Router();
const app = require('../app')
const database = require('../db/db.js');
const sessions = require('../sessions');

class UserDetails {
    findUser(req, res) {
        //what we need
        let userID = req.query.id;
        //console.log(userID);
        //console.log(req.session.id);
        let query = "";
        if(userID==="null" || parseInt(userID)==req.session.user_id){
            // 1. Check for session id
            // 2. Present all other info as well as messages
            query = 
            `SELECT users.full_name, users.email, users.username, users.bio, posts.id, posts.title, posts.category, posts.description, posts.price, images.image_link
            FROM users 
            JOIN posts
            ON posts.user_id = users.id 
            JOIN images
            ON images.post_id = posts.id
            WHERE users.id = '` + userID + `'`;
        } else{
            query = 
            `SELECT users.full_name, users.email, users.username, users.bio, posts.id, posts.title, posts.category, posts.description, posts.price, images.image_link
            FROM users 
            JOIN posts
            ON posts.user_id = users.id 
            JOIN images
            ON images.post_id = posts.id
            WHERE users.id = '` + userID + `'`;
        }
        
        //}
        //JOIN posts ON posts.user_id = users.id 
        //JOIN messages ON messages.receiver_id = users.id
        //JOIN images ON images.user_id = posts.id

        database.query(query, (err, results, next) => {
            //console.log(results)
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
    res.render('user');
});
router.get('/json', User.findUser);

module.exports = router;