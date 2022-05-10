const express = require('express');
class Search {
    search(req, res) {
        var searchTerm = req.params.search;
        var category = req.params.category;
        console.log(searchTerm, category);
        let query = 'SELECT * FROM Post';
        
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
            } else {
                req.searchResult = result;
                req.searchTerm = searchTerm;
                req.category = category;
            }
        });
    }
}

let search = new Search();

module.exports = search.search;