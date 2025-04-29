import { useState } from "react";
import { useEffect } from "react";
import { mockBookings } from "../utils/mockData";
import ProgressSteps from "../components/bookings/ProgressSteps";
import BookingNotice from "../components/bookings/common/BookingNotice";
import ConfirmBookingModal from "../components/modals/BookingModal/owner/ConfirmBookingModal";
import ConfirmReturnCarModal from "../components/modals/BookingModal/owner/ConfirmReturnCarModal";
import ReportModal from "../components/modals/BookingModal/owner/ReportModal";

export default function OwnerBookingDetail() {
  // Local state
  const [bookingStatus, setBookingStatus] = useState("pending");
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState(mockBookings[0]);

  // Modal states
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmBookingModal, setShowConfirmBookingModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showReturnConfirmModal, setShowReturnConfirmModal] = useState(false);

  // Update currentStep based on bookingStatus
  useEffect(() => {
    switch (bookingStatus) {
      case "pending":
        setCurrentStep(1);
        break;
      case "confirm":
      case "payment":
        setCurrentStep(2);
        break;
      case "progress":
        setCurrentStep(4);
        break;
      case "complete":
        setCurrentStep(5);
        break;
      default:
        setCurrentStep(1);
    }
  }, [bookingStatus]);

  // Function to update booking status
  const updateBookingStatus = (newStatus) => {
    setBookingStatus(newStatus);
  };

  // Modal handlers
  const handleCancelBooking = () => {
    updateBookingStatus("complete");
    setShowCancelModal(false);
  };

  const handleConfirmBooking = () => {
    updateBookingStatus("confirm");
    setShowConfirmBookingModal(false);
  };

  const handleReportSubmit = (reportData) => {
    console.log("Report submitted:", reportData);
    setShowReportModal(false);
    alert("Báo cáo khách hàng đã được gửi thành công!");
  };

  const handleReturnConfirm = (returnData) => {
    console.log("Return confirmed:", returnData);
    updateBookingStatus("complete");
    setShowReturnConfirmModal(false);
  };

  // Utility function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VND";
  };

  // Helper function to render car details
  const renderCarDetails = () => (
    <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">Thông tin xe</h3>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:w-1/3">
          <img
            src={bookingData.car.images[0]}
            alt={bookingData.car.name}
            className="object-cover w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h4 className="text-xl font-medium text-gray-800">
            {bookingData.car.name}
          </h4>
          <div className="grid grid-cols-1 mt-3 md:grid-cols-2 gap-y-3">
            <div>
              <p className="text-gray-600">Loại xe:</p>
              <p className="font-medium">{bookingData.car.type}</p>
            </div>
            <div>
              <p className="text-gray-600">Số ghế:</p>
              <p className="font-medium">{bookingData.car.seats} chỗ</p>
            </div>
            <div>
              <p className="text-gray-600">Nhiên liệu:</p>
              <p className="font-medium">{bookingData.car.fuel}</p>
            </div>
            <div>
              <p className="text-gray-600">Tiêu thụ:</p>
              <p className="font-medium">{bookingData.car.fuelConsumption}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Helper function to render customer details
  const renderCustomerDetails = () => (
    <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Thông tin khách hàng
      </h3>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 overflow-hidden bg-gray-200 rounded-full">
          <img
            src="https://ext.same-assets.com/1283309287/1369451906.svg"
            alt="Customer Avatar"
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-800">Nguyễn Văn A</h4>
          <p className="text-gray-600">Khách hàng mới</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
        <div>
          <p className="text-gray-600">Số điện thoại:</p>
          <p className="font-medium">0912 345 678</p>
        </div>
        <div>
          <p className="text-gray-600">Email:</p>
          <p className="font-medium">nguyen.van.a@example.com</p>
        </div>
        <div>
          <p className="text-gray-600">GPLX:</p>
          <p className="font-medium">123456789012</p>
        </div>
        <div>
          <p className="text-gray-600">Ngày cấp:</p>
          <p className="font-medium">01/01/2020</p>
        </div>
      </div>
    </div>
  );

  // Helper function to render booking details
  const renderBookingDetails = () => (
    <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Thông tin đặt xe
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
        <div>
          <p className="text-gray-600">Thời gian bắt đầu:</p>
          <p className="font-medium">{bookingData.startDate}</p>
        </div>
        <div>
          <p className="text-gray-600">Thời gian kết thúc:</p>
          <p className="font-medium">{bookingData.endDate}</p>
        </div>
        <div>
          <p className="text-gray-600">Địa điểm nhận xe:</p>
          <p className="font-medium">{bookingData.pickupLocation}</p>
        </div>
        <div>
          <p className="text-gray-600">Địa điểm trả xe:</p>
          <p className="font-medium">{bookingData.dropoffLocation}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-gray-600">Yêu cầu của khách:</p>
          <p className="font-medium">{bookingData.requirementMessage}</p>
        </div>
      </div>
    </div>
  );

  // Helper function to render payment details
  const renderPaymentDetails = () => (
    <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Thông tin thanh toán
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-600">Giá thuê xe:</span>
          <span className="font-medium text-gray-800">
            {formatCurrency(bookingData.price.basePrice)}
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-600">Phí dịch vụ:</span>
          <span className="font-medium text-gray-800">
            {formatCurrency(bookingData.price.serviceFee)}
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-600">Bảo hiểm:</span>
          <span className="font-medium text-gray-800">
            {formatCurrency(bookingData.price.insurance)}
          </span>
        </div>
        {bookingData.price.discount > 0 && (
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Ưu đãi:</span>
            <span className="font-medium text-green-600">
              -{formatCurrency(bookingData.price.discount)}
            </span>
          </div>
        )}
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="font-semibold text-gray-700">Tổng tiền:</span>
          <span className="font-semibold text-gray-800">
            {formatCurrency(bookingData.price.total)}
          </span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Đặt cọc (40%):</span>
          <span className="font-medium text-gray-800">
            {formatCurrency(bookingData.price.depositAmount)}
          </span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Thanh toán khi nhận xe:</span>
          <span className="font-medium text-gray-800">
            {formatCurrency(bookingData.price.remainingAmount)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-8 bg-gray-100">
      <div className="container px-4 mx-auto">
        <ProgressSteps currentStep={currentStep} />

        {/* Pending Status - Show booking request details with confirm/cancel options */}
        {bookingStatus === "pending" && (
          <div className="space-y-6">
            <BookingNotice
              status="pending"
              notificationText="Bạn có yêu cầu đặt xe mới"
            />

            {renderCustomerDetails()}
            {renderBookingDetails()}
            {renderCarDetails()}
            {renderPaymentDetails()}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowCancelModal(true)}
                className="px-6 py-3 font-semibold text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-600"
              >
                Từ chối yêu cầu
              </button>
              <button
                onClick={() => setShowConfirmBookingModal(true)}
                className="px-6 py-3 font-semibold text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
              >
                Xác nhận yêu cầu
              </button>
            </div>
          </div>
        )}

        {/* Confirm or Payment Status - Show booking confirmed */}
        {(bookingStatus === "confirm" || bookingStatus === "payment") && (
          <div className="space-y-6">
            <div className="p-4 mb-6 border-l-4 border-green-400 bg-green-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Bạn đã xác nhận yêu cầu đặt xe này.
                    {bookingStatus === "payment" &&
                      " Khách hàng đã thanh toán đặt cọc."}
                  </p>
                </div>
              </div>
            </div>

            {renderCustomerDetails()}
            {renderBookingDetails()}
            {renderCarDetails()}
            {renderPaymentDetails()}

            <div className="flex justify-between gap-4">
              <button
                onClick={() => updateBookingStatus("pending")}
                className="px-6 py-3 font-semibold text-white transition duration-300 bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Quay lại
              </button>
              <button
                onClick={() => updateBookingStatus("progress")}
                className="px-6 py-3 font-semibold text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
              >
                {bookingStatus === "payment"
                  ? "Xem thông tin chuyến đi"
                  : "Đánh dấu đã thanh toán đặt cọc"}
              </button>
            </div>
          </div>
        )}

        {/* Progress Status - Show trip in progress with option to confirm return */}
        {bookingStatus === "progress" && (
          <div className="space-y-6">
            <div className="p-4 mb-6 border-l-4 border-blue-400 bg-blue-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Chuyến đi đang diễn ra. Khách hàng sẽ trả xe theo lịch đã
                    đặt.
                  </p>
                </div>
              </div>
            </div>

            {renderCustomerDetails()}
            {renderBookingDetails()}

            <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Thông tin khởi hành
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">Ngày nhận xe:</span>
                  <span className="font-medium text-gray-800">
                    {bookingData.startDate.split(" - ")[1]}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">Giờ nhận xe:</span>
                  <span className="font-medium text-gray-800">
                    {bookingData.startDate.split(" - ")[0]}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">
                    Ngày trả xe dự kiến:
                  </span>
                  <span className="font-medium text-gray-800">
                    {bookingData.endDate.split(" - ")[1]}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">
                    Giờ trả xe dự kiến:
                  </span>
                  <span className="font-medium text-gray-800">
                    {bookingData.endDate.split(" - ")[0]}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => updateBookingStatus("confirm")}
                className="px-6 py-3 font-semibold text-white transition duration-300 bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Quay lại
              </button>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowReportModal(true)}
                  className="px-6 py-3 font-semibold text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Báo cáo khách hàng
                </button>
                <button
                  onClick={() => setShowReturnConfirmModal(true)}
                  className="px-6 py-3 font-semibold text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
                >
                  Xác nhận trả xe thành công
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Complete Status - Show booking complete or canceled */}
        {bookingStatus === "complete" && (
          <div className="space-y-6">
            <div className="p-8 mb-8 bg-white rounded-lg shadow-sm">
              <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 mb-5 bg-green-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-12 h-12 text-green-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-gray-800">
                  Chuyến đi đã hoàn thành!
                </h2>
                <p className="text-gray-600">
                  Khách hàng đã trả xe thành công.
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-6 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="mb-4 font-medium text-gray-700">
                    Thông tin chuyến đi
                  </h3>

                  <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-600">
                        Tổng thời gian thuê:
                      </span>
                      <span className="font-medium text-gray-800">1 ngày</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-600">
                        Tổng quãng đường:
                      </span>
                      <span className="font-medium text-gray-800">150 km</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-600">
                        Ngày trả xe:
                      </span>
                      <span className="font-medium text-gray-800">
                        {bookingData.endDate.split(" - ")[1]}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-600">Giờ trả xe:</span>
                      <span className="font-medium text-gray-800">
                        {bookingData.endDate.split(" - ")[0]}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="mb-2 font-medium text-gray-700">
                      Chi phí chuyến đi
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tiền thuê xe:</span>
                        <span className="font-medium text-gray-800">
                          {formatCurrency(bookingData.price.basePrice)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phí dịch vụ:</span>
                        <span className="font-medium text-gray-800">
                          {formatCurrency(bookingData.price.serviceFee)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phí phát sinh:</span>
                        <span className="font-medium text-gray-800">0 VND</span>
                      </div>
                      <div className="flex justify-between pt-2 mt-2 border-t border-gray-200">
                        <span className="font-semibold text-gray-800">
                          Tổng cộng:
                        </span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(bookingData.price.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => updateBookingStatus("progress")}
                    className="px-6 py-3 font-semibold text-white transition duration-300 bg-gray-500 rounded-lg hover:bg-gray-600"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={() => updateBookingStatus("pending")}
                    className="px-6 py-3 font-semibold text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
                  >
                    Quay về trang chủ
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        <ConfirmBookingModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancelBooking}
          title="Từ chối yêu cầu đặt xe"
          message="Bạn có chắc chắn muốn từ chối yêu cầu đặt xe này? Hành động này sẽ hủy yêu cầu đặt xe."
          confirmText="Từ chối yêu cầu"
        />

        <ConfirmBookingModal
          isOpen={showConfirmBookingModal}
          onClose={() => setShowConfirmBookingModal(false)}
          onConfirm={handleConfirmBooking}
          title="Xác nhận yêu cầu đặt xe"
          message="Bạn có chắc chắn muốn xác nhận yêu cầu đặt xe này? Khách hàng sẽ được thông báo để tiến hành thanh toán đặt cọc."
          confirmText="Xác nhận"
        />

        <ReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReportSubmit}
        />

        <ConfirmReturnCarModal
          isOpen={showReturnConfirmModal}
          onClose={() => setShowReturnConfirmModal(false)}
          onConfirm={handleReturnConfirm}
        />
      </div>
    </div>
  );
}
