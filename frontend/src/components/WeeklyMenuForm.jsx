// File: frontend/src/components/WeeklyMenuForm.jsx
import React, { useState, useEffect } from "react"; // Thêm useEffect
import axios from "axios";

function WeeklyMenuForm({ dishes, onMenuSaved }) {
  const [menuName, setMenuName] = useState("");
  const [weeklySelections, setWeeklySelections] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const daysOfWeek = [
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
    "Chủ Nhật",
  ];

  useEffect(() => {
    const initialSelections = {};
    daysOfWeek.forEach((day) => {
      initialSelections[day] = weeklySelections[day] || "";
    });

    setWeeklySelections(initialSelections);
  }, [daysOfWeek]);

  const handleDishSelect = (day, dishId) => {
    setWeeklySelections({
      ...weeklySelections,
      [day]: dishId,
    });
  };

  // Hàm xử lý khi người dùng nhấn nút Lưu Thực đơn
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccessMessage(null);

    // Lọc ra các mục (ngày + món ăn) mà người dùng đã chọn món
    const selectedItems = daysOfWeek
      .map((day) => ({ day, dish: weeklySelections[day] }))
      .filter((item) => item.dish);

    if (selectedItems.length === 0) {
      setError("Vui lòng chọn ít nhất một món ăn cho tuần.");
      return;
    }

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

      setMenuName("");
      const resetSelections = {};
      daysOfWeek.forEach((day) => {
        resetSelections[day] = "";
      });
      setWeeklySelections(resetSelections);

      setError(null);
      setSuccessMessage("Thực đơn đã được lưu thành công!"); // Hiển thị thông báo thành công

      if (onMenuSaved) {
        onMenuSaved();
      }
    } catch (err) {
      console.error(
        "Error saving weekly menu:",
        err.response?.data || err.message
      );
      setError(err.response?.data?.msg || "Có lỗi xảy ra khi lưu thực đơn.");
      setSuccessMessage(null); // Đảm bảo không hiển thị thông báo thành công nếu có lỗi
    } finally {
      setSubmitting(false); // Kết thúc gửi
    }
  };

  return (
    <div className="mt-8 p-6 max-w-xl mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Lên lịch Thực đơn Tuần
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {" "}
        {error && (
          <p className="text-red-600 font-semibold text-center mb-4">{error}</p>
        )}
        {successMessage && (
          <p className="text-green-600 font-semibold text-center mb-4">
            {successMessage}
          </p>
        )}
        <div className="space-y-2">
          {" "}
          <label
            htmlFor="menuName"
            className="block text-gray-700 text-sm font-medium">
            {" "}
            {/* font-medium */}
            Tên Thực đơn (Tùy chọn):
          </label>
          <input
            type="text"
            id="menuName"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            disabled={submitting} // Vô hiệu hóa khi đang gửi
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
            placeholder="Ví dụ: Thực đơn Mùa Hè"
          />{" "}
        </div>
        <div className="space-y-3">
          <p className="block text-gray-700 font-semibold mb-2">
            Chọn món cho từng ngày:
          </p>
          {daysOfWeek.map((day) => (
            <div key={day} className="flex items-center space-x-4">
              <label className="flex-shrink-0 w-24 font-medium text-gray-800">
                {day}:
              </label>{" "}
              <select
                value={weeklySelections[day] || ""} // Giá trị được chọn lấy từ state
                onChange={(e) => handleDishSelect(day, e.target.value)} // Khi giá trị thay đổi, gọi hàm handleDishSelect
                disabled={submitting} // Vô hiệu hóa khi đang gửi
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                           focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 appearance-none" /* appearance-none để tùy chỉnh mũi tên nếu cần */
              >
                <option value="">-- Chọn món --</option> {/* Option mặc định */}
                {dishes &&
                  dishes.map((dish) => (
                    <option key={dish._id} value={dish._id}>
                      {dish.name}
                    </option>
                  ))}
              </select>
            </div>
          ))}
        </div>
        <button
          type="submit"
          disabled={submitting || dishes.length === 0} // Vô hiệu hóa khi đang gửi hoặc chưa có món ăn
          // Style button đồng bộ
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600
                       hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-indigo-400 transition duration-200 ease-in-out">
          {submitting ? "Đang lưu..." : "Lưu Thực đơn"}
        </button>
        {dishes.length === 0 && (
          <p className="text-red-600 text-sm italic mt-4 text-center">
            Hãy thêm món ăn vào database trước khi lên lịch thực đơn.
          </p>
        )}
      </form>
    </div>
  );
}

export default WeeklyMenuForm;
