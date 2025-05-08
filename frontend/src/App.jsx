import React, { useEffect, useState } from "react";
// *** Import hai components mới tạo ***
import DishList from "./components/DishList";
import DishForm from "./components/DishForm";
import axios from "axios"; // Import axios

function App() {
  // State để lưu danh sách món ăn
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true); // State để báo hiệu đang tải dữ liệu
  const [error, setError] = useState(null); // State để lưu lỗi nếu có

  // Hàm bất đồng bộ để fetch danh sách món ăn từ backend
  const fetchDishes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/dishes");
      setDishes(response.data); // Cập nhật state dishes với dữ liệu nhận được
      setError(null);
    } catch (err) {
      console.error("Error fetching dishes:", err);
      setError("Failed to fetch dishes."); // Lưu thông báo lỗi
      setDishes([]); // Xóa danh sách món ăn nếu fetch lỗi
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  return (
    <div className="App">
      <h1>Trợ lý Đi chợ Thông minh</h1>
      {/* Truyền hàm fetchDishes xuống DishForm để gọi sau khi thêm món thành công */}
      <DishForm onDishAdded={fetchDishes} />
      {/* Truyền danh sách món ăn xuống DishList */}
      {loading && <p>Đang tải danh sách món ăn...</p>}
      {error && <p style={{ color: "red" }}>Lỗi: {error}</p>}
      {!loading && !error && <DishList dishes={dishes} />}{" "}
      {/* Chỉ render DishList khi không loading và không lỗi */}
      {/* Có thể thêm các phần khác của giao diện sau này */}
    </div>
  );
}

export default App;
