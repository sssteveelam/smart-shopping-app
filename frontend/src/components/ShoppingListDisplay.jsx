// File: frontend/src/components/ShoppingListDisplay.jsx
import React from "react";

function ShoppingListDisplay({ shoppingList, loading, error }) {
  return (
    <div className="mt-8 p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Danh sách đi chợ
      </h2>
      {loading && (
        <p className="text-center text-gray-600 italic">
          Đang tạo danh sách đi chợ...
        </p>
      )}
      {error && (
        <p className="text-center text-red-600 font-semibold">Lỗi: {error}</p>
      )}
      {!loading &&
        !error &&
        (shoppingList && shoppingList.length > 0 ? (
          <div>
            <p className="font-semibold mb-3 text-gray-700">
              Nguyên liệu cần mua:
            </p>{" "}
            <ul className="list-disc list-inside space-y-2">
              {shoppingList.map((item, index) => (
                <li key={index} className="text-gray-800 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-gray-500 italic mt-4">
            Danh sách đi chợ sẽ hiện ra ở đây sau khi có thực đơn.
          </p>
        ))}
    </div>
  );
}

export default ShoppingListDisplay;
