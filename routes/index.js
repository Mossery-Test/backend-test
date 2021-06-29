const adminControllers = require("../controllers/adminController");
const auth = require("../middlewares/auth");

const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", adminControllers.viewSignin);
router.post("/signin", adminControllers.actionSignin);
module.exports = router;
