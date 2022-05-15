const express = require('express');
const router = express.Router();
const app = require('../app');
const database = require('../db/db.js');

class Message {
    getSessionUserEmail(req,res,next){
        if(!req.session.user_id){
            // FINISH LAST_VISITED LOGIC HERE

            // req.session.last_visited = req.query;
            // console.log(req.body.post_id);
            res.redirect('/auth/login');
        } else{
            database.query(`SELECT email FROM users WHERE id=${req.session.user_id}`, (err,result)=>{
                if(err){
                    console.log(err);
                } else{
                    res.locals.sender_email = result[0].email;
                }
                next();
            });
        }
    }

    getSessionUserPhoneNumber(req,res,next){
        if(!req.session.user_id){
            // FINISH LAST_VISITED LOGIC HERE

            // req.session.last_visited = req.query;
            // console.log(req.body.post_id);
            res.redirect('/auth/login');
        } else{
            database.query(`SELECT phone_number FROM users WHERE id=${req.session.user_id}`, (err,result)=>{
                if(err){
                    console.log(err);
                } else{
                    res.locals.phone_number = result[0].phone_number;
                }
                next();
            });
        }
    }

    sendMessage(req,res,next){     
        const senderEmail = res.locals.sender_email;
        let messageBody = req.body.body;
        const phoneNumber = res.locals.phone_number ? res.locals.phone_number : "";
        const receivingUser = parseInt(req.body.receiver_id) ? parseInt(req.body.receiver_id) : -1;
        const sendingUser = parseInt(req.session.user_id) ? parseInt(req.session.user_id) : -1;
        const postId = parseInt(req.body.post_id) ? parseInt(req.body.post_id) : -1;

        messageBody += "<br> Email: " + `<a href=mailto:${senderEmail}>${senderEmail}</a>`;
        if(phoneNumber){
            messageBody+= "<br> Phone Number: " + phoneNumber;
        }


        let query = `INSERT INTO messages (body, post_id, sender_id, receiver_id) VALUES
        ("${messageBody}", "${postId}", "${sendingUser}", "${receivingUser}" );`;
        database.query(query, (err, result) => {
            if(err){
                console.log(err);
            } else{
                console.log('properly sent')
            }
        });
        res.redirect('/item?id='+postId);
    }

    /*
    userinfo

        Hey! I really want this bicycle.

        Contact Info:
        ${email}
        ${phonenumber}
    */
    getMessages(req,res){
        if(!req.session.user_id){
            req.session.last_visited = '/messages';
            res.json({});
            return;
        }

        /*
                    `SELECT users.full_name, users.email, users.username, users.bio, posts.id, posts.title, posts.category, posts.description, posts.price, images.image_link
            FROM users 
            JOIN posts
            ON posts.user_id = users.id 
            JOIN images
            ON images.post_id = posts.id
            WHERE users.id = '` + userID + `'`;

                id INT NOT NULL AUTO_INCREMENT,
                body VARCHAR(255) NOT NULL,
                post_id INT NOT NULL,
                sender_id INT NOT NULL,
                receiver_id INT NOT NULL,
                creation_time DATETIME DEFAULT CURRENT_TIMESTAMP,

        */
        database.query(`SELECT messages.body, messages. FROM messages WHERE receiver_id=${req.session.user_id} JOIN `,(err, result) => {
            if(err){
                console.log(err);
                res.json({});
            } else{
                console.log(result)
                res.json({result});
            }
        });

    }
}

const message = new Message();

router.get('/', (req,res) => {
    if(!req.session.user_id){
        req.session.last_visited = "/messages";
        res.redirect('/auth/login');
    } else{
        res.render('messages');
    }
});
router.get('/json', message.getMessages);
router.post('/send', message.getSessionUserEmail, message.getSessionUserPhoneNumber, message.sendMessage, (req,res) => {
    res.send("sent!");
})

module.exports = router;