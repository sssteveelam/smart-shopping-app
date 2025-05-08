// File: frontend/src/components/WeeklyMenuDisplay.jsx
import React from "react";

// Component nhận dữ liệu thực đơn và trạng thái tải/lỗi qua props
function WeeklyMenuDisplay({ latestWeeklyMenu, loading, error }) {
  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Thực đơn Tuần này</h2>

      {/* Hiển thị trạng thái loading hoặc lỗi */}
      {loading && <p className="text-center">Đang tải thực đơn...</p>}
      {error && <p className="text-center text-red-500">Lỗi: {error}</p>}

      {/* Chỉ hiển thị khi không loading và không lỗi */}
      {!loading &&
        !error &&
        (latestWeeklyMenu ? (
          // Hiển thị chi tiết thực đơn nếu có
          <div>
            {latestWeeklyMenu.name && (
              <p className="text-lg font-semibold mb-2">
                Tên thực đơn: {latestWeeklyMenu.name}
              </p>
            )}
            {/* Hiển thị tên nếu có */}
            <p className="font-semibold mb-2">Các món trong tuần:</p>
            {/* Map qua các mục trong thực đơn (đã được populate món ăn) */}
            {latestWeeklyMenu.items.map((item) => (
              <div key={item._id} className="mb-2 border-b pb-1">
                {/* Thêm class Tailwind */}
                <span className="font-semibold">{item.day}:</span>
                {/* Kiểm tra item.dish có tồn tại không */}
                {item.dish ? (
                  <span> {item.dish.name}</span>
                ) : (
                  <span className="text-red-500"> Lỗi hiển thị món ăn</span> // Xử lý trường hợp populate lỗi hoặc món bị xóa
                )}
              </div>
            ))}
          </div>
        ) : (
          // Hiển thị thông báo nếu chưa có thực đơn nào
          <p className="text-center text-gray-600">
            Chưa có thực đơn nào được tạo. Hãy lên lịch thực đơn đầu tiên!
          </p>
        ))}
    </div>
  );
}

export default WeeklyMenuDisplay;
