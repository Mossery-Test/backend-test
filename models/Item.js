const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const itemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
    set: (date) => formatDate(date),
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Item", itemSchema);
