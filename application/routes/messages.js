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

    sendMessage(req,res,next){     
        const senderEmail = res.locals.sender_email;
        let messageBody = req.body.body;
        const phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : "";
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
                // res.send(err);
                console.log(err);
            } else{
                // next();
                console.log('properly sent')
            }
        });
        res.redirect();
    }

    /*
    userinfo

        Hey! I really want this bicycle.

        Contact Info:
        ${email}
        ${phonenumber}
    */
    getMessages(){
    }
}

const message = new Message();

router.get('/', (req,res) => {
    res.render('message');
});
router.post('/send', message.getSessionUserEmail, message.sendMessage, (req,res) => {
    res.send("sent!");
})

module.exports = router;