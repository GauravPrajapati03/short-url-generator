const express = require("express");
const router = express.Router();
const {handleGenerateNewShortUrl , handleViewUrl, handleAnalytics, handleDeleteUrl} = require("../controllers/url");

router.post("/", handleGenerateNewShortUrl);

router.get("/:shortId", handleViewUrl);

router.get("/analytics/:shortId", handleAnalytics);

router.delete("/:shortId", handleDeleteUrl)


module.exports = router;