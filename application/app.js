const express = require("express");
var app = express();
let path = require("path");

const handlebars = require("express-handlebars");
let hbs = handlebars.create({});
hbs.handlebars.registerHelper('isdefined', (val) => {
  return val !== undefined;
})

// Define Routers:
const indexRouter = require("./routes/index");
const aboutRouter = require("./routes/about");
const searchRouter = require("./routes/search");
const itemRouter = require("./routes/item");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const messagesRouter = require("./routes/messages");

// Define sessions:
const sessions = require('./sessions');

app.use(sessions.sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized: true,
  cookie: {maxAge: 1000 * 60 * 60 * 24},     // Cookie expires after 1 full day
  resave: false
}));
app.use(sessions.cookieParser());

app.use((req,res,next) => {
  res.locals.session = req.session;
  next();
})

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

// Use static files (i.e. images, css files, etc.)
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static("public/images"));
app.use(express.static("public/css"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

// Define routes
app.use("/", indexRouter);
app.use("/about", aboutRouter);
app.use("/result", searchRouter);
app.use("/item", itemRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/messages", messagesRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.render("error", { err_message: err });
});

module.exports = app;