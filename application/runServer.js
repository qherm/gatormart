const express = require("express");
var app = express();
let path = require("path");
var handlebars = require("express-handlebars");
var indexRouter = require("./routes/index");
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
// app.use(express.static('public/html'))
// app.use(express.static('public/html/aboutPages'))
app.use(express.static("public/images"));
app.use(express.static("public/css"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
// app.use('/users', usersRouter);
// app.use('/posts', postRouter);
// app.use('/comments', commentRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use((err, req, res, next) => {
  console.log(err);
  res.render("error", { err_message: err });
});

// app.use((req, res, next) => {
//     requestPrint(req.url);
//     next();
// });

module.exports = app;
