// File: backend/routes/dishes.js

const express = require("express");
const router = express.Router(); // Tạo một instance của Express Router

const Dish = require("../models/Dish");

// @route   POST /api/dishes
// @desc    Create a new dish
// @access  Public
router.post("/", async (req, res) => {
  try {
    // 1. Lấy dữ liệu món ăn từ request body
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
      name, // tương đương name: name
      ingredients, // tương đương ingredients: ingredients
    });

    const dish = await newDish.save(); // save() là thao tác bất đồng bộ, dùng await

    res.status(201).json(dish);
  } catch (err) {
    // Xử lý lỗi
    console.error(err.message);

    // Nếu lỗi do validation (ví dụ: tên món ăn bị trùng do unique: true)
    if (err.code === 11000) {
      // Mã lỗi 11000 là lỗi duplicate key trong MongoDB
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
    // find({}) nghĩa là tìm tất cả, không có điều kiện lọc nào
    const dishes = await Dish.find();

    res.status(200).json(dishes);
  } catch (error) {
    // Xử lý lỗi
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/dishes/:id
// @desc     Get a single dish by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    // Lấy ID của món ăn từ URL parameters
    const dishId = req.params.id;

    if (!dish) {
      return res.status(404).json({ msg: "Dish not found" }); // Status 404 Not Found
    }

    res.status(200).json(dish); // Status 200 OK
  } catch (err) {
    // Xử lý lỗi
    console.error(err.message);

    // Nếu ID gửi lên không đúng định dạng ObjectId của MongoDB
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Invalid Dish ID format" }); // Status 400 Bad Request
    }

    // Lỗi chung
    res.status(500).send("Server Error");
  }
});

module.exports = router; // Export router để server.js có thể sử dụng
