// File: backend/routes/weeklyMenus.js

const express = require("express");
const router = express.Router();

// *** Import các Models cần thiết ***
const WeeklyMenu = require("../models/WeeklyMenu");
const Dish = require("../models/Dish");

// @route   POST /api/weekly-menus
// @desc    Create a new weekly menu
// @access  Public
router.post("/", async (req, res) => {
  try {
    // 1. Lấy dữ liệu thực đơn từ request body
    // Dữ liệu gửi lên sẽ có dạng { name: 'Tên thực đơn', items: [{ day: 'Monday', dish: 'ID_mon_an_1' }, ...] }
    const { name, items } = req.body;

    // 2. Kiểm tra dữ liệu cơ bản.
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ msg: "Please provide a list of items for the weekly menu." });
    }

    // 3. Kiểm tra tính hợp lệ của từng mục trong danh sách (items).
    const validDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const menuItemsToSave = [];

    for (const item of items) {
      // Kiểm tra mỗi item có đủ trường day và dish không
      if (!item.day || !item.dish) {
        return res
          .status(400)
          .json({ msg: "Each menu item must have a day and a dish ID." });
      }

      // Kiểm tra tên ngày có hợp lệ không.
      if (!validDays.includes(item.day)) {
        return res.status(400).json({
          msg: `Invalid day provided: ${
            item.day
          }. Must be one of ${validDays.join(", ")}.`,
        });
      }

      // *** Quan trọng: Kiểm tra ID món ăn có tồn tại trong database không ***
      try {
        const dishExists = await Dish.findById(item.dish);

        if (!dishExists) {
          return res
            .status(400)
            .json({ msg: `Dish with ID ${item.dish} not found.` });
        }
      } catch (dbErr) {
        // Bắt lỗi nếu ID món ăn không đúng định dạng ObjectId
        if (dbErr.kind === "ObjectId") {
          return res
            .status(400)
            .json({ msg: `Invalid Dish ID format for ID: ${item.dish}.` });
        }

        // Lỗi database khác
        console.error(dbErr.message);
        return res.status(500).send("Server Error during Dish ID validation.");
      }

      // Nếu item hợp lệ, thêm vào danh sách để lưu
      menuItemsToSave.push({
        day: item.day,
        dish: item.dish,
      });
    } // Kết thúc vòng lặp kiểm tra items

    // 4. Tạo một instance mới của Model WeeklyMenu
    const newWeeklyMenu = new WeeklyMenu({
      name: name || "Weekly Menu",
      items: menuItemsToSave,
    });

    // Lưu thực đơn mới vào database
    const weeklyMenu = await newWeeklyMenu.save();

    // Gửi response về cho client
    res.status(201).json(weeklyMenu);
  } catch (err) {
    // Xử lý lỗi chung (ví dụ: lỗi database khi lưu)
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router; // Export router
