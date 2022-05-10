const express = require('express');
const { connect } = require('http2');
const app = express()
const mysql = require('mysql');
let path = require('path');

app.engine('html', require('ejs').renderFile);

app.use(express.static('public/html'));
app.use(express.static('public/html/aboutPages'));
app.use(express.static('public/images'));
app.use(express.static('public/css'));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.listen(3000, () => console.log('Server running on port 3000'));

const reg = Register();

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'GatorMartDB'
});

database.connect((err) => {
    if (err){
        console.log("ERROR")
        throw err;
    } 
    console.log('Connected!')
    
});

app.get('/*/search/:search/:category', search, (req, res) => {
    var searchResult = req.searchResult;
    res.json({
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult,
        category: req.category
    });
});

function search(req, res, next) {
    var searchTerm = req.params.search;
    var category = req.params.category;
    let query = 'SELECT * FROM Post'
    
    if (searchTerm != 'EMPTYSEARCHTEMP' && category != 'EMPTYCATEGORYTEMP'){
        query = `SELECT * FROM Post WHERE Category = '` + category + `' AND ( Title LIKE '%` + searchTerm + `%' OR Post_Description LIKE '%` + searchTerm + `%' OR Category LIKE '%` + searchTerm + `%')`;
    }
    else if (searchTerm != 'EMPTYSEARCHTEMP' && category == 'EMPTYCATEGORYTEMP'){
        query = `SELECT * FROM Post WHERE Title LIKE '%` + searchTerm + `%' OR Post_Description LIKE '%` + searchTerm + `%' OR Category LIKE '%` + searchTerm + `%'`;
    }
    else if (searchTerm == 'EMPTYSEARCHTEMP' && category != 'EMPTYCATEGORYTEMP'){
        query = `SELECT * FROM Post WHERE Category = '` + category + `'`;
    }
    else if (searchTerm == 'EMPTYSEARCHTEMP' && category == 'EMPTYCATEGORYTEMP'){
        query = `SELECT * FROM Post`;
    }
    database.query(query, (err, result) => {
        if (err){
            req.searchResult = "";
            req.searchTerm = "";
            req.category = "";
            
            next();
        }
        req.searchResult = result;
        req.searchTerm = searchTerm;
        req.category = category;
        next();
    });
}

//userFullName, userEmail, username, userPassword, userConfirmPassword
app.post('/register', reg.register);

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

let emailExists = (email, callback) => {
    database.query("SELECT * FROM user WHERE email=?",[email],(err,results)=> {
        if(err) throw err;
        return callback(results);
    })
}

// function Register(req, res, next) {
//     req.valid = false;
//     req.resultMessage = "";

//     var userFullName = req.params.userFullName;
//     var userEmail = req.params.userEmail;
//     var userName = req.params.username;
//     var userPassword = req.params.userPassword;
//     var userConfirmPassword = req.params.userConfirmPassword;

    
//     emailExists(userEmail, (results) =>{
//         console.log("results: ", results);
//         if(results.length>0){ 
//             req.resultMessage = "User already exists. This is a test string";
//             next();
//         } else{

//         }
//     });
//     // console.log("THIS IS OUR TEST: ",test);
//     /*
//     CREATE TABLE IF NOT EXISTS `GatorMartDB`.`User` (
//     `ID` INT NOT NULL AUTO_INCREMENT,
//     `Name` VARCHAR(225) NOT NULL,
//     `Email` VARCHAR(225) UNIQUE NOT NULL,
//     `Username` VARCHAR(225) UNIQUE NOT NULL,
//     `Password` VARCHAR(225) NOT NULL,
//     `Bio_Description` VARCHAR(225) NOT NULL,
//     `Phone_Number` VARCHAR(225) NOT NULL,
//     PRIMARY KEY (`ID`));
//     */

//     // database.query("SELECT * FROM User WHERE email=?",[userEmail], (err, rows, f) => {
//     //     if(err) throw err
//     //     if(rows.length>0){
//     //         console.log("I'm in here");
//     //         req.resultMessage = "User with that email already exists";
//     //         console.log(req.resultMessage);
//     //     }
//     // });
    
//     // console.log(req.resultMessage);
//     // if(req.resultMessage.length > 0) return;
//     // console.log("I'm down here");

//     // //if validate == false, don't register
//     // console.log("\nDOES VALID USER EXIST????", ValidateUserExists(userEmail),"\n");
    
//     // //if (ValidateUserExists(userEmail)){
//     // //    req.resultMessage += "User exists in System already. ";
//     // //    return false;
//     // //}

//     // if( !isValidPassword(userPassword, userConfirmPassword)){
//     //     req.resultMessage += "User Password not valid. ";
//     //     return false;
//     // }

//     // if (!isValidEmail(userEmail)){
//     //     req.resultMessage += "User email not valid. ";
//     //     return false;
//     // }

//     // //${userFullName}/${userEmail}/${username}/${userPassword}/${userConfirmPassword}

//     // userEncryptedPassword = userPassword;
//     // //userEncryptedPassword = encryptPassword(userPassword);
//     // //add user to DB
//     // let query = `INSERT INTO User (name, Email, Username, Password, Bio_Description, Phone_Number) VALUES ('` 
//     //                 + userFullName +  `', '`
//     //                 + userEmail +  `', '`
//     //                 + userName +  `', '`
//     //                 + userEncryptedPassword +  `', '`
//     //                 + '' +  `', '`
//     //                 + '' +  `')`;


//     // database.query(query, (err, result) => {
//     //     if (err){
//     //         console.log(err);
//     //         req.resultMessage += userEmail + "Failure, error in DB";
//     //         req.valid = false;
//     //         next();
//     //     }
//     //     req.resultMessage += "success";
//     //     req.valid = true;
//     //     next();
//     // });
    
// }

// function Login(req, res, next) {
// }

function Post(req, res, next) {
}

function Message(req, res, next) {
}

//doesn't seem to work with async
function ValidateUserExists(userEmail) {
    //check if user is already in DB, if so, return true
    
    let query = `SELECT * FROM User WHERE Email = '` + userEmail + `'`;
    database.query(query, async (err, result) => {
        console.log(await result);
        setXToV(await result);
        console.log("\nTEST x is:", x);
    });
    console.log("\nx is:", x);
}

function encryptPassword(password){

}


function isValidPassword(password, confirmpassword) {
    // console.log(password);
    // console.log(confirmpassword);
    if (password != confirmpassword){
        return false;
    }

    return true;
}

function isValidEmail(email){
    let userEmail = email.toLowerCase();
    if (/@mail.sfsu.edu\s*$/.test(userEmail)) {
        return true;
    } 
    return false;
}

// module.exports{

// }