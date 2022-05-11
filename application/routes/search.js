const express = require('express');
const database = require('../db/db.js');

class Search {
    redirect_search(req, res){
        res.redirect(`/searchResult/${req.category}/${req.search}`);
    }

    search(req, res) {
        var search = req.params.search;
        var category = req.params.category;
        console.log(search, category);
        let query;
        
        if(!category.length){
            query = `SELECT * FROM Post WHERE Title LIKE '%` + search + `%' OR description LIKE '%` + search + `%' OR category LIKE '%` + search + `%'`;
        } else if(!search.length){
            query = `SELECT * FROM Post WHERE category = '` + category + `'`;
        }
        
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
            console.log("in db query")
            if (err){
                res.json({
                    result: "",
                    search: "",
                    category: ""
                })
            } else {
                // res.json({
                //     result: result,
                //     search: search,
                //     category: category
                // });
                console.log("here")
                res.redirect('/searchResult')
            }
        });
    }
}

let search = new Search();

module.exports = search;