const express = require("express");
const { getAcceptedOrders } = require("../controllers/GetNearbyOrders");

const router = express.Router();

// Route to get accepted orders
router.post("/get-nearby-orders", getAcceptedOrders);

module.exports = router;
