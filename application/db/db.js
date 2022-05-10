const express = require('express');
const mysql = require('mysql');

// Set up to read .env file
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'GatorMartDB'
});

database.connect((err) => {
    if (err){
        console.log("ERROR")
        throw err;
    } 
    console.log('Connected!');
});

module.exports = database;