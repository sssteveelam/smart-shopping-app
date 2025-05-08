import React from "react";

export default function DishList({ dishes }) {
  return (
    <div>
      <h2>Danh sách Món ăn</h2>
      {/* Kiểm tra xem có món ăn nào không và render */}
      {dishes && dishes.length > 0 ? (
        <ul>
          {dishes.map((dish) => (
            // Hiển thị tên món ăn. Sau này có thể thêm nút Sửa/Xóa
            <li key={dish._id}>
              {dish.name} - Nguyên liệu: {dish.ingredients.join(", ")}
            </li>
          ))}
        </ul>
      ) : (
        // Hiển thị thông báo nếu không có món ăn
        <p>Chưa có món ăn nào.</p>
      )}
    </div>
  );
}
