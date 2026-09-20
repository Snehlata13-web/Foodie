const foodController = require("../controller/foodController.js");
const express = require("express");

const router = express.Router();

router.post("/food-match", foodController.foodMatchHandler);

module.exports = router; 