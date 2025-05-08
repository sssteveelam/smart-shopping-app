// File: frontend/src/components/ShoppingListDisplay.jsx
import React from "react";

// Component nhận danh sách đi chợ và trạng thái tải/lỗi qua props
function ShoppingListDisplay({ shoppingList, loading, error }) {
  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Danh sách đi chợ</h2>

      {/* Hiển thị trạng thái loading hoặc lỗi */}
      {loading && <p className="text-center">Đang tạo danh sách đi chợ...</p>}
      {error && <p className="text-center text-red-500">Lỗi: {error}</p>}

      {/* Chỉ hiển thị khi không loading và không lỗi */}
      {!loading &&
        !error &&
        (shoppingList && shoppingList.length > 0 ? (
          <div>
            <p className="font-semibold mb-2">Nguyên liệu cần mua:</p>
            <ul className="list-disc list-inside">
              {" "}
              {/* Thêm class Tailwind cho list */}
              {shoppingList.map((item, index) => (
                <li key={index} className="mb-1 text-gray-800">
                  {item}
                </li> // Hiển thị từng nguyên liệu
              ))}
            </ul>
          </div>
        ) : (
          // Hiển thị thông báo nếu danh sách rỗng hoặc chưa có menu
          <p className="text-center text-gray-600">
            Danh sách đi chợ sẽ hiện ra ở đây sau khi có thực đơn.
          </p>
        ))}
    </div>
  );
}

export default ShoppingListDisplay;
