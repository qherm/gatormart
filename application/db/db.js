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
        throw err;
    } 
    console.log('Connected to DB!');
});

module.exports = database;