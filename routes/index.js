const data = require("../my-data.json");
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", {
    layout: "layout",
    title: "Album Page",
    navProject: true,
    Projects: data.myProjects
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    layout: "layout-signin",
    extraCss: '<link rel="stylesheet" href="/css/signin.css">'
  });
});

const users = [
  {
    name: "Ashu",
    email: "test@test.com",
    password: "test"
  },

  {
    name: "JS",
    email: "js@js.com",
    password: "javascript"
  }
];

router.post("/login", (req, res) => {
  req
    .checkBody("email", "Email is required")
    .isEmail()
    .withMessage("Invalid Email");

  req
    .checkBody("pass", "Password is required")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 3 })
    .withMessage("Length should be min 5");

  var errors = req.validationErrors();

  if (errors) {
    let msgs = errors.map(ele => ele.msg);
    res.render("login", {
      title: "Login",
      layout: "layout-signin",
      extraCss: '<link rel="stylesheet" href="/css/signin.css">',
      messages: msgs
    });
  } else {
    let data = req.body;
    let foundUser = users.filter(
      user => data.email == user.email && data.pass == user.password
    );
    if (foundUser.length > 0) {
      req.session.isLoggedIn = true;
      req.session.user = foundUser[0];
      res.locals.user = foundUser[0];
      res.redirect("/admin/dashboard");
    } else {
      res.render("login", {
        title: "Login",
        layout: "layout-signin",
        extraCss: '<link rel="stylesheet" href="/css/signin.css">',
        messages: ["Email or Password Wrong"]
      });
    }
  }
});

router.get("/signout", (req, res) => {
  req.session.isLoggedIn = false;
  res.redirect("/");
});

router.get("/signup", (req, res, next) => {
  res.render("signup", {
    title: "signup",
    layout: "layout-signin",
    extraCss: '<link rel="stylesheet" href="css/signin.css">',
    navAdmin: true
  });
});

router.post("/signup", (req, res) => {
  var data = req.body;
  console.log(data);
  res.redirect("/admin");
});

router.get("/about", (req, res, next) => {
  res.render("about", {
    layout: "layout",
    title: "About page",
    navAbout: true
  });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact Us",
    layout: "layout"
  });
});

router.get("/resume", (req, res, next) => {
  res.redirect("/pdf/PRANAY_RATHOR.pdf");
});

module.exports = router;
