const express = require("express");
const publicRouter = express.Router();
const publicService = require("../controllers/PublicController");

// router.post('/editDetails',faculty.)
publicRouter.get("/get", publicService.checkHealth);

module.exports = { publicRouter };
