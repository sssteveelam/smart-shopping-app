// File: backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require("cors");

// *** Import router cho món ăn ***
const dishRoutes = require("./routes/dishes");
const weeklyMenuRoutes = require("./routes/weeklyMenus");

dotenv.config();

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("FATAL ERROR: MONGO_URI is not defined in .env file.");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch((err) => console.error("Could not connect to MongoDB Atlas...", err));

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/dishes", dishRoutes);
app.use("/api/weekly-menus", weeklyMenuRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
