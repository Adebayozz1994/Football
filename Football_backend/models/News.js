const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model("News", newsSchema);