// File: backend/models/WeeklyMenu.js
const mongoose = require("mongoose");

// Định nghĩa Schema cho từng ngày trong tuần
const dailyMenuItemSchema = new mongoose.Schema(
  {
    day: {
      // Tên ngày trong tuần (ví dụ: "Monday", "Tuesday", ...)
      type: String,
      required: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ], // Chỉ cho phép các giá trị này
    },
    dish: {
      // Tham chiếu đến món ăn cho ngày này
      type: mongoose.Schema.Types.ObjectId, // Kiểu dữ liệu là ObjectId
      ref: "Dish", // Tham chiếu đến Model 'Dish'
      required: true, // Mỗi ngày phải chọn một món
    },
    // Có thể thêm trường khác như mealType: String (ví dụ: 'lunch', 'dinner') sau này nếu cần
  }, // Tự động thêm createdAt và updatedAt
  { timestamps: true }
);

// Định nghĩa Schema cho Thực đơn hàng tuần
const weeklyMenuSchema = new mongoose.Schema({
  name: {
    // Tên của thực đơn (ví dụ: "Thực đơn tuần 1 tháng 5") - Tùy chọn, có thể bỏ qua
    type: String,
    unique: true, // Có thể thêm nếu muốn tên thực đơn không trùng
  },
  items: {
    // Danh sách các ngày trong tuần với món ăn tương ứng
    type: [dailyMenuItemSchema], // Là một mảng chứa các đối tượng theo Schema dailyMenuItemSchema
    required: true, // Thực đơn phải có ít nhất 1 ngày được lên món
  },
  // Có thể thêm trường user: mongoose.Schema.Types.ObjectId, ref: 'User' sau này nếu có chức năng user
});

// Tạo Model từ Schema
const WeeklyMenu = mongoose.model("WeeklyMenu", weeklyMenuSchema);

// Export Model
module.exports = WeeklyMenu;

// Template Data
// {
//     "_id": "...",
//     "name": "Thực đơn tuần này",
//     "items": [
//       {
//         "_id": "...", // Mongoose tự thêm _id cho các sub-document trong mảng
//         "day": "Monday",
//         "dish": "...", // Ở đây sẽ lưu ObjectId của món ăn 'Phở Bò'
//         // Khi dùng populate, Mongoose sẽ thay ObjectId này bằng toàn bộ thông tin của món 'Phở Bò'
//       },
//       {
//         "_id": "...",
//         "day": "Tuesday",
//         "dish": "...", // ObjectId của món 'Cơm Gà'
//       }
//       // ... các ngày khác
//     ]
//   }
