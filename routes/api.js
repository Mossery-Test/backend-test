const router = require("express").Router();
const apiController = require("../controllers/apiController");

// Method GET
router.get("/landing-page", apiController.landingPage);
router.get("/detail-page/:id", apiController.detailPage);
router.get("/all-product", apiController.allProduct);

module.exports = router;
