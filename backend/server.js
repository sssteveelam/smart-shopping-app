// File: backend/server.js

// 1. Import các thư viện cần thiết
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require("cors");

// *** Import router cho món ăn ***
const dishRoutes = require("./routes/dishes");
const weeklyMenuRoutes = require("./routes/weeklyMenus");

// 2. Load các biến môi trường từ file .env
dotenv.config();

// 3. Lấy chuỗi kết nối MongoDB từ biến môi trường
const mongoURI = process.env.MONGO_URI;

// 4. Kiểm tra xem chuỗi kết nối có tồn tại không
if (!mongoURI) {
  console.error("FATAL ERROR: MONGO_URI is not defined in .env file.");
  // Dừng ứng dụng nếu không có chuỗi kết nối
  process.exit(1);
}

// 5. Kết nối đến MongoDB sử dụng Mongoose
// 5. Kết nối đến MongoDB sử dụng Mongoose
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas!")) // Nếu kết nối thành công
  .catch((err) => console.error("Could not connect to MongoDB Atlas...", err)); // Nếu kết nối thất bại

// 6. Khởi tạo ứng dụng Express (tạm thời để test)
const app = express();

// *** Middleware ***
// app.use(express.json()) giúp Express đọc được dữ liệu JSON mà frontend gửi lên trong request body
app.use(express.json());
app.use(cors());

// *** Gắn (mount) router cho món ăn vào đường dẫn /api/dishes ***
// Mọi request đến /api/dishes và các đường dẫn con của nó sẽ được xử lý bởi dishRoutes
app.use("/api/dishes", dishRoutes);
// *** Gắn (mount) router cho thực đơn hàng tuần vào đường dẫn /api/weekly-menus ***
app.use("/api/weekly-menus", weeklyMenuRoutes);

const port = process.env.PORT || 5000; // Cổng cho backend, lấy từ .env hoặc dùng 5000
app.listen(port, () => console.log(`Server is running on port ${port}`));
