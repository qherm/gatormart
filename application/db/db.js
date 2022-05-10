const mysql = require('mysql');
const express = require('express');
// const { connect } = require('http2');

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