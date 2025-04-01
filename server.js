const express = require("express");
const cors = require("cors");
require("dotenv").config();

const getNearbyOrders = require("./routes/getNearbyOrders");
const assignOrder = require("./routes/assignOrder");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", getNearbyOrders);
app.use("/api", assignOrder);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Driver Assignment Service running on port ${PORT}`);
});
