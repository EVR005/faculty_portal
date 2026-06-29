const express = require("express");
const publicRouter = express.Router();
const publicService = require("../controllers/PublicController");

publicRouter.get("/health", publicService.checkHealth);

module.exports = { publicRouter };
