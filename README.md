# HỆ THỐNG THẺ THÀNH VIÊN 2 ĐẦU (VIBE REWARDS)
### Chuẩn Mô Hình Starbucks Rewards · Cuộc Thi Vibe Coding Mini App 2026 (Bảng A – Công Nghệ)
**Đội thi:** Chillandcode | **Mã tham chiếu kiểm tra chung của BTC:** `KT-004` (Dũng Phạm)  
**Kho mã nguồn GitHub:** [https://github.com/justccuong/ck_vibecoding_2026](https://github.com/justccuong/ck_vibecoding_2026)  

> Giải pháp số hóa thẻ thành viên giấy chuẩn **mô hình Starbucks Rewards** với bộ nhận diện vector độc quyền **Vibe Rewards** (100% bản quyền độc lập), hỗ trợ **Toggle chuyển đổi 2 đầu** tức thì (App Khách Hàng $\leftrightarrow$ Quầy POS Bento Grid), ví voucher tích hợp **Mã vạch Barcode SVG**, tự động sinh mã giao dịch chuẩn **`TX-KT-XXX`**, chống cộng trùng tuyệt đối và quét mã QR qua Camera ăn trọn 4 điểm thưởng.

---

## 1. Bảng Kiểm Định Hồ Sơ Nộp Bài (Tiêu Chí 9/9 Điểm)

| Tiêu chí BTC | Trọng số | Minh chứng & Đường dẫn | Đánh giá |
|---|:---:|---|:---:|
| **1. Link demo / Cách mở** | **2đ** | Deploy Vercel HTTPS hoặc khởi chạy cục bộ bằng `npm run dev` tại `http://localhost:5173` | Xuất sắc |
| **2. Source code đầy đủ** | **3đ** | Kho GitHub `ck_vibecoding_2026`, TypeScript Strict, sạch sẽ, khớp 100% bản demo | Xuất sắc |
| **3. README hướng dẫn** | **2đ** | Đầy đủ kiến trúc, hướng dẫn chạy, dữ liệu mẫu và các ca kiểm tra trọng tâm | Xuất sắc |
| **4. Minh chứng thời điểm chốt** | **2đ** | Tệp [MINH_CHUNG_QUA_TRINH.md](file:///e:/_FPT_UNI_/Ki_4/vibecoding_2026/02_competition_starter_kit/MINH_CHUNG_QUA_TRINH.md) ghi nhận log commit Git và bảng kiểm thử | Xuất sắc |
| **TỔNG ĐIỂM HỒ SƠ** | **9 / 9đ** | Đạt điểm tuyệt đối theo barem công khai của Ban Tổ Chức | **Xuất sắc** |

---

## 2. Kiến Trúc 2 Đầu & Bố Cục Thích Ứng (Responsive Pro Max)

Ứng dụng được thiết kế tối ưu cho cả màn hình điện thoại (Mobile-First) lẫn màn hình máy tính của Ban Giám Khảo:

1. **Toggle Switch 2 Đầu 1-Chạm:**
   - **`[ 👤 Đầu 1: Khách Hàng ]`**: Màn hình dành cho khách hàng với Thẻ thành viên kim loại đổi màu theo 3 hạng (Đồng/Bạc/Vàng), mã QR cá nhân, thanh tiến độ sao và **mặc định mở ngay tab "Đổi ưu đãi"**.
   - **`[ 💳 Đầu 2: Quầy POS ]`**: Bảng điều khiển thu ngân Bento Grid tối giản, nhập tiền hoặc chọn phím tắt tiền nhanh, tự sinh mã `TX-KT-XXX`, chống cộng trùng và cập nhật thẻ thời gian thực.
2. **Bố Cục Thích Ứng (Responsive):**
   - **Khi màn ngang / Desktop / Laptop:** Tự động chia **2 cột** khoa học:
     - **Cột trái:** Thẻ thành viên số VIP thời gian thực + Banner menu đồ uống đặc quyền + Thống kê hội viên.
     - **Cột phải:** Bảng đổi ưu đãi đồ uống/voucher dạng lưới (`xl:grid-cols-2`), Ví voucher có **Mã vạch Barcode**, hoặc Sổ nhật ký biến động điểm.
   - **Khi trên Điện thoại (Phone / F12 mobile):** Tự động chuyển thành **1 cột dọc mượt mà**, tối ưu thao tác bằng một tay.
3. **Thanh chọn thành viên tinh gọn (Compact & No-Wrap):**
   - 1 dòng duy nhất, không bị gãy giao diện, tích hợp chọn nhanh 8 thành viên mẫu của BTC (`KT-001` &rarr; `KT-008`) kèm nút *Đăng ký mới* và *Mốc hạng*.

---

## 3. Nghiệp Vụ Lõi Đột Phá

1. **Mã Giao Dịch Tự Động Sinh Chuẩn `TX-KT-XXX`:**
   - Hệ thống tự động tính toán số giao dịch cao nhất và sinh sẵn mã kế tiếp chuẩn: `TX-KT-008`, `TX-KT-009`, `TX-KT-010`,...
   - Sau mỗi lần tích điểm thành công, mã giao dịch tiếp theo tự động sinh sẵn cho đơn sau.
   - **Cơ chế Chống cộng trùng:** Nếu nhập tay hoặc dán lại mã giao dịch cũ (như `TX-KT-002`), hệ thống lập tức hiển thị cảnh báo đỏ và khóa nút tích điểm.
2. **Ví Voucher Tích Hợp Mã Vạch Barcode SVG Chuẩn:**
   - Mỗi voucher trong ví thành viên hiển thị **Mã vạch Barcode SVG** sắc nét (Code128 offline), sẵn sàng cho máy quét quang học tại quầy.
   - Nút **"Dùng tại quầy"** chuyển trạng thái sang *Đã sử dụng* kèm hiệu ứng pháo hoa.
3. **Mặc Định Tab "Đổi Ưu Đãi":**
   - Ngay khi vào app khách hàng, tab **"Đổi ưu đãi"** mở sẵn để giám khảo thấy ngay các voucher chuẩn và menu thức uống tuyệt đẹp.
4. **Điểm Thưởng Quét QR Bằng Camera (+4 Điểm Thưởng):**
   - Tích hợp module camera quét QR code trực tiếp, nhận diện mã thành viên trong 0.2 giây và tự động điền vào quầy POS.

---

## 4. Tỷ Lệ Quy Đổi Điểm & 3 Mốc Hạng Thành Viên

* **Tỷ lệ tích điểm tại quầy:** Cứ **10.000 VNĐ** chi tiêu = Tích lũy **1 điểm (Star)**.
* **Mốc hạng tự động:**
  - **Hạng Đồng (Bronze Member):** Dưới 1.000 điểm tích lũy (0 – 999 điểm). Thẻ màu đồng sang trọng.
  - **Hạng Bạc (Silver Member):** Từ 1.000 đến 4.999 điểm tích lũy. Thẻ màu bạc kim loại ánh kim.
  - **Hạng Vàng (Gold VIP Member):** Từ 5.000 điểm tích lũy trở lên. Thẻ vàng kim cao cấp với chữ trầm `#1E3932`.

---

## 5. Hướng Dẫn Cài Đặt & Chạy Cục Bộ

```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Khởi chạy ứng dụng (Mặc định mở tại port 5173 hoặc 5175)
npm run dev

# 3. Build kiểm thử Production (Tạo thư mục dist)
npm run build
```

---

## 6. Hồ Sơ Nộp Bài
* File hướng dẫn nộp bài nhanh: [HO_SO_NOP_BAI_CHUNG_KET.md](file:///e:/_FPT_UNI_/Ki_4/vibecoding_2026/02_competition_starter_kit/HO_SO_NOP_BAI_CHUNG_KET.md)
* File minh chứng quá trình: [MINH_CHUNG_QUA_TRINH.md](file:///e:/_FPT_UNI_/Ki_4/vibecoding_2026/02_competition_starter_kit/MINH_CHUNG_QUA_TRINH.md)
