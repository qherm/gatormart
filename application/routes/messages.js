/**
 * Short Description of file:
 * Used in both the functionality of sending a message and retrieving messages, this file
 * has a number of different functions in terms of the messaging functionality.
 * 
 * Created by the backend team and the team-lead for CSC648 Software Engineering.
 * Shane Waxler - Team Lead - Email: SWaxler@mail.sfsu.edu
 * Robert Garcia - Backend Lead - Email: RGarcia35@mail.sfsu.edu
 * Minggu Ma - Backend Member - Email: 	MMa4@mail.sfsu.edu
 * Joe Guan - Backend Member - Email: JGuan8@mail.sfsu.edu
*/

const express = require('express');
const router = express.Router();
const app = require('../app');
const database = require('../db/db.js');

class Message {
    /**
     * Short Description of function:
     * When a message is sent, we need the logged in user's email to be added to the message.body in the table; This function
     * grabs the email of the logged in user.
    */
    getSessionUserEmail(req,res,next){
        if(!req.session.user_id){
            req.session.last_visited = parseInt(req.body.post_id) >=0 ? "/item?id="+req.body.post_id : "/result";
            res.redirect('/auth/login');
        } else{
            database.query(`SELECT email FROM users WHERE id=${req.session.user_id}`, (err,result)=>{
                if(err){
                    res.send(err);
                    return;
                } else{
                    res.locals.sender_email = result[0].email;
                }
                next();
            });
        }
    }

    /**
     * Short Description of function:
     * When a message is sent, the logged in user has a choice of also sending their number alongside their message.
     * If they would like their phone number attached, we need the logged in user's phone number to be added to the 
     * message.body in the table.
    */
    getSessionUserPhoneNumber(req,res,next){
        if(!req.session.user_id){
            res.redirect('/auth/login');
        } else{
            database.query(`SELECT phone_number FROM users WHERE id=${req.session.user_id}`, (err,result)=>{
                if(err){
                    res.send(err);
                    return;
                } else{
                    res.locals.phone_number = result[0].phone_number;
                }
                next();
            });
        }
    }

    /**
     * Short Description of function:
     * When a message is sent, the logged in user has a choice of also sending their number alongside their message.
     * If they would like their phone number attached, we need the logged in user's phone number to be added to the 
     * message.body in the table.
    */
    getSenderUsername(req,res,next){
        database.query("SELECT username FROM users WHERE id="+req.b)
    }

    /**
     * Short Description of function:
     * This function allows a user to get messages sent to them by other users. It is used when checking a logged in
     * user's inbox, if a user is not logged in; we redirect them to the homepage.
    */
    getMessages(req,res){
        if(!req.session.user_id){
            req.session.last_visited = '/messages';
            res.json({});
            return;
        }


        database.query(
        `SELECT messages.id, messages.body, messages.post_ID, messages.sender_ID, messages.receiver_id, messages.creation_time,
            posts.id, posts.title, images.image_link, users.username
        FROM messages
        JOIN users
        ON users.id = messages.sender_ID
        JOIN posts
        ON posts.user_ID = messages.receiver_ID AND posts.id = messages.post_id
        JOIN images
        ON images.post_id = messages.post_id
        WHERE receiver_id=${req.session.user_id}
        ORDER BY creation_time DESC
        `,(err, result) => {
            if(err){
                res.json({});
            } else{
                res.json({result});
            }
        });
    }

    /* 
    F"\0.   \Z 
    \\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b \\ \
    */


    preventInjection = (input) => {
        console.log("Original input", input);
        // input = input.replaceAll(/\//, '//');
        input = input.replaceAll("\\", "\\\\")
                      .replaceAll("\'", "\\'")
                      .replaceAll("\\0", "\\\\0")
                      .replaceAll("\"", "\\\"")
                      .replaceAll("\\b", "\\\\b")
                      .replaceAll("\\r", "\\\\r")
                      .replaceAll("\\Z", "\\\\Z")
                      
        console.log("After replacement", input);
        return input;
    }

     isSQLInjection = (input) => {
        
        //check if there is backslash for escape characters
        if(userInput.includes("\\")){
            return true;
        }
        //check if there is batched SQL Statement
        if(userInput.includes(";") || userInput.includes(" or ") || userInput.includes(" and ") || userInput.includes(" drop ") || userInput.includes(" union ") || userInput.includes(" select ") || userInput.includes(" from ") || userInput.includes(" delete ")){
            return true;
        }
        //see if there is potential always true clause, only if there is more than 3 chars can make this a injection
        if(userInput.includes("=") && userInput.length >= 3){
            //only check "=" have characters on the left and right
            for(let i = 1; i < userInput.length - 1; i++){
                if(userInput[i] == "="){
                    if(userInput[i-1] == userInput[i+1]){
                        return true;
                    }
                }
            }
        }
        //check if part of the query is muted
        if(userInput.includes("--")){
            return true;
        }
        return false;
    }


    /**
     * Short Description of function:
     * This function allows a user to send messages to other users, if a user wants their phone number to be attached,
     * this makes it so that their number is attached to the body. This inserts their message into the message table.
    */
    sendMessage = (req,res,next) => {
        console.log(req.body.body)
        const senderEmail = res.locals.sender_email;
        let messageBody = this.preventInjection(req.body.body);
        const phoneNumber = req.body.phoneNumber === "on" ? res.locals.phone_number : "";
        const receivingUser = parseInt(req.body.receiver_id) ? parseInt(req.body.receiver_id) : -1;
        const sendingUser = parseInt(req.session.user_id) ? parseInt(req.session.user_id) : -1;
        const postId = parseInt(req.body.post_id) ? parseInt(req.body.post_id) : -1;

        messageBody += "<br> Email: " + `<a href=mailto:${senderEmail}>${senderEmail}</a>`;
        if(phoneNumber){
            messageBody+= "<br> Phone Number: " + phoneNumber;
        }

        let query = `INSERT INTO messages (body, post_id, sender_id, receiver_id) VALUES
        ('${messageBody}', '${postId}', '${sendingUser}', '${receivingUser}' );`;
        database.query(query, (err, result) => {
            if(err){
                throw err;
            }
        });
        res.redirect('/item?id='+postId);
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