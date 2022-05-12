const express = require('express');
const database = require('../db/db.js');

class Search {
    search(req, res) {
        let search = req.query.search;
        let category = req.query.category;
        let query;
        
        if(!category&&!search){
            query = "SELECT * FROM posts";
        } else if(!category){
            query = `SELECT * FROM posts WHERE title LIKE '%` + search + `%' OR description LIKE '%` + search + `%' OR category LIKE '%` + search + `%'`;
        } else if(!search){
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
                res.json({
                    result: "",
                    category: "temp_category",
                    search: "temp_search"
                });
            } else {
                res.json({
                    result: result,
                    category: "temp_category",
                    search: "temp_search"
                });
            }
        });
    }
}

let search = new Search();

module.exports = search;