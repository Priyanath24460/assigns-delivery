const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // ✅ Import CORS
const orderRoutes = require("./routes/orderRoutes"); // Adjust path if needed

dotenv.config();

const app = express();

app.use(cors()); // ✅ Enable CORS for all origins

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use("/api", orderRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
