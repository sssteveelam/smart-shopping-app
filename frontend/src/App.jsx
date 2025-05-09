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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // *** State cho phần Weekly Menu và Shopping List ***
  const [latestWeeklyMenu, setLatestWeeklyMenu] = useState(null);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [errorMenu, setErrorMenu] = useState(null);

  const [shoppingList, setShoppingList] = useState([]);
  const [loadingShoppingList, setLoadingShoppingList] = useState(false); // State loading cho shopping list
  const [errorShoppingList, setErrorShoppingList] = useState(null); // State lỗi cho shopping list

  // Hàm bất đồng bộ để fetch danh sách món ăn từ backend
  const fetchDishes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/dishes");
      setDishes(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching dishes:", err);
      setError("Failed to fetch dishes.");
      setDishes([]);
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
      if (err.response && err.response.status === 404) {
        setLatestWeeklyMenu(null);
        setErrorMenu(null);
      } else {
        setErrorMenu("Failed to fetch latest weekly menu.");
      }
      setLatestWeeklyMenu(null);
    } finally {
      setLoadingMenu(false);
    }
  };

  // *** Hàm fetch danh sách đi chợ ***
  const fetchShoppingList = async (menuId) => {
    if (!menuId) {
      setShoppingList([]);
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
  }, []);

  // *** useEffect để fetch danh sách đi chợ khi latestWeeklyMenu thay đổi ***
  useEffect(() => {
    if (latestWeeklyMenu && latestWeeklyMenu._id) {
      fetchShoppingList(latestWeeklyMenu._id);
    } else {
      setShoppingList([]);
    }
  }, [latestWeeklyMenu]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-blue-500 text-center text-3xl font-bold my-4">
        Trợ lý Đi chợ Thông minh
      </h1>
      <DishForm onDishAdded={fetchDishes} />
      <WeeklyMenuForm dishes={dishes} onMenuSaved={fetchLatestWeeklyMenu} />
      <WeeklyMenuDisplay
        latestWeeklyMenu={latestWeeklyMenu}
        loading={loadingMenu}
        error={errorMenu}
      />
      <ShoppingListDisplay
        shoppingList={shoppingList}
        loading={loadingShoppingList}
        error={errorShoppingList}
      />
    </div>
  );
}

export default App;
