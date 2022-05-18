const express = require('express');
const router = express.Router();
const database = require('../db/db.js');
const bodyParser = require('body-parser');
const sessions = require('../sessions');
const { createHash } = require('crypto');

class Auth {
    hash(string){
        return createHash('sha256').update(string).digest('hex');
    }

    isValidEmail(req,res,next){
        let userEmail = req.body.email.toLowerCase();
        if (/@mail.sfsu.edu\s*$/.test(userEmail)) {
            next();
            return;
        }
        res.locals.err = "Please enter a valid SFSU email address";
        res.render('registration');
    }

    emailExists(email,callback) {
        database.query("SELECT * FROM user WHERE email=?",email,(err,results)=> {
            if(err) throw err;
            return callback(results);
        })
    }

    usernameExists(username,callback) {
        database.query("SELECT * FROM user WHERE email=? OR Username=?",username,(err,results)=> {
            if(err) throw err;
            return callback(results);
        })
    }
}

class Register extends Auth {
    register(req, res, next){
        let email = req.body.email.toLowerCase();
        let name = req.body.name;
        let username = req.body.username;
        let password = super.hash(req.body.password);
        let confirmPassword = super.hash(req.body.confirmPassword);
        let phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : "";

        if(password!==confirmPassword){
            res.redirect('/auth/register');
            return;
        }

        let query = `INSERT INTO users (full_name, email, username, passwd, bio, phone_number)
        VALUES
        ("${name}", "${email}", "${username}", "${password}", "", "${phoneNumber}")`
        
        database.query(query, (err,result) => {
            if(err){
                res.locals.err = "You either entered incorrect information, or a user with that information already exists.";
                res.render('/auth/registration');
            } else{
                database.query("SELECT LAST_INSERT_ID()", (error, resul) => {
                    if(err){
                        res.send(err);
                    }else{
                        req.session.user_id = resul[0]['LAST_INSERT_ID()'];
                        res.redirect(req.session.last_visited ? req.session.last_visited : "/");
                    }
                })
            }
        })
    }
}

class Login extends Auth {
    login(req,res,next){
        const email = req.body.email.toLowerCase();
        const password = super.hash(req.body.password);
        // database.query(`SELECT EXISTS(SELECT email, passwd FROM users WHERE email = "${email}" AND passwd = "${password}")`, (err, result) => {
        database.query(`SELECT id FROM users WHERE email = "${email}" AND passwd = "${password}"`, (err, result) => {
            if(err){
                res.send(err);
            } else{
                // const exists = result[0][Object.keys(result[0])[0]];
                if(result.length == 0){
                    res.locals.err = "A user with that email/password combination does not exist";
                    res.redirect("/auth/login");
                } else{
                    req.session.user_id = result[0].id;
                    res.redirect(req.session.last_visited ? req.session.last_visited : "/");
                }
            }
        })
    }

    logout(req,res){
        if(req.session){
            req.session.destroy((err)=>{
                if(err){
                    res.status(400).send("An error occured while logging you out.");
                } else{
                    res.redirect("/");
                }
            });
        }
    }
}

let register = new Register();
let login = new Login();

router.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
router.get('/login', (req, res) => {
    res.render('login')
});
router.post('/login', login.login);
router.get('/registration', (req,res) => {
    res.render('registration');
})
router.post("/registration", register.isValidEmail, register.register);
router.get("/logout", login.logout);

module.exports = router;