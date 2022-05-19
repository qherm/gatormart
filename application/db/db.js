const express = require('express');
const mysql = require('mysql');

// Set up to read .env file
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'gatormartdb'
});

database.connect((err) => {
    if (err){
	console.log(err);
        throw err;
    } else{
    	console.log('Connected to DB!');
    }
});

module.exports = database;
