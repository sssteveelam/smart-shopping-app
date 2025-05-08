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

// @route   GET /api/weekly-menus/latest
// @desc    Get the latest weekly menu
// @access  Public
router.get("/latest", async (req, res) => {
  try {
    // 1. Tìm thực đơn gần nhất
    // findOne(): tìm một document
    // sort({ createdAt: -1 }): sắp xếp giảm dần theo thời gian tạo (mới nhất lên đầu)
    const latestMenu = await WeeklyMenu.findOne()
      .sort({ createdAt: -1 }) // Sắp xếp để lấy cái mới nhất
      .populate("items.dish"); // *** Dùng populate để lấy thông tin chi tiết món ăn ***

    // 2. Kiểm tra xem có thực đơn nào tồn tại không.
    if (!latestMenu) {
      return res.status(404).json({
        message: "No weekly menu found",
      });
    }

    // 3. Gửi response về client
    res.status(200).json(latestMenu);
  } catch (err) {
    // Xử lý lỗi
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/weekly-menus/:id
// @desc    Get a single weekly menu by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    // Lấy ID thực đơn từ URL parameters
    const menuId = req.params.id;

    // Tìm thực đơn theo ID và dùng populate.
    // *** Dùng populate để lấy thông tin chi tiết món ăn ***
    const weeklyMenu = await WeeklyMenu.findById(menuId).populate("items.dish");

    // Kiểm tra xem có tìm thấy thực đơn không.
    if (!weeklyMenu) {
      return res.status(404).json({ msg: "Weekly menu not found" });
    }

    // 4. Gửi response về client
    res.status(200).json(weeklyMenu);
  } catch (err) {
    // Xử lý lỗi
    console.error(err.message);

    // Nếu ID gửi lên không đúng định dạng ObjectId
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Invalid Weekly Menu ID format" });
    }

    // Lỗi chung
    res.status(500).send("Server Error");
  }
});

module.exports = router; // Export router
