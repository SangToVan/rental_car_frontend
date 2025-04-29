import { useState } from "react";

// Mock data for wallet transactions
const mockTransactions = [
  {
    id: 1,
    date: "2023-12-15",
    type: "topup",
    amount: 500000,
    status: "completed",
    description: "Top up via Momo",
  },
  {
    id: 2,
    date: "2023-12-10",
    type: "payment",
    amount: -350000,
    status: "completed",
    description: "Payment for trip #MIO-9876",
  },
  {
    id: 3,
    date: "2023-11-28",
    type: "topup",
    amount: 1000000,
    status: "completed",
    description: "Top up via Bank Transfer",
  },
  {
    id: 4,
    date: "2023-11-20",
    type: "withdraw",
    amount: -500000,
    status: "completed",
    description: "Withdrawal to Bank Account",
  },
  {
    id: 5,
    date: "2023-11-12",
    type: "payment",
    amount: -650000,
    status: "completed",
    description: "Payment for trip #MIO-8765",
  },
];

export default function Wallet(props) {
  const { balance = 1250000 } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "topup":
        return "↑";
      case "payment":
        return "→";
      case "withdraw":
        return "↓";
      default:
        return "•";
    }
  };

  const getAmountColor = (amount) => {
    return amount >= 0 ? "text-green-600" : "text-red-600";
  };

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-2xl font-bold">Ví của tôi</h1>

      {/* Balance Card */}
      <div className="p-6 mb-8 text-white rounded-lg bg-gradient-to-r from-green-400 to-green-600">
        <h2 className="mb-2 text-lg opacity-80">Số dư hiện tại</h2>
        <div className="text-3xl font-bold">{formatCurrency(balance)}</div>
        <div className="flex mt-6 space-x-4">
          <button
            onClick={() => openModal("topup")}
            className="px-4 py-2 font-medium text-green-600 transition-colors bg-white rounded-lg hover:bg-opacity-90"
          >
            Nạp tiền
          </button>
          <button
            onClick={() => openModal("withdraw")}
            className="px-4 py-2 font-medium text-white transition-colors bg-white border border-white rounded-lg bg-opacity-20 border-opacity-40 hover:bg-opacity-30"
          >
            Rút tiền
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Lịch sử giao dịch</h2>
        <div className="overflow-hidden border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Ngày
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Loại
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Mô tả
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  Số tiền
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <span className="flex items-center">
                      <span className="mr-2 text-lg">
                        {getTypeIcon(transaction.type)}
                      </span>
                      <span className="capitalize">{transaction.type}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {transaction.description}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${getAmountColor(
                      transaction.amount
                    )}`}
                  >
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm text-right ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    <span className="capitalize">{transaction.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Top-up or Withdraw */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <h2 className="mb-4 text-xl font-bold">
              {modalType === "topup" ? "Nạp tiền vào ví" : "Rút tiền từ ví"}
            </h2>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Số tiền
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Nhập số tiền"
              />
            </div>
            {modalType === "topup" && (
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Phương thức thanh toán
                </label>
                <select className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline">
                  <option>MoMo</option>
                  <option>VNPay</option>
                  <option>Chuyển khoản ngân hàng</option>
                  <option>Thẻ tín dụng/ghi nợ</option>
                </select>
              </div>
            )}
            {modalType === "withdraw" && (
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Tài khoản nhận tiền
                </label>
                <select className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline">
                  <option>Ngân hàng Vietcombank - ****1234</option>
                  <option>Ngân hàng BIDV - ****5678</option>
                  <option>Thêm tài khoản mới</option>
                </select>
              </div>
            )}
            <div className="flex justify-end mt-6 space-x-2">
              <button
                className="px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setModalOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600"
                onClick={() => {
                  alert(
                    `${
                      modalType === "topup" ? "Nạp tiền" : "Rút tiền"
                    } thành công!`
                  );
                  setModalOpen(false);
                }}
              >
                {modalType === "topup" ? "Nạp tiền" : "Rút tiền"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
