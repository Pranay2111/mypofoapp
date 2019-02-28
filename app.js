const express = require("express");
const hbs = require("hbs"); //To render the static files for application
const bodyParser = require("body-parser"); // To parse the JSON data
const session = require("express-session"); // To store the cookie for authentication of user
const appMiddlewere = require("./middlewere/appMiddlewere"); //pagenotFoundError ,handleError ,authenticate ,authenticated
const index = require("./routes/index"); // module contains router for / /about /contact /resume /login /signup /sigout
const projects = require("./routes/projects");
const blog = require("./routes/blog");
const admin = require("./routes/admin");
const validator = require("express-validator"); //

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/mean",
  { useNewUrlParser: true },
  function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("DB Connection Successfull");
    }
  }
);

const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
app.set("view options", { layout: "layout" });

hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("inc", function(value, options) {
  return value + 1;
});

app.use(express.static(__dirname + "/static"));
app.use(appMiddlewere.logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000000000 }
  })
);

app.use(validator());

app.use(appMiddlewere.authenticated);

app.use("/", index);
app.use("/project", projects);
app.use("/blog", blog);
app.use("/admin", appMiddlewere.authenticate, admin);

app.use(appMiddlewere.pagenotFoundError);
app.use(appMiddlewere.handleError);

app.listen(3000, () => console.log("server is running on 3000"));
