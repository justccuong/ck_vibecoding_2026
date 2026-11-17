# CẨM NANG THỰC CHIẾN 60 PHÚT — CHUNG KẾT VIBE CODING 2026
### Bản Đồ Tác Chiến Từng Khung Giờ Dành Cho Thí Sinh

---

## I. NGUYÊN TẮC SỐNG CÒN TẠI PHÒNG THI

1. **60 phút trôi qua cực kỳ nhanh:** Không được mất thời gian cài lại môi trường hay suy nghĩ về cấu trúc thư mục. Bộ Starter Kit đã có sẵn mọi component và cấu hình.
2. **Không bao giờ được quên 4 hạng mục nộp bài (9 điểm):**
   - Link demo online hoặc hướng dẫn mở
   - Source code sạch khớp bản demo
   - README đầy đủ
   - Ảnh chụp / video ngắn màn hình tại thời điểm chốt (lúc 55 phút nhớ chụp ngay!).
3. **Tiêu chuẩn Mobile (10 điểm):** Luôn mở DevTools ở chế độ Responsive `375px` hoặc dùng nút bật "Khung iPhone 375px" có sẵn trong bộ Kit. Tuyệt đối không để cuộn ngang.
4. **Nút "Nạp dữ liệu mẫu BTC" là bắt buộc:** Đề bài cả 2 bảng đều yêu cầu có nút này để khôi phục trạng thái ban đầu khi giám khảo bấm chấm.
5. **Điểm thưởng ngoại vi (+4 điểm Bảng Kỹ thuật):** Starter Kit đã tích hợp sẵn Camera QR Scanner. Nhớ giữ nguyên module này để ăn trọn 104/100 điểm!

---

## II. LỘ TRÌNH 60 PHÚT VÀNG (BLOCK 10 PHÚT)

```
[00-05'] Đọc đề & Nạp Data  ──►  [05-20'] Nghiệp vụ lõi  ──►  [20-40'] Dựng giao diện Mobile
                                                                    │
[55-60'] Nộp bài & Chốt  ◄──  [50-55'] Deploy & Minh chứng  ◄───────┘
```

### ⏱️ Phút 00 – 05: Phân rã Đề bài & Dán Dữ liệu mẫu (5 phút)
- **Hành động:**
  1. Khi giám khảo phát đề và file Excel/sheet mẫu, copy nhanh các trường dữ liệu vào `src/data/initialData.ts`.
  2. Xác định rõ: Đâu là **yêu cầu bắt buộc (core)** và đâu là **phần mở rộng**.
  3. Khởi chạy dev server: `npm run dev` (sẵn sàng ở cổng 5175).

### ⏱️ Phút 05 – 20: Lập trình Logic Nghiệp vụ & State (15 phút)
- **Hành động trong `src/store/useAppStore.ts`:**
  1. Khai báo các thuộc tính trong interface theo đề thi.
  2. Viết các hàm kiểm tra ràng buộc (Validation):
     - Nếu Bảng Kỹ thuật: Check ngày kết thúc >= ngày bắt đầu, check trùng lịch mượn `startA <= endB && endA >= startB`.
     - Nếu Bảng Kinh tế: Viết công thức tính Doanh thu, Chi phí biến đổi, Lãi góp bình quân, Điểm hòa vốn `FixedCost / Margin`.
  3. Đảm bảo hàm `resetToSampleData()` gán lại mảng `INITIAL_SAMPLE_ITEMS` ban đầu.

### ⏱️ Phút 20 – 40: Dựng Giao Diện Mobile-First (20 phút)
- **Hành động trong `src/App.tsx` & `src/components/`:**
  1. Ghép các UI component có sẵn (`Input`, `Select`, `Button`, `Badge`, `Card`, `Modal`).
  2. Luôn kiểm tra giao diện trên chiều rộng `360px – 390px`.
  3. Đảm bảo mọi nút bấm có chiều cao tối thiểu `min-h-[44px]` để ngón tay dễ chạm.
  4. Đặt các thông báo Toast khi thao tác thành công hoặc khi bị lỗi ràng buộc.

### ⏱️ Phút 40 – 50: Rà Soát Tính Năng & Điểm Thưởng (10 phút)
- **Hành động:**
  1. Bấm **F5 (Reload trang)**: Kiểm tra xem dữ liệu vừa thêm có còn được lưu trong `localStorage` hay không (Tiêu chí Kỹ thuật & độ ổn định: 18đ).
  2. Thử nghiệm tính năng ngoại vi QR Code: Mở modal quét mã hoặc tạo QR để đảm bảo lấy trọn **4 điểm thưởng**.
  3. Bấm nút **"Nạp dữ liệu mẫu BTC"** xem ứng dụng có khôi phục sạch sẽ về ban đầu hay không.

### ⏱️ Phút 50 – 55: Deploy Online & Chụp Ảnh Minh Chứng (5 phút)
- **Hành động:**
  1. Chạy lệnh deploy Vercel: `vercel --prod` hoặc nén gói dist/ để chạy `npm run preview`.
  2. **RẤT QUAN TRỌNG:** Dùng phím `Windows + Shift + S` chụp 2-3 ảnh màn hình thể hiện sản phẩm đang chạy trên điện thoại hoặc khung giả lập.
  3. Lưu ảnh vào thư mục `docs/proof/` hoặc tải lên Google Drive lấy link chia sẻ công khai.

### ⏱️ Phút 55 – 60: Hoàn Thiện README & Nộp Bài (5 phút)
- **Hành động:**
  1. Mở file `README_SUBMISSION_TEMPLATE.md`, đổi tên thành `README.md`.
  2. Điền link demo, link ảnh minh chứng và các tính năng chính đã hoàn thành.
  3. Nén mã nguồn hoặc đẩy lên Git theo đúng định dạng cổng nộp bài của BTC.
  4. Nộp bài lên hệ thống trước khi đồng hồ điểm 60:00!

---

## III. KỊCH BẢN DEMO 2 PHÚT "BẮN HẠ" BAN GIÁM KHẢO

Khi được gọi phản biện, thực hiện chuẩn xác kịch bản 4 bước sau:

1. **Bước 1 (15 giây):** Giới thiệu tên sản phẩm, bài toán giải quyết và nhấn nút **"Nạp dữ liệu mẫu BTC"** để chứng minh ứng dụng dùng đúng 100% dữ liệu gốc của hội đồng.
2. **Bước 2 (45 giây):** Thao tác luồng chính:
   - Nhập một dữ liệu mới hợp lệ → Bấm lưu → Thông báo toast và confetti xuất hiện.
   - Cố tình nhập một ca vi phạm ràng buộc (ví dụ: ngày trả trước ngày mượn, hoặc trùng lịch đã có) → Chỉ rõ thông báo lỗi văn minh, dễ hiểu cho giám khảo.
3. **Bước 3 (30 giây):** Biểu diễn tính năng ngoại vi / nâng cao (Quét mã QR qua camera điện thoại hoặc màn hình phân tích hòa vốn).
4. **Bước 4 (30 giây):** Nhấn **F5 (Reload lại trang)** trước mắt giám khảo để chứng minh dữ liệu vẫn tồn tại vẹn nguyên (Độ ổn định cao) và kết thúc bài thuyết trình!
