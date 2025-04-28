import Button from "../../ui/Button";
import BookingCancelConfirmModal from "../../modals/CancelModal/BookingCancelConfirmModal";
import BookingCancelReasonModal from "../../modals/CancelModal/BookingCancelConfirmModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CarInformation({ booking }) {
  const navigate = useNavigate();
  const [previousStatus, setPreviousStatus] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);

  const handleCancelClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalOpen(false);
    setIsReasonModalOpen(true);
  };

  const handleCancelWithReason = (reason) => {
    setIsReasonModalOpen(false);
    // In a real app, here we would send a request to update the booking status
    setPreviousStatus(booking.status);
    setBooking((prev) => ({
      ...prev,
      status: "cancelled",
      cancellationReason: reason,
    }));
  };

  const handlePaymentClick = () => {
    setPreviousStatus(booking.status);
    setBooking((prev) => ({
      ...prev,
      status: "payment",
    }));
    navigate(`/payment/${id}`);
  };

  const renderActionButtons = () => {
    switch (booking.status) {
      case "pending":
        return (
          <div className="space-y-4">
            <Button
              className="w-full py-3"
              variant="outline"
              onClick={handleCancelClick}
            >
              Huỷ chuyến
            </Button>
          </div>
        );
      case "confirm":
      case "payment":
        return (
          <div className="space-y-4">
            <Button
              className="w-full py-3"
              variant="primary"
              onClick={handlePaymentClick}
            >
              Thanh toán giữ chỗ
            </Button>
            <Button
              className="w-full py-3"
              variant="outline"
              onClick={handleCancelClick}
            >
              Huỷ chuyến
            </Button>
          </div>
        );
      case "approved":
      case "active":
        return (
          <div className="space-y-4">
            <Button className="w-full py-3" variant="primary">
              Liên hệ với chủ xe
            </Button>
            <Button
              className="w-full py-3"
              variant="outline"
              onClick={handleCancelClick}
            >
              Huỷ chuyến
            </Button>
          </div>
        );
      case "completed":
        return (
          <div className="space-y-4">
            <Button className="w-full py-3" variant="primary">
              Đánh giá chuyến đi
            </Button>
            <Button className="w-full py-3" variant="outline">
              Liên hệ với chủ xe
            </Button>
          </div>
        );
      case "cancelled":
      default:
        return (
          <div className="p-6 text-center text-gray-600 bg-gray-100 rounded-lg">
            <p className="mb-2 font-medium">Chuyến đi đã bị huỷ</p>
            <p className="text-sm">
              Lý do: {booking.cancellationReason || "Không có lý do cụ thể"}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-12">
      <div className="lg:col-span-12">
        {booking.status === "cancelled" && (
          <div className="flex items-center p-4 mb-6 border-l-4 border-red-500 bg-red-50">
            <svg
              className="w-8 h-8 mr-3 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium text-red-700">Chủ xe đã từ chối</span>
          </div>
        )}

        <div className="flex flex-col mb-6 md:flex-row">
          <div className="pr-4 md:w-1/2">
            <img
              src={booking.car.images[0]}
              alt={booking.car.name}
              className="object-cover w-full h-auto rounded-lg aspect-video"
            />
          </div>
          <div className="mt-4 md:w-1/2 md:mt-0">
            <h2 className="text-xl font-bold uppercase">{booking.car.name}</h2>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-600">{booking.car.type}</span>
            </div>
            <div className="flex items-center mt-1">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#ffc107]">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="ml-1 font-medium">{booking.car.rating}</span>
              <span className="mx-1">•</span>
              <span className="text-sm text-gray-600">
                {booking.car.trips} chuyến
              </span>
            </div>
            <div className="flex items-center mt-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="ml-2 text-sm">{booking.car.location}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-4 font-medium">Thời gian thuê xe</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-3">
                <svg
                  className="w-5 h-5 mr-2 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium">Bắt đầu thuê xe</span>
              </div>
              <div className="text-xl font-bold">{booking.startDate}</div>
              <div className="mt-1 inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                Ngày mai
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-3">
                <svg
                  className="w-5 h-5 mr-2 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium">Kết thúc thuê xe</span>
              </div>
              <div className="text-xl font-bold">{booking.endDate}</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-4 font-medium">Địa điểm giao nhận xe</h3>
          <div className="p-4 border border-gray-200 rounded-lg">
            <span className="block text-lg">{booking.pickupLocation}</span>
            <div className="mt-3">
              <a
                href="#"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Xem bản đồ
              </a>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-4 font-medium">
            Giấy tờ thuê xe{" "}
            <svg
              className="inline-block w-4 h-4 ml-1 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </h3>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center py-2 border-b border-gray-100">
              <div className="flex items-center justify-center w-6 h-6 mr-3 text-xs bg-gray-200 rounded-full">
                1
              </div>
              <span>Chọn 1 trong 2 hình thức</span>
            </div>
            <div className="flex items-center p-3 mt-3 border rounded-md border-primary bg-primary/5">
              <div className="flex-shrink-0 mr-3">
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">
                  GPLX (đối chiếu) & CCCD (đối chiếu VNeID)
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-medium">
            Tài sản thế chấp{" "}
            <svg
              className="inline-block w-4 h-4 ml-1 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </h3>
          <div className="p-4 border-l-4 border-orange-400 rounded-lg bg-orange-50">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 text-orange-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-orange-700">
                  Không yêu cầu khách thuê thế chấp Tiền mặt hoặc Xe máy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <BookingCancelConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmCancel}
      />

      <BookingCancelReasonModal
        isOpen={isReasonModalOpen}
        onClose={() => setIsReasonModalOpen(false)}
        onConfirm={handleCancelWithReason}
      />
    </div>
  );
}
