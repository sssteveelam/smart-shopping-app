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
  } catch (err) {
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

    const dish = await Dish.findById(dishId);

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

// @route   PUT /api/dishes/:id
// @desc    Update a dish by ID
// @access  Public
router.put("/:id", async (req, res) => {
  try {
    // Lấy ID và dữ liệu cập nhật từ request
    const dishId = req.params.id;
    const { name, ingredients } = req.body; // Lấy dữ liệu mới từ body
    // Kiểm tra dữ liệu cập nhật cơ bản.
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
    // Tìm và cập nhật món ăn trong database
    // findByIdAndUpdate(ID, dữ liệu_cập_nhật, tùy_chọn)
    const updatedDish = await Dish.findByIdAndUpdate(
      dishId,
      { name, ingredients }, // Dữ liệu mới để cập nhật
      { new: true, runValidators: true } // Tùy chọn: new: true để trả về document sau khi cập nhật, runValidators: true để chạy lại các validation trong Schema (ví dụ unique: true cho tên)
    );

    //Kiểm tra xem có tìm thấy món ăn để cập nhật không
    if (!updatedDish) {
      return res.status(404).json({ msg: "Dish not found" });
    }

    // Gửi response về client với thông tin món ăn đã cập nhật
    res.status(200).json(updatedDish);
  } catch (err) {
    // Xử lý lỗi
    console.error(err.message);

    // Nếu lỗi do validation (ví dụ: tên món ăn bị trùng)
    if (err.code === 11000) {
      return res.status(400).json({ msg: "Dish name already exists." });
    }
    // Nếu lỗi do validation khác hoặc ID không đúng định dạng
    if (err.name === "ValidationError" || err.kind === "ObjectId") {
      return res
        .status(400)
        .json({ msg: err.message || "Invalid Dish ID or data" });
    }

    // Lỗi chung
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /api/dishes/:id
// @desc    Delete a dish by ID
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const dishId = req.params.id;
    const deletedDish = await Dish.findByIdAndDelete(dishId); // Hoặc findByIdAndRemove()
    // 3. Kiểm tra xem có tìm thấy món ăn để xóa không
    if (!deletedDish) {
      return res.status(404).json({ msg: "Dish not found" });
    }

    // 4. Gửi response về client
    // Có thể gửi lại object món ăn đã xóa hoặc chỉ gửi thông báo thành công
    res.status(200).json({ msg: "Dish removed", deletedDish: deletedDish });
    // Hoặc đơn giản hơn: res.status(200).json({ msg: 'Dish removed' });
  } catch (error) {
    // Xử lý lỗi
    console.error(err.message);

    // Nếu ID gửi lên không đúng định dạng ObjectId của MongoDB
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Invalid Dish ID format" });
    }

    // Lỗi chung
    res.status(500).send("Server Error");
  }
});

module.exports = router; // Export router để server.js có thể sử dụng
