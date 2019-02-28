const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: String,
  alias: String,
  tags: [String],
  description: String,
  githubUrl: String,
  imageUrl: String,
  relatedProject: [{ name: String, link: String }]
});

module.exports = mongoose.model("projects", projectSchema);
