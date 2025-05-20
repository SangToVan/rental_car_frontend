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
import ImageSlider from "../components/common/ImageSlider";
import { fuelTypeMap, transmissionMap } from "../shared/utils/labelMap";

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
    window.location.reload();
    navigate(`/owner/booking/${bookingId}`);
  };

  const handleCancelBooking = async () => {
    const { message } = await cancelBookingApi(bookingId);
    toast.success(message);
    setShowCancelModal(false);
    window.location.reload();
    navigate(`/owner/booking/${bookingId}`);
  };

  const handleConfirmReturn = async () => {
    const { message } = await confirmReturnApi(bookingId);
    toast.success(message);
    setShowConfirmReturnModal(false);
    window.location.reload();
    navigate(`/owner/bookings/${bookingId}`);
  };

  const handleCompleteBooking = async () => {
    const { message } = await completeBookingApi(bookingId);
    toast.success(message);
    setShowCompleteBookingModal(false);
    window.location.reload();
    //navigate(`/owner/bookings/${bookingId}`);
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
        {/* Ảnh xe */}
        <div className="md:w-1/3">
          <ImageSlider images={carInfor.images} height="h-64" />
        </div>

        {/* Thông tin chi tiết */}
        <div className="space-y-3 md:w-2/3">
          <h4 className="text-xl font-medium text-gray-800">
            {carInfor?.name}
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
            <div>
              <p className="text-gray-600">Số ghế:</p>
              <p className="font-medium">{carInfor?.numberOfSeats} chỗ</p>
            </div>
            <div>
              <p className="text-gray-600">Truyền động:</p>
              <p className="font-medium">
                {transmissionMap[carInfor?.transmission] ||
                  carInfor?.transmission}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Nhiên liệu:</p>
              <p className="font-medium">
                {fuelTypeMap[carInfor?.fuelType] || carInfor?.fuelType}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Tiêu hao nhiên liệu:</p>
              <p className="font-medium">{carInfor?.fuelConsumption} L/100km</p>
            </div>
            <div>
              <p className="text-gray-600">Số km đã đi:</p>
              <p className="font-medium">
                {carInfor?.mileage?.toLocaleString()} km
              </p>
            </div>
            {/* Mô tả */}
            {carInfor?.description && (
              <div>
                <p className="text-gray-600 ">Mô tả xe:</p>
                <p className="font-medium">{carInfor.description}</p>
              </div>
            )}

            {/* Chức năng bổ sung */}
            {carInfor?.additionalFunctions && (
              <div>
                <p className="text-gray-600 ">Chức năng khác:</p>
                <p className="font-medium">{carInfor.additionalFunctions}</p>
              </div>
            )}
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

  const renderDriverInfo = () => {
    const documentType = bookingDetails?.documentRental;

    // Nếu không có bằng lái, hiện thông tin người lái riêng
    if (documentType === "NONE") {
      return (
        <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Thông tin người lái xe
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
            <div>
              <p className="text-gray-600">Họ tên:</p>
              <p className="font-medium">{bookingDetails?.driverName}</p>
            </div>
            <div>
              <p className="text-gray-600">Số điện thoại:</p>
              <p className="font-medium">{bookingDetails?.driverPhone}</p>
            </div>
            <div>
              <p className="text-gray-600">CMND/CCCD:</p>
              <p className="font-medium">{bookingDetails?.driverCitizenId}</p>
            </div>
            <div>
              <p className="text-gray-600">Mối quan hệ với người thuê:</p>
              <p className="font-medium">
                {bookingDetails?.relationship || "Không rõ"}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Ngược lại, chính khách hàng là người lái
    return (
      <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Thông tin người lái xe
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
          <div>
            <p className="text-gray-600">Họ tên:</p>
            <p className="font-medium">{renterInfor?.username}</p>
          </div>
          <div>
            <p className="text-gray-600">Số điện thoại:</p>
            <p className="font-medium">{renterInfor?.phoneNumber}</p>
          </div>
          <div>
            <p className="text-gray-600">Email:</p>
            <p className="font-medium">{renterInfor?.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Ngày sinh:</p>
            <p className="font-medium">{renterInfor?.birthday}</p>
          </div>
        </div>
      </div>
    );
  };

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

      {/* Nhóm 1: Đơn giá */}
      <h4 className="mb-2 text-sm font-semibold text-gray-600 uppercase">
        Đơn giá theo ngày
      </h4>
      <div className="mb-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Giá thuê xe:</span>
          <span>{currencyFormat(carInfor?.basePrice)}/ngày</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Bảo hiểm thuê xe:</span>
          <span>{currencyFormat(INSURANCE_FEE_PER_DAY)}/ngày</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Bảo hiểm người trên xe:</span>
          <span>{currencyFormat(PASSENGER_INSURANCE_FEE_PER_DAY)}/ngày</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Số ngày thuê:</span>
          <span>{rentalDays} ngày</span>
        </div>
      </div>

      <hr className="my-3 border-gray-200" />

      {/* Nhóm 2: Tổng tiền */}
      <h4 className="mb-2 text-sm font-semibold text-gray-600 uppercase">
        Tổng tiền
      </h4>
      <div className="flex justify-between py-2 mb-2">
        <span className="font-medium text-gray-800">Thành tiền:</span>
        <span className="text-lg font-semibold text-primary">
          {currencyFormat(bookingDetails?.totalPrice)}
        </span>
      </div>

      <hr className="my-3 border-gray-200" />

      {/* Nhóm 3: Thanh toán */}
      <h4 className="mb-2 text-sm font-semibold text-gray-600 uppercase">
        Trạng thái thanh toán
      </h4>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Đã thanh toán:</span>
          <span>{currencyFormat(bookingDetails?.totalPaidAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tiền mặt cần thanh toán:</span>
          <span>{currencyFormat(bookingDetails?.needToPayInCash)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tiền đặt cọc:</span>
          <span>{currencyFormat(bookingDetails?.depositAmount)}</span>
        </div>
        {parseFloat(bookingDetails?.refundAmount) > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Số tiền hoàn trả:</span>
            <span>{currencyFormat(bookingDetails?.refundAmount)}</span>
          </div>
        )}
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
            {renderDriverInfo()}
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
            {renderDriverInfo()}
            {renderBookingDetails()}
            {renderCarDetails()}
            {renderPaymentDetails()}
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-6 py-3 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600"
                onClick={() => setShowCancelModal(true)}
              >
                Huỷ yêu cầu
              </button>
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
            {renderDriverInfo()}
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
            {renderDriverInfo()}
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
            {renderDriverInfo()}
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
            {renderDriverInfo()}
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
            {renderDriverInfo()}
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
