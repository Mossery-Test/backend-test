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

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  itemId: [
    {
      type: ObjectId,
      ref: "Item",
    },
  ],
  lastUpdate: {
    type: String,
    required: true,
    set: (date) => formatDate(date),
  },
});

module.exports = mongoose.model("Collection", collectionSchema);
