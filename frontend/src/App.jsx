// *** Import hai components mới tạo ***
import DishList from "./components/DishList";
import DishForm from "./components/DishForm";

function App() {
  return (
    <div className="App">
      <h1>Trợ lý Đi chợ Thông minh</h1> {/* Giữ lại tiêu đề chính */}
      {/* Hiển thị Component form thêm món ăn */}
      <DishForm />
      {/* Hiển thị Component danh sách món ăn */}
      <DishList />
      {/* Có thể thêm các phần khác của giao diện sau này */}
    </div>
  );
}

export default App;
