const express = require('express');
const router = express.Router();
const app = require('../app')
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

        query += "(SELECT "

        database.query(query, (err, results, next) => {
            if (err){
                res.json({})
            } else{
                res.json({results});
            }
        });
    }
}

const search = new Search();

// /searchResult
router.get('/', (req,res)=>{
    res.render('searchResult');
});
router.post('/', search.search);

module.exports = router;