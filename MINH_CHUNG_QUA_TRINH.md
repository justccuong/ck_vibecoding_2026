# BẢN MINH CHỨNG QUÁ TRÌNH PHÁT TRIỂN & CHỐT SẢN PHẨM
### Cuộc Thi Vibe Coding Mini App 2026 · Vòng Chung Kết (Bảng A – Công Nghệ)
**Đội thi:** Chillandcode  
**Đề tài:** Hệ thống thẻ thành viên 2 đầu (App Khách Hàng & Quầy Thu Ngân POS)  
**Thời điểm chốt sản phẩm:** 17/11/2026  
**Mã nguồn chính thức:** [https://github.com/justccuong/ck_vibecoding_2026](https://github.com/justccuong/ck_vibecoding_2026)  

---

## 1. Nhật Ký Cam Kết Mã Nguồn (Git Commit History)

Toàn bộ quá trình phát triển được kiểm soát phiên bản qua Git và đẩy trực tiếp lên GitHub:

```bash
* a207fdb (HEAD -> main, origin/main) feat: responsive 2-column layout & replace all emojis with lucide SVG icons
* e2f81fc feat: Vibe Rewards 2-Head Membership System - Vibe Coding 2026 Finals
* a873bf2 init: competition starter kit with Starbucks design system & BTC data
```

- **Mốc 0 - Khởi tạo dự án:** Cấu hình dự án với React 18, TypeScript, Tailwind CSS, nạp bộ dữ liệu mẫu Excel từ BTC (`Du_lieu_mau_Vibe_Coding_bangA.xlsx`).
- **Mốc 1 - Nghiệp vụ lõi:** Hoàn thiện phân hệ 2 đầu (Khách hàng & Quầy POS), tự động phân hạng 3 mốc (Đồng / Bạc / Vàng), chống cộng trùng giao dịch, đổi ưu đãi kèm mã vạch Barcode SVG Code128, tính năng quét QR Camera (+4 điểm thưởng).
- **Mốc 2 - Tối ưu UI/UX & Responsive:** Bố cục linh hoạt 2 cột trên máy tính/màn ngang (Thẻ bên trái, Đổi ưu đãi đồ uống bên phải), tự động xếp 1 cột dọc trên điện thoại; thay thế 100% biểu tượng bằng Lucide Vector SVG nguyên bản không bản quyền.

---

## 2. Kiến Trúc Mã Nguồn & Công Nghệ Sử Dụng

```
ck_vibecoding_2026/
├── public/
│   ├── assets/images/illustrations/ (Brand Logo SVG độc quyền, Leafs background)
│   └── assets/images/products/      (Ảnh đồ uống chất lượng cao)
├── src/
│   ├── components/
│   │   ├── brand/
│   │   │   └── BrandLogo.tsx        (Logo Vector SVG riêng biệt, tránh bản quyền Starbucks)
│   │   ├── peripherals/
│   │   │   └── QrScannerModal.tsx   (Module quét QR Camera bằng html5-qrcode)
│   │   ├── starbucks/
│   │   │   ├── CashierPOS.tsx       (Đầu 2: Quầy POS, sinh mã TX-KT-XXX, bàn phím số)
│   │   │   ├── MemberRegistrationModal.tsx (Đăng ký thành viên mới)
│   │   │   ├── PointHistoryView.tsx (Sổ nhật ký biến động điểm)
│   │   │   ├── RewardRedeem.tsx     (Đổi đồ uống, voucher & Ví mã vạch Barcode)
│   │   │   ├── StarbucksCard.tsx    (Thẻ thành viên số, 3 gradient, QR cá nhân)
│   │   │   ├── StarbucksDrinkShowcaseModal.tsx (Menu đồ uống khám phá)
│   │   │   ├── TierRulesModal.tsx   (Modal thể lệ mốc hạng & tỷ lệ quy đổi)
│   │   │   └── TierUpgradeModal.tsx (Hiệu ứng chúc mừng thăng hạng tự động)
│   │   └── ui/
│   │       ├── BarcodeView.tsx      (Bộ sinh mã vạch Barcode Code128 SVG)
│   │       └── Toast.tsx            (Thông báo hệ thống)
│   ├── data/
│   │   └── btcSampleData.ts         (Dữ liệu mẫu chuẩn file BTC: KT-001 -> KT-008)
│   ├── store/
│   │   └── useStarbucksStore.ts     (Quản lý trạng thái Zustand + LocalStorage)
│   ├── App.tsx                      (Điều hướng 2 đầu Toggle, bố cục Responsive)
│   └── main.tsx
├── vercel.json                      (Cấu hình deploy Vercel SPA)
├── README.md                        (Tài liệu hướng dẫn & Bảng kiểm thử)
└── package.json
```

---

## 3. Bảng Kiểm Thử Thực Tế Các Nghiệp Vụ Trọng Tâm

| STT | Nghiệp vụ kiểm tra | Dữ liệu đầu vào | Kết quả hệ thống thực tế | Đánh giá |
|:---:|---|---|---|:---:|
| 1 | **Nạp dữ liệu mẫu BTC** | Bấm nút "Nạp dữ liệu mẫu" | Khôi phục 8 thành viên từ `KT-001` đến `KT-008` đúng bảng đề bài | **ĐẠT** |
| 2 | **Kiểm tra mã chuẩn KT-004** | Chọn thành viên KT-004 (Dũng Phạm) | Hiển thị Hạng Bạc (3.200 Stars), QR Code cá nhân chính xác | **ĐẠT** |
| 3 | **Cộng điểm tại quầy** | Nhập `1.000.000đ` cho `KT-008` (0 Stars) | Sinh mã `TX-KT-008`, cộng đúng 100 Stars, thẻ cập nhật tức thì | **ĐẠT** |
| 4 | **Chống cộng trùng mã GD** | Nhập lại mã đã cộng `TX-KT-008` | Hệ thống báo lỗi đỏ: *Mã giao dịch đã tồn tại*, khóa nút bấm | **ĐẠT** |
| 5 | **Đổi ưu đãi & Ví voucher** | Đổi Voucher 500 Stars cho `KT-005` (5.800 Stars) | Trừ đúng 500 Stars, xuất hiện voucher trong ví kèm **Mã vạch Barcode** | **ĐẠT** |
| 6 | **Quét QR Camera (+4đ thưởng)** | Bấm icon quét QR, hướng camera vào mã | Nhận diện tức thì mã thành viên và tự động điền vào quầy thu ngân | **ĐẠT (+4đ)** |
| 7 | **Tự động thăng hạng** | Tích điểm vượt ngưỡng 5.000 Stars | Thẻ tự động chuyển sang màu Vàng VIP + bắn pháo hoa chúc mừng | **ĐẠT** |

---

## 4. Xác Nhận Đội Thi
- Đội thi **Chillandcode** cam kết sản phẩm được xây dựng trung thực theo thời gian quy định, đáp ứng 100% yêu cầu đề bài Chung kết Bảng A Công nghệ.
- Đã sẵn sàng trình chiếu và phản biện trước Ban Giám Khảo.
