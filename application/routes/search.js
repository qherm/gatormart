const express = require('express');
const database = require('../db/db.js');

class Search {
    // redirect_search(req, res){
    //     let search = req.query.testdne;
    //     let category = "";
    //     console.log(search)
    //     res.redirect(`/searchResult?category=${req.category}&search=${req.search}`);
    // }

    search(req, res) {
        let search = req.query.search;
        let category = req.query.category;
        let query;
        console.log(search, category);

        
        if(!category.length&&!search.length){
            query = "SELECT * FROM posts";
        } else if(!category.length){
            query = `SELECT * FROM posts WHERE title LIKE '%` + search + `%' OR description LIKE '%` + search + `%' OR category LIKE '%` + search + `%'`;
        } else if(!search.length){
            query = `SELECT * FROM posts WHERE category = '` + category + `'`;
        } else{
            query = `SELECT * FROM posts WHERE category = '` + category + `' AND ( Title LIKE '%` + search + `%' OR description LIKE '%` + search + `%' OR Category LIKE '%` + search + `%')`;
        }
        
        // if (searchTerm != 'EMPTYSEARCHTEMP' && category != 'EMPTYCATEGORYTEMP'){
        //     query = `SELECT * FROM Post WHERE Category = '` + category + `' AND ( Title LIKE '%` + searchTerm + `%' OR Post_Description LIKE '%` + searchTerm + `%' OR Category LIKE '%` + searchTerm + `%')`;
        // }
        // else if (searchTerm != 'EMPTYSEARCHTEMP' && category == 'EMPTYCATEGORYTEMP'){
        //     query = `SELECT * FROM Post WHERE Title LIKE '%` + searchTerm + `%' OR Post_Description LIKE '%` + searchTerm + `%' OR Category LIKE '%` + searchTerm + `%'`;
        // }
        // else if (searchTerm == 'EMPTYSEARCHTEMP' && category != 'EMPTYCATEGORYTEMP'){
        //     query = `SELECT * FROM Post WHERE Category = '` + category + `'`;
        // }
        // else if (searchTerm == 'EMPTYSEARCHTEMP' && category == 'EMPTYCATEGORYTEMP'){
        //     query = `SELECT * FROM Post`;
        // }
        console.log(query);
        database.query(query, (err, result) => {
            console.log("in db query")
            if (err){
                res.render('searchResult', {
                    result: "",
                    category: category,
                    search: search
                });
            } else {
                console.log("here")
                console.log(result)
                res.render('searchResult', {
                    result: result,
                    category: category,
                    search: search
                });
            }
        });
    }
}

let search = new Search();

module.exports = search;