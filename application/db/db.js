const express = require('express');
const mysql = require('mysql');

// Set up to read .env file
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6l3TT3rs',
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
