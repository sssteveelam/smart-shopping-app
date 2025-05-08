// File: frontend/src/components/ShoppingListDisplay.jsx
import React from "react";

function ShoppingListDisplay() {
  // Tạm thời chỉ hiển thị tiêu đề
  // Sau này sẽ fetch danh sách đi chợ từ backend và hiển thị ở đây
  const shoppingList = []; // Tạm thời là mảng rỗng

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-md">
      {" "}
      {/* Thêm class Tailwind */}
      <h2 className="text-2xl font-bold mb-4">Danh sách đi chợ</h2>
      {/* Đây sẽ là nơi hiển thị danh sách đi chợ */}
      {shoppingList.length > 0 ? (
        <ul>
          {shoppingList.map((item, index) => (
            <li key={index} className="mb-1">
              {item}
            </li> // Dùng index làm key tạm thời nếu item là chuỗi
          ))}
        </ul>
      ) : (
        <p>Chưa có danh sách đi chợ. Hãy tạo thực đơn trước!</p>
      )}
    </div>
  );
}

export default ShoppingListDisplay;
