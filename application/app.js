const express = require("express");
var app = express();
let path = require("path");
const handlebars = require("express-handlebars");

// Define Routers
const indexRouter = require("./routes/index");
const aboutRouter = require("./routes/about");
const searchRouter = require("./routes/search");
const itemRouter = require("./routes/item");
const userRouter= require("./routes/user");

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

// Use hbs views folder
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, '/views'));

app.use(express.static("public/images"));
app.use(express.static("public/css"));
app.use(express.static(path.join(__dirname, "public")));


// Define routes
app.use("/", indexRouter);
app.use("/about", aboutRouter);
app.use("/searchResult", searchRouter);
app.use("/item", itemRouter);
app.use("/user", userRouter);

// Maybe remove this:
app.use(express.json());


app.use(express.urlencoded({ extended: false }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use((err, req, res, next) => {
  console.log(err);
  res.render("error", { err_message: err });
});

module.exports = app;