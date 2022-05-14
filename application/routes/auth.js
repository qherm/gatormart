const express = require('express');
const router = express.Router();
const database = require('../db/db.js');
const bodyParser = require('body-parser');
const sessions = require('../sessions');

class Auth {
    isValidEmail(email){
        let userEmail = email.toLowerCase();
        if (/@mail.sfsu.edu\s*$/.test(userEmail)) {
            return true;
        }
        return false;
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

    encryptPassword(password){
        return password;
    }
}

class Register extends Auth {
    register(req, res, next){
        let email = req.body.email.toLowerCase();
        let name = req.body.name;
        let username = req.body.username;
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;

        //previous register query
        /*
        let query = `INSERT INTO User (full_name, email, username, passwd, bio, phone_number) VALUES ('`
            + name + `', '`
            + email + `', '`
            + username + `', '`
            + this.encryptPassword(password) + `', '`
            + '' + `', '`
            + '' + `')`;

            */
        res.json({
            finalMessage: req.resultMessage,
        });
    }
}

class Login extends Auth {
    login(req,res,next){
        const email = req.body.email.toLowerCase();
        const password = super.encryptPassword(req.body.password);
        // database.query(`SELECT EXISTS(SELECT email, passwd FROM users WHERE email = "${email}" AND passwd = "${password}")`, (err, result) => {
        database.query(`SELECT id FROM users WHERE email = "${email}" AND passwd = "${password}"`, (err, result) => {
            if(err){
                res.send(err);
            } else{
                // const exists = result[0][Object.keys(result[0])[0]];
                if(result.length == 0){
                    res.send("that is not a user");
                } else{
                    sessions.session = req.session;
                    sessions.session.userid = result[0].id;
                    res.redirect("/");
                }
            }
        })
    }
}

let register = new Register();
let login = new Login();

router.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
router.get('/login', (req, res) => {
    res.render('login')
});
router.post('/login', login.login);

module.exports = router;