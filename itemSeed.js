var seeder = require("mongoose-seed");
var mongoose = require("mongoose");

// Connect to MongoDB via Mongoose
seeder.connect(
  "mongodb://Lukuzushiki:test@cluster0-shard-00-00.epd1c.mongodb.net:27017,cluster0-shard-00-01.epd1c.mongodb.net:27017,cluster0-shard-00-02.epd1c.mongodb.net:27017/db_mossery?ssl=true&replicaSet=atlas-6e5dri-shard-0&authSource=admin&retryWrites=true&w=majority",
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
    seeder.clearModels(["User", "Collection", "Item"], function () {
      // Callback to populate DB once collections have been cleared
      seeder.populateModels(data, function () {
        seeder.disconnect();
      });
    });
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
        lastUpdate: "12-12-2020",
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
        lastUpdate: "12-12-2020",
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
        imageUrl: "images/items/book1.jpg",
        releaseDate: "12-12-2020",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat sollicitudin diam sed placerat. Cras sagittis suscipit auctor. Vivamus vel interdum nulla. Cras placerat neque vel dapibus placerat. Suspendisse blandit tellus ligula, a consequat lacus iaculis tristique. Proin sed condimentum elit. Curabitur aliquam lacus vel neque semper, eu convallis ipsum molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque vulputate ex sem, eget cursus tortor consectetur eu.",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
        title: "History Book",
        price: 12,
        imageUrl: "images/items/book2.jpg",
        releaseDate: "12-12-2020",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat sollicitudin diam sed placerat. Cras sagittis suscipit auctor. Vivamus vel interdum nulla. Cras placerat neque vel dapibus placerat. Suspendisse blandit tellus ligula, a consequat lacus iaculis tristique. Proin sed condimentum elit. Curabitur aliquam lacus vel neque semper, eu convallis ipsum molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque vulputate ex sem, eget cursus tortor consectetur eu.",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902224"),
        title: "Diary Book",
        price: 12,
        imageUrl: "images/items/book3.jpg",
        releaseDate: "12-12-2020",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat sollicitudin diam sed placerat. Cras sagittis suscipit auctor. Vivamus vel interdum nulla. Cras placerat neque vel dapibus placerat. Suspendisse blandit tellus ligula, a consequat lacus iaculis tristique. Proin sed condimentum elit. Curabitur aliquam lacus vel neque semper, eu convallis ipsum molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque vulputate ex sem, eget cursus tortor consectetur eu.",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902225"),
        title: "Comic Book",
        price: 12,
        imageUrl: "images/items/book4.jpg",
        releaseDate: "12-12-2020",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat sollicitudin diam sed placerat. Cras sagittis suscipit auctor. Vivamus vel interdum nulla. Cras placerat neque vel dapibus placerat. Suspendisse blandit tellus ligula, a consequat lacus iaculis tristique. Proin sed condimentum elit. Curabitur aliquam lacus vel neque semper, eu convallis ipsum molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque vulputate ex sem, eget cursus tortor consectetur eu.",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902226"),
        title: "Unknown Book",
        price: 12,
        imageUrl: "images/items/book5.jpg",
        releaseDate: "12-12-2020",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat sollicitudin diam sed placerat. Cras sagittis suscipit auctor. Vivamus vel interdum nulla. Cras placerat neque vel dapibus placerat. Suspendisse blandit tellus ligula, a consequat lacus iaculis tristique. Proin sed condimentum elit. Curabitur aliquam lacus vel neque semper, eu convallis ipsum molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque vulputate ex sem, eget cursus tortor consectetur eu.",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902227"),
        title: "Motivation Book",
        price: 12,
        imageUrl: "images/items/book6.jpg",
        releaseDate: "12-12-2020",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat sollicitudin diam sed placerat. Cras sagittis suscipit auctor. Vivamus vel interdum nulla. Cras placerat neque vel dapibus placerat. Suspendisse blandit tellus ligula, a consequat lacus iaculis tristique. Proin sed condimentum elit. Curabitur aliquam lacus vel neque semper, eu convallis ipsum molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque vulputate ex sem, eget cursus tortor consectetur eu.",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902228"),
        title: "Business Book",
        price: 12,
        imageUrl: "images/items/book7.jpg",
        releaseDate: "12-12-2020",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat sollicitudin diam sed placerat. Cras sagittis suscipit auctor. Vivamus vel interdum nulla. Cras placerat neque vel dapibus placerat. Suspendisse blandit tellus ligula, a consequat lacus iaculis tristique. Proin sed condimentum elit. Curabitur aliquam lacus vel neque semper, eu convallis ipsum molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque vulputate ex sem, eget cursus tortor consectetur eu.",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902229"),
        title: "Sports Book",
        price: 12,
        imageUrl: "images/items/book8.jpg",
        releaseDate: "12-12-2020",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat sollicitudin diam sed placerat. Cras sagittis suscipit auctor. Vivamus vel interdum nulla. Cras placerat neque vel dapibus placerat. Suspendisse blandit tellus ligula, a consequat lacus iaculis tristique. Proin sed condimentum elit. Curabitur aliquam lacus vel neque semper, eu convallis ipsum molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque vulputate ex sem, eget cursus tortor consectetur eu.",
      },
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902230"),
        title: "New Book",
        price: 12,
        imageUrl: "images/items/book9.jpg",
        releaseDate: "12-12-2020",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat sollicitudin diam sed placerat. Cras sagittis suscipit auctor. Vivamus vel interdum nulla. Cras placerat neque vel dapibus placerat. Suspendisse blandit tellus ligula, a consequat lacus iaculis tristique. Proin sed condimentum elit. Curabitur aliquam lacus vel neque semper, eu convallis ipsum molestie. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque vulputate ex sem, eget cursus tortor consectetur eu.",
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
