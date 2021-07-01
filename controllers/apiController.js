const Collection = require("../models/Collection");
const Item = require("../models/Item");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const collection = await Collection.find().populate({
        path: "itemId",
        select: "_id title price imageUrl releaseDate description",
        limit: 4,
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

  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id });

      res.status(200).json({
        item,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  allProduct: async (req, res) => {
    try {
      const item = await Item.find();

      res.status(200).json({
        item,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};
