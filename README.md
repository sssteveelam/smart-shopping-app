# Dự án: Trợ lý Đi chợ Thông minh

## 🎯 Mục tiêu Dự án

Dự án "Trợ lý Đi chợ Thông minh" được xây dựng nhằm giải quyết vấn đề phổ biến là việc đau đầu suy nghĩ "hôm nay ăn gì" và việc đi chợ mua sắm bị thiếu nguyên liệu. Ứng dụng này cho phép người dùng lên kế hoạch thực đơn các món ăn cho cả tuần. Dựa trên thực đơn đã chọn, hệ thống sẽ tự động tổng hợp và liệt kê tất cả nguyên liệu cần thiết thành một danh sách đi chợ tiện lợi, giúp tiết kiệm thời gian và tránh mua sót đồ.

## ✨ Tính năng đã triển khai

Đến thời điểm hiện tại, các tính năng chính của ứng dụng bao gồm:

**Quản lý Món ăn:**
* Thêm món ăn mới (tên món và danh sách nguyên liệu).
* Xem danh sách tất cả các món ăn đã lưu.
* Xem chi tiết thông tin một món ăn cụ thể.
* Cập nhật thông tin một món ăn đã lưu.
* Xóa một món ăn khỏi danh sách.

**Quản lý Thực đơn hàng tuần:**
* Lên lịch (tạo mới) một thực đơn hàng tuần bằng cách chọn các món ăn cho từng ngày trong tuần.
* Xem chi tiết thực đơn hàng tuần gần nhất đã lưu.
* Xem chi tiết một thực đơn hàng tuần bất kỳ theo ID.

**Tạo Danh sách đi chợ:**
* Tự động tạo danh sách các nguyên liệu duy nhất cần thiết dựa trên thực đơn hàng tuần đã chọn.

## 💻 Công nghệ sử dụng

Dự án sử dụng các công nghệ phổ biến và hiện đại:

* **Frontend:**
    * [ReactJS](https://reactjs.org/): Thư viện JavaScript để xây dựng giao diện người dùng.
    * [Vite](https://vitejs.dev/): Công cụ build nhanh cho frontend.
    * [Tailwind CSS](https://tailwindcss.com/): Framework CSS tiện ích để tạo styling nhanh chóng.
    * [Axios](https://axios-http.com/): Thư viện để gọi API backend từ frontend.
    * HTML5, CSS3, JavaScript (ES6+).

* **Backend:**
    * [Node.js](https://nodejs.org/): Môi trường chạy JavaScript phía server.
    * [Express](https://expressjs.com/): Framework web nhanh, tối giản cho Node.js để xây dựng API.
    * [Mongoose](https://mongoosejs.com/): Thư viện Object Data Modeling (ODM) giúp tương tác với MongoDB dễ dàng hơn thông qua Schema.
    * [dotenv](https://github.com/motdoteng/dotenv): Thư viện giúp quản lý các biến môi trường (như chuỗi kết nối database) từ file `.env`.

* **Database:**
    * [MongoDB](https://www.mongodb.com/): Cơ sở dữ liệu NoSQL, hướng document.
    * [MongoDB Atlas](https://www.mongodb.com/cloud/atlas): Dịch vụ MongoDB trên nền tảng đám mây (đã sử dụng gói Free Tier).

## 📚 Cài đặt và Chạy Dự án

Làm theo các bước sau để cài đặt và chạy dự án trên máy tính của bạn:

**1. Chuẩn bị:**

* Đảm bảo bạn đã cài đặt [Node.js](https://nodejs.org/) và [npm](https://www.npmjs.com/) trên máy tính.
* Có một tài khoản [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) và đã tạo một Cluster, Database User, và có được **Connection String** (dạng `mongodb+srv://...`).

**2. Clone Repository:**

* Mở Terminal hoặc Command Prompt.
* Clone mã nguồn từ GitHub về máy (thay `<link_repository_cua_ban>` bằng link repository trên GitHub của em):
    ```bash
    git clone <link_repository_cua_ban>
    ```
* Di chuyển vào thư mục gốc của dự án:
    ```bash
    cd smart-shopping-app
    ```

**3. Cài đặt Backend:**

* Di chuyển vào thư mục `backend`:
    ```bash
    cd backend
    ```
* Cài đặt các thư viện phụ thuộc cho backend:
    ```bash
    npm install
    ```
* Tạo file `.env` trong thư mục `backend` để lưu trữ chuỗi kết nối MongoDB:
    ```bash
    touch .env
    ```
* Mở file `.env` và thêm dòng sau, thay `<your_mongodb_connection_string>` bằng chuỗi kết nối MongoDB Atlas của bạn (nhớ điền đúng username và password):
    ```dotenv
    MONGO_URI=<your_mongodb_connection_string>
    ```
    (Ví dụ: `MONGO_URI=mongodb+srv://myuser:mypassword@cluster0.abcde.mongodb.net/smart-shopping-db?retryWrites=true&w=majority`)

**4. Cài đặt Frontend:**

* Quay lại thư mục gốc của dự án:
    ```bash
    cd ..
    ```
* Di chuyển vào thư mục `frontend`:
    ```bash
    cd frontend
    ```
* Cài đặt các thư viện phụ thuộc cho frontend:
    ```bash
    npm install
    ```

**5. Chạy Dự án:**

* **Chạy Backend Server:**
    * Mở một Terminal hoặc Command Prompt mới.
    * Di chuyển vào thư mục `backend`:
        ```bash
        cd smart-shopping-app/backend
        ```
    * Chạy server backend (sử dụng nodemon để tự động khởi động lại khi có thay đổi code):
        ```bash
        npm run dev
        ```
    * Server backend sẽ chạy trên cổng 5000 (mặc định).

* **Chạy Frontend Server:**
    * Mở một Terminal hoặc Command Prompt khác.
    * Di chuyển vào thư mục `frontend`:
        ```bash
        cd smart-shopping-app/frontend
        ```
    * Chạy server phát triển của React (sử dụng Vite):
        ```bash
        npm run dev
        ```
    * Server frontend sẽ chạy trên cổng 5173 (mặc định của Vite) hoặc một cổng khác được báo trong Terminal.

* Mở trình duyệt web và truy cập vào địa chỉ của frontend server (ví dụ: `http://localhost:5173/`).

## 🚀 Cách sử dụng Ứng dụng (Phiên bản hiện tại)

1.  **Thêm món ăn:** Sử dụng form "Thêm món ăn mới" để nhập tên món ăn và các nguyên liệu (cách nhau bằng dấu phẩy). Nhấn "Thêm món ăn" để lưu vào database. Danh sách món ăn ở dưới sẽ tự cập nhật.
2.  **Xem danh sách món ăn:** Phần "Danh sách Món ăn" sẽ hiển thị các món đã được thêm vào database.
3.  **Lên lịch Thực đơn:** Sử dụng phần "Lên lịch Thực đơn Tuần". Chọn món ăn từ dropdown cho từng ngày trong tuần. Nhập tên thực đơn (tùy chọn). Nhấn "Lưu Thực đơn".
4.  **Xem Thực đơn Tuần này:** Phần "Thực đơn Tuần này" sẽ tự động cập nhật và hiển thị thực đơn gần nhất mà bạn đã lưu.
5.  **Xem Danh sách đi chợ:** Ngay sau khi "Thực đơn Tuần này" được hiển thị, phần "Danh sách đi chợ" sẽ tự động tạo và hiển thị danh sách nguyên liệu cần mua cho thực đơn đó.

## ✨ Tính năng Nâng cao (Có thể phát triển thêm)

* Chức năng **tự động tạo thực đơn** (ví dụ: chọn ngẫu nhiên các món cho tuần).
* Chức năng **sửa/xóa** thực đơn hàng tuần đã lưu.
* Quản lý **số lượng** nguyên liệu trong danh sách đi chợ.
* Chức năng **tìm kiếm** món ăn.
* Chức năng **quản lý nhiều thực đơn** và chọn thực đơn để hiển thị/tạo danh sách đi chợ.
* Hệ thống **quản lý người dùng** để mỗi người có danh sách món ăn và thực đơn riêng.
* Giao diện người dùng (UI/UX) được cải thiện đẹp và thân thiện hơn nữa.
* Thêm hình ảnh cho món ăn.

## 💖 Tác giả

* Dự án được xây dựng bởi Stephen Lam

---

**Cảm ơn bạn đã xem qua dự án này!**
