const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const collectionSchema = new mongoose.Schema({
  name: {
    type: Date,
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
