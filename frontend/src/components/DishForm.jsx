// File: frontend/src/components/DishForm.jsx
import React, { useState } from "react";

export default function DishForm() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");

  // Hàm xử lý khi người dùng nhập vào input Tên món ăn
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  // Hàm xử lý khi người dùng nhập vào input Nguyên liệu
  const handleIngredientsChange = (e) => {
    setIngredients(e.target.value);
  };
  // Hàm xử lý khi người dùng nhấn nút Thêm món ăn
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Thông tin món ăn:", { name, ingredients });

    // Reset form sau khi submit (tạm thời)
    setName("");
    setIngredients("");
  };
  return (
    <div>
      <h2>Thêm món ăn mới</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Tên món ăn:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required // Bắt buộc nhập
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
            required // Bắt buộc nhập
          />
        </div>
        <button type="submit">Thêm món ăn</button>
      </form>
    </div>
  );
}
