# KỊCH BẢN THUYẾT TRÌNH CHUNG KẾT VIBE CODING 2026
## HỆ THỐNG THẺ THÀNH VIÊN 2 ĐẦU (STARBUCKS REWARDS STYLE)
### BẢNG A – CÔNG NGHỆ

> **Hướng dẫn sử dụng cho Canva Pro:**
> 1. Mở Canva -> Chọn **Tạo thiết kế** -> **Thuyết trình (16:9)** hoặc dùng tính năng **Canva Magic Design**.
> 2. Chọn Template phong cách: **Modern Corporate / Minimalist Green / Tech Product Launch**.
> 3. Mã màu thương hiệu (Brand Kit Canva):
>    - Primary Green: `#006241`
>    - House Green: `#1E3932`
>    - Accent Lime: `#7EC518`
>    - Starbucks Gold: `#D4AF37`
>    - Warm Cream Neutral: `#F7F5F0`
> 4. Copy nội dung bên dưới dán thẳng vào từng trang slide.

---

## SLIDE 1: TRANG BÌA & KHỞI ĐỘNG (COVER & HOOK)

### Thông tin trên Slide:
- **Tiêu đề lớn:** STARBUCKS REWARDS DIGITAL
- **Tiêu đề phụ:** Hệ Thống Thẻ Thành Viên 2 Đầu (Khách Hàng & Quầy POS)
- **Đơn vị & Bảng thi:** Vibe Coding 2026 – Vòng Chung Kết Toàn Quốc | Bảng A – Công Nghệ
- **Thí sinh:** Đội thi Bảng A
- **Slogan / Hook:** *"Số hóa thẻ giấy toàn diện – Trải nghiệm tích đổi sao thời gian thực chuẩn Starbucks Mobile"*
- **Hình ảnh minh họa Canva:** Mockup điện thoại hiển thị thẻ thành viên ánh kim Gold VIP và chiếc máy POS thu ngân tối giản.

### Lời thoại thuyết trình (Speaker Notes - 30 giây):
> *"Kính thưa Ban giám khảo và toàn thể hội đồng!*  
> *Rất nhiều chuỗi bán lẻ hiện nay vẫn gặp bài toán nan giải: thẻ tích điểm giấy dễ rách, dễ mất, nhân viên ghi tay chậm chạp và doanh nghiệp thì thất thoát dữ liệu. Đến với vòng Chung kết hôm nay, đội em mang đến giải pháp **Starbucks Rewards Digital** – một hệ thống thẻ thành viên 2 đầu chạy song song trên nền tảng Web App tốc độ cao: Một đầu dành riêng cho Khách hàng tích sao đổi quà, và một đầu dành cho Thu ngân quầy POS thao tác trong 3 giây. Sau đây xin kính mời Ban giám khảo cùng khám phá kiến trúc và sản phẩm!"*

---

## SLIDE 2: BÀI TOÁN & KIẾN TRÚC 2 ĐẦU (ARCHITECTURE & WORKFLOW)

### Bố cục Slide (Canva Layout: 2 Cột so sánh):
- **Cột Trái (ĐẦU 1: KHÁCH HÀNG - MEMBER APP):**
  - **Mô tả:** Ứng dụng di động cá nhân hóa cho khách hàng.
  - **Tính năng nổi bật:**
    - Thẻ thành viên số hóa đổi màu thời gian thực theo 3 hạng.
    - Mã QR định danh cá nhân độc bản (`KT-00X`).
    - Thanh tiến độ vạch mốc sao trực quan (0 -> 1.000 -> 5.000 Stars).
    - Ví ưu đãi tích hợp **Mã vạch Barcode chuẩn Code128** chống gian lận.
    - Bộ sưu tập đổi đồ uống Starbucks chân thực độ phân giải cao.

- **Cột Phải (ĐẦU 2: QUẦY THU NGÂN - CASHIER POS):**
  - **Mô tả:** Bảng điều khiển thu ngân tốc độ cao kiểu Bento Grid.
  - **Tính năng nổi bật:**
    - Quy tắc chuẩn: **10.000 VNĐ = 1 Star**.
    - **Tự động sinh mã giao dịch chuẩn `TX-KT-XXX`**.
    - **Cơ chế Chống cộng trùng 100%**: Phát hiện và khóa ngay lập tức nếu nhập trùng mã giao dịch cũ.
    - **Camera QR Scanner ngoại vi (+4đ thưởng)**: Quét nhận diện hồ sơ thành viên trong 0.5 giây.

### Lời thoại thuyết trình (Speaker Notes - 45 giây):
> *"Điểm đặc sắc đầu tiên của sản phẩm là kiến trúc **2 đầu trong cùng một ứng dụng**. Bằng thanh Toggle thông minh, người dùng có thể chuyển đổi vai tức thì:*  
> *Ở **Đầu Khách Hàng**, khách được cầm trong tay một chiếc thẻ thành viên kim loại có hiệu ứng ánh kim lấp lánh, biết chính xác mình còn bao nhiêu điểm để lên hạng Vàng, và có một ví voucher với mã vạch Barcode sắc nét.*  
> *Ở **Đầu Quầy Thu Ngân**, nhân viên không cần mất thời gian gõ số. Hệ thống tự động sinh sẵn mã giao dịch chuẩn `TX-KT-XXX`. Nếu ai đó cố tình nhập lại mã giao dịch cũ như `TX-KT-002`, hệ thống lập tức báo đỏ chặn đứng, đảm bảo tính toàn vẹn tài chính 100%."*

---

## SLIDE 3: NGHIỆP VỤ LÕI - 3 HẠNG THẺ & VÍ VOUCHER BARCODE

### Bố cục Slide (Canva Layout: 3 Thẻ Hạng Card + 1 Callout Ví Voucher):
- **Hạng Đồng (Bronze):** < 1.000 Stars
  - Tone màu: Nâu đồng ánh trầm `#8C5A3C`.
  - Mặc định cho mọi thành viên đăng ký mới.
- **Hạng Bạc (Silver):** 1.000 – 4.999 Stars
  - Tone màu: Ánh bạc kim loại `#94A3B8`.
  - Tự động kích hoạt thông báo chúc mừng thăng hạng.
- **Hạng Vàng VIP (Starbucks Gold):** $\ge$ 5.000 Stars
  - Tone màu: Vàng Gold hoàng gia `#D4AF37` kèm chữ tối `#1E3932`.
  - Đặc quyền cao cấp nhất.
- **Khối Tính Năng Nổi Bật: Ví Voucher Barcode & Đổi Thưởng:**
  - Giữ nguyên 100% 3 mức đổi voucher chuẩn của BTC (`KT-VCH-01`, `KT-VCH-02`, `KT-VCH-03`) và bổ sung 5 món đồ uống cao cấp.
  - Mỗi voucher trong ví đều sinh **Mã vạch Barcode SVG nội bộ** để thu ngân quét máy quang học, kèm nút *Dùng tại quầy* cập nhật trạng thái tức thì.

### Lời thoại thuyết trình (Speaker Notes - 45 giây):
> *"Về logic nghiệp vụ, ứng dụng giải quyết triệt để yêu cầu đề bài:*  
> *Thứ nhất, hệ thống tự động tính điểm và **đổi màu thẻ thời gian thực** qua 3 cấp bậc: Đồng, Bạc và Vàng VIP. Khi khách tích đủ điểm, hiệu ứng thăng hạng sẽ bùng nổ cùng pháo hoa.*  
> *Thứ hai, luồng đổi ưu đãi được thiết kế khép kín: Khách đổi sao lấy voucher hoặc ly cà phê, điểm lập tức bị trừ đúng tỉ lệ, và một chiếc vé điện tử mang **mã vạch Barcode** sẽ xuất hiện ngay trong ví. Khi mang ra quầy, thu ngân xác nhận 'Dùng tại quầy' thì voucher chuyển sang trạng thái đã sử dụng, không thể tái dùng."*

---

## SLIDE 4: TỐI ƯU CÔNG NGHỆ, NGOẠI VI & CHUẨN OFFLINE (+4Đ THƯỞNG)

### Bố cục Slide (Canva Layout: 4 Hộp Tính Năng Icon Tech):
1. **Camera QR Ngoại Vi (+4 Điểm Thưởng BTC):**
   - Tích hợp HTML5 Camera Scanner quét trực tiếp mã QR trên thẻ thành viên thật.
   - Nhận diện tức thì mã tham chiếu chuẩn của BTC: **`KT-004` (Dũng Phạm)**.
2. **Local-First & Offline 100%:**
   - Hoàn toàn độc lập, không cần kết nối mạng Internet hay máy chủ ngoài.
   - Toàn bộ phông chữ Montserrat và icon SVG Lucide được bundle cục bộ.
3. **Nạp Dữ Liệu Mẫu BTC 1-Click:**
   - Tích hợp sẵn 8 thành viên, 7 giao dịch gốc, lịch sử biến động và 5 ca test từ file Excel chính thức `Du_lieu_mau_Vibe_Coding_bangA.xlsx`.
4. **Mobile Responsive Hoàn Hảo:**
   - Chuẩn di động 360px – 390px, thao tác cảm ứng $\ge 44$px, không bao giờ bị vỡ khung hay cuộn ngang.

### Lời thoại thuyết trình (Speaker Notes - 40 giây):
> *"Thưa Ban giám khảo, tiêu chí của cuộc thi Vibe Coding là sản phẩm phải chạy mượt mà tại chỗ và tin cậy tuyệt đối.*  
> *Ứng dụng của chúng em được xây dựng theo kiến trúc **Local-First**: Dữ liệu lưu bền vững trong LocalStorage, bundle phông chữ Montserrat nội bộ, hoạt động 100% không cần Internet.*  
> *Đặc biệt, để giành trọn **4 điểm thưởng thiết bị ngoại vi**, chúng em đã tích hợp module **Quét QR bằng Camera thực tế**, quét khớp 100% mã kiểm tra `KT-004` của Ban giám khảo. Bên cạnh đó, nút 'Nạp dữ liệu mẫu BTC' sẵn sàng phục hồi lại toàn bộ dữ liệu gốc của đề thi chỉ sau 1 cú nhấp chuột."*

---

## SLIDE 5: KỊCH BẢN DEMO THỰC CHIẾN (VƯỢT QUA 5 CA TEST BTC)

### Bố cục Slide (Canva Layout: Bảng Checklist 5 Bước Demo):

| Ca Test | Thao tác Demo trước mặt Ban Giám Khảo | Kết quả hiển thị tức thì | Trạng thái |
|---|---|---|:---:|
| **TC-KT-01** | Chọn thành viên **KT-008** (Phúc Hoàng, 0 sao) $\rightarrow$ Nhập tiền **1.000.000đ** $\rightarrow$ Mã `TX-KT-008` | Cộng đúng **100 Stars**, số dư nhảy từ 0 lên 100 Stars |  Đạt |
| **TC-KT-02** | Thử nhập lại mã giao dịch cũ **`TX-KT-002`** cho KT-002 | Hệ thống **báo đỏ cảnh báo chống trùng**, nút tích điểm bị khóa |  Đạt |
| **TC-KT-03** | Thành viên **KT-005** (5.800 sao) đổi Voucher `KT-VCH-01` (500 sao) | Trừ đúng 500 sao (còn 5.300), xuất hiện voucher **mã Barcode trong ví** |  Đạt |
| **TC-KT-04** | Thành viên **KT-008** (0 sao) thử đổi Voucher 500 sao | Hệ thống **từ chối do không đủ điểm**, giữ nguyên số dư 0 sao |  Đạt |
| **TC-KT-05** | Bật Camera quét mã QR tham chiếu **`KT-004`** | Nhận diện trong 0.5s $\rightarrow$ Mở ngay hồ sơ **Dũng Phạm** |  Đạt (+4đ) |

### Lời thoại thuyết trình (Speaker Notes - 60 giây):
> *"Để chứng minh sản phẩm không chỉ là giao diện mẫu mà là phần mềm chạy thật 100%, em xin phép thực hiện trực tiếp **5 Ca kiểm tra chuẩn của Ban giám khảo** ngay trên màn hình:*  
> *(Thao tác click) Ca 1: Em cộng 1 triệu cho bạn Phúc Hoàng KT-008, số dư lập tức cộng 100 Stars!*  
> *(Thao tác click) Ca 2: Em nhập mã cũ TX-KT-002, hệ thống lập tức báo đỏ chặn lại, không cho cộng trùng!*  
> *(Thao tác click) Ca 3: Thành viên KT-005 đổi voucher 500 sao, số dư giảm còn 5.300 sao và một mã Barcode đã nằm trong ví!*  
> *(Thao tác click) Ca 4: Thành viên 0 sao bấm đổi thì hệ thống từ chối ngay lập tức!*  
> *(Thao tác đưa QR camera) Ca 5: Em đưa mã QR KT-004 vào camera máy tính, hồ sơ anh Dũng Phạm lập tức xuất hiện! Toàn bộ 5 ca test đều đạt kết quả xuất sắc!"*

---

## SLIDE 6: KẾT LUẬN & ĐỊNH HƯỚNG MỞ RỘNG (VALUE & CONCLUSION)

### Bố cục Slide (Canva Layout: 3 Cột Lợi Ích & Lời Cảm Ơn):
- **Giá Trị Cho Khách Hàng:**
  - Trải nghiệm tích điểm sang trọng như Starbucks toàn cầu, minh bạch số dư, voucher tiện dụng.
- **Giá Trị Cho Doanh Nghiệp:**
  - Tiết kiệm 100% chi phí in thẻ giấy, chống gian lận cộng khống doanh thu, quản trị dữ liệu tập trung.
- **Khả Năng Mở Rộng Tiếp Theo:**
  - Kết nối máy in hóa đơn nhiệt ESC/POS qua Bluetooth/USB.
  - Xuất thẻ vào ví điện tử Apple Wallet / Google Wallet.
- **Chốt Hạ:**
  - *"Sản phẩm hoàn thiện 100% nghiệp vụ lõi + Tối đa điểm thưởng ngoại vi + Giao diện Redesign chuẩn quốc tế."*
  - **XIN CHÂN THÀNH CẢM ƠN BAN GIÁM KHẢO! SẴN SÀNG CHO PHẦN Q&A.**

### Lời thoại thuyết trình (Speaker Notes - 30 giây):
> *"Kính thưa Ban giám khảo, chỉ trong thời gian 60 phút thi đấu, em đã hoàn thành một ứng dụng web trọn vẹn 2 đầu, đáp ứng toàn bộ tiêu chí từ nghiệp vụ lõi, bảo mật chống cộng trùng, đến trải nghiệm người dùng cao cấp chuẩn Starbucks. Ứng dụng đã sẵn sàng triển khai thực tế cho các chuỗi cà phê và bán lẻ.*  
> *Em xin kết thúc phần trình bày tại đây và rất mong nhận được những câu hỏi phản biện từ Ban giám khảo. Em xin cảm ơn!"*
