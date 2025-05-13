import { useState } from "react";
import { useEffect } from "react";
import ProgressSteps from "../components/bookings/ProgressSteps";
import BookingNotice from "../components/bookings/common/BookingNotice";
import ConfirmBookingModal from "../components/modals/BookingModal/owner/ConfirmBookingModal";
import ConfirmReturnCarModal from "../components/modals/BookingModal/owner/ConfirmReturnCarModal";
import ReportModal from "../components/modals/BookingModal/owner/ReportModal";
import { useNavigate, useParams } from "react-router-dom";
import {
  cancelBookingApi,
  completeBookingApi,
  confirmBookingApi,
  confirmReturnApi,
  getBookingDetailsApi,
} from "../shared/apis/bookingApi";
import { toast } from "react-toastify";
import { currencyFormat } from "../shared/utils";
import {
  calculateRentalDays,
  calculateTotalRentalCost,
  INSURANCE_FEE_PER_DAY,
  PASSENGER_INSURANCE_FEE_PER_DAY,
} from "../shared/utils/rentalPrice";

export default function OwnerBookingDetail() {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [carInfor, setCarInfor] = useState(null);
  const [renterInfor, setRenterInfor] = useState(null);
  const [rentalDays, setRentalDays] = useState(1);
  const [startDate, setStartDate] = useState("04/04/2025 21:00");
  const [endDate, setEndDate] = useState("05/04/2025 20:00");
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [currentStep, setCurrentStep] = useState(2);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmBookingModal, setShowConfirmBookingModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showConfirmReturnModal, setShowConfirmReturnModal] = useState(false);
  const [showCompletBookingModal, setShowCompleteBookingModal] =
    useState(false);
  // const [showConfirmPaymentModal, setShowConfirmPaymentModal] = useState(false)
  const params = useParams();
  const navigate = useNavigate();
  const { bookingId } = params;

  useEffect(() => {
    getBookingDetailsApi(bookingId).then((data) => {
      const { carDetail, customerInfo } = data.data;
      setBookingDetails(data.data);
      setCarInfor(carDetail);
      setRenterInfor(customerInfo);
      setStartDate(data.data.startDateTime);
      setEndDate(data.data.endDateTime);
      setBookingStatus(data.data.status);
    });
  }, [bookingId]);

  useEffect(() => {
    if (startDate && endDate && carInfor) {
      const days = calculateRentalDays(startDate, endDate);
      const total = calculateTotalRentalCost(carInfor?.basePrice, days);
      setRentalDays(days);
      setTotalPrice(total);
    }
  }, [startDate, endDate, carInfor]);

  const handleConfirmBooking = async () => {
    const { message } = await confirmBookingApi(bookingId);
    toast.success(message);
    setShowConfirmBookingModal(false);
    navigate(`/owner/booking/${bookingId}`);
  };

  const handleCancelBooking = async () => {
    const { message } = await cancelBookingApi(bookingId);
    toast.success(message);
    setShowCancelModal(false);
    navigate(`/owner/bookings/${bookingId}`);
  };

  const handleConfirmReturn = async () => {
    const { message } = await confirmReturnApi(bookingId);
    toast.success(message);
    setShowConfirmReturnModal(false);
    navigate(`/owner/bookings/${bookingId}`);
  };

  const handleCompleteBooking = async () => {
    const { message } = await completeBookingApi(bookingId);
    toast.success(message);
    setShowCompleteBookingModal(false);
    navigate(`/owner/bookings/${bookingId}`);
  };

  // Update currentStep based on bookingStatus
  useEffect(() => {
    if (!bookingDetails) return;
    const status = bookingDetails.status;
    setBookingStatus(status);

    switch (status) {
      case "PENDING":
        setCurrentStep(1);
        break;
      case "PAID":
      case "CONFIRMED":
        setCurrentStep(3);
        break;
      case "IN_PROGRESS":
        setCurrentStep(4);
        break;
      case "COMPLETED":
      case "RETURNED":
      case "CANCELLED":
        setCurrentStep(5);
        break;
      default:
        setCurrentStep(1);
    }
  }, [bookingDetails]);

  // Helper function to render car details
  const renderCarDetails = () => (
    <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">Thông tin xe</h3>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:w-1/3">
          <img
            src={carInfor.images[0].imageUrl}
            alt={carInfor.name}
            className="object-cover w-full h-auto rounded-lg"
          />
        </div>
        <div className="md:w-2/3">
          <h4 className="text-xl font-medium text-gray-800">
            {carInfor?.name}
          </h4>
          <div className="grid grid-cols-1 mt-3 md:grid-cols-2 gap-y-3">
            <div>
              <p className="text-gray-600">Loại xe:</p>
              <p className="font-medium">{carInfor?.type}</p>
            </div>
            <div>
              <p className="text-gray-600">Số ghế:</p>
              <p className="font-medium">{carInfor?.numberOfSeats} chỗ</p>
            </div>
            <div>
              <p className="text-gray-600">Nhiên liệu:</p>
              <p className="font-medium">{carInfor?.fuelType}</p>
            </div>
            <div>
              <p className="text-gray-600">Tiêu thụ:</p>
              <p className="font-medium">{carInfor?.fuelConsumption} L/100km</p>
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
            src={renterInfor?.avatar}
            alt={renterInfor?.username}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-800">
            {renterInfor?.username}
          </h4>
          <p className="text-gray-600">{renterInfor?.createdAt}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
        <div>
          <p className="text-gray-600">Số điện thoại:</p>
          <p className="font-medium">{renterInfor?.phoneNumber}</p>
        </div>
        <div>
          <p className="text-gray-600">Email:</p>
          <p className="font-medium">{renterInfor?.email}</p>
        </div>
        <div>
          <p className="text-gray-600">GPLX:</p>
          <p className="font-medium">{renterInfor?.drivingLicense}</p>
        </div>
        <div>
          <p className="text-gray-600">Ngày cấp:</p>
          <p className="font-medium">{renterInfor?.licenseBirthday}</p>
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
          <p className="font-medium">{bookingDetails?.startDateTime}</p>
        </div>
        <div>
          <p className="text-gray-600">Thời gian kết thúc:</p>
          <p className="font-medium">{bookingDetails?.endDateTime}</p>
        </div>
        <div>
          <p className="text-gray-600">Địa điểm nhận xe:</p>
          <p className="font-medium">{carInfor?.address}</p>
        </div>
        <div>
          <p className="text-gray-600">Địa điểm trả xe:</p>
          <p className="font-medium">{carInfor?.address}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-gray-600">Yêu cầu của khách:</p>
          <p className="font-medium">
            {bookingDetails?.requirementMessage || "Không có yêu cầu"}
          </p>
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
            {currencyFormat(carInfor?.basePrice)}/ngày
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-600">Bảo hiểm thuê xe:</span>
          <span className="font-medium text-gray-800">
            {currencyFormat(INSURANCE_FEE_PER_DAY)}/ngày
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="text-gray-600">Bảo hiểm người trên xe:</span>
          <span className="font-medium text-gray-800">
            {currencyFormat(PASSENGER_INSURANCE_FEE_PER_DAY)}/ngày
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="font-semibold text-gray-700">Tổng cộng / ngày:</span>
          <span className="font-semibold text-gray-800">
            {currencyFormat(
              carInfor?.basePrice +
                INSURANCE_FEE_PER_DAY +
                PASSENGER_INSURANCE_FEE_PER_DAY
            )}
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="font-semibold text-gray-700">Số ngày thuê:</span>
          <span className="font-semibold text-gray-800">{rentalDays} ngày</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="font-semibold text-primary">Thành tiền:</span>
          <span className="font-semibold text-primary">
            {currencyFormat(bookingDetails?.totalPrice)}
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
        {bookingStatus === "PENDING" && (
          <>
            <BookingNotice
              status="PENDING"
              notificationText="Chờ khách hàng thanh toán"
            />
            {renderCustomerDetails()}
            {renderBookingDetails()}
            {renderCarDetails()}
            {renderPaymentDetails()}
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-6 py-3 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                onClick={() => setShowCancelModal(true)}
              >
                Từ chối yêu cầu
              </button>
              <button
                className="px-6 py-3 font-semibold text-white bg-green-400 rounded-lg cursor-not-allowed"
                disabled
              >
                Xác nhận yêu cầu
              </button>
            </div>
          </>
        )}

        {bookingStatus === "PAID" && (
          <>
            <BookingNotice
              status="PAID"
              notificationText="Khách hàng đã thanh toán, vui lòng xác nhận đơn hàng"
            />
            {renderCustomerDetails()}
            {renderBookingDetails()}
            {renderCarDetails()}
            {renderPaymentDetails()}
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-6 py-3 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
                onClick={() => setShowConfirmBookingModal(true)}
              >
                Xác nhận yêu cầu
              </button>
            </div>
          </>
        )}

        {bookingStatus === "CONFIRMED" && (
          <>
            <BookingNotice
              status="CONFIRMED"
              notificationText="Đơn đặt xe đã được xác nhận, chờ ngày khởi hành"
            />
            {renderCustomerDetails()}
            {renderBookingDetails()}
            {renderCarDetails()}
            {renderPaymentDetails()}
          </>
        )}

        {bookingStatus === "IN_PROGRESS" && (
          <>
            <BookingNotice
              status="IN_PROGRESS"
              notificationText="Đơn đặt xe đang được tiến hành"
            />
            {renderCustomerDetails()}
            {renderBookingDetails()}
            {renderCarDetails()}
            {renderPaymentDetails()}
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-6 py-3 font-semibold text-white bg-primary"
                onClick={() => setShowConfirmReturnModal(true)}
              >
                Xác nhận trả xe
              </button>
              <button
                className="px-6 py-3 font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                onClick={() => setShowReportModal(true)}
              >
                Báo cáo sự cố
              </button>
            </div>
          </>
        )}

        {bookingStatus === "RETURNED" && (
          <>
            <BookingNotice
              status="RETURNED"
              notificationText="Hãy xác nhận hoàn thành đơn hàng để nhận tiền"
            />
            {renderCustomerDetails()}
            {renderBookingDetails()}
            {renderCarDetails()}
            {renderPaymentDetails()}
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-6 py-3 font-semibold text-white rounded-lg bg-primary"
                onClick={() => setShowCompleteBookingModal(true)}
              >
                Xác nhận hoàn thành
              </button>
            </div>
          </>
        )}

        {bookingStatus === "COMPLETED" && (
          <>
            <BookingNotice
              status="COMPLETED"
              notificationText="Đơn hàng đã hoàn thành"
            />
            {renderCustomerDetails()}
            {renderBookingDetails()}
            {renderCarDetails()}
            {renderPaymentDetails()}
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-6 py-3 font-semibold text-white rounded-lg bg-primary hover:bg-primary-foreground"
                onClick={() => navigate("/")}
              >
                Trở về trang chủ
              </button>
            </div>
          </>
        )}

        {bookingStatus === "CANCELLED" && (
          <>
            <BookingNotice
              status="CANCELLED"
              notificationText="Đơn hàng đã bị hủy"
            />
            {renderCustomerDetails()}
            {renderBookingDetails()}
            {renderCarDetails()}
            {renderPaymentDetails()}
          </>
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
          onSubmit={() => toast.info("Chức năng báo cáo đang được phát triển")}
        />

        <ConfirmReturnCarModal
          isOpen={showConfirmReturnModal}
          onClose={() => setShowConfirmReturnModal(false)}
          onConfirm={handleConfirmReturn}
        />

        <ConfirmBookingModal
          isOpen={showCompletBookingModal}
          onClose={() => setShowCompleteBookingModal(false)}
          onConfirm={handleCompleteBooking}
          title="Xác nhận hoàn thành đơn hàng"
          message="Bạn có chắc chắn muốn xác nhận hoàn thành đơn hàng này? Bạn sẽ nhận được tiền sau khi hoàn tất."
          confirmText="Hoàn thành"
        />
      </div>
    </div>
  );
}
