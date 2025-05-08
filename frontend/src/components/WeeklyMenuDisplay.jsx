// File: frontend/src/components/WeeklyMenuDisplay.jsx
import React from "react";

function WeeklyMenuDisplay() {
  // Tạm thời chỉ hiển thị tiêu đề
  // Sau này sẽ fetch dữ liệu thực đơn từ backend và hiển thị ở đây
  const weeklyMenu = null; // Tạm thời chưa có dữ liệu thực đơn

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-md">
      {" "}
      {/* Thêm vài class Tailwind */}
      <h2 className="text-2xl font-bold mb-4">Thực đơn Tuần này</h2>
      {/* Đây sẽ là nơi hiển thị thực đơn */}
      {weeklyMenu ? (
        <div>
          {/* Sau này sẽ map qua các ngày trong weeklyMenu.items */}
          <p>Tên thực đơn: {weeklyMenu.name}</p>
          {/* Hiển thị các ngày và món ăn */}
          {weeklyMenu.items.map((item) => (
            <div key={item._id} className="mb-2">
              <span className="font-semibold">{item.day}:</span>{" "}
              {item.dish ? item.dish.name : "Chưa chọn món"}
            </div>
          ))}
        </div>
      ) : (
        <p>Chưa có thực đơn nào được tạo.</p>
      )}
    </div>
  );
}

export default WeeklyMenuDisplay;
