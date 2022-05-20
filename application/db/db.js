/**
 * Short Description of file:
 * Used in the functionalities of connecting to mySQL DB.
 * 
 * Created by the backend team and the team-lead for CSC648 Software Engineering.
 * Shane Waxler - Team Lead - Email: SWaxler@mail.sfsu.edu
 * Robert Garcia - Backend Lead - Email: RGarcia35@mail.sfsu.edu
 * Minggu Ma - Backend Member - Email: 	MMa4@mail.sfsu.edu
 * Joe Guan - Backend Member - Email: JGuan8@mail.sfsu.edu
*/

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