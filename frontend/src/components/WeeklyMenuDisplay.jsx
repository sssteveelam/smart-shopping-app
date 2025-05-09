// File: frontend/src/components/WeeklyMenuDisplay.jsx
import React from "react";

function WeeklyMenuDisplay({ latestWeeklyMenu, loading, error }) {
  return (
    <div className="mt-8 p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Thực đơn Tuần này
      </h2>
      {loading && (
        <p className="text-center text-gray-600 italic">Đang tải thực đơn...</p>
      )}
      {error && (
        <p className="text-center text-red-600 font-semibold">Lỗi: {error}</p>
      )}
      {!loading &&
        !error &&
        (latestWeeklyMenu ? (
          <div className="space-y-4">
            {" "}
            {latestWeeklyMenu.name && (
              <p className="text-lg font-semibold text-gray-800 mb-3">
                <span className="font-normal text-gray-700">
                  {latestWeeklyMenu.name}
                </span>{" "}
              </p>
            )}
            <p className="font-semibold text-gray-700 mb-4">
              Các món trong tuần:
            </p>{" "}
            <div className="space-y-3">
              {latestWeeklyMenu.items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-md shadow-sm border border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out" // Flex layout, padding, background, rounded, shadow, border, hover
                >
                  <span className="font-semibold text-gray-900 w-24 flex-shrink-0">
                    {item.day}:
                  </span>{" "}
                  <span className="text-gray-700 flex-grow">
                    {" "}
                    {item.dish ? (
                      item.dish.name // Hiển thị tên món ăn
                    ) : (
                      <span className="text-red-500 font-medium italic">
                        [Món ăn không tồn tại]
                      </span> // Thông báo món ăn bị lỗi/xóa
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 italic mt-4">
            Chưa có thực đơn nào được tạo. Hãy lên lịch thực đơn đầu tiên!
          </p>
        ))}
    </div>
  );
}

export default WeeklyMenuDisplay;
