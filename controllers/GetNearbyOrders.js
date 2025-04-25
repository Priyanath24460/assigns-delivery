const axios = require("axios");

// Controller function to get accepted orders
const getAcceptedOrders = async (req, res) => {
  try {
    // Get all orders
    const { data: orders } = await axios.get("https://ordermanagementservice.onrender.com/api/orders");

    // Filter only accepted orders
    const acceptedOrders = orders.filter(order => order.status === "Accepted");

    if (acceptedOrders.length === 0) {
      return res.json({ message: "No accepted orders" });
    }

    // Send filtered orders to frontend
    res.json({ orders: acceptedOrders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAcceptedOrders,
};
