const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// Function to calculate distance (Haversine approximation)
function calculateDistance(loc1, loc2) {
  return Math.sqrt(
    Math.pow(loc1.lat - loc2.lat, 2) + Math.pow(loc1.lng - loc2.lng, 2)
  );
}

// Get nearby orders for a driver
router.post("/get-nearby-orders", async (req, res) => {
  try {
    const { driverId, driverLocation } = req.body;

    if (!driverId || !driverLocation) {
      return res.status(400).json({ message: "Driver ID and location required" });
    }

    // Fetch all available orders from Order Service
    const { data: orders } = await axios.get(`${process.env.ORDER_SERVICE_URL}/orders/available`);

    if (!orders || orders.length === 0) {
      return res.json({ message: "No available orders" });
    }

    // Sort orders by distance from driver
    const nearbyOrders = orders
      .map(order => ({
        ...order,
        distance: calculateDistance(driverLocation, order.restaurantLocation)
      }))
      .sort((a, b) => a.distance - b.distance);

    res.json({ orders: nearbyOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
