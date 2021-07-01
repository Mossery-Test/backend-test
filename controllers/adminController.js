const User = require("../models/User");
const Collection = require("../models/Collection");
const Item = require("../models/Item");
const AWS = require("../config/aws-s3-bucket");

const fs = require("fs-extra");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

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
        let token = jwt.sign(
          { id: user._id, username: user.username },
          config.secret
        );
        res.cookie("token", token);
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

  addCollection: async (req, res) => {
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

  editCollection: async (req, res) => {
    try {
      const { id, name, editBooks } = req.body;
      const collection = await Collection.findOne({ _id: id });
      const totalBooks = collection.itemId;
      totalBooks.splice(0, totalBooks.length);

      if (Array.isArray(editBooks)) {
        for (let i = 0; i < editBooks.length; i++) {
          collection.itemId.push({ _id: editBooks[i] });
        }
      } else {
        collection.itemId.push({ _id: editBooks });
      }

      collection.name = name;
      await collection.save();

      req.flash("alertMessage", "Collection Successfully Edited");
      req.flash("alertStatus", "success");
      res.redirect("/admin/collection");
    } catch (error) {
      req.flash("alertMessage", `${error}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/collection");
    }
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

  // ANCHOR: Start Handle Products
  viewProduct: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      const product = await Item.find();
      const item = await Item.find();

      res.render("admin/product/view_product", {
        title: "Mossery | Product",
        status: "products",
        action: "view",
        product,
        item,
        alert,
      });
    } catch (error) {
      console.log(error);
    }
  },

  showAdd: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      const product = await Item.find();
      const item = await Item.find();

      res.render("admin/product/view_product", {
        title: "Mossery | Product",
        status: "products",
        action: "add",
        product,
        item,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/products");
    }
  },

  addProduct: async (req, res) => {
    try {
      const { title, price, releaseDate, description } = req.body;

      if (req.file) {
        const newItem = {
          title,
          price,
          imageUrl: `Items/${req.file.filename}`,
          releaseDate,
          description,
        };

        let file = req.file;

        const path = file.path;
        const params = {
          ACL: "public-read",
          Bucket: `server-gaming-house`,
          Body: fs.createReadStream(path),
          Key: `Items/${file.filename}`,
        };

        const item = await Item.create(newItem);
        AWS.uploadItems(params, item);

        await item.save();
      } else {
        const newItem = {
          title,
          price,
          imageUrl: "null",
          releaseDate,
          description,
        };

        const item = await Item.create(newItem);
        await item.save();
      }

      req.flash("alertMessage", "Collection Successfully Added");
      req.flash("alertStatus", "success");
      res.redirect("/admin/products");
    } catch (error) {
      req.flash("alertMessage", `${error}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/products");
    }
  },

  showEdit: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      const { id } = req.params;
      const product = await Item.findOne({ _id: id });

      res.render("admin/product/view_product", {
        title: "Mossery | Product",
        status: "products",
        action: "edit",
        product,
        alert,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/products");
    }
  },

  editProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, price, releaseDate, description } = req.body;
      const item = await Item.findOne({ _id: id });

      if (req.file) {
        item.title = title;
        item.price = price;
        item.releaseDate = releaseDate;
        item.description = description;

        let file = req.file;

        const path = file.path;
        const params = {
          ACL: "public-read",
          Bucket: `server-gaming-house`,
          Body: fs.createReadStream(path),
          Key: `Items/${file.filename}`,
        };

        AWS.uploadItems(params, item);
        item.save();
      } else {
        item.title = title;
        item.price = price;
        item.releaseDate = releaseDate;
        item.description = description;

        item.save();
      }
      req.flash("alertMessage", "Collection Successfully Added");
      req.flash("alertStatus", "success");
      res.redirect("/admin/products");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/products");
    }
  },

  deleteItem: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id });
      await item.remove();
      req.flash("alertMessage", "Item Successfully Deleted");
      req.flash("alertStatus", "success");
      res.redirect("/admin/products");
    } catch (error) {
      req.flash("alertMessage", `${error}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/products");
    }
  },
  // ANCHOR: End Handle Collection
};
