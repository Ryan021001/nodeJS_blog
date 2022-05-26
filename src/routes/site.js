const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteControllers");

// router.use("/:slug", newsController.show);
router.get("/search", siteController.search);

router.get("/", siteController.index);

module.exports = router;
