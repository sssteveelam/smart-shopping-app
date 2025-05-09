// File: backend/routes/weeklyMenus.js

const express = require("express");
const router = express.Router();

const WeeklyMenu = require("../models/WeeklyMenu");
const Dish = require("../models/Dish");

// @route   POST /api/weekly-menus
// @desc    Create a new weekly menu
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ msg: "Please provide a list of items for the weekly menu." });
    }

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
      if (!item.day || !item.dish) {
        return res
          .status(400)
          .json({ msg: "Each menu item must have a day and a dish ID." });
      }

      if (!validDays.includes(item.day)) {
        return res.status(400).json({
          msg: `Invalid day provided: ${
            item.day
          }. Must be one of ${validDays.join(", ")}.`,
        });
      }

      try {
        const dishExists = await Dish.findById(item.dish);

        if (!dishExists) {
          return res
            .status(400)
            .json({ msg: `Dish with ID ${item.dish} not found.` });
        }
      } catch (dbErr) {
        if (dbErr.kind === "ObjectId") {
          return res
            .status(400)
            .json({ msg: `Invalid Dish ID format for ID: ${item.dish}.` });
        }

        console.error(dbErr.message);
        return res.status(500).send("Server Error during Dish ID validation.");
      }

      menuItemsToSave.push({
        day: item.day,
        dish: item.dish,
      });
    }

    const newWeeklyMenu = new WeeklyMenu({
      name: name || "Weekly Menu",
      items: menuItemsToSave,
    });

    const weeklyMenu = await newWeeklyMenu.save();

    res.status(201).json(weeklyMenu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/weekly-menus/latest
// @desc    Get the latest weekly menu
// @access  Public
router.get("/latest", async (req, res) => {
  try {
    const latestMenu = await WeeklyMenu.findOne()
      .sort({ createdAt: -1 })
      .populate("items.dish");

    if (!latestMenu) {
      return res.status(404).json({
        message: "No weekly menu found",
      });
    }

    res.status(200).json(latestMenu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/weekly-menus/:id
// @desc    Get a single weekly menu by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;

    const weeklyMenu = await WeeklyMenu.findById(menuId).populate("items.dish");

    if (!weeklyMenu) {
      return res.status(404).json({ msg: "Weekly menu not found" });
    }

    res.status(200).json(weeklyMenu);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Invalid Weekly Menu ID format" });
    }

    res.status(500).send("Server Error");
  }
});

// @route   GET /api/weekly-menus/:id/shopping-list
// @desc    Generate shopping list for a weekly menu
// @access  Public
router.get("/:id/shopping-list", async (req, res) => {
  try {
    const menuId = req.params.id;

    const weeklyMenu = await WeeklyMenu.findById(menuId).populate("items.dish");

    if (!weeklyMenu) {
      return res.status(404).json({ msg: "Weekly menu not found" });
    }

    const allIngredients = [];
    for (const item of weeklyMenu.items) {
      if (
        item.dish &&
        item.dish.ingredients &&
        Array.isArray(item.dish.ingredients)
      ) {
        allIngredients.push(...item.dish.ingredients);
      }
    }

    const uniqueIngredients = new Set(allIngredients);

    const shoppingList = Array.from(uniqueIngredients);

    res.status(200).json(shoppingList);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Invalid Weekly Menu ID format" });
    }

    res.status(500).send("Server Error");
  }
});

module.exports = router; // Export router
