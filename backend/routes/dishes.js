// File: backend/server.js

// 1. Import các thư viện cần thiết
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// *** Import router cho món ăn ***
const dishRoutes = require("./routes/dishes");
