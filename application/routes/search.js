const express = require('express');
const router = express.Router();
const app = require('../app');
const database = require('../db/db.js');

class Search {
    static sortby_options = [
        { label: "Sort By", value: " ", selected: false },
        { label: "Price: Low to High", value: "price ASC", selected: false },
        { label: "Price: High to Low", value: "price DESC", selected: false },
        { label: "Date: Newet First", value: "creation_time DESC", selected: false },
        { label: "Date: Oldest First", value: "creation_time ASC", selected: false }
    ]
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
    
    getCategories(req, res, next){
        database.query("SELECT category FROM categories", (err,result) => {
            if(err){
                res.send(err);
            } else{
                res.locals.categories = [];
                for(let i = 0; i < result.length; i++){
                    res.locals.categories.push({category:result[i].category, selected: req.query.category === result[i].category})
                }
                next();
            }
        });
    }

    getResults(req, res, next) {
        const search = req.query.search;
        const category = req.query.category;
        const sortby = req.query.sortby;
        res.locals.search = search;
        res.locals.category = category;

        let query = `SELECT posts.id, posts.user_id, posts.title, posts.category, posts.price,
                    users.username, images.image_link
         FROM posts JOIN images ON images.post_id = posts.id JOIN users ON users.id=posts.user_id `;
        
        if(!category&&!search){
            query += "";
        } else if(!category){
            query += `WHERE title LIKE '%` + search + `%' OR description LIKE '%` + search + `%' OR category LIKE '%` + search + `%'`;
        } else if(!search){
            query += `WHERE category = '` + category + `'`;
        } else{
            query += `WHERE category = '` + category + `' AND ( Title LIKE '%` + search + `%' OR description LIKE '%` + search + `%' OR Category LIKE '%` + search + `%')`;
        }

        if(sortby!==" " && sortby){
            query += " ORDER BY " + sortby;
        }
        
        database.query(query, (err, results) => {
            if (err){
                next();
            } else{
                res.locals.sortby = [];
                for(let i = 0; i < Search.sortby_options.length; i++){
                    res.locals.sortby.push({label: Search.sortby_options[i].label, value:Search.sortby_options[i].value, selected: Search.sortby_options[i].value===sortby })
                }
                res.locals.posts=results;
                next();
            }
        });
    }
}

const search = new Search();

router.get('/', search.getResults, (req,res)=>{
    res.locals.session.last_visited = "/result" + req.url.substring(1);
    res.render('result');
});

module.exports = router;