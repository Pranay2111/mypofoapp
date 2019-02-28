const express = require("express");
const router = express.Router();
const data = require("../my-data.json");

router.get("/", (req, res, next) => {
  res.render("project", {
    layout: "layout",
    title: "Projects",
    navProject: true,
    Projects: data.myProjects
  });
});

router.get("/:projectalias", (req, res, next) => {
  let alias = req.params.projectalias;
  let index = data.projectIndex[alias];
  let project = data.myProjects[index];

  res.render("project-details", {
    title: "Project Detail",
    layout: "layout",
    project: project
  });
});

module.exports = router;
