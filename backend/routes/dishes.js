// File: backend/routes/dishes.js

const express = require("express");
const router = express.Router(); // Tạo một instance của Express Router

const Dish = require("../models/Dish");

// @route   POST /api/dishes
// @desc    Create a new dish
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, ingredients } = req.body;

    if (
      !name ||
      !ingredients ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0
    ) {
      return res.status(400).json({
        msg: "Please provide a name and at least one ingredient for the dish.",
      });
    }

    const newDish = new Dish({
      name,
      ingredients,
    });

    const dish = await newDish.save();

    res.status(201).json(dish);
  } catch (err) {
    console.error(err.message);

    if (err.code === 11000) {
      return res.status(400).json({ msg: "Dish name already exists." });
    }

    // Lỗi chung
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/dishes
// @desc    Get all dishes
// @access  Public
router.get("/", async (req, res) => {
  try {
    const dishes = await Dish.find();

    res.status(200).json(dishes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/dishes/:id
// @desc     Get a single dish by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const dishId = req.params.id;

    const dish = await Dish.findById(dishId);

    if (!dish) {
      return res.status(404).json({ msg: "Dish not found" });
    }

    res.status(200).json(dish);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Invalid Dish ID format" });
    }

    res.status(500).send("Server Error");
  }
});

// @route   PUT /api/dishes/:id
// @desc    Update a dish by ID
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    const dishId = req.params.id;
    const { name, ingredients } = req.body;
    if (
      !name ||
      !ingredients ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0
    ) {
      return res.status(400).json({
        msg: "Please provide name and at least one ingredient for the update.",
      });
    }
    const updatedDish = await Dish.findByIdAndUpdate(
      dishId,
      { name, ingredients },
      { new: true, runValidators: true }
    );

    if (!updatedDish) {
      return res.status(404).json({ msg: "Dish not found" });
    }

    res.status(200).json(updatedDish);
  } catch (err) {
    console.error(err.message);

    if (err.code === 11000) {
      return res.status(400).json({ msg: "Dish name already exists." });
    }
    if (err.name === "ValidationError" || err.kind === "ObjectId") {
      return res
        .status(400)
        .json({ msg: err.message || "Invalid Dish ID or data" });
    }

    res.status(500).send("Server Error");
  }
});

// @route   DELETE /api/dishes/:id
// @desc    Delete a dish by ID
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const dishId = req.params.id;
    const deletedDish = await Dish.findByIdAndDelete(dishId);
    if (!deletedDish) {
      return res.status(404).json({ msg: "Dish not found" });
    }

    res.status(200).json({ msg: "Dish removed", deletedDish: deletedDish });
  } catch (error) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Invalid Dish ID format" });
    }

    res.status(500).send("Server Error");
  }
});

module.exports = router;
