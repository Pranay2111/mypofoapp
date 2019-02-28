module.exports.logger = function(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
};

module.exports.pagenotFoundError = function(req, res, next) {
  res.render("404", {
    layout: "layout",
    title: "Page Not Found"
  });
};

module.exports.handleError = function(err, req, res, next) {
  console.log(err);
  res.render("500", {
    layout: "layout",
    title: "505 Error"
  });
};

module.exports.authenticate = function(req, res, next) {
  let loggedIn = req.session.isLoggedIn;
  if (loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports.authenticated = function(req, res, next) {
  req.session.isLoggedIn = req.session.isLoggedIn ? true : false;
  if (req.session.isLoggedIn) {
    res.locals.user = req.session.user;
    next();
  } else {
    next();
  }
};
