// File: frontend/src/components/DishList.jsx
import React from "react";

export default function DishList({ dishes }) {
  return (
    <div className="mt-8 p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Danh sách Món ăn
      </h2>

      {dishes && dishes.length > 0 ? (
        <ul className="list-none p-0 space-y-4">
          {dishes.map((dish) => (
            <li
              key={dish._id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out">
              <div className="flex flex-col">
                <strong className="text-xl font-semibold text-indigo-700 mb-1">
                  {dish.name}
                </strong>
                <span className="text-gray-700 text-sm">
                  Nguyên liệu: {dish.ingredients.join(", ")}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 italic">
          Chưa có món ăn nào được thêm.
        </p>
      )}
    </div>
  );
}
