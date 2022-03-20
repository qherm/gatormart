const express = require('express')
const app = express()
const mysql = require('mysql');
let path = require('path');

app.engine('html', require('ejs').renderFile);



app.post('/VPTestHome.html/:search/:category', search, (req, res) => {
    var searchResult = req.searchResult;
    //console.log("\nNumber of results: " + searchResult.length)
    //for (var i = 0; i < searchResult.length; i++){
    //    console.log("Name: " + searchResult[i]['Name'] + "   Price: $" + searchResult[i]['Price']);
    //    console.log("Posted by UserID: " + searchResult[i]['UserID']);
    //    console.log("Category: " + searchResult[i]['Category']);
    //    console.log("Description: " + searchResult[i]['Comment'] + "\n");
    //}

    res.json({
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult,
        category: req.category
    });

    // res.render('html/VPTestHome.html', {
    //     results: searchResult.length,
    //     searchTerm: req.searchTerm,
    //     searchResult: searchResult,
    //     category: req.category
    // });
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
    database: 'Example'
});

database.connect((err) => {
    if (err) throw err;
    console.log('Connected!')

});

database.query('SELECT * FROM Posting', (error, results, fields) => {
    if (error) throw error;
});

function search(req, res, next) {
    
    var searchTerm = req.params.search;
    var category = req.params.category;
    let query = 'SELECT * FROM Posting'
    //console.log(searchTerm + " " + category);
    
    if (searchTerm != 'EMPTYSEARCHTEMP' && category != 'EMPTYCATEGORYTEMP'){
        query = `SELECT * FROM Posting WHERE Category = '` + category + `' AND ( Name LIKE '%` + searchTerm + `%' OR Comment LIKE '%` + searchTerm + `%' OR Category LIKE '%` + searchTerm + `%')`;
    }
    else if (searchTerm != 'EMPTYSEARCHTEMP' && category == 'EMPTYCATEGORYTEMP'){
        query = `SELECT * FROM Posting WHERE Name LIKE '%` + searchTerm + `%' OR Comment LIKE '%` + searchTerm + `%' OR Category LIKE '%` + searchTerm + `%'`;
    }
    else if (searchTerm == 'EMPTYSEARCHTEMP' && category != 'EMPTYCATEGORYTEMP'){
        query = `SELECT * FROM Posting WHERE Category = '` + category + `'`;
    }
    else if (searchTerm == 'EMPTYSEARCHTEMP' && category == 'EMPTYCATEGORYTEMP'){
        //console.log("I'm HERE");
        query = `SELECT * FROM Posting`;
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
