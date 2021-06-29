const router = require("express").Router();

const adminControllers = require("../controllers/adminController");
const auth = require("../middlewares/auth");
const {verifyToken} = require("../middlewares/authJwt")

// ANCHOR: Login
router.get("/", adminControllers.viewSignin);
router.post("/signin", adminControllers.actionSignin);

// ANCHOR: Register
router.use(auth);

// ANCHOR: Collection
router.get("/collection",  adminControllers.viewCollection);
router.post("/collection", adminControllers.addCollection);
router.put("/collection", adminControllers.editCollection);
router.delete("/collection/:id", adminControllers.deleteCollection);

module.exports = router;
