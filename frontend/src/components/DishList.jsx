import React from "react";

export default function DishList() {
  const dishes = [];

  return (
    <div>
      <h2>Danh sách món ăn</h2>

      {/* Đây sẽ là nơi hiển thị danh sách món ăn */}
      <ul>
        {dishes.map((dish) => (
          <li key={dish._id}>{dish.name}</li>
        ))}

        {dishes.length === 0 && <p>Chưa có món ăn nào.</p>}
      </ul>
    </div>
  );
}
