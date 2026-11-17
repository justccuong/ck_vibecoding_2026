import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Member,
  Transaction,
  Reward,
  PointHistory,
  UserVoucher,
  INITIAL_MEMBERS,
  INITIAL_TRANSACTIONS,
  INITIAL_REWARDS,
  INITIAL_HISTORY,
} from '../data/btcSampleData';

export interface ToastInfo {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StarbucksStore {
  // Chế độ người dùng: 'member' (Thành viên) | 'cashier' (Nhân viên Quầy)
  appMode: 'member' | 'cashier';
  setAppMode: (mode: 'member' | 'cashier') => void;

  // Thành viên đang chọn hiển thị trên thẻ
  currentMemberId: string;
  setCurrentMemberId: (id: string) => void;

  // Navigation tab
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Khung di động 360-390px
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;

  // Toast
  toast: ToastInfo | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;

  // Thông báo thăng hạng (Upgrade Modal)
  upgradedTier: string | null;
  setUpgradedTier: (tier: string | null) => void;

  // Dữ liệu chính
  members: Member[];
  transactions: Transaction[];
  rewards: Reward[];
  pointHistory: PointHistory[];
  vouchers: UserVoucher[];

  // Nghiệp vụ 1: Đăng ký thành viên mới
  registerMember: (name: string, phone: string) => { success: boolean; message: string; member?: Member };

  // Nghiệp vụ 2: Chế độ Quầy - Cộng điểm giao dịch (có chống cộng trùng)
  addPointsAtCashier: (
    memberId: string,
    amountVnd: number,
    transactionId: string
  ) => { success: boolean; message: string; pointsAdded?: number; newBalance?: number };

  // Nghiệp vụ 3: Đổi điểm lấy ưu đãi
  redeemReward: (
    memberId: string,
    rewardId: string
  ) => { success: boolean; message: string; voucher?: UserVoucher };

  // Sử dụng voucher
  useVoucher: (voucherId: string) => void;

  // Nút Nạp dữ liệu mẫu BTC
  resetToBtcData: () => void;
}

// Hàm tính hạng dựa trên điểm tích lũy theo file BTC
export const calculateTier = (points: number): 'Đồng' | 'Bạc' | 'Vàng' => {
  if (points >= 5000) return 'Vàng';
  if (points >= 1000) return 'Bạc';
  return 'Đồng';
};

export const useStarbucksStore = create<StarbucksStore>()(
  persist(
    (set, get) => ({
      appMode: 'member',
      setAppMode: (mode) => set({ appMode: mode, activeTab: mode === 'member' ? 'rewards' : 'cashier' }),

      currentMemberId: 'KT-004', // Mặc định mở KT-004 (Mã kiểm tra chung của BTC)
      setCurrentMemberId: (id) => set({ currentMemberId: id }),

      activeTab: 'rewards', // Mặc định hiển thị tab Đổi ưu đãi theo yêu cầu
      setActiveTab: (tab) => set({ activeTab: tab }),

      isMobileFrame: true,
      setIsMobileFrame: (val) => set({ isMobileFrame: val }),

      toast: null,
      showToast: (message, type = 'info') => {
        const id = Date.now();
        set({ toast: { id, message, type } });
        setTimeout(() => {
          if (get().toast?.id === id) {
            set({ toast: null });
          }
        }, 3500);
      },
      clearToast: () => set({ toast: null }),

      upgradedTier: null,
      setUpgradedTier: (tier) => set({ upgradedTier: tier }),

      members: INITIAL_MEMBERS,
      transactions: INITIAL_TRANSACTIONS,
      rewards: INITIAL_REWARDS,
      pointHistory: INITIAL_HISTORY,
      vouchers: [
        {
          id: 'VCH-INIT-01',
          rewardId: 'KT-VCH-01',
          rewardName: 'Voucher 20.000đ',
          memberId: 'KT-003',
          code: 'VC-KT003-8821',
          redeemedAt: '2026-10-05 14:05',
          status: 'Chưa dùng',
        },
      ],

      // 1. ĐĂNG KÝ THÀNH VIÊN
      registerMember: (name, phone) => {
        if (!name.trim()) {
          return { success: false, message: 'Vui lòng nhập họ và tên thành viên!' };
        }
        if (!phone.trim()) {
          return { success: false, message: 'Vui lòng nhập số điện thoại!' };
        }

        const { members } = get();
        // Kiểm tra số điện thoại trùng
        const existPhone = members.find((m) => m.phone === phone.trim());
        if (existPhone) {
          return { success: false, message: `Số điện thoại này đã được đăng ký cho thành viên ${existPhone.name} (${existPhone.id})!` };
        }

        // Tự động sinh mã thành viên duy nhất KT-00X
        const maxNum = members.reduce((max, m) => {
          const num = parseInt(m.id.replace('KT-', ''), 10);
          return isNaN(num) ? max : Math.max(max, num);
        }, 8);
        const newId = `KT-${(maxNum + 1).toString().padStart(3, '0')}`;

        const newMember: Member = {
          id: newId,
          name: name.trim(),
          phone: phone.trim(),
          initialPoints: 0,
          points: 0,
          tier: 'Đồng',
          status: 'Đang hoạt động',
          joinedDate: new Date().toISOString().split('T')[0],
          qrPayload: newId,
        };

        set({
          members: [newMember, ...members],
          currentMemberId: newId,
        });

        get().showToast(`Đăng ký thành viên ${name} thành công! Mã thẻ: ${newId}`, 'success');
        return { success: true, message: 'Đăng ký thành công', member: newMember };
      },

      // 2. CHẾ ĐỘ QUẦY: CỘNG ĐIỂM GIAO DỊCH (CHỐNG CỘNG TRÙNG)
      addPointsAtCashier: (memberId, amountVnd, transactionId) => {
        const cleanTxId = transactionId.trim().toUpperCase();
        if (!cleanTxId) {
          return { success: false, message: 'Vui lòng nhập mã giao dịch!' };
        }
        if (amountVnd <= 0) {
          return { success: false, message: 'Số tiền giao dịch phải lớn hơn 0đ!' };
        }

        const { members, transactions, pointHistory } = get();

        // CHỐNG CỘNG TRÙNG: Kiểm tra mã giao dịch đã tồn tại chưa
        const isDuplicate = transactions.some((t) => t.transactionId.toUpperCase() === cleanTxId);
        if (isDuplicate) {
          const errMsg = `Lỗi chống cộng trùng: Mã giao dịch "${cleanTxId}" đã được tích điểm trước đó!`;
          get().showToast(errMsg, 'error');
          return { success: false, message: errMsg };
        }

        const member = members.find((m) => m.id === memberId);
        if (!member) {
          return { success: false, message: `Không tìm thấy thành viên có mã "${memberId}"!` };
        }

        // Tỉ lệ: 10.000đ = 1 điểm (làm tròn số nguyên)
        const pointsAdded = Math.floor(amountVnd / 10000);
        if (pointsAdded <= 0) {
          return { success: false, message: 'Số tiền quá nhỏ (dưới 10.000đ), không đủ để cộng 1 điểm!' };
        }

        const oldPoints = member.points;
        const newPoints = oldPoints + pointsAdded;
        const oldTier = member.tier;
        const newTier = calculateTier(newPoints);

        const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

        // Tạo bản ghi giao dịch
        const newTx: Transaction = {
          transactionId: cleanTxId,
          type: 'Cộng điểm',
          memberId,
          time: now,
          amountVnd,
          pointChange: pointsAdded,
          balanceAfter: newPoints,
          note: `Tích điểm tại quầy (+${pointsAdded} điểm)`,
        };

        // Tạo bản ghi lịch sử điểm
        const historyId = `KT-LS-${(pointHistory.length + 1).toString().padStart(3, '0')}`;
        const newHist: PointHistory = {
          id: historyId,
          memberId,
          type: 'Cộng điểm',
          pointChange: pointsAdded,
          time: now,
          balanceAfter: newPoints,
          transactionId: cleanTxId,
        };

        // Cập nhật thành viên
        const updatedMembers = members.map((m) =>
          m.id === memberId ? { ...m, points: newPoints, tier: newTier } : m
        );

        set({
          members: updatedMembers,
          transactions: [newTx, ...transactions],
          pointHistory: [newHist, ...pointHistory],
        });

        // Kiểm tra nếu thăng hạng -> Kích hoạt Modal thăng hạng
        if (newTier !== oldTier) {
          set({ upgradedTier: newTier });
        }

        get().showToast(`Đã cộng +${pointsAdded} điểm cho ${member.name} (${member.id}). Số dư: ${newPoints} điểm!`, 'success');
        return { success: true, message: 'Cộng điểm thành công', pointsAdded, newBalance: newPoints };
      },

      // 3. ĐỔI ĐIỂM LẤY ƯU ĐÃI
      redeemReward: (memberId, rewardId) => {
        const { members, rewards, pointHistory, vouchers } = get();
        const member = members.find((m) => m.id === memberId);
        const reward = rewards.find((r) => r.id === rewardId);

        if (!member || !reward) {
          return { success: false, message: 'Dữ liệu thành viên hoặc ưu đãi không hợp lệ!' };
        }

        // Kiểm tra số dư điểm
        if (member.points < reward.pointsRequired) {
          const errMsg = `Không đủ điểm! Bạn có ${member.points} điểm, cần ${reward.pointsRequired} điểm để đổi "${reward.name}".`;
          get().showToast(errMsg, 'error');
          return { success: false, message: errMsg };
        }

        const newPoints = member.points - reward.pointsRequired;
        const newTier = calculateTier(newPoints);
        const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

        // Mã giao dịch đổi điểm chuẩn định dạng TX-KT-XXX
        const { transactions } = get();
        const maxTxNum = transactions.reduce((max, t) => {
          const match = t.transactionId.match(/TX-KT-(\d+)/i);
          return match ? Math.max(max, parseInt(match[1], 10)) : max;
        }, 7);
        const txId = `TX-KT-${(maxTxNum + 1).toString().padStart(3, '0')}`;

        // Tạo voucher vào ví
        const voucherCode = `VC-${member.id}-${Math.floor(1000 + Math.random() * 9000)}`;
        const newVoucher: UserVoucher = {
          id: `VCH-${Date.now()}`,
          rewardId: reward.id,
          rewardName: reward.name,
          memberId,
          code: voucherCode,
          redeemedAt: now,
          status: 'Chưa dùng',
        };

        // Ghi nhận lịch sử
        const historyId = `KT-LS-${(pointHistory.length + 1).toString().padStart(3, '0')}`;
        const newHist: PointHistory = {
          id: historyId,
          memberId,
          type: 'Đổi điểm',
          pointChange: -reward.pointsRequired,
          time: now,
          balanceAfter: newPoints,
          transactionId: txId,
        };

        // Cập nhật thành viên
        const updatedMembers = members.map((m) =>
          m.id === memberId ? { ...m, points: newPoints, tier: newTier } : m
        );

        set({
          members: updatedMembers,
          pointHistory: [newHist, ...pointHistory],
          vouchers: [newVoucher, ...vouchers],
        });

        get().showToast(`Đổi thành công "${reward.name}"! Đã lưu vào Ví ưu đãi.`, 'success');
        return { success: true, message: 'Đổi ưu đãi thành công', voucher: newVoucher };
      },

      useVoucher: (voucherId) => {
        set((state) => ({
          vouchers: state.vouchers.map((v) => (v.id === voucherId ? { ...v, status: 'Đã dùng' } : v)),
        }));
        get().showToast('Đã sử dụng voucher thành công!', 'info');
      },

      // 4. NẠP DỮ LIỆU MẪU BAN ĐẦU CỦA BTC
      resetToBtcData: () => {
        set({
          members: INITIAL_MEMBERS,
          transactions: INITIAL_TRANSACTIONS,
          rewards: INITIAL_REWARDS,
          pointHistory: INITIAL_HISTORY,
          currentMemberId: 'KT-004',
          activeTab: 'rewards',
          vouchers: [
            {
              id: 'VCH-INIT-01',
              rewardId: 'KT-VCH-01',
              rewardName: 'Voucher 20.000đ',
              memberId: 'KT-003',
              code: 'VC-KT003-8821',
              redeemedAt: '2026-10-05 14:05',
              status: 'Chưa dùng',
            },
          ],
        });
        get().showToast('Đã khôi phục 100% dữ liệu mẫu ban đầu theo file BTC!', 'success');
      },
    }),
    {
      name: 'vibe-starbucks-membership-storage',
    }
  )
);
