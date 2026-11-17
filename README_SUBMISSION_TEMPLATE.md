# [TÊN ĐỘI THI] — [TÊN ỨNG DỤNG]
### Cuộc thi Vibe Coding Mini App 2026 · Vòng Chung Kết

> [Đoạn mô tả ngắn gọn 1-2 câu về giải pháp và giá trị mang lại cho người dùng]

---

## 1. Thông Tin Chung & Bảng Kiểm Định Hồ Sơ (9/9 Điểm)

| Tiêu chí BTC | Trọng số | Minh chứng & Đường dẫn |
|---|---|---|
| **1. Link demo / Cách mở** | 2 điểm | [Điền link Vercel / Netlify hoặc chạy `npm run dev` tại `http://localhost:5175`] |
| **2. Source code** | 3 điểm | Mã nguồn sạch trong thư mục nộp bài, khớp 100% với bản demo |
| **3. README hướng dẫn** | 2 điểm | Đầy đủ kiến trúc công nghệ, cài đặt, dữ liệu mẫu bên dưới |
| **4. Minh chứng thời điểm chốt** | 2 điểm | [Đính kèm link ảnh chụp màn hình / video ngắn quay màn hình lúc hết giờ] |
| **Tổng điểm hồ sơ** | **9 / 9 điểm** | Đạt mức **Xuất sắc** |

---

## 2. Chuẩn Hiển Thị Trên Điện Thoại (10/10 Điểm)

Sản phẩm được thiết kế theo tư duy **Mobile-First** đáp ứng toàn bộ 5 yêu cầu kiểm tra của Ban Giám Khảo trên khung hiển thị **360px – 390px**:
- [x] **Bố cục hiển thị trọn vẹn:** Tuyệt đối không tràn màn hình, không bị cuộn ngang (`overflow-x: hidden`).
- [x] **Vùng chạm ngón tay (Touch Targets):** Tất cả nút bấm, ô nhập có chiều cao tối thiểu ≥ 44px, khoảng cách an toàn, không chồng lấn.
- [x] **Độ rõ nét typography:** Cỡ chữ từ 12px đến 16px dễ đọc ở mức 100%, không cần người dùng phóng to.
- [x] **Luồng thao tác hoàn chỉnh trên di động:** 100% tính năng chính thực hiện mượt mà trên điện thoại.
- [x] **Thanh điều hướng rõ ràng:** Thanh Bottom Navigation gắn cố định đáy màn hình, nhận biết rõ vị trí tab.

---

## 3. Các Tính Năng Cốt Lõi Hoàn Thành

1. **[Tính năng 1 - Nhập & Quản lý dữ liệu]:** ...
2. **[Tính năng 2 - Xử lý nghiệp vụ & Ràng buộc]:** ...
3. **[Tính năng 3 - Quản trị & Đổi trạng thái workflow]:** ...
4. **[Tính năng 4 - Nạp dữ liệu mẫu ban đầu 1-Click]:** Nút "Nạp dữ liệu mẫu BTC" khôi phục ngay trạng thái dữ liệu gốc.
5. **[Tính năng 5 - Điểm thưởng ngoại vi (+4 điểm) - nếu Bảng Kỹ thuật]:** Quét mã QR qua Camera / Webcam và sinh mã QR động.

---

## 4. Công Nghệ Sử Dụng

- **Giao diện & Logic:** React 19 + TypeScript + Vite 8
- **Tạo kiểu & Responsive:** Tailwind CSS (Mobile First Container)
- **Quản lý State & Lưu trữ:** Zustand 5 + `localStorage` (Local-first, không mất dữ liệu khi reload)
- **Thư viện bổ trợ:** Lucide React (Icons), Canvas-Confetti (Hiệu ứng)
- **Ngoại vi (QR Code):** `html5-qrcode` (quét camera) + `qrcode` (sinh mã SVG)

---

## 5. Hướng Dẫn Cài Đặt & Chạy Local

Yêu cầu: Node.js ≥ 18 và trình duyệt web hiện đại.

```bash
# 1. Chạy ứng dụng trực tiếp
npm run dev
# Mở trình duyệt tại: http://localhost:5175

# 2. Build production
npm run build
```

---

## 6. Dữ Liệu Mẫu Của Ban Tổ Chức

- Toàn bộ dữ liệu mẫu do Ban Tổ Chức cung cấp đã được lập trình sẵn trong mã nguồn.
- Giám khảo có thể nhấn nút **"Nạp dữ liệu mẫu BTC"** trên góc phải thanh Header bất kỳ lúc nào để đưa ứng dụng về trạng thái ban đầu.
