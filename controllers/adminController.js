const User = require("../models/User");
const Collection = require("../models/Collection");
const Item = require("../models/Item");

const bcrypt = require("bcrypt");

module.exports = {
  // ANCHOR: Start Handle Login
  viewSignin: (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      if (req.session.user == null || req.session.user == undefined) {
        res.render("index", {
          alert,
          title: "Mossery | Login",
        });
      } else {
        res.redirect("/admin");
      }
    } catch (error) {
      res.redirect("/admin/signin");
    }
  },

  actionSignin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });

      if (!user) {
        req.flash("alertMessage", "User not found!");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        req.flash("alertMessage", "Password not matched!");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      }

      req.session.user = {
        id: user.id,
        username: user.username,
      };

      if (user && isPasswordMatch) {
        res.redirect("/admin/collection");
      }
    } catch (error) {
      console.log(error);
    }
  },
  // ANCHOR: End Handle Login

  // ANCHOR: Start Handle Collection
  viewCollection: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      const user = await User.find();
      const collection = await Collection.find();
      const item = await Item.find();

      res.render("admin/collection/view_collection", {
        title: "Mossery | Collection",
        status: "collection",
        collection,
        item,
        alert,
      });
    } catch (error) {
      console.log(error);
    }
  },

  _addCollection: async (req, res) => {
    try {
      const { name, book } = req.body;
      const date_ob = new Date();
      const year = date_ob.getFullYear();
      const date = date_ob.getDate();
      const month = date_ob.getMonth();
      const format = `${date}-${month}-${year}`;

      const newCollection = {
        name,
        lastUpdate: format,
      };

      const collection = await Collection.create(newCollection);
      if (Array.isArray(book)) {
        for (let i = 0; i < book.length; i++) {
          collection.itemId.push({ _id: book[i] });
        }
      } else {
        collection.itemId.push({ _id: book });
      }
      await collection.save();

      req.flash("alertMessage", "Collection Successfully Added");
      req.flash("alertStatus", "success");
      res.redirect("/admin/collection");
    } catch (error) {
      req.flash("alertMessage", `${error}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/collection");
    }
  },
  get addCollection() {
    return this._addCollection;
  },
  set addCollection(value) {
    this._addCollection = value;
  },

  deleteCollection: async (req, res) => {
    try {
      const { id } = req.params;
      const collection = await Collection.findOne({ _id: id });
      await collection.remove();
      req.flash("alertMessage", "Collection Successfully Deleted");
      req.flash("alertStatus", "success");
      res.redirect("/admin/collection");
    } catch (error) {
      req.flash("alertMessage", `${error}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/collection");
    }
  },
  // ANCHOR: End Handle Collection
};
