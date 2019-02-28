const express = require("express");
const router = express.Router();
const data = require("../my-data.json");
let mongoose = require("mongoose");
const Project = require("../models/projectSchema");

router.get("/dashboard", (req, res) => {
  res.render("admin/dashboard", {
    title: "DashBoard",
    layout: "dashboard-layout"
  });
});

router.get("/projects", (req, res, next) => {
  Project.find()
    .then(projectList => {
      res.render("admin/project-list", {
        title: "Project List",
        layout: "dashboard-layout",
        projects: projectList
      });
    })
    .catch(err => next(err));
});

router.get("/projects/create", (req, res) => {
  res.render("admin/project-create", {
    title: "create new project",
    layout: "dashboard-layout"
  });
});

router.post("/projects/create", (req, res, next) => {
  let data = req.body;
  let alias = data.name
    .toLowerCase()
    .trim()
    .split("")
    .join("-");
  console.log(alias);
  data.alias = alias;

  let newProject = new Project(data);

  newProject
    .save()
    .then(projectSaved => {
      res.redirect("/admin/projects");
    })
    .catch(err => next(err));
});

router.get("/projects/:alias", (req, res, next) => {
  let alias = req.params.alias;

  Project.findOne({ alias: alias })
    .then(data => {
      console.log(data);
      res.render("admin/project-details", {
        title: "Project Detail",
        layout: "dashboard-layout",
        project: data
      });
    })
    .catch(err => next(err));
});

router.get("/projects/:alias/delete", (req, res, next) => {
  let alias = req.params.alias;

  Project.findOneAndDelete({ alias: alias })
    .then(data => {
      console.log(data);
      res.redirect("/admin/projects");
    })
    .catch(err => next(err));
});

router.post("/projects/:alias/update", (req, res, next) => {
  let bodyData = req.body;

  console.log(bodyData);
  let alias = req.params.alias;

  Project.findOneAndUpdate(
    { alias: alias },
    { $set: bodyData, $inc: { __v: 1 } },
    { new: true }
  )
    .then(data => {
      console.log(data);
      res.redirect("/admin/projects");
    })
    .catch(err => next(err));
});

module.exports = router;
