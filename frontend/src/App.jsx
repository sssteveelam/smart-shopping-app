import React, { useEffect, useState } from "react";
// *** Import hai components mới tạo ***
import DishList from "./components/DishList";
import DishForm from "./components/DishForm";
import axios from "axios"; // Import axios

// *** Import ba components mới tạo ***
import WeeklyMenuDisplay from "./components/WeeklyMenuDisplay";
import WeeklyMenuForm from "./components/WeeklyMenuForm";
import ShoppingListDisplay from "./components/ShoppingListDisplay";

function App() {
  // State để lưu danh sách món ăn
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true); // State để báo hiệu đang tải dữ liệu
  const [error, setError] = useState(null); // State để lưu lỗi nếu có
  // *** Thêm state cho phần Weekly Menu và Shopping List nếu cần (sẽ thêm sau) ***
  // const [weeklyMenu, setWeeklyMenu] = useState(null);
  // const [shoppingList, setShoppingList] = useState([]);

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
      <h1 className="text-blue-500 text-center text-3xl font-bold my-4">
        Trợ lý Đi chợ Thông minh
      </h1>
      {/* Hiển thị Component form thêm món ăn */}
      {/* onDishAdded={fetchDishes} vẫn giữ nguyên để tự cập nhật danh sách món ăn */}
      <DishForm onDishAdded={fetchDishes} />
      {/* Hiển thị Component danh sách món ăn */}
      {/* Truyền state dishes xuống DishList */}
      {/* Các dòng loading/error cho DishList vẫn giữ nguyên */}
      {loading && (
        <p className="text-center">Đang tải danh sách món ăn...</p>
      )}{" "}
      {/* Thêm class Tailwind */}
      {error && <p className="text-center text-red-500">Lỗi: {error}</p>}{" "}
      {/* Thêm class Tailwind */}
      {!loading && !error && <DishList dishes={dishes} />}
      {/* *** Hiển thị các Components mới cho phần Thực đơn và Danh sách đi chợ *** */}
      {/* Hiện tại chỉ hiển thị khung sườn */}
      <WeeklyMenuForm /> {/* Form lên lịch thực đơn */}
      <WeeklyMenuDisplay /> {/* Hiển thị thực đơn đã lưu */}
      <ShoppingListDisplay /> {/* Hiển thị danh sách đi chợ */}
    </div>
  );
}

export default App;
