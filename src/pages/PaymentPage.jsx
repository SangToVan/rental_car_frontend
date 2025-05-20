import { useEffect, useState } from "react";
import {
  getBookingDetailsApi,
  paymentBooking,
} from "../shared/apis/bookingApi";
import { toast } from "react-toastify";
import { currencyFormat } from "../shared/utils";
import { useNavigate } from "react-router-dom";

export default function PaymentPage({ bookingId, onCancel }) {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [carInfor, setCarInfor] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("WALLET");
  const [paymentType, setPaymentType] = useState("FULL");

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getBookingDetailsApi(bookingId).then((res) => {
      setBookingDetails(res.data);
      setCarInfor(res.data.carDetail);
      setCustomerInfo(res.data.customerInfo);
    });
  }, [bookingId]);

  const handleConfirmPayment = async () => {
    try {
      const res = await paymentBooking(bookingId, {
        paymentMethod,
        paymentType,
      });

      const payment = res.data;

      if (paymentMethod === "BANK" && payment.paymentUrl) {
        // Redirect user to VNPay
        window.location.href = payment.paymentUrl;
      } else {
        // Redirect to payment status page to show result
        navigate("/payment-status", {
          state: {
            bookingId: bookingId,
            status: payment.paymentStatus,
            amount: payment.amount,
            method: payment.paymentMethod,
            type: payment.paymentType,
          },
        });
      }
    } catch (err) {
      toast.error("Thanh toán thất bại");
    } finally {
      setConfirmModalOpen(false);
    }
  };

  if (!bookingDetails || !carInfor || !customerInfo)
    return <div>Loading...</div>;

  return (
    <div className="py-8 bg-gray-100">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl p-6 mx-auto mt-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Xác nhận thanh toán
          </h2>

          <div className="mb-4">
            <p className="text-gray-600">Giá thuê xe:</p>
            <p className="font-medium">
              {currencyFormat(carInfor.basePrice)} / ngày
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Số ngày thuê:</p>
            <p className="font-medium">{bookingDetails.rentalDays} ngày</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Tổng tiền:</p>
            <p className="font-semibold text-primary">
              {currencyFormat(bookingDetails.totalPrice)}
            </p>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Phương thức thanh toán
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="WALLET">Ví Saoto</option>
              <option value="BANK">Thẻ ngân hàng (VNPay)</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Tùy chọn thanh toán
            </label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="FULL">Thanh toán toàn bộ</option>
              <option value="DEPOSIT">Thanh toán trước 40%</option>
            </select>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Số dư ví hiện tại:{" "}
              <span className="font-medium">
                {currencyFormat(customerInfo.balance)}
              </span>
            </p>
          </div>

          <div className="flex justify-between">
            <button
              onClick={onCancel}
              className="px-6 py-3 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              onClick={() => setConfirmModalOpen(true)}
              className="px-6 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </div>

      {confirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-xl">
            <p className="mb-4 text-lg font-semibold">
              Bạn có chắc chắn muốn thanh toán?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmModalOpen(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmPayment}
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
