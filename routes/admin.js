const router = require("express").Router();

const adminControllers = require("../Controllers/adminController");

// ANCHOR: Login
router.get("/", adminControllers.viewSignin);
router.post("/signin", adminControllers.actionSignin);

// ANCHOR: Register

// ANCHOR: Collection
router.get("/collection", adminControllers.viewCollection);
router.post("/collection", adminControllers.addCollection);
router.put("/collection", adminControllers.editCollection);
router.delete("/collection/:id", adminControllers.deleteCollection);

module.exports = router;
