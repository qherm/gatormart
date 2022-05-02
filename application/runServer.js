/*
 * Created by Team 2 for CSC 648: Software Engineering
 * GatorMart - An online marketplace for SFSU students and staff
 * Set up by the backend team and team lead:
 * Team Lead - Shane Wexler: SWaxler@mail.sfsu.edu
 * Backend Lead - Robert Garcia: RGarcia35@mail.sfsu.edu
 * Backend Member - Joe Guan: Jguan8@mail.sfsu.edu
 * 
 * 
 * Javascript file that establishes a connection to the server.
 * It also establishes a connection to the database.
 * As of the moment it handles the search bar function from the nav bar
 * and also finds the results of a search.
*/
const express = require('express');
const app = express();
const mysql = require('mysql');
let path = require('path');

app.engine('html', require('ejs').renderFile);

/*
 * These next 4 app.get functions all work the same, they are
 * meant to be used once a user hits search on the nav bar.
 * It finds the result of that search than sends it back to the
 * page that called it.
*/
app.get('/index.html/:search/:category', search, (req, res) => {
    var searchResult = req.searchResult;
    res.json({
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult,
        category: req.category
    });

})

app.get('/aboutUs.html/:search/:category', search, (req, res) => {
    var searchResult = req.searchResult;
    res.json({
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult,
        category: req.category
    });
})

app.get('/VPResult.html/:search/:category', search, (req, res) => {
    var searchResult = req.searchResult;
    res.json({
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult,
        category: req.category
    });
})

app.get('/VPTestHome.html/:search/:category', search, (req, res) => {
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

/*
 * Establishes a connection to the mysql server that
 * is either being hosted by the user or by the
 * AWS server.
*/

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


/*
 * Using the parameters that the user has inputted into
 * the navbar search bar, the search function inputs a
 * query dependent on the users search parameters and then
 * returns the results it finds.
*/
function search(req, res, next) {
    
    var searchTerm = req.params.search;
    var category = req.params.category;
    let query = 'SELECT * FROM Post';
    //console.log(searchTerm + " " + category);
    
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
        //console.log("I'm HERE");
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
