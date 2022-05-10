// add imports

class Auth {
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

        res.json({
            finalMessage: req.resultMessage,
        });
    }
}

class Login extends Auth {
    login(req,res,next){

    }
}