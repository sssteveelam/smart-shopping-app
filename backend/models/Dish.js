// Món ăn (Dish)
// File: backend/models/Dish.js

const mongoose = require("mongoose");

// Định nghĩa Schema cho món ăn
// Định nghĩa Schema cho món ăn
const dishSchema = new mongoose.Schema(
  {
    // Mongoose tự động thêm trường _id làm khóa chính
    name: {
      // Tên món ăn
      type: String, // Kiểu dữ liệu là chuỗi
      required: true, // Bắt buộc phải có tên
      unique: true, // Tên món ăn không được trùng nhau
    },
    ingredients: {
      // Danh sách nguyên liệu
      type: [String], // Kiểu dữ liệu là một mảng chứa các chuỗi
      required: true, // Món ăn nào cũng phải có ít nhất 1 nguyên liệu
    },
  }, // Tự động thêm createdAt và updatedAt
  { timestamps: true }
);

// Tạo Model từ Schema
const Dish = mongoose.model("Dish", dishSchema);

// Export Model để sử dụng ở nơi khác
module.exports = Dish;
