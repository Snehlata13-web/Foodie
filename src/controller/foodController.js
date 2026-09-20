const { foodMatch } = require("../services/foodServices.js");
const express = require("express");

async function foodMatchHandler(req, res) {
    try {
        await foodMatch(req, res);
    } catch (error) {
        console.error("Error in foodMatchHandler:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { foodMatchHandler };
