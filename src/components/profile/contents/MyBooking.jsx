import { useEffect, useState } from "react";
import { FiCalendar, FiEye } from "react-icons/fi";
import {
  getFinishedMyBookingApi,
  getMyBookingApi,
  getUnfinishedMyBookingApi,
} from "../../../shared/apis/bookingApi";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../../common/ImageSlider";

export default function MyBooking() {
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sortType, setSortType] = useState("bookingDate:desc");
  const [loading, setLoading] = useState(true);
  const [myBooking, setMyBooking] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const apiFn =
      activeTab === "current"
        ? getUnfinishedMyBookingApi
        : activeTab === "history"
        ? getFinishedMyBookingApi
        : getMyBookingApi;

    apiFn({
      page: currentPage,
      size: perPage,
      sort: sortType,
    })
      .then((data) => {
        setMyBooking(data.data);
        const meta = data.meta;
        if (meta.totalPages !== total) setTotal(meta.totalPages);
        if (meta.currentPage + 1 !== currentPage)
          setCurrentPage(meta.currentPage + 1);
      })
      .finally(() => setLoading(false));
  }, [activeTab, currentPage, perPage, sortType, total]);

  const formatDateTime = (dateStr) => {
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
  };

  const formatCurrency = (str) => {
    const num = Number(str);
    return num.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
  };

  const getStatusInfo = (status) => {
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
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Chuyến của tôi</h1>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("current")}
            className={`pb-4 px-1 ${
              activeTab === "current"
                ? "border-b-2 border-green-500 text-green-600 font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Chuyến hiện tại
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`pb-4 px-1 ${
              activeTab === "history"
                ? "border-b-2 border-green-500 text-green-600 font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Lịch sử chuyến
          </button>
        </div>
      </div>

      {/* Filter Button */}
      <div className="flex justify-end mb-4">
        <button className="flex items-center px-4 py-2 space-x-2 text-sm bg-white border border-gray-200 rounded-md">
          <span>Bộ lọc</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M7 12H17M9 18H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Booking List */}
      <div className="space-y-6">
        {myBooking.map((booking) => {
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
                  <div className="relative w-full h-48 overflow-hidden rounded-lg">
                    <ImageSlider
                      images={booking.images}
                      height="h-48"
                      width="max-w-sm"
                      className="rounded shadow"
                    />
                  </div>
                </div>

                <div className="w-full md:w-2/3 md:pl-6">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold">{booking.carName}</h3>
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
                      onClick={() =>
                        navigate(`/user/bookings/${booking.bookingId}`)
                      }
                      className="flex items-center space-x-1 text-sm text-blue-600"
                    >
                      <FiEye className="w-4 h-4" />
                      <span>Xem chi tiết</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
