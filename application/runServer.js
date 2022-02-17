const express = require('express')
const app = express()
let path = require('path');

app.use(express.static('public/html'))
app.use(express.static('public/html/aboutPages'))
app.use(express.static('public/images'))
app.use(express.static('public/css'))
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => console.log('Server running on port 3000'))
