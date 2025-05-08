import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
// *** Import hai components mới tạo ***
import DishList from "./components/DishList";
import DishForm from "./components/DishForm";

// *** Import ba components mới tạo ***
import WeeklyMenuDisplay from "./components/WeeklyMenuDisplay";
import WeeklyMenuForm from "./components/WeeklyMenuForm";
import ShoppingListDisplay from "./components/ShoppingListDisplay";

function App() {
  // State để lưu danh sách món ăn
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true); // State để báo hiệu đang tải dữ liệu
  const [error, setError] = useState(null); // State để lưu lỗi nếu có

  // *** State cho phần Weekly Menu và Shopping List ***
  const [latestWeeklyMenu, setLatestWeeklyMenu] = useState(null);
  const [loadingMenu, setLoadingMenu] = useState(true); // State loading cho menu
  const [errorMenu, setErrorMenu] = useState(null); // State lỗi cho menu

  const [shoppingList, setShoppingList] = useState([]);
  const [loadingShoppingList, setLoadingShoppingList] = useState(false); // State loading cho shopping list
  const [errorShoppingList, setErrorShoppingList] = useState(null); // State lỗi cho shopping list

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

  // *** Hàm fetch thực đơn gần nhất ***
  const fetchLatestWeeklyMenu = async () => {
    try {
      setLoadingMenu(true);
      setErrorMenu(null);

      const response = await axios.get(
        "http://localhost:5000/api/weekly-menus/latest"
      );

      setLatestWeeklyMenu(response.data);
    } catch (err) {
      console.error("Error fetching latest weekly menu:", err);
      // Backend trả về 404 nếu chưa có menu nào, không phải lỗi thật sự
      if (err.response && err.response.status === 404) {
        setLatestWeeklyMenu(null); // Chưa có menu nào
        setErrorMenu(null); // Không coi là lỗi
      } else {
        setErrorMenu("Failed to fetch latest weekly menu."); // Lỗi khác
      }
      setLatestWeeklyMenu(null); // Đảm bảo state là null nếu có lỗi hoặc 404
    } finally {
      setLoadingMenu(false);
    }
  };

  // *** Hàm fetch danh sách đi chợ ***
  const fetchShoppingList = async (menuId) => {
    if (!menuId) {
      setShoppingList([]); // Nếu không có ID menu thì danh sách rỗng
      setLoadingShoppingList(false);
      setErrorShoppingList(null);
      return;
    }

    try {
      setLoadingShoppingList(true);
      setErrorShoppingList(null);

      const response = await axios.get(
        `http://localhost:5000/api/weekly-menus/${menuId}/shopping-list`
      );
      setShoppingList(response.data);
    } catch (err) {
      console.error(`Error fetching shopping list for menu ${menuId}:`, err);
      setErrorShoppingList("Failed to generate shopping list.");
      setShoppingList([]);
    } finally {
      setLoadingShoppingList(false);
    }
  };

  // useEffect để fetch danh sách món ăn khi App mount (giữ nguyên)
  useEffect(() => {
    fetchDishes();
  }, []);

  // *** useEffect để fetch thực đơn gần nhất khi App mount ***
  useEffect(() => {
    fetchLatestWeeklyMenu();
  }, []); // Chạy MỘT LẦN khi App mount

  // *** useEffect để fetch danh sách đi chợ khi latestWeeklyMenu thay đổi ***
  useEffect(() => {
    if (latestWeeklyMenu && latestWeeklyMenu._id) {
      // Nếu có thực đơn và có ID, thì fetch danh sách đi chợ
      fetchShoppingList(latestWeeklyMenu._id);
    } else {
      // Nếu không có thực đơn, reset danh sách đi chợ
      setShoppingList([]);
    }
  }, [latestWeeklyMenu]);

  return (
    <div className="container mx-auto px-4 py-8">
      {" "}
      {/* Thêm class Tailwind cho container chính */}
      <h1 className="text-blue-500 text-center text-3xl font-bold my-4">
        Trợ lý Đi chợ Thông minh
      </h1>
      {/* Hiển thị Component form thêm món ăn */}
      <DishForm onDishAdded={fetchDishes} /> {/* Vẫn truyền hàm fetchDishes */}
      {/* Hiển thị Component form lên lịch thực đơn */}
      {/* onMenuSaved={fetchLatestWeeklyMenu} (sẽ thêm prop này sau) */}
      {/* Truyền danh sách món ăn xuống form để chọn */}
      <WeeklyMenuForm dishes={dishes} onMenuSaved={fetchLatestWeeklyMenu} />
      {/* Hiển thị Component thực đơn đã lưu */}
      <WeeklyMenuDisplay
        latestWeeklyMenu={latestWeeklyMenu}
        loading={loadingMenu}
        error={errorMenu}
      />
      {/* Hiển thị Component danh sách đi chợ */}
      <ShoppingListDisplay
        shoppingList={shoppingList}
        loading={loadingShoppingList}
        error={errorShoppingList}
      />
    </div>
  );
}

export default App;
