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

        if (!category.length && !search.length) {
            query = "SELECT * FROM posts";
        } else if (!category.length) {
            query = `SELECT * FROM posts WHERE title LIKE '%` + search + `%' OR description LIKE '%` + search + `%' OR category LIKE '%` + search + `%'`;
        } else if (!search.length) {
            query = `SELECT * FROM posts WHERE category = '` + category + `'`;
        } else {
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
            if (err) {
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

    displayResults(req, res) {
        var searchResults = "";
        var searchTerm = "";
        var category = "";

        for (let i = 0; i < searchResults.length; i++) {
            document.getElementById("searchResults").innerHTML +=
            `
                <div class="col-md-3 mb-2">
                    <div class="card shadow" style="width: 18rem;">
                        <a href="#">
                            <img
                                src=""
                                class="card-img-top"
                                alt="..."
                            />
                        </a>
                        <div class="card-body">
                            <h5 class="card-title font-poppins">searchResults[i].title</h5>
                                <span>textbooks </span>
                            <h6 class="mb-3">searchResults[i].price</h6>
                            <a href="productDetail" class="btn btn-primary font-size-09 text-light product-button">View Details</a>
                            <a href="message" class="btn btn-primary font-size-09 text-light product-button">Message Seller</a>
                        </div>
                    </div>
                </div>
            `
        }
    }


}

let search = new Search();

module.exports = search;