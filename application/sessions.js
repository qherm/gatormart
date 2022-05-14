// Define sessions:
const cookieParser = require('cookie-parser')
const sessions = require('express-session');
let session;

module.exports = {
    cookieParser,
    sessions,
    session
}