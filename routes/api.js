const router = require("express").Router();
const apiController = require("../controllers/apiController");

// Method GET
router.get("/landing-page", apiController.landingPage);

module.exports = router;
