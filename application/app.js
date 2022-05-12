const express = require("express");
var app = express();
let path = require("path");
var handlebars = require("express-handlebars");
var indexRouter = require("./routes/index");
const search = require('./routes/search');
const auth = require('./routes/auth');
// var usersRouter = require('./routes/users');
// var postRouter = require('./routes/posts');
// var commentRouter = require('./routes/comments');

app.engine(
  "hbs",
  handlebars({
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    extname: ".hbs",
    defaultLayout: "body",
    helpers: {
      emptyObject: (obj) => {
        return !(obj.constructor === Object && Object.keys(obj).length == 0);
      },
    },
  })
);

app.set("view engine", "hbs");

// Maybe important...
app.use(express.static("public/images"));
app.use(express.static("public/css"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
//

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use((err, req, res, next) => {
  console.log(err);
  res.render("error", { err_message: err });
});

app.get("/search", (req,res,next)=>{
  res.redirect('searchResult');
});

app.get('/searchResult', (req,res,next)=>{
  res.render('searchResult');
});

app.post('/register', auth.register);

// app.use((req, res, next) => {
//     requestPrint(req.url);
//     next();
// });

module.exports = app;