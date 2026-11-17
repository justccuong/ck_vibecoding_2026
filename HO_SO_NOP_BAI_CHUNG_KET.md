# HỒ SƠ NỘP BÀI CHUNG KẾT VIBE-CODING 2026
**Đội thi:** Chillandcode  
**Bảng thi:** Bảng A – Công nghệ (Hệ thống thẻ thành viên 2 đầu: App Khách Hàng & Quầy Thu Ngân POS)  
**Thời gian hoàn thành:** 17/11/2026  

---

## BỘ NỘI DUNG ĐIỀN FORM NỘP BÀI CỦA BTC
*(Copy từng mục dưới đây dán thẳng vào 4 ô trên form https://vibecoding.info.vn/doi-thi/nop-bai-chung-ket)*

### 1. Demo hoặc cách mở sản phẩm
- **Liên kết Demo HTTPS (Vercel):** `https://ck-vibecoding-2026.vercel.app`  
  *(Hoặc điền link Vercel bạn vừa tạo)*
- **Cách mở và chạy sản phẩm tại chỗ (Local):**
  ```bash
  # 1. Clone repository
  git clone https://github.com/justccuong/ck_vibecoding_2026.git
  cd ck_vibecoding_2026

  # 2. Cài đặt thư viện & khởi chạy
  npm install
  npm run dev
  # Mở trình duyệt tại: http://localhost:5173 (hoặc port hiển thị trên terminal)
  ```
  - Nhấn phím `F12` trên trình duyệt để kiểm tra giao diện di động chuẩn kích thước màn hình 360–390px.
  - Trên màn hình máy tính/ngang: App tự động co giãn 2 cột (Cột trái: Thẻ thành viên & Banner đồ uống; Cột phải: Đổi ưu đãi, Voucher Barcode & Lịch sử điểm).

### 2. Liên kết mã nguồn
- **Kho GitHub chính thức:** `https://github.com/justccuong/ck_vibecoding_2026`
- **Nhánh chính (Release branch):** `main`
- **Cam kết mã nguồn:** Khớp 100% với bản demo online, sạch sẽ, chuẩn TypeScript, không lỗi build.

### 3. Liên kết README
- **Đường dẫn README trên GitHub:** `https://github.com/justccuong/ck_vibecoding_2026/blob/main/README.md`
- **Nội dung tóm tắt:**
  - Hướng dẫn cài đặt, khởi chạy online & offline local-first.
  - Kiến trúc hệ thống 2 đầu: Đầu 1 (App Khách Hàng) & Đầu 2 (Quầy Thu Ngân POS).
  - Tỉ lệ quy đổi điểm chuẩn: 10.000 VNĐ = 1 điểm.
  - 3 Mốc hạng tự động: Đồng (<1.000đ), Bạc (1.000 – 4.999đ), Vàng VIP (≥5.000đ).
  - Chống cộng trùng giao dịch tuyệt đối với định dạng tự sinh chuẩn `TX-KT-XXX`.
  - Quét mã QR thành viên qua Camera đạt trọn 4 điểm thưởng.
  - Dữ liệu mẫu nạp từ nút "Nạp dữ liệu mẫu" chuẩn file BTC với mã tham chiếu chung `KT-004` (Dũng Phạm).

### 4. Liên kết minh chứng quá trình
- **Đường dẫn tệp minh chứng:** `https://github.com/justccuong/ck_vibecoding_2026/blob/main/MINH_CHUNG_QUA_TRINH.md`
- **Mô tả:** Tài liệu ghi nhận log commit Git theo thời gian thực trong 60 phút thi đấu, ảnh chụp màn hình ứng dụng tại thời điểm chốt bài, kiến trúc thư mục sạch và bảng test ca kiểm định.

---

## CHECKLIST KIỂM TRA TRƯỚC KHI BẤM NỘP
- [x] Liên kết demo HTTPS chạy ổn định, không lỗi trắng trang (đã cấu hình `vercel.json` rewrite SPA).
- [x] Repository GitHub công khai (Public) để Ban Giám Khảo truy cập tải mã nguồn.
- [x] Đã nạp dữ liệu mẫu kiểm tra mã `KT-004` đạt yêu cầu.
- [x] Đã tích chọn ô: *"Đội đã kiểm tra quyền truy cập và xác nhận nộp bài chính thức."*
