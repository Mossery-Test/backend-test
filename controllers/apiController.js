const Collection = require("../models/Collection");
const Item = require("../models/Item");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const collection = await Collection.find().populate({
        path: "itemId",
        select: "_id title price imageUrl releaseDate description",
      });

      res.status(200).json({
        collection,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};
