/**
 * Short Description of file:
 * Used in getting information needed for rendering the search results for a given search.
 * This file not only gets the results needed for a search, but also helps to render a
 * dynamic category box found on both the navbar and on the post page.
 * 
 * Created by the backend team and the team-lead for CSC648 Software Engineering.
 * Shane Waxler - Team Lead - Email: SWaxler@mail.sfsu.edu
 * Robert Garcia - Backend Lead - Email: RGarcia35@mail.sfsu.edu
 * Minggu Ma - Backend Member - Email: 	MMa4@mail.sfsu.edu
 * Joe Guan - Backend Member - Email: JGuan8@mail.sfsu.edu
*/

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
    ];

    /**
     * Short Description of function:
     * This function is used to validate a user's input and ensure they are not inputting some form of SQL injection
     * If they are, we ensure that we do not take their input
    */
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

    /**
     * Short Description of function:
     * This function is used in rendering the pull down menu for the categories found in both the navbar
     * and in the post page. It allows the categories pull down menu to pull from the category table, allowing
     * it to be dynamic.
    */
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
    /**
     * Short Description of function:
     * This function is used in rendering the search results for a given search term and category. It performs a query to get
     * the results for a given term that is searched, and also has the ability to sort search results if needed.
    */
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
            query += "WHERE admin_approved=1";
        } else if(!category){
            query += `WHERE (title LIKE '%` + search + `%' OR description LIKE '%` + search + `%' OR category LIKE '%` + search + `%') AND posts.admin_approved=1`;
        } else if(!search){
            query += `WHERE category = '` + category + `' AND posts.admin_approved=1`;
        } else{
            query += `WHERE category = '` + category + `' AND ( Title LIKE '%` + search + `%' OR description LIKE '%` + search + `%' OR Category LIKE '%` + search + `%') AND posts.admin_approved=1`;
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
                if(results.length == 0){
                    next();
                } else {
                    res.locals.category = category ? category : "All";
                    res.locals.posts=results;
                    res.locals.num_results = results.length;
                    res.locals.session.last_visited = "/result" + req.url.substring(1);
                    res.render('result');
                    return;
                }
            }
        });
    }

    /*
     *  Short description of function:
     *  This function stores all approved items from our posts db table into 
     *  response locals. Meant to be rendered by hbs view.
     */
    getAllApprovedItems(req,res,next){
        const search = req.query.search;
        const category = req.query.category;
        const sortby = req.query.sortby;
        res.locals.search = search;
        res.locals.category = category ? category : "All";

        let query = `SELECT posts.id, posts.user_id, posts.title, posts.category, posts.price,
                    users.username, images.image_link
         FROM posts JOIN images ON images.post_id = posts.id JOIN users ON users.id=posts.user_id WHERE admin_approved=1`;

        if(sortby!==" " && sortby){
            query += " ORDER BY " + sortby;
        }
        
        database.query(query, (err, results) => {
            if (err){
                next();
            } else{
                res.locals.posts=results;
                next();
            }
        });
    }
}

const search = new Search();

router.get('/', search.getResults, search.getAllApprovedItems, (req,res)=>{
    res.locals.session.last_visited = "/result" + req.url.substring(1);
    res.render('result');
});

module.exports = router;