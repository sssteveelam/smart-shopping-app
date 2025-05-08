// File: frontend/src/components/DishList.jsx
import React from "react";

export default function DishList({ dishes }) {
  return (
    // Thẻ div bao ngoài, thêm margin top, padding, bo góc, và đổ bóng nhẹ
    <div className="mt-8 p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      {/* Tiêu đề, căn giữa và cỡ chữ lớn hơn, thêm lề dưới */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Danh sách Món ăn
      </h2>

      {/* Kiểm tra xem có món ăn nào không và render */}
      {dishes && dishes.length > 0 ? (
        // Danh sách món ăn, loại bỏ style mặc định của ul, thêm khoảng cách giữa các item
        <ul className="list-none p-0 space-y-4">
          {dishes.map((dish) => (
            // Mỗi món ăn là một item, thêm padding, border dưới, và hiệu ứng hover nhẹ
            <li
              key={dish._id}
              className="p-4 border-b border-gray-200 hover:bg-gray-50 rounded-md">
              {/* Tên món ăn in đậm */}
              <strong className="text-lg text-gray-900">{dish.name}</strong> -
              {/* Nguyên liệu, chữ nhỏ hơn một chút */}
              <span className="text-gray-600 text-sm">
                {" "}
                Nguyên liệu: {dish.ingredients.join(", ")}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        // Hiển thị thông báo nếu không có món ăn, dùng màu xám và căn giữa
        <p className="text-center text-gray-500 italic">
          Chưa có món ăn nào được thêm.
        </p>
      )}
    </div>
  );
}
