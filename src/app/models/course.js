const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const slug = require("mongoose-slug-generator");

const Course = new Schema(
  {
    name: { type: String, maxLength: 255, require: true },
    description: { type: String, maxLength: 600 },
    image: { type: String },
    videoID: { type: String, maxLength: 800, require: true },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);
mongoose.plugin(slug);

Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("Course", Course);
