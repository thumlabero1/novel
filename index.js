const express = require('express');
const app = express();
const port = 3004;

// Định nghĩa route cho trang chủ
app.get('/', (req, res) => {
    res.send('Chào mừng đến với ứng dụng Express Node.js!');
});

// Lắng nghe các kết nối trên cổng đã chọn và in ra console khi server đã khởi động
app.listen(port, () => {
    console.log(`Ứng dụng của bạn đang chạy tại http://localhost:${port}`);
});
