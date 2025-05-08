import React, { useState } from "react"; // Cần useState cho form

function WeeklyMenuForm() {
  // State để lưu tên thực đơn (tùy chọn) và danh sách món ăn cho từng ngày
  const [menuName, setMenuName] = useState("");
  const [weeklyItems, setWeeklyItems] = useState([]); // Tạm thời là mảng rỗng

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Dữ liệu thực đơn:", { name: menuName, items: weeklyItems });
  };

  // Tạm thời tạo một form đơn giản, sau này sẽ phức tạp hơn với dropdown chọn món ăn
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-md">
      {" "}
      {/* Thêm class Tailwind */}
      <h2 className="text-2xl font-bold mb-4">Lên lịch Thực đơn Tuần</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="menuName"
            className="block text-gray-700 text-sm font-bold mb-2">
            Tên Thực đơn (Tùy chọn):
          </label>
          <input
            type="text"
            id="menuName"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Phần chọn món cho từng ngày sẽ phức tạp hơn, tạm bỏ trống */}
        <div className="mb-4">
          <p className="block text-gray-700 text-sm font-bold mb-2">
            Chọn món cho từng ngày:
          </p>
          {/* Sau này sẽ có vòng lặp map qua daysOfWeek để tạo input/dropdown cho từng ngày */}
          {/* Ví dụ: */}
          {/* {daysOfWeek.map(day => (
                 <div key={day}>
                     <label>{day}:</label>
                     // Đây sẽ là dropdown hoặc input để chọn món ăn
                     <select>
                         <option>-- Chọn món --</option>
                          // Sau này sẽ map qua danh sách món ăn fetch từ backend
                     </select>
                 </div>
             ))} */}
          <p className="text-gray-500">
            Phần chọn món cho từng ngày sẽ được xây dựng ở bước sau.
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Lưu Thực đơn
        </button>
      </form>
    </div>
  );
}

export default WeeklyMenuForm;
