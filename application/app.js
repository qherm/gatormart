const express = require('express');
const app = express();
const database = require('./db/db.js');

let path = require('path');

const search = require('./routes/search.js');
const auth = require('./routes/auth.js');

app.engine('html', require('ejs').renderFile);

app.use(express.static('public/html'));
app.use(express.static('public/html/aboutPages'));
app.use(express.static('public/images'));
app.use(express.static('public/css'));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.listen(3000, () => console.log('Server running on port 3000'));

app.get('/search/:search/:category', search);

app.post('/register', auth.register);

module.exports = app;