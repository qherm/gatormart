
/**
 * Short Description of file:
 * Used in the functionalities needed for both logging in and registering for the server. This
 * file is used to validate user information needed for both functions.
 * 
 * Created by the backend team and the team-lead for CSC648 Software Engineering.
 * Shane Waxler - Team Lead - Email: SWaxler@mail.sfsu.edu
 * Robert Garcia - Backend Lead - Email: RGarcia35@mail.sfsu.edu
 * Minggu Ma - Backend Member - Email: 	MMa4@mail.sfsu.edu
 * Joe Guan - Backend Member - Email: JGuan8@mail.sfsu.edu
*/
const express = require('express');
const router = express.Router();
const database = require('../db/db.js');
const bodyParser = require('body-parser');
const sessions = require('../sessions');
const { createHash } = require('crypto');

class Auth {
    /**
     * Short Description of function:
     * This function is used to encrypt the password given by a user. It is used
     * when registering a new user and also in validating a password for a user.
    */
    hash(string){
        return createHash('sha256').update(string).digest('hex');
    }

   /**
     * Short Description of function:
     * This function is used to ensure that the email used by a user is from
     * mail.sfsu.edu.
    */
    isValidEmail(req,res,next){
        let userEmail = req.body.email.toLowerCase();
        if (/@mail.sfsu.edu\s*$/.test(userEmail)) {
            next();
            return;
        }
        res.locals.err = "Please enter a valid SFSU email address";
        res.render('registration');
    }

    /**
     * Short Description of function:
     * This function is used to check whether a given email exists or not.
    */
    emailExists(email,callback) {
        database.query("SELECT * FROM user WHERE email=?",email,(err,results)=> {
            if(err) throw err;
            return callback(results);
        })
    }

    /**
     * Short Description of function:
     * This function is used to check whether a given username exists or not.
    */
    usernameExists(username,callback) {
        database.query("SELECT * FROM user WHERE email=? OR Username=?",username,(err,results)=> {
            if(err) throw err;
            return callback(results);
        })
    }
}

class Register extends Auth {
    /**
     * Short Description of function:
     * This function is used in registering a user; It first makes sure that the 
     * password and confirm password form are the same, if everything is validated,
     * it inserts this new user into the table and automatically logs them in. If there
     * is an error, we redirect them to the registration page once again.
    */
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
                res.render('registration');
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
    /**
     * Short Description of function:
     * This function is used in allowing a user to log in, if the given email and password are found in the table,
     * we log the user in and create a session for them.
    */
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
    /**
     * Short Description of function:
     * This function is used in allowing a user to log out. It destroys the current session for the user.
    */
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