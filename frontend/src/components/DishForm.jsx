// File: frontend/src/components/DishForm.jsx
import axios from "axios";
import React, { useState } from "react";

export default function DishForm({ onDishAdded }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [submitting, setSubmitting] = useState(false); // State để báo hiệu đang gửi dữ liệu
  const [error, setError] = useState(null); // State để lưu lỗi khi gửi form

  // Hàm xử lý khi người dùng nhập vào input Tên món ăn
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  // Hàm xử lý khi người dùng nhập vào input Nguyên liệu
  const handleIngredientsChange = (e) => {
    setIngredients(e.target.value);
  };
  // Hàm xử lý khi người dùng nhấn nút Thêm món ăn
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu trước khi gửi.
    if (!name || !ingredients) {
      setError("Please fill in both name and ingredients.");
      return;
    }

    // Chuyển chuỗi nguyên liệu thành mảng (tách theo dấu phẩy và loại bỏ khoảng trắng thừa)
    const ingredientsArray = ingredients
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    // Kiểm tra mảng nguyên liệu có rỗng sau khi xử lý không
    if (ingredientsArray.length === 0) {
      setError("Please provide at least one ingredient.");
      return;
    }

    try {
      setSubmitting(true); // Bắt đầu gửi, đặt submitting là true
      setError(null); // 	Reset lỗi

      // *** Gọi API POST /api/dishes để thêm món ăn mới ***
      const response = await axios.post("http://localhost:5000/api/dishes", {
        name, // name: name
        ingredients: ingredientsArray, // Sử dụng mảng nguyên liệu đã xử lý
      });
      console.log("New dish added:", response.data);

      // Reset form sau khi thêm thành công
      setName("");
      setIngredients("");
      setError(null); // Reset lỗi nếu thành công

      // Gọi hàm onDishAdded (nếu có) để thông báo cho component cha
      if (onDishAdded) {
        onDishAdded();
      }
    } catch (err) {
      console.error("Error adding dish:", err.response?.data || err.message);
      // Hiển thị thông báo lỗi từ backend nếu có (err.response.data) hoặc lỗi chung
      setError(err.response?.data?.msg || "Failed to add dish.");
    } finally {
      setSubmitting(false); // Kết thúc gửi
    }
  };

  return (
    // Thẻ div bao ngoài, thêm padding, bo góc, và đổ bóng nhẹ
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      {/* Tiêu đề, căn giữa và cỡ chữ lớn hơn */}
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Thêm món ăn mới
      </h2>

      {/* Form chính */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hiển thị lỗi nếu có, dùng màu đỏ và margin bottom */}
        {error && <p className="text-red-500 text-sm italic">{error}</p>}

        {/* Form group cho Tên món ăn */}
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1">
            Tên món ăn:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            disabled={submitting} // Vô hiệu hóa input khi đang gửi
            // Thêm border, padding, bo góc cho input, và style khi focus
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Form group cho Nguyên liệu */}
        <div className="flex flex-col">
          <label
            htmlFor="ingredients"
            className="block text-sm font-medium text-gray-700 mb-1">
            Nguyên liệu (cách nhau bằng dấu phẩy):
          </label>
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={handleIngredientsChange}
            disabled={submitting} // Vô hiệu hóa input khi đang gửi
            // Thêm border, padding, bo góc cho input, và style khi focus
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Nút submit */}
        <button
          type="submit"
          disabled={submitting} // Vô hiệu hóa button khi đang gửi
          // Thêm style cho button: màu nền, text, padding, bo góc, hover, focus, disabled
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
          {/* Hiển thị text theo trạng thái submitting */}
          {submitting ? "Đang thêm..." : "Thêm món ăn"}
        </button>
      </form>
    </div>
  );
}
