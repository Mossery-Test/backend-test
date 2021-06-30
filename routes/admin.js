const router = require("express").Router();

const adminControllers = require("../controllers/adminController");
const auth = require("../middlewares/auth");
const { verifyToken } = require("../middlewares/authJwt");
const { uploadSingle } = require("../Middlewares/multer");

// ANCHOR: Login
router.get("/", adminControllers.viewSignin);
router.post("/signin", adminControllers.actionSignin);

// ANCHOR: Register
// router.use(auth);

// ANCHOR: Collection
router.get("/collection", adminControllers.viewCollection);
router.post("/collection", adminControllers.addCollection);
router.put("/collection", adminControllers.editCollection);
router.delete("/collection/:id", adminControllers.deleteCollection);

// ANCHOR: Products
router.get("/products", adminControllers.viewProduct);
router.get("/products/add-item", adminControllers.showAdd);
router.get("/products/:id", adminControllers.showEdit);
router.post("/products", uploadSingle, adminControllers.addProduct);
router.put("/products/:id", uploadSingle, adminControllers.editProduct);
router.delete("/products/:id", adminControllers.deleteItem);

module.exports = router;
