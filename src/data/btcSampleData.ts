// Dữ liệu mẫu chuẩn 100% từ file Du_lieu_mau_Vibe_Coding_bangA.xlsx của BTC

export interface Member {
  id: string; // MaThanhVien (vd: KT-001)
  name: string; // HoTen
  phone: string; // DienThoai
  initialPoints: number; // DiemDauKy
  points: number; // DiemHienTai
  tier: 'Đồng' | 'Bạc' | 'Vàng';
  status: string;
  joinedDate: string;
  qrPayload: string;
}

export interface Transaction {
  transactionId: string; // MaGiaoDich (vd: TX-KT-001)
  type: 'Cộng điểm' | 'Đổi ưu đãi';
  memberId: string;
  time: string;
  amountVnd: number;
  pointChange: number;
  balanceAfter: number;
  note: string;
}

export interface Reward {
  id: string; // MaUuDai (vd: KT-VCH-01)
  name: string; // TenUuDai
  description: string;
  pointsRequired: number;
  status: string;
  image?: string;
  flavor?: string;
  rating?: number;
  category?: 'drink' | 'voucher';
}

export interface PointHistory {
  id: string;
  memberId: string;
  type: string;
  pointChange: number;
  time: string;
  balanceAfter: number;
  transactionId: string;
}

export interface TestCase {
  id: string;
  scenario: string;
  memberId: string;
  targetRef: string;
  amountVnd: number;
  input: string;
  expected: string;
}

export interface UserVoucher {
  id: string;
  rewardId: string;
  rewardName: string;
  memberId: string;
  code: string;
  redeemedAt: string;
  status: 'Chưa dùng' | 'Đã dùng';
}

export const INITIAL_MEMBERS: Member[] = [
  {
    "id": "KT-001",
    "name": "An Nguyễn",
    "phone": "0900001001",
    "initialPoints": 200,
    "points": 250,
    "tier": "Đồng",
    "status": "Đang hoạt động",
    "joinedDate": "2026-09-05",
    "qrPayload": "KT-001"
  },
  {
    "id": "KT-002",
    "name": "Bình Trần",
    "phone": "0900001002",
    "initialPoints": 1300,
    "points": 1450,
    "tier": "Bạc",
    "status": "Đang hoạt động",
    "joinedDate": "2026-08-17",
    "qrPayload": "KT-002"
  },
  {
    "id": "KT-003",
    "name": "Chi Lê",
    "phone": "0900001003",
    "initialPoints": 1000,
    "points": 800,
    "tier": "Đồng",
    "status": "Đang hoạt động",
    "joinedDate": "2026-07-22",
    "qrPayload": "KT-003"
  },
  {
    "id": "KT-004",
    "name": "Dũng Phạm",
    "phone": "0900001004",
    "initialPoints": 3000,
    "points": 3200,
    "tier": "Bạc",
    "status": "Đang hoạt động",
    "joinedDate": "2026-06-14",
    "qrPayload": "KT-004"
  },
  {
    "id": "KT-005",
    "name": "Hà Võ",
    "phone": "0900001005",
    "initialPoints": 5000,
    "points": 5800,
    "tier": "Vàng",
    "status": "Đang hoạt động",
    "joinedDate": "2026-04-09",
    "qrPayload": "KT-005"
  },
  {
    "id": "KT-006",
    "name": "Minh Đỗ",
    "phone": "0900001006",
    "initialPoints": 12000,
    "points": 12500,
    "tier": "Vàng",
    "status": "Đang hoạt động",
    "joinedDate": "2026-02-28",
    "qrPayload": "KT-006"
  },
  {
    "id": "KT-007",
    "name": "Ngọc Bùi",
    "phone": "0900001007",
    "initialPoints": 4000,
    "points": 4700,
    "tier": "Bạc",
    "status": "Đang hoạt động",
    "joinedDate": "2026-03-11",
    "qrPayload": "KT-007"
  },
  {
    "id": "KT-008",
    "name": "Phúc Hoàng",
    "phone": "0900001008",
    "initialPoints": 0,
    "points": 0,
    "tier": "Đồng",
    "status": "Đang hoạt động",
    "joinedDate": "2026-10-10",
    "qrPayload": "KT-008"
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    "transactionId": "TX-KT-001",
    "type": "Cộng điểm",
    "memberId": "KT-001",
    "time": "2026-10-03 09:15",
    "amountVnd": 500000,
    "pointChange": 50,
    "balanceAfter": 250,
    "note": "Dữ liệu mẫu đã ghi nhận"
  },
  {
    "transactionId": "TX-KT-002",
    "type": "Cộng điểm",
    "memberId": "KT-002",
    "time": "2026-10-04 11:40",
    "amountVnd": 1500000,
    "pointChange": 150,
    "balanceAfter": 1450,
    "note": "Dữ liệu mẫu đã ghi nhận"
  },
  {
    "transactionId": "TX-KT-003",
    "type": "Đổi ưu đãi",
    "memberId": "KT-003",
    "time": "2026-10-05 14:05",
    "amountVnd": 0,
    "pointChange": -200,
    "balanceAfter": 800,
    "note": "Dữ liệu mẫu đã ghi nhận"
  },
  {
    "transactionId": "TX-KT-004",
    "type": "Cộng điểm",
    "memberId": "KT-004",
    "time": "2026-10-06 18:20",
    "amountVnd": 2000000,
    "pointChange": 200,
    "balanceAfter": 3200,
    "note": "Dữ liệu mẫu đã ghi nhận"
  },
  {
    "transactionId": "TX-KT-005",
    "type": "Cộng điểm",
    "memberId": "KT-005",
    "time": "2026-10-08 10:30",
    "amountVnd": 8000000,
    "pointChange": 800,
    "balanceAfter": 5800,
    "note": "Dữ liệu mẫu đã ghi nhận"
  },
  {
    "transactionId": "TX-KT-006",
    "type": "Cộng điểm",
    "memberId": "KT-006",
    "time": "2026-10-09 16:10",
    "amountVnd": 5000000,
    "pointChange": 500,
    "balanceAfter": 12500,
    "note": "Dữ liệu mẫu đã ghi nhận"
  },
  {
    "transactionId": "TX-KT-007",
    "type": "Cộng điểm",
    "memberId": "KT-007",
    "time": "2026-10-11 12:55",
    "amountVnd": 7000000,
    "pointChange": 700,
    "balanceAfter": 4700,
    "note": "Dữ liệu mẫu đã ghi nhận"
  }
];

export const INITIAL_REWARDS: Reward[] = [
  {
    "id": "KT-VCH-01",
    "name": "Voucher 20.000đ",
    "description": "Giảm giá hóa đơn đồ uống trực tiếp",
    "pointsRequired": 500,
    "status": "Đang áp dụng",
    "category": "voucher"
  },
  {
    "id": "KT-VCH-02",
    "name": "Voucher 50.000đ",
    "description": "Giảm giá mọi đơn hàng trên toàn hệ thống",
    "pointsRequired": 1100,
    "status": "Đang áp dụng",
    "category": "voucher"
  },
  {
    "id": "KT-VCH-03",
    "name": "Ly sứ kỷ niệm phiên bản giới hạn",
    "description": "Quà tặng ly sứ cao cấp phiên bản kỷ niệm",
    "pointsRequired": 2000,
    "status": "Đang áp dụng",
    "category": "voucher"
  },
  {
    "id": "SB-DRK-01",
    "name": "Marshmallow Frappuccino",
    "description": "Marshmallow whipped cream, milk chocolate sauce, coffee milk",
    "pointsRequired": 400,
    "status": "Đang áp dụng",
    "image": "/assets/images/products/frappuccino.png",
    "flavor": "Marshmallow",
    "rating": 5,
    "category": "drink"
  },
  {
    "id": "SB-DRK-02",
    "name": "Signature Café Latte",
    "description": "Dark rich espresso balanced with steamed milk and light foam",
    "pointsRequired": 300,
    "status": "Đang áp dụng",
    "image": "/assets/images/products/cafelatte.png",
    "flavor": "Chocolate",
    "rating": 4,
    "category": "drink"
  },
  {
    "id": "SB-DRK-03",
    "name": "Caramel Macchiato",
    "description": "Steamed milk with vanilla syrup, espresso and caramel drizzle",
    "pointsRequired": 350,
    "status": "Đang áp dụng",
    "image": "/assets/images/products/macchiato.png",
    "flavor": "Caramel",
    "rating": 4,
    "category": "drink"
  },
  {
    "id": "SB-DRK-04",
    "name": "Pure Espresso Roast",
    "description": "Signature Espresso Roast with rich flavor and caramelly sweetness",
    "pointsRequired": 200,
    "status": "Đang áp dụng",
    "image": "/assets/images/products/espresso.png",
    "flavor": "Pure",
    "rating": 5,
    "category": "drink"
  },
  {
    "id": "SB-DRK-05",
    "name": "White Chocolate Mocha",
    "description": "Signature espresso with white chocolate sauce and whipped cream",
    "pointsRequired": 450,
    "status": "Đang áp dụng",
    "image": "/assets/images/products/espresso_duplo.png",
    "flavor": "Vanilla",
    "rating": 5,
    "category": "drink"
  }
];

export const INITIAL_HISTORY: PointHistory[] = [
  {
    "id": "KT-LS-001",
    "memberId": "KT-001",
    "type": "Cộng điểm",
    "pointChange": 50,
    "time": "2026-10-03 09:15",
    "balanceAfter": 250,
    "transactionId": "TX-KT-001"
  },
  {
    "id": "KT-LS-002",
    "memberId": "KT-002",
    "type": "Cộng điểm",
    "pointChange": 150,
    "time": "2026-10-04 11:40",
    "balanceAfter": 1450,
    "transactionId": "TX-KT-002"
  },
  {
    "id": "KT-LS-003",
    "memberId": "KT-003",
    "type": "Đổi điểm",
    "pointChange": -200,
    "time": "2026-10-05 14:05",
    "balanceAfter": 800,
    "transactionId": "TX-KT-003"
  },
  {
    "id": "KT-LS-004",
    "memberId": "KT-004",
    "type": "Cộng điểm",
    "pointChange": 200,
    "time": "2026-10-06 18:20",
    "balanceAfter": 3200,
    "transactionId": "TX-KT-004"
  },
  {
    "id": "KT-LS-005",
    "memberId": "KT-005",
    "type": "Cộng điểm",
    "pointChange": 800,
    "time": "2026-10-08 10:30",
    "balanceAfter": 5800,
    "transactionId": "TX-KT-005"
  },
  {
    "id": "KT-LS-006",
    "memberId": "KT-006",
    "type": "Cộng điểm",
    "pointChange": 500,
    "time": "2026-10-09 16:10",
    "balanceAfter": 12500,
    "transactionId": "TX-KT-006"
  },
  {
    "id": "KT-LS-007",
    "memberId": "KT-007",
    "type": "Cộng điểm",
    "pointChange": 700,
    "time": "2026-10-11 12:55",
    "balanceAfter": 4700,
    "transactionId": "TX-KT-007"
  }
];

export const BTC_TEST_CASES: TestCase[] = [
  {
    "id": "TC-KT-01",
    "scenario": "Cộng điểm mới",
    "memberId": "KT-008",
    "targetRef": "TX-NEW-001",
    "amountVnd": 1000000,
    "input": "10.000đ = 1 điểm",
    "expected": "Cộng 100 điểm một lần, số dư từ 0 lên 100"
  },
  {
    "id": "TC-KT-02",
    "scenario": "Nhập lại giao dịch",
    "memberId": "KT-002",
    "targetRef": "TX-KT-002",
    "amountVnd": 1500000,
    "input": "Mã này đã có trong sổ",
    "expected": "Báo trùng, không cộng thêm 150 điểm"
  },
  {
    "id": "TC-KT-03",
    "scenario": "Đổi ưu đãi đủ điểm",
    "memberId": "KT-005",
    "targetRef": "KT-VCH-01",
    "amountVnd": 0,
    "input": "Đổi 500 điểm",
    "expected": "Tạo voucher trong ví và số dư từ 5800 còn 5300"
  },
  {
    "id": "TC-KT-04",
    "scenario": "Đổi ưu đãi thiếu điểm",
    "memberId": "KT-008",
    "targetRef": "KT-VCH-01",
    "amountVnd": 0,
    "input": "Đổi 500 điểm",
    "expected": "Từ chối đổi; số dư vẫn là 0"
  },
  {
    "id": "TC-KT-05",
    "scenario": "Quét QR chuẩn của BTC",
    "memberId": "KT-004",
    "targetRef": "KT-004",
    "amountVnd": 0,
    "input": "Payload QR: KT-004",
    "expected": "Đọc đúng KT-004 và mở hồ sơ Dũng Phạm. Phần quét là điểm thưởng; không bắt buộc."
  }
];
