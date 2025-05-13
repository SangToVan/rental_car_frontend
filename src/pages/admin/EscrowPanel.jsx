// Updated EscrowPanel.jsx with DTO values
import { useEffect, useMemo, useState } from "react";
import { getEscrowApi } from "../../shared/apis/adminApi";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  RELEASED: "bg-green-100 text-green-700",
  REFUNDED: "bg-blue-100 text-blue-700",
};
const statusLabels = {
  PENDING: "Chờ duyệt",
  RELEASED: "Đã giải ngân",
  REFUNDED: "Đã hoàn tiền",
};

function formatCurrency(str) {
  return Number(str).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function EscrowPanel() {
  const [total, setTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchEscrow = async () => {
      try {
        const data = await getEscrowApi();
        setTotal(data.data?.totalEscrow || 0);
        setTransactions(data.data?.list || []);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu escrow:", error);
      }
    };

    fetchEscrow();
  }, []);

  const summary = useMemo(() => {
    const counts = { PENDING: 0, RELEASED: 0, REFUNDED: 0 };
    transactions.forEach((t) => {
      if (counts[t.status] !== undefined) counts[t.status]++;
    });
    return counts;
  }, [transactions]);

  return (
    <div className="w-full">
      <h1 className="mb-4 text-2xl font-bold">Quản lý giao dịch ký quỹ</h1>
      <div className="mb-6 text-lg font-semibold">
        Tổng số tiền ký quỹ:{" "}
        <span className="text-green-600">{formatCurrency(total)}</span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {Object.keys(summary).map((status) => (
          <div
            key={status}
            className={`flex flex-col justify-center items-center rounded-lg py-5 ${statusColors[status]} bg-opacity-70`}
          >
            <div className="text-2xl font-bold">{summary[status]}</div>
            <div className="mt-1 text-sm font-medium">
              {statusLabels[status]}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {transactions.map((tx, idx) => (
          <div
            key={idx}
            className="flex flex-col px-6 py-4 bg-white rounded-lg shadow md:flex-row md:items-center"
          >
            <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-3">
              <div className="text-gray-600">
                <span className="font-medium">Ngày tạo:</span>{" "}
                {formatDate(tx.createdAt)}
              </div>
              <div className="text-gray-600">
                <span className="font-medium">Mã booking:</span> {tx.bookingId}
              </div>
              <div className="text-gray-600">
                <span className="font-medium">Số tiền:</span>{" "}
                {formatCurrency(tx.amount)}
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-3 md:mt-0 md:ml-6">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  statusColors[tx.status]
                }`}
              >
                {statusLabels[tx.status]}
              </span>
              <button
                className="px-4 py-2 ml-2 font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                onClick={() =>
                  alert(`Chi tiết giao dịch booking #${tx.bookingId}`)
                }
              >
                Chi tiết
              </button>
            </div>
          </div>
        ))}
        {transactions.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            Không có giao dịch ký quỹ nào
          </div>
        )}
      </div>
    </div>
  );
}
