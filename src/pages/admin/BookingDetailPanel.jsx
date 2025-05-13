import { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiUser,
  FiPhone,
  FiMail,
  FiFileText,
} from "react-icons/fi";
import { getBookingDetailApi } from "../../shared/apis/adminApi";
import ImageSlider from "../../components/common/ImageSlider";

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

function BookingDetailPanel({ bookingId, onBack }) {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (bookingId) {
      getBookingDetailApi(bookingId).then((res) => {
        setBooking(res.data); // nếu getBookingDetailApi trả về .data.data
      });
    }
  }, [bookingId]);

  if (!booking) return <div className="p-6">Đang tải dữ liệu...</div>;

  const { carDetail, customerInfo, bookingId: id, bookingDate } = booking;

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

  const statusMap = {
    PENDING: "Chờ thanh toán",
    PAID: "Đã thanh toán",
    CONFIRMED: "Chủ xe đã xác nhận",
    IN_PROGRESS: "Đang thuê",
    RETURNED: "Đã trả xe",
    COMPLETED: "Hoàn tất",
    CANCELLED: "Đã hủy",
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow">
      <button
        onClick={onBack}
        className="flex items-center px-4 py-2 mb-4 font-medium text-gray-800 bg-gray-100 rounded hover:bg-gray-200"
      >
        <FiChevronLeft className="mr-2" />
        Quay lại danh sách
      </button>

      {/* Header */}
      <section className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-6 border-b border-gray-200">
        <div className="flex flex-col flex-1 gap-3 sm:flex-row sm:items-center">
          <span
            className={`px-4 py-1 text-sm font-medium rounded-full ${
              getStatusInfo(booking.status).color
            }`}
          >
            {getStatusInfo(booking.status).label}
          </span>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>
              Mã đơn: <b>#{booking.bookingId}</b>
            </span>
            <span>Đặt lúc: {formatDateTime(booking.bookingDate)}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm font-medium text-gray-500">Tổng tiền</div>
          <div className="text-2xl font-bold text-green-700">
            {formatCurrency(booking.totalPrice)}
          </div>
        </div>
      </section>

      {/* Booking Detail */}
      <section className="mb-8">
        <h3 className="flex items-center mb-2 text-lg font-semibold">
          Thông tin đơn thuê xe
          <span className="px-2 py-1 ml-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
            {booking.documentRental === "NATIVE" && "Công dân Việt Nam"}
            {booking.documentRental === "FOREIGNER" && "Người nước ngoài"}
            {booking.documentRental === "NONE" && "Không có bằng lái"}
          </span>
        </h3>
        <div className="grid grid-cols-1 text-sm md:grid-cols-2 gap-x-8 gap-y-3">
          <div>
            <b>Nhận xe:</b> {formatDateTime(booking.startDateTime)}
          </div>
          <div>
            <b>Trả xe:</b> {formatDateTime(booking.endDateTime)}
          </div>
          <div>
            <b>Số ngày thuê:</b> {booking.numberOfDays} ngày
          </div>
          <div>
            <b>Phí thuê:</b> {formatCurrency(booking.rentalFee)}
          </div>
          <div>
            <b>Đã thanh toán:</b> {formatCurrency(booking.totalPaidAmount)}
          </div>
          <div>
            <b>Thanh toán khi nhận:</b>{" "}
            {formatCurrency(booking.needToPayInCash)}
          </div>
          <div>
            <b>Hoàn tiền:</b> {formatCurrency(booking.refundAmount)}
          </div>
          <div>
            <b>Tiền cọc:</b> {formatCurrency(booking.depositAmount)}
          </div>
          <div>
            <b>Phương thức thanh toán:</b> {booking.paymentMethod || "--"}
          </div>
          <div>
            <b>Loại thanh toán:</b> {booking.paymentType || "--"}
          </div>
        </div>
      </section>

      {/* Document Rental */}
      <section className="pt-6 mb-8 border-t border-gray-100">
        <h3 className="mb-2 text-lg font-semibold">
          Giấy tờ yêu cầu khi bàn giao xe
        </h3>
        <div className="text-sm text-gray-800">
          {booking.documentRental === "NATIVE" && (
            <ul className="ml-5 list-disc">
              <li>CCCD/CMND</li>
              <li>Bằng lái xe</li>
            </ul>
          )}
          {booking.documentRental === "FOREIGNER" && (
            <ul className="ml-5 list-disc">
              <li>Passport (Hộ chiếu)</li>
              <li>Bằng lái xe</li>
            </ul>
          )}
          {booking.documentRental === "NONE" && (
            <>
              <ul className="mb-2 ml-5 list-disc">
                <li>CCCD/CMND</li>
                <li>Sổ hộ khẩu</li>
              </ul>
              <div className="mt-2">
                <h4 className="font-semibold">Người lái xe được chỉ định</h4>
                <div className="space-y-1 text-sm text-gray-700">
                  <div>
                    <b>Họ tên:</b> {booking.driverName || "--"}
                  </div>
                  <div>
                    <b>Số điện thoại:</b> {booking.driverPhone || "--"}
                  </div>
                  <div>
                    <b>Số CCCD:</b> {booking.driverCitizenId || "--"}
                  </div>
                  <div>
                    <b>Mối quan hệ:</b> {booking.relationship || "--"}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Car Detail */}
      <section className="pt-6 mb-8 border-t border-gray-100">
        <h3 className="mb-2 text-lg font-semibold">Thông tin xe thuê</h3>
        <div className="flex flex-col gap-6 md:flex-row">
          <ImageSlider
            images={carDetail.images}
            height="h-40"
            width="max-w-sm"
            className="rounded shadow"
          />
          <div className="grid flex-1 grid-cols-2 text-sm text-gray-700 gap-x-6 gap-y-2">
            <div>
              <b>Tên xe:</b> {carDetail?.name}
            </div>
            <div>
              <b>Hãng:</b> {carDetail?.brand}
            </div>
            <div>
              <b>Model:</b> {carDetail?.model}
            </div>
            <div>
              <b>Năm SX:</b> {carDetail?.productionYear}
            </div>
            <div>
              <b>Nhiên liệu:</b> {carDetail?.fuelType}
            </div>
            <div>
              <b>Tiêu hao:</b> {carDetail?.fuelConsumption} L/100km
            </div>
            <div>
              <b>Địa chỉ:</b> {carDetail?.address}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Detail */}
      <section className="pt-6 mb-8 border-t border-gray-100">
        <h3 className="mb-2 text-lg font-semibold">Khách thuê xe</h3>
        <div className="flex items-center gap-4">
          <img
            src={customerInfo?.avatar}
            alt={customerInfo?.username}
            className="object-cover border rounded-full w-14 h-14"
          />
          <div>
            <div className="text-lg font-bold">{customerInfo?.username}</div>
            <div className="text-sm text-gray-600">
              <FiPhone className="inline mr-1" />
              {customerInfo?.phoneNumber}
            </div>
            <div className="text-sm text-gray-600">
              <FiMail className="inline mr-1" />
              {customerInfo?.email}
            </div>
          </div>
        </div>
      </section>

      {/* Owner Detail */}
      <section className="pt-6 mb-8 border-t border-gray-100">
        <h3 className="mb-2 text-lg font-semibold">Chủ xe</h3>
        <div className="flex items-center gap-4">
          <img
            src={carDetail?.carOwner.avatar}
            alt={carDetail?.carOwner.username}
            className="object-cover border rounded-full w-14 h-14"
          />
          <div>
            <div className="text-lg font-bold">
              {carDetail?.carOwner.username}
            </div>
            <div className="text-sm text-gray-600">
              <FiPhone className="inline mr-1" />
              {carDetail?.carOwner.phoneNumber}
            </div>
            <div className="text-sm text-gray-600">
              <FiMail className="inline mr-1" />
              {carDetail?.carOwner.email}
            </div>
          </div>
        </div>
      </section>

      {/* Admin Buttons */}
      <section className="flex gap-3 pt-2 border-t border-gray-100">
        <button className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">
          Duyệt đơn
        </button>
        <button className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600">
          Nhắc thanh toán
        </button>
        <button className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
          Huỷ đơn
        </button>
      </section>
    </div>
  );
}

export default BookingDetailPanel;
