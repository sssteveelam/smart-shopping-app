// File: frontend/src/components/DishForm.jsx
import axios from "axios";
import React, { useState } from "react";

export default function DishForm({ onDishAdded }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleIngredientsChange = (e) => {
    setIngredients(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !ingredients) {
      setError("Vui lòng điền đầy đủ cả tên món ăn và nguyên liệu.");
      return;
    }

    const ingredientsArray = ingredients
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    if (ingredientsArray.length === 0) {
      setError("Vui lòng cung cấp ít nhất một nguyên liệu.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null); //

      const response = await axios.post("http://localhost:5000/api/dishes", {
        name, // name: name
        ingredients: ingredientsArray,
      });
      console.log("New dish added:", response.data);

      setName("");
      setIngredients("");
      setError(null);

      if (onDishAdded) {
        onDishAdded();
      }
    } catch (err) {
      console.error("Error adding dish:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Có lỗi xảy ra khi thêm món ăn.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Thêm món ăn mới
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-red-600 text-sm font-semibold italic mb-4">
            {error}
          </p> // text-red-600, font-semibold, mb-4
        )}

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
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100" // px-4 py-2, placeholder, disabled bg
            placeholder="Ví dụ: Phở bò" // Thêm placeholder
          />
        </div>

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
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400
                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100" // px-4 py-2, placeholder, disabled bg
            placeholder="Ví dụ: Thịt bò, bánh phở, hành lá" // Thêm placeholder
          />
        </div>

        {/* Nút submit */}
        <button
          type="submit"
          disabled={submitting} // Vô hiệu hóa button khi đang gửi
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600
                       hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-indigo-400 transition duration-200 ease-in-out" // py-2.5 text-base, disabled bg, transition
        >
          {submitting ? "Đang thêm..." : "Thêm món ăn"}
        </button>
      </form>
    </div>
  );
}
