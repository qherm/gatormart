const express = require('express');
const router = express.Router();
const app = require('../app');
const database = require('../db/db.js');

class Search {
    // use this later
    isSQLInjection(input){
        let userInput = input.toLowerCase();
        //check input type
        if(typeof userInput != "string"){
            return true;
        }
        //check if there is backslash for escape characters
        if(userInput.includes("\\")){
            return true;
        }
        //check if there is batched SQL Statement
        if(userInput.includes(";") || userInput.includes(" or ") || userInput.includes(" and ") || userInput.includes(" drop ") || userInput.includes(" union ") || userInput.includes(" select ") || userInput.includes(" from ") || userInput.includes(" delete ")){
            return true;
        }
        //see if there is potential always true clause, only if there is more than 3 chars can make this a injection
        if(userInput.includes("=") && userInput.length >= 3){
            //only check "=" have characters on the left and right
            for(let i = 1; i < userInput.length - 1; i++){
                if(userInput[i] == "="){
                    if(userInput[i-1] == userInput[i+1]){
                        return true;
                    }
                }
            }
        }
        //check if part of the query is muted
        if(userInput.includes("--")){
            return true;
        }
        return false;
    }
    getCategories(req, res){
        database.query("SELECT category FROM categories", (err,result) => {
            if(err){
                res.send(err);
            } else{
                res.json({result})
            }
        });
    }
    
    // formQuery(search, category) {
    //     let query = "";
    //     if(!category&&!search){
    //         query = "SELECT * FROM posts";
    //     } else if(!category){
    //         query = `SELECT * FROM posts WHERE title LIKE '%` + search + `%' OR description LIKE '%` + search + `%' OR category LIKE '%` + search + `%'`;
    //     } else if(!search){
    //         query = `SELECT * FROM posts WHERE category = '` + category + `'`;
    //     } else{
    //         query = `SELECT * FROM posts WHERE category = '` + category + `' AND ( Title LIKE '%` + search + `%' OR description LIKE '%` + search + `%' OR Category LIKE '%` + search + `%')`;
    //     }
    //     return query + " JOIN images ON images.post_id = posts.id";
    // }

    search(req, res) {
        console.log(req.session.user_id);
        let search = req.query.search;
        let category = req.query.category;
        let query = "";
        
        // Put this in formQuery wrapper function
        if(!category&&!search){
            query = "SELECT * FROM posts JOIN images ON images.post_id = posts.id";
        } else if(!category){
            query = `SELECT * FROM posts JOIN images ON images.post_id = posts.id WHERE title LIKE '%` + search + `%' OR description LIKE '%` + search + `%' OR category LIKE '%` + search + `%'`;
        } else if(!search){
            query = `SELECT * FROM posts JOIN images ON images.post_id = posts.id WHERE category = '` + category + `'`;
        } else{
            query = `SELECT * FROM posts JOIN images ON images.post_id = posts.id WHERE category = '` + category + `' AND ( Title LIKE '%` + search + `%' OR description LIKE '%` + search + `%' OR Category LIKE '%` + search + `%')`;
        }

        database.query(query, (err, results, next) => {
            if (err){
                res.json({})
            } else{
                res.json({
                    result:results
                });
            }
        });
    }
}

const search = new Search();

router.get('/', (req,res)=>{
    res.render('searchResult');
});
router.post('/', search.search);
router.get('/categories', search.getCategories);

module.exports = router;