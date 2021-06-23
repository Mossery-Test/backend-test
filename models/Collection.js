const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastUpdate: {
    type: String,
    required: true,
  },
  itemId: [
    {
      type: ObjectId,
      ref: "Item",
    },
  ],
});

module.exports = mongoose.model("Collection", collectionSchema);
