import React, { useEffect, useState } from "react";
import { FiCalendar, FiEye, FiChevronLeft } from "react-icons/fi";
import { getBookingApi } from "../../shared/apis/adminApi";
import ImageSlider from "../../components/common/ImageSlider";
import BookingDetailPanel from "./BookingDetailPanel";

function getStatusInfo(status) {
  switch (status) {
    case "PENDING":
      return {
        label: "Chờ thanh toán",
        color: "bg-yellow-100 text-yellow-700",
      };
    case "PAID":
      return { label: "Đã thanh toán", color: "bg-blue-100 text-blue-700" };
    case "CONFIRMED":
      return { label: "Đã xác nhận", color: "bg-green-100 text-green-700" };
    case "IN_PROGRESS":
      return { label: "Đang thuê", color: "bg-orange-100 text-orange-700" };
    case "RETURNED":
      return { label: "Đã trả xe", color: "bg-purple-100 text-purple-700" };
    case "COMPLETED":
      return { label: "Hoàn tất", color: "bg-green-100 text-green-700" };
    case "CANCELLED":
      return { label: "Đã huỷ", color: "bg-red-100 text-red-700" };
    default:
      return { label: "Không xác định", color: "bg-gray-100 text-gray-700" };
  }
}

function formatDateTime(dateStr) {
  try {
    const date = new Date(dateStr);
    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatCurrency(str) {
  const num = Number(str);
  return num.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
}

export default function BookingPanel() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [finishedCount, setFinishedCount] = useState(0);
  const [unfinishedCount, setUnfinishedCount] = useState(0);

  const statusParam =
    activeTab === "finished"
      ? "FINISHED"
      : activeTab === "unfinished"
      ? "UNFINISHED"
      : "";

  useEffect(() => {
    getBookingApi(statusParam).then((res) => {
      setBookings(res?.data?.list || []);
      setFinishedCount(res?.data?.finishedBooking || 0);
      setUnfinishedCount(res?.data?.unfinishedBooking || 0);
    });
  }, [statusParam]);

  const selectedBooking = bookings.find(
    (b) => b.bookingId === selectedBookingId
  );

  if (selectedBookingId) {
    return (
      <BookingDetailPanel
        bookingId={selectedBooking.bookingId}
        onBack={() => setSelectedBookingId(null)}
      />
    );
  }

  const tabDefs = [
    { key: "all", label: `Tất cả (${finishedCount + unfinishedCount})` },
    { key: "unfinished", label: `Chưa hoàn thành (${unfinishedCount})` },
    { key: "finished", label: `Đã hoàn thành (${finishedCount})` },
  ];

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Danh sách đơn đặt xe</h1>
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex gap-1">
          {tabDefs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`min-w-[160px] whitespace-nowrap pb-2 pt-2 px-3 border-b-2 transition-colors duration-200 font-medium text-sm ${
                activeTab === tab.key
                  ? "border-green-500 text-green-700"
                  : "border-transparent text-gray-600 hover:text-green-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="space-y-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => {
            const status = getStatusInfo(booking.status);
            const dateRange = `${formatDateTime(
              booking.startDateTime
            )} - ${formatDateTime(booking.endDateTime)}`;
            return (
              <div
                key={booking.bookingId}
                className="overflow-hidden bg-white rounded-lg shadow-sm"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}
                    >
                      {status.label}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDateTime(booking.bookingDate)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col p-4 md:flex-row">
                  <div className="w-full mb-4 md:w-1/3 md:mb-0">
                    <ImageSlider images={booking.images} />
                  </div>
                  <div className="w-full md:w-2/3 md:pl-6">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-bold">{booking.carName}</h3>
                      <span className="text-sm text-gray-500">
                        #{booking.bookingId}
                      </span>
                    </div>
                    <div className="flex items-center mt-3 text-gray-600">
                      <FiCalendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{dateRange}</span>
                    </div>
                    <div className="flex items-center mt-3">
                      <img
                        src={booking.ownerAvatar || "/default-user.png"}
                        alt={booking.ownerName}
                        className="w-6 h-6 mr-2 rounded-full"
                      />
                      <span className="text-sm">{booking.ownerName}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-600">
                      <div>
                        <strong>Tổng tiền:</strong>{" "}
                        {formatCurrency(booking.totalPrice)}
                      </div>
                      <div>
                        <strong>Đã thanh toán:</strong>{" "}
                        {formatCurrency(booking.totalPaidAmount)}
                      </div>
                      <div>
                        <strong>Thanh toán khi nhận xe:</strong>{" "}
                        {formatCurrency(booking.needToPayInCash)}
                      </div>
                    </div>
                    <div className="flex items-center justify-end mt-4">
                      <button
                        className="flex items-center space-x-1 text-sm text-blue-600"
                        onClick={() => setSelectedBookingId(booking.bookingId)}
                      >
                        <FiEye className="w-4 h-4" />
                        <span>Xem chi tiết</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-10 text-center">
            <p className="text-gray-500">Không tìm thấy đơn đặt xe phù hợp</p>
          </div>
        )}
      </div>
    </div>
  );
}
