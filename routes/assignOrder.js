const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// Assign selected order to driver
router.post("/assign-order", async (req, res) => {
  try {
    const { orderId, driverId } = req.body;

    if (!orderId || !driverId) {
      return res.status(400).json({ message: "Order ID and Driver ID required" });
    }

    // Fetch order details
    const { data: order } = await axios.get(`${process.env.ORDER_SERVICE_URL}/orders/${orderId}`);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update driver status to "Assigned"
    await axios.put(`${process.env.DRIVER_SERVICE_URL}/drivers/update/${driverId}`, {
      status: "Assigned"
    });

    // Assign the order to the driver
    await axios.put(`${process.env.ORDER_SERVICE_URL}/orders/update/${orderId}`, {
      driverId,
      status: "Assigned"
    });

    res.json({ message: "Order assigned to driver", driverId, orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
