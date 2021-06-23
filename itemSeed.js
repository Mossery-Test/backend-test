var seeder = require("mongoose-seed");
var mongoose = require("mongoose");

// Connect to MongoDB via Mongoose
seeder.connect(
  "mongodb://localhost:27017/db-moserry",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  },
  function () {
    // Load Mongoose models
    seeder.loadModels([
      "./models/User",
      "./models/Collection",
      "./models/Item",
    ]);

    // Clear specified collections
    seeder.clearModels(
      [
        "User",
        "Collection",
        "Item",
      ],
      function () {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function () {
          seeder.disconnect();
        });
      }
    );
  }
);

var data = [
  // start category
  {
    model: "Collection",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901111"),
        name: "Featured Books",
        itemId: [
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902222") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902223") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902224") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902225") },
        ],
        lastUpdate: "12-12-2020"
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901112"),
        name: "New Books",
        itemId: [
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902226") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902227") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902228") },
          { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902229") },
        ],
        lastUpdate: "12-12-2020"
      },
    ],
  },
  // end category
  // start item
  {
    model: "Item",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
        title: "Discover Book",
        price: 12,
        imageUrl: null,
        releaseDate: "12-12-2020",
        description:
          "Good Books",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
        title: "History Book",
        price: 12,
        imageUrl: null,
        releaseDate: "12-12-2020",
        description:
          "Good Books",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902224"),
        title: "Diary Book",
        price: 12,
        imageUrl: null,
        releaseDate: "12-12-2020",
        description:
          "Good Books",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902225"),
        title: "Comic Book",
        price: 12,
        imageUrl: null,
        releaseDate: "12-12-2020",
        description:
          "Good Books",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902226"),
        title: "Unknown Book",
        price: 12,
        imageUrl: null,
        releaseDate: "12-12-2020",
        description:
          "Good Books",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902227"),
        title: "Motivation Book",
        price: 12,
        imageUrl: null,
        releaseDate: "12-12-2020",
        description:
          "Good Books",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902228"),
        title: "Business Book",
        price: 12,
        imageUrl: null,
        releaseDate: "12-12-2020",
        description:
          "Good Books",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902229"),
        title: "Sports Book",
        price: 12,
        imageUrl: null,
        releaseDate: "12-12-2020",
        description:
          "Good Books",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902230"),
        title: "New Book",
        price: 12,
        imageUrl: null,
        releaseDate: "12-12-2020",
        description:
          "Good Books",
      },
    ],
  },
  // end item
  {
    model: "User",
    documents: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc903345"),
        username: "admin",
        password: "rahasia",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc903346"),
        username: "superadmin",
        password: "rahasia",
      },
    ],
  },
];
