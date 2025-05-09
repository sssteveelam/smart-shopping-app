// File: frontend/src/components/WeeklyMenuForm.jsx
import React, { useState, useEffect } from "react"; // Thêm useEffect
import axios from "axios";

// Component nhận danh sách món ăn (để hiển thị lựa chọn) và hàm lưu menu thành công qua props
function WeeklyMenuForm({ dishes, onMenuSaved }) {
  // Nhận props dishes và onMenuSaved
  const [menuName, setMenuName] = useState("");
  // State để lưu lựa chọn món ăn cho từng ngày. Dùng object { day: dishId }
  // Khởi tạo với các ngày trong tuần và giá trị ban đầu là rỗng (chưa chọn)
  const [weeklySelections, setWeeklySelections] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // State để hiển thị thông báo thành công

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Khởi tạo state weeklySelections khi component mount hoặc danh sách món ăn thay đổi
  // để đảm bảo các ngày trong tuần đều có trong state
  useEffect(() => {
    const initialSelections = {};
    daysOfWeek.forEach((day) => {
      // Nếu ngày đã có trong state cũ (khi update form) thì giữ lại, không thì set rỗng
      initialSelections[day] = weeklySelections[day] || "";
    });

    // :-------- | :-------- | :------------------------------------------------------ | :--------------------------------------------------------- | :------------------------------------------- |
    // | 1         | 'Monday' | weeklySelections['Monday'] là 'dish_id_abc'       | 'dish_id_abc' || "" => 'dish_id_abc'                   | { Monday: 'dish_id_abc' }                  |
    // | 2         | 'Tuesday'| weeklySelections['Tuesday'] là '' (chuỗi rỗng)      | '' || ""          => ""                                 | { Monday: 'dish_id_abc', Tuesday: "" }     |
    // | 3         | 'Wednesday'| weeklySelections['Wednesday'] là undefined        | undefined || ""  => ""                                 | { Monday: 'dish_id_abc', Tuesday: "", Wednesday: "" } |
    // { Monday: "", Tuesday: "", Wednesday: "" }
    setWeeklySelections(initialSelections);
  }, [daysOfWeek]);

  // Hàm xử lý khi người dùng chọn món ăn cho một ngày
  const handleDishSelect = (day, dishId) => {
    setWeeklySelections({
      ...weeklySelections, // Giữ lại các lựa chọn của các ngày khác
      [day]: dishId, // Cập nhật lựa chọn cho ngày hiện tại
    });
  };

  // Hàm xử lý khi người dùng nhấn nút Lưu Thực đơn
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null); // Reset lỗi
    setSuccessMessage(null); // Reset thông báo thành công

    // Lọc ra các mục (ngày + món ăn) mà người dùng đã chọn món
    const selectedItems = daysOfWeek
      .map((day) => ({ day, dish: weeklySelections[day] })) // Tạo object { day, dishId } cho mỗi ngày
      .filter((item) => item.dish); // Lọc bỏ những ngày chưa chọn món (dishId rỗng)

    // Kiểm tra xem người dùng đã chọn ít nhất một món cho một ngày nào đó chưa
    if (selectedItems.length === 0) {
      setError("Please select at least one dish for the week.");
      return;
    }

    // Tạo object dữ liệu thực đơn để gửi lên backend
    const menuData = {
      name: menuName || undefined, // Gửi tên nếu có, không thì gửi undefined (backend sẽ dùng default)
      items: selectedItems,
    };

    try {
      setSubmitting(true); // Bắt đầu gửi
      const response = await axios.post(
        "http://localhost:5000/api/weekly-menus",
        menuData
      ); // Gọi API POST

      console.log("New weekly menu saved:", response.data);

      // Reset form và state sau khi lưu thành công
      setMenuName("");
      setWeeklySelections({}); // Reset lựa chọn các ngày
      setError(null);
      setSuccessMessage("Thực đơn đã được lưu thành công!"); // Hiển thị thông báo thành công

      // *** Gọi hàm onMenuSaved (fetchLatestWeeklyMenu từ App) để cập nhật hiển thị thực đơn mới nhất ***
      if (onMenuSaved) {
        onMenuSaved();
      }
    } catch (err) {
      console.error(
        "Error saving weekly menu:",
        err.response?.data || err.message
      );
      // Hiển thị thông báo lỗi từ backend (ví dụ: lỗi validation ID món ăn không tồn tại) hoặc lỗi chung
      setError(err.response?.data?.msg || "Failed to save weekly menu.");
      setSuccessMessage(null); // Đảm bảo không hiển thị thông báo thành công nếu có lỗi
    } finally {
      setSubmitting(false); // Kết thúc gửi
    }
  };

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Lên lịch Thực đơn Tuần</h2>
      <form onSubmit={handleSubmit}>
        {/* Hiển thị thông báo lỗi hoặc thành công */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-600 text-center mb-4">{successMessage}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="menuName"
            className="block text-gray-700 text-sm font-bold mb-2">
            Tên Thực đơn (Tùy chọn):
          </label>
          <input
            type="text"
            id="menuName"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            disabled={submitting} // Vô hiệu hóa khi đang gửi
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Phần chọn món cho từng ngày */}
        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-bold mb-2">
            Chọn món cho từng ngày:
          </p>
          {/* Map qua danh sách các ngày trong tuần để tạo ô chọn món */}
          {daysOfWeek.map((day) => (
            <div key={day} className="flex items-center mb-2">
              {" "}
              {/* Dùng flex để các phần tử cùng hàng */}
              <label className="mr-2 w-24 font-medium">{day}:</label>{" "}
              {/* Đặt chiều rộng cố định cho label ngày */}
              {/* Dropdown chọn món ăn */}
              <select
                value={weeklySelections[day] || ""} // Giá trị được chọn lấy từ state
                onChange={(e) => handleDishSelect(day, e.target.value)} // Khi giá trị thay đổi, gọi hàm handleDishSelect
                disabled={submitting} // Vô hiệu hóa khi đang gửi
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <option value="">-- Chọn món --</option>
                {/* Option mặc định */}{" "}
                {/* Map qua danh sách món ăn nhận từ props để tạo các option */}
                {dishes &&
                  dishes.map((dish) => (
                    <option key={dish._id} value={dish._id}>
                      {" "}
                      {/* Value là ID của món ăn */}
                      {dish.name} {/* Text hiển thị là tên món ăn */}
                    </option>
                  ))}
              </select>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={submitting || dishes.length === 0} // Vô hiệu hóa khi đang gửi hoặc chưa có món ăn nào để chọn
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed">
          {submitting ? "Đang lưu..." : "Lưu Thực đơn"}
        </button>

        {dishes.length === 0 && (
          <p className="text-red-500 text-sm mt-2">
            Hãy thêm món ăn vào database trước khi lên lịch thực đơn.
          </p>
        )}
      </form>
    </div>
  );
}

export default WeeklyMenuForm;
