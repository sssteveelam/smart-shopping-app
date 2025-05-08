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
      setError(null); //  Reset lỗi

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
    <div>
      <h2>Thêm món ăn mới</h2>
      <form onSubmit={handleSubmit}>
        {/* Hiển thị lỗi nếu có */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          <label htmlFor="name">Tên món ăn:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            disabled={submitting} // Vô hiệu hóa input khi đang gửi
          />
        </div>
        <div>
          <label htmlFor="ingredients">
            Nguyên liệu (cách nhau bằng dấu phẩy):
          </label>
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            onChange={handleIngredientsChange}
            disabled={submitting} // Vô hiệu hóa input khi đang gửi
          />
        </div>
        <button type="submit" disabled={submitting}>
          {" "}
          {/* Vô hiệu hóa button khi đang gửi */}
          {submitting ? "Đang thêm..." : "Thêm món ăn"}
        </button>
      </form>
    </div>
  );
}
