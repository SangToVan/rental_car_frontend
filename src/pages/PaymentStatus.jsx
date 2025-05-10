import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const state = location.state || {};

  const status = searchParams.get("status") || state.status || "UNKNOWN";
  const bookingId = searchParams.get("bookingId") || state.bookingId || "N/A";
  const amount = searchParams.get("amount") || state.amount || "N/A";
  const paymentMethod =
    searchParams.get("paymentMethod") || state.paymentMethod || "UNKNOWN";
  const paymentType =
    searchParams.get("paymentType") || state.paymentType || "UNKNOWN";
  const transactionCode =
    searchParams.get("transactionCode") || state.transactionCode || "N/A";

  const renderMessage = () => {
    if (status === "SUCCESS") {
      return (
        <div className="text-lg font-semibold text-green-600">
          ✅ Thanh toán thành công!
        </div>
      );
    }
    if (status === "PENDING") {
      return (
        <div className="text-lg font-semibold text-yellow-600">
          ⏳ Giao dịch đang chờ xử lý...
        </div>
      );
    }
    if (status === "FAILED") {
      return (
        <div className="text-lg font-semibold text-red-600">
          ❌ Thanh toán thất bại. Vui lòng thử lại!
        </div>
      );
    }
    if (status === "EXPIRED") {
      return (
        <div className="text-lg font-semibold text-gray-600">
          ⚠️ Giao dịch đã hết hạn.
        </div>
      );
    }
    return (
      <div className="text-lg font-semibold text-gray-500">
        ℹ️ Không xác định được trạng thái giao dịch.
      </div>
    );
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-20 bg-white rounded-lg shadow">
      <h2 className="mb-4 text-xl font-bold text-center">Kết quả thanh toán</h2>

      {renderMessage()}

      <div className="mt-6 space-y-2 text-sm text-gray-700">
        <div>
          <span className="font-medium">Mã booking:</span> {bookingId}
        </div>
        <div>
          <span className="font-medium">Số tiền:</span> {amount} VND
        </div>
        <div>
          <span className="font-medium">Phương thức:</span> {paymentMethod}
        </div>
        <div>
          <span className="font-medium">Loại thanh toán:</span> {paymentType}
        </div>
        <div>
          <span className="font-medium">Mã giao dịch:</span> {transactionCode}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-4 mt-8">
        <button
          onClick={() => navigate("/")}
          className="w-1/2 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
        >
          Về trang chủ
        </button>
        <button
          onClick={() => navigate(`/user/bookings/${bookingId}`)}
          className="w-1/2 py-2 text-white rounded bg-primary"
        >
          Xem đơn đặt xe
        </button>
      </div>
    </div>
  );
};

export default PaymentStatus;
