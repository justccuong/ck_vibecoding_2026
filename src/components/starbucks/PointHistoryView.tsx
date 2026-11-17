import React, { useState } from 'react';
import { useStarbucksStore } from '../../store/useStarbucksStore';
import { History, ArrowDownLeft, ArrowUpRight, Filter, Search } from 'lucide-react';

export const PointHistoryView: React.FC = () => {
  const { pointHistory, currentMemberId, members } = useStarbucksStore();
  const [filterType, setFilterType] = useState<string>('Tất cả');
  const [filterMember, setFilterMember] = useState<string>(currentMemberId);

  const filteredHistory = pointHistory.filter((item) => {
    const matchesMember = filterMember === 'ALL' || item.memberId === filterMember;
    const matchesType =
      filterType === 'Tất cả' ||
      (filterType === 'Cộng điểm' && item.pointChange > 0) ||
      (filterType === 'Đổi điểm' && item.pointChange < 0);
    return matchesMember && matchesType;
  });

  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3.5">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <History className="w-4 h-4 text-sky-600" />
            <span>Lịch Sử Biến Động Điểm</span>
          </h2>
          <p className="text-[11px] text-slate-500">
            Minh bạch từng lượt cộng điểm và đổi ưu đãi
          </p>
        </div>

        {/* Member filter selector */}
        <select
          value={filterMember}
          onChange={(e) => setFilterMember(e.target.value)}
          className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 font-semibold text-slate-800"
        >
          <option value="ALL">Tất cả thành viên</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.id} - {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 text-xs">
        {['Tất cả', 'Cộng điểm', 'Đổi điểm'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              filterType === t
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* History List */}
      <div className="space-y-2 max-h-72 overflow-y-auto">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs">
            Chưa có lịch sử giao dịch nào phù hợp.
          </div>
        ) : (
          filteredHistory.map((item) => {
            const isAdd = item.pointChange > 0;
            return (
              <div
                key={item.id}
                className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isAdd ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {isAdd ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <strong className="text-slate-900 font-bold text-xs">{item.type}</strong>
                      <span className="font-mono text-[10px] text-slate-500">({item.memberId})</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {item.time} · Mã GD: <span className="font-mono font-medium">{item.transactionId}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <strong
                    className={`text-sm font-black ${
                      isAdd ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {isAdd ? '+' : ''}
                    {item.pointChange.toLocaleString()} đ
                  </strong>
                  <div className="text-[10px] text-slate-400">
                    Số dư: <span className="font-semibold text-slate-700">{item.balanceAfter.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
