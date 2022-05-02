const e = require('express');
const express = require('express')
const app = express()
const mysql = require('mysql');
let path = require('path');

app.engine('html', require('ejs').renderFile);

app.get('/*/:search/:category', search, (req, res) => {
    var searchResult = req.searchResult;
    res.json({
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult,
        category: req.category
    });

})



app.use(express.static('public/html'));
app.use(express.static('public/html/aboutPages'));
app.use(express.static('public/images'));
app.use(express.static('public/css'));


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.listen(3000, () => console.log('Server running on port 3000'));


const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'GatorMartDB'
});

database.connect((err) => {
    if (err) throw err;
    console.log('Connected!')

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
        req.category = "";
        next();
    });
}

function Register(req, res, next) {
    var userEmail = req.params.userEmail;
    var userName = req.params.userName;
    var userPassword = req.params.userPassword;
    var userConfirmPassword = req.params.userConfirmPassword;
    //if validate == false, don't register

    if (ValidateUserExists){
        return -1
    }
    else if( !isValidPassword){
        return -1
    }
    else if (!isValidEmail){
        return -1
    }
    
    //add user to DB
}


function ValidateUserExists() {
    //check if user is already in DB, if so, return true
    let query = 'SELECT * FROM User'
}

function isValidPassword(password, confirmpassword) {
    if (password != confirmpassword){
        return false;
    }
    if (password.length < 8 ){
        return false;
    }

    return true;
}

function isValidEmail(email){
    return true;
}