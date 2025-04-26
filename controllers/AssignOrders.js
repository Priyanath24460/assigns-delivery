// controllers/AssignOrders.js
const AssignedOrder = require("../models/AssignedOrder");

const assignOrder = async (req, res) => {
  try {
    const {
      orderId,
      driverName,
      driverId,
      latitude,
      longitude,
      vehicleNumber,
      contactNumber,
    } = req.body;

    const newAssignment = new AssignedOrder({
      orderId,
      driverName,
      driverId,
      driverLocation: {
        latitude,
        longitude,
      },
      vehicleNumber,
      contactNumber,
    });

    await newAssignment.save();

    res.status(201).json({ message: "Order assigned successfully", assignment: newAssignment });
  } catch (error) {
    console.error("Error assigning order:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  assignOrder,
};
