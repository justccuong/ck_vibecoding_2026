// ============================================================================
// TEMPLATE DỮ LIỆU BAN ĐẦU (DÙNG ĐỂ PASTE DỮ LIỆU BTC PHÁT TẠI GIỜ THI)
// Khi BTC phát đề và file mẫu, bạn chỉ việc thay đổi cấu trúc mảng bên dưới.
// ============================================================================

export interface SampleItem {
  id: string;
  name: string;
  category: string;
  status: 'Sẵn sàng' | 'Đang xử lý' | 'Hoàn thành' | 'Tạm dừng';
  value: number;
  note: string;
}

export const INITIAL_SAMPLE_ITEMS: SampleItem[] = [
  {
    id: 'ITEM-01',
    name: 'Mục mẫu số 1',
    category: 'Nhóm A',
    status: 'Sẵn sàng',
    value: 50000,
    note: 'Dữ liệu mẫu ban đầu do BTC cung cấp',
  },
  {
    id: 'ITEM-02',
    name: 'Mục mẫu số 2',
    category: 'Nhóm B',
    status: 'Đang xử lý',
    value: 75000,
    note: 'Kiểm thử trạng thái đang hoạt động',
  },
  {
    id: 'ITEM-03',
    name: 'Mục mẫu số 3',
    category: 'Nhóm A',
    status: 'Hoàn thành',
    value: 120000,
    note: 'Hoàn tất quy trình xử lý',
  },
  {
    id: 'ITEM-04',
    name: 'Mục mẫu số 4',
    category: 'Nhóm C',
    status: 'Tạm dừng',
    value: 30000,
    note: 'Đang tạm dừng hoặc bảo trì',
  },
];
