import { useEffect, useState } from "react";
import {
  getMyWalletApi,
  updateMyWalletApi,
} from "../../../shared/apis/userApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Wallet(props) {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [transaction, setTransaction] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [amountInput, setAmountInput] = useState("");

  useEffect(() => {
    setLoading(true);
    getMyWalletApi()
      .then((res) => {
        const walletData = res?.data;
        setBalance(walletData?.balance || "0");
        setTransaction(walletData?.transactionList || []);
      })
      .finally(() => setLoading(false));
  }, []);

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

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const formatDateTime = (datetimeStr) => {
    const date = new Date(datetimeStr);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (value) => {
    const num = Number(value);
    return num.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
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
              {transaction.map((tx, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {formatDateTime(tx.transactionDate)}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <span className="flex items-center">
                      <span className="mr-2 text-lg">
                        {getTypeIcon(tx.transactionType)}
                      </span>
                      <span className="capitalize">{tx.transactionType}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {tx.description}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${getAmountColor(
                      tx.transactionType
                    )}`}
                  >
                    {formatCurrency(tx.amount)}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm text-right ${getStatusColor(
                      tx.status
                    )}`}
                  >
                    <span className="capitalize">{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
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
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
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
                onClick={() => {
                  setModalOpen(false);
                  setAmountInput("");
                }}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600"
                onClick={async () => {
                  const amount = parseInt(amountInput);
                  if (isNaN(amount) || amount < 100000) {
                    toast.error("Số tiền phải lớn hơn 100.000 VND");
                    return;
                  }

                  if (modalType === "withdraw" && amount > parseInt(balance)) {
                    toast.error("Số tiền rút không được lớn hơn số dư ví");
                    return;
                  }

                  try {
                    await updateMyWalletApi({
                      type: modalType === "topup" ? "TOP_UP" : "WITHDRAW",
                      amount: amount.toString(),
                    });
                    toast.success(
                      `${
                        modalType === "topup" ? "Nạp tiền" : "Rút tiền"
                      } thành công`
                    );
                    setModalOpen(false);
                    setAmountInput("");
                    setTimeout(() => window.location.reload(), 1500);
                  } catch (err) {
                    toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
                  }
                }}
              >
                {modalType === "topup" ? "Nạp tiền" : "Rút tiền"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
