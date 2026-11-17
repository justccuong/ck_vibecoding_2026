import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SampleItem, INITIAL_SAMPLE_ITEMS } from '../data/initialData';
import { ToastMessage } from '../components/ui/Toast';

interface AppStore {
  // Mobile Frame View
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;

  // Active Tab
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Toast System
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  // Data Items
  items: SampleItem[];
  addItem: (item: Omit<SampleItem, 'id'>) => void;
  updateItem: (id: string, updates: Partial<SampleItem>) => void;
  deleteItem: (id: string) => void;

  // Reset Button (BẮT BUỘC THEO ĐỀ BTC)
  resetToSampleData: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      isMobileFrame: true, // Mặc định mở khung 375px
      setIsMobileFrame: (val) => set({ isMobileFrame: val }),

      activeTab: 'list',
      setActiveTab: (tab) => set({ activeTab: tab }),

      toast: null,
      showToast: (message, type = 'info') => {
        const id = Date.now();
        set({ toast: { id, message, type } });
        setTimeout(() => {
          if (get().toast?.id === id) {
            set({ toast: null });
          }
        }, 3000);
      },
      clearToast: () => set({ toast: null }),

      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),
      selectedCategory: 'Tất cả',
      setSelectedCategory: (cat) => set({ selectedCategory: cat }),

      items: INITIAL_SAMPLE_ITEMS,

      addItem: (itemData) => {
        const currentItems = get().items;
        const newId = `ITEM-${(currentItems.length + 1).toString().padStart(2, '0')}`;
        const newItem: SampleItem = {
          ...itemData,
          id: newId,
        };
        set({ items: [newItem, ...currentItems] });
        get().showToast(`Đã thêm mới thành công mã ${newId}!`, 'success');
      },

      updateItem: (id, updates) => {
        set((state) => ({
          items: state.items.map((it) => (it.id === id ? { ...it, ...updates } : it)),
        }));
        get().showToast(`Đã cập nhật mục ${id}!`, 'success');
      },

      deleteItem: (id) => {
        set((state) => ({
          items: state.items.filter((it) => it.id !== id),
        }));
        get().showToast(`Đã xóa mục ${id}!`, 'info');
      },

      // Nút khôi phục dữ liệu ban đầu chuẩn BTC
      resetToSampleData: () => {
        set({
          items: INITIAL_SAMPLE_ITEMS,
          searchQuery: '',
          selectedCategory: 'Tất cả',
        });
        get().showToast('Đã nạp lại dữ liệu mẫu gốc của BTC thành công!', 'success');
      },
    }),
    {
      name: 'vibe-competition-storage',
    }
  )
);
