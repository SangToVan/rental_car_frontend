import React, { useEffect, useState } from "react";
import { getDashboardApi } from "../../shared/apis/adminApi";

// Hàm định dạng số tiền
function formatCurrency(num) {
  return Number(num).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
}

// Hàm định dạng ngày giờ
function formatDateTime(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Màu trạng thái
const getStatusColor = (status) => {
  switch (status) {
    case "SUCCESS":
      return "text-green-600";
    case "PENDING":
      return "text-yellow-600";
    case "FAILED":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

// Icon loại giao dịch
const getTypeIcon = (type) => {
  switch (type) {
    case "TOP_UP":
    case "CREDIT":
      return "↑";
    case "DEBIT":
    case "WITHDRAW":
      return "↓";
    default:
      return "•";
  }
};

// Màu số tiền theo loại giao dịch
const getAmountColor = (type) => {
  switch (type) {
    case "TOP_UP":
    case "CREDIT":
      return "text-green-600";
    case "DEBIT":
    case "WITHDRAW":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export default function DashboardPanel() {
  const [amount, setAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getDashboardApi().then((res) => {
      setAmount(res.data?.amount || 0);
      setTransactions(res.data?.list || []);
    });
  }, []);

  return (
    <div className="w-full p-6">
      {/* Tổng doanh thu */}
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold">Tổng doanh thu</h1>
        <div className="text-4xl font-extrabold text-green-600">
          {formatCurrency(amount)}
        </div>
      </div>

      {/* Lịch sử giao dịch */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-white border rounded-lg table-auto">
          <thead>
            <tr className="text-center text-gray-700 bg-gray-50">
              <th className="px-4 py-3 font-semibold align-middle whitespace-nowrap">
                Ngày giao dịch
              </th>
              <th className="px-4 py-3 font-semibold align-middle whitespace-nowrap">
                Loại
              </th>
              <th className="px-4 py-3 font-semibold align-middle whitespace-nowrap">
                Số tiền
              </th>
              <th className="px-4 py-3 font-semibold align-middle whitespace-nowrap">
                Mô tả
              </th>
              <th className="px-4 py-3 font-semibold align-middle whitespace-nowrap">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr
                key={index}
                className="text-center align-middle border-t last:border-b"
              >
                <td className="px-4 py-2 align-middle whitespace-nowrap">
                  {formatDateTime(tx.transactionDate)}
                </td>
                <td className="px-4 py-2 align-middle whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-bold text-gray-700 bg-gray-100 rounded">
                    {getTypeIcon(tx.transactionType)} {tx.transactionType}
                  </span>
                </td>
                <td
                  className={`px-4 py-2 font-semibold whitespace-nowrap align-middle ${getAmountColor(
                    tx.transactionType
                  )}`}
                >
                  {formatCurrency(parseFloat(tx.amount))}
                </td>
                <td className="px-4 py-2 align-middle whitespace-nowrap">
                  {tx.description}
                </td>
                <td className="px-4 py-2 align-middle whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded ${getStatusColor(
                      tx.status
                    )} bg-gray-100`}
                  >
                    {tx.status === "SUCCESS"
                      ? "Thành công"
                      : tx.status === "PENDING"
                      ? "Đang xử lý"
                      : "Thất bại"}
                  </span>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">
                  Không có giao dịch nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
