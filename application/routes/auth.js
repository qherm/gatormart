const database = require('../db/db.js');

class Auth {
    // maybe doesn't work? idk
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
        
    }
}

class Register extends Auth {
    register(req, res, next){
        console.log("IN POST: ",req.resultMessage);
        let email = req.body.email;
        let name = req.body.name;
        let username = req.body.username;
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword;

        /*
            PREVIOUS QUERY TO ADD A USER INTO DB
            let query = `INSERT INTO users (full_name, email, username, passwd, bio, phone_number) VALUES ('` 
                    + username +  `', '`
                    + email +  `', '`
                    + username +  `', '`
                    + userencryptedpassword +  `', '`
                    + '' +  `', '`
                    + '' +  `')`;
                    
        */
        res.json({
            finalMessage: req.resultMessage,
        });
    }
}

class Login extends Auth {
    login(req,res,next){

    }
}

let register = new Register();
let login = new Login();

module.exports = {
    register: register.register,
    login: login.login
}