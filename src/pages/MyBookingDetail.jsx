import { useState } from "react";
import { useEffect } from "react";
import ProgressSteps from "../components/bookings/ProgressSteps";
import BookingNotice from "../components/bookings/common/BookingNotice";
import ConfirmBookingModal from "../components/modals/BookingModal/owner/ConfirmBookingModal";
import { useNavigate, useParams } from "react-router-dom";
import {
  addFeedbackApi,
  cancelBookingApi,
  confirmPickUpApi,
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
import PaymentPage from "./PaymentPage";
import {
  fuelTypeMap,
  relationshipMap,
  transmissionMap,
} from "../shared/utils/labelMap";
import ImageSlider from "../components/common/ImageSlider";

export default function MyBookingDetail() {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [carInfor, setCarInfor] = useState(null);
  const [renterInfor, setRenterInfor] = useState(null);
  const [rentalDays, setRentalDays] = useState(1);
  const [startDate, setStartDate] = useState("04/04/2025 21:00");
  const [endDate, setEndDate] = useState("05/04/2025 20:00");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmDepositModal, setShowConfirmDepositModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("WALLET");
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const navigate = useNavigate();

  // const [showConfirmPaymentModal, setShowConfirmPaymentModal] = useState(false)
  const params = useParams();
  const { bookingId } = params;

  useEffect(() => {
    getBookingDetailsApi(bookingId).then((data) => {
      const { carDetail, customerInfo } = data.data;
      setBookingDetails(data.data);
      setCarInfor(carDetail);
      setRenterInfor(customerInfo);
      setStartDate(data.data.startDateTime);
      setEndDate(data.data.endDateTime);
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

  const handlePaymentClick = () => {
    setCurrentStep(2);
    setShowPaymentPage(true);
  };

  const handleCancelBooking = async () => {
    const { message } = await cancelBookingApi(bookingId);
    toast.success(message);
    window.location.reload();
  };

  const handleConfirmPickup = async () => {
    const { message } = await confirmPickUpApi(bookingId);
    toast.success(message);
    window.location.reload();
  };

  const [star, setStar] = useState(0);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleSendReview = () => {
    if (star === 0) {
      toast.error("Vui lòng chọn số sao!");
      return;
    }

    if (!content) {
      toast.error("Vui lòng nhập nội dung đánh giá!");
      return;
    }

    setLoading(true);
    addFeedbackApi(bookingId, { rating: star, content })
      .then((data) => {
        toast.success(data?.message ?? "Cảm ơn bạn đã đánh giá!");
        setShowFeedbackModal(false);
        setStar(0);
        setContent("");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Local state
  const [bookingStatus, setBookingStatus] = useState(bookingDetails?.status);
  const [currentStep, setCurrentStep] = useState(2);

  // Modal states
  const [showCancelModal, setShowCancelModal] = useState(false);
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
          <ImageSlider images={carInfor?.images} height="h-64" />
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

            {/* Điều khoản thuê xe */}
            {carInfor?.description && (
              <div>
                <p className="text-gray-600 ">Điều khoản thuê xe:</p>
                <p className="font-medium">{carInfor.termOfUse}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Helper function to render customer details
  const renderOwnerDetails = () => (
    <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        Thông tin chủ xe
      </h3>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 overflow-hidden bg-gray-200 rounded-full">
          <img
            src={carInfor?.carOwner.avatar}
            alt={carInfor?.carOwner.username}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-800">
            {carInfor?.carOwner.username}
          </h4>
          <p className="text-gray-600">{carInfor?.carOwner.createdAt}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
        <div>
          <p className="text-gray-600">Số điện thoại:</p>
          <p className="font-medium">{carInfor?.carOwner.phoneNumber}</p>
        </div>
        <div>
          <p className="text-gray-600">Email:</p>
          <p className="font-medium">{carInfor?.carOwner.email}</p>
        </div>
        <div>
          <p className="text-gray-600">Giới tính:</p>
          <p className="font-medium">{carInfor?.carOwner.gender}</p>
        </div>
        <div>
          <p className="text-gray-600">Ngày sinh:</p>
          <p className="font-medium">{carInfor?.carOwner.birthday}</p>
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
                {relationshipMap[bookingDetails?.relationship]}
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
  // Render chi tiết thanh toán với các block rõ ràng và màu nền xen kẽ
  const renderPaymentDetails = () => {
    return (
      <div className="mt-6 space-y-6">
        {/* Block: Đơn giá theo ngày + Tổng tiền */}
        <div className="p-4 bg-white border rounded-md shadow-sm">
          <h4 className="mb-3 text-lg font-semibold text-gray-800">
            Đơn giá theo ngày
          </h4>
          <div className="divide-y divide-gray-100">
            <div className="flex justify-between py-1 text-base text-gray-700">
              <span>Giá thuê xe:</span>
              <span className="font-medium">
                {currencyFormat(carInfor?.basePrice)} /ngày
              </span>
            </div>
            <div className="flex justify-between py-1 text-base text-gray-700">
              <span>Phí bảo hiểm xe:</span>
              <span className="font-medium">
                {currencyFormat(
                  carInfor?.carInsurance || INSURANCE_FEE_PER_DAY
                )}{" "}
                /ngày
              </span>
            </div>
            <div className="flex justify-between py-1 text-base text-gray-700">
              <span>Phí bảo hiểm hành khách:</span>
              <span className="font-medium">
                {currencyFormat(
                  carInfor?.passengerInsurance ||
                    PASSENGER_INSURANCE_FEE_PER_DAY
                )}{" "}
                /ngày
              </span>
            </div>
            <div className="flex justify-between py-1 text-base text-gray-700">
              <span>Số ngày thuê:</span>
              <span className="font-medium">{rentalDays} ngày</span>
            </div>
          </div>

          {/* Tổng tiền gộp chung */}
          <div className="pt-3 mt-4 border-t">
            <div className="flex justify-between text-lg font-bold text-green-700">
              <span>Thành tiền:</span>
              <span>{currencyFormat(bookingDetails?.totalPrice)}</span>
            </div>
            <div className="mt-1 text-sm italic text-gray-500">
              = ({currencyFormat(carInfor?.basePrice)} +{" "}
              {currencyFormat(carInfor?.carInsurance || INSURANCE_FEE_PER_DAY)}{" "}
              +{" "}
              {currencyFormat(
                carInfor?.passengerInsurance || PASSENGER_INSURANCE_FEE_PER_DAY
              )}
              ) × {rentalDays} ngày
            </div>
          </div>
        </div>

        {/* Block: Chi tiết thanh toán */}
        <div className="p-4 bg-white border rounded-md shadow-sm">
          <h4 className="mb-3 text-lg font-semibold text-gray-800">
            Chi tiết thanh toán
          </h4>
          <div className="divide-y divide-gray-100">
            <div className="flex justify-between py-1 text-base text-gray-700">
              <span>Đã thanh toán:</span>
              <span className="font-medium">
                {currencyFormat(bookingDetails?.totalPaidAmount)}
              </span>
            </div>
            <div className="flex justify-between py-1 text-base text-gray-700">
              <span>Thanh toán khi nhận xe:</span>
              <span className="font-medium">
                {currencyFormat(bookingDetails?.needToPayInCash)}
              </span>
            </div>
            <div className="flex justify-between py-1 text-base text-gray-700">
              <span>Số tiền cần thanh toán:</span>
              <span className="font-medium">
                {currencyFormat(bookingDetails?.depositAmount || 0)}
              </span>
            </div>
            {bookingDetails?.refundAmount && (
              <div className="flex justify-between py-1 text-base font-semibold text-green-700">
                <span>Số tiền hoàn lại:</span>
                <span>{currencyFormat(bookingDetails?.refundAmount)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderActions = () => {
    const status = bookingDetails?.status;
    if (!status) return null;

    if (status === "PENDING") {
      return (
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowCancelModal(true)}
            className="px-6 py-3 font-semibold text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-600"
          >
            Huỷ đơn đặt xe
          </button>
          <button
            onClick={handlePaymentClick}
            className="px-6 py-3 font-semibold text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
          >
            Thanh toán
          </button>
        </div>
      );
    }

    if (status === "PAID") {
      return (
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowCancelModal(true)}
            className="px-6 py-3 font-semibold text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-600"
          >
            Huỷ đơn đặt xe
          </button>
        </div>
      );
    }

    if (status === "CONFIRMED") {
      return (
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowCancelModal(true)}
            className="px-6 py-3 font-semibold text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-600"
          >
            Huỷ đơn đặt xe
          </button>
          <button
            onClick={handleConfirmPickup}
            className="px-6 py-3 font-semibold text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Xác nhận lấy xe
          </button>
          <button className="px-6 py-3 font-semibold text-white transition duration-300 bg-yellow-500 rounded-lg hover:bg-yellow-600">
            Báo cáo
          </button>
        </div>
      );
    }

    if (status === "IN_PROGRESS") {
      return (
        <div className="flex justify-end gap-4">
          <button className="px-6 py-3 font-semibold text-white transition duration-300 bg-blue-500 rounded-lg hover:bg-blue-600">
            Hỗ trợ
          </button>
        </div>
      );
    }

    if (["RETURNED", "COMPLETED"].includes(status)) {
      return (
        <div className="flex justify-end gap-4">
          <button
            className="px-6 py-3 font-semibold text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
            onClick={() => setShowFeedbackModal(true)}
          >
            Đánh giá
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="py-8 bg-gray-100">
      <div className="container px-4 mx-auto">
        <ProgressSteps currentStep={currentStep} />

        {showPaymentPage ? (
          <PaymentPage
            bookingId={bookingId}
            onCancel={() => setShowPaymentPage(false)}
          />
        ) : (
          <div className="space-y-6">
            {/* BookingNotice */}
            {bookingDetails?.status === "PENDING" && (
              <BookingNotice
                status="PENDING"
                notificationText="Đơn đặt xe chưa được thanh toán"
              />
            )}
            {bookingDetails?.status === "PAID" && (
              <BookingNotice
                status="PAID"
                notificationText="Bạn đã thanh toán, đang chờ xác nhận từ chủ xe."
              />
            )}
            {bookingDetails?.status === "CONFIRMED" &&
              bookingDetails?.paymentMethod === "CASH" && (
                <BookingNotice
                  status="CONFIRM"
                  notificationText={`Chủ xe đã xác nhận. Vui lòng thanh toán ${currencyFormat(
                    bookingDetails.remainingAmount
                  )} khi nhận xe.`}
                />
              )}
            {bookingDetails?.status === "CONFIRMED" &&
              bookingDetails?.paymentMethod !== "CASH" && (
                <BookingNotice
                  status="CONFIRM"
                  notificationText="Chủ xe đã xác nhận. Vui lòng chuẩn bị nhận xe đúng thời gian."
                />
              )}
            {bookingDetails?.status === "IN_PROGRESS" && (
              <BookingNotice
                status="IN_PROGRESS"
                notificationText="Xe đang được thuê. Vui lòng chú ý thời gian trả xe."
              />
            )}
            {["RETURNED", "COMPLETED"].includes(bookingDetails?.status) && (
              <BookingNotice
                status="COMPLETED"
                notificationText="Đơn thuê đã hoàn tất. Cảm ơn bạn đã sử dụng dịch vụ!"
              />
            )}
            {bookingDetails?.status === "CANCELLED" && (
              <BookingNotice
                status="CANCELLED"
                cancelReason={bookingDetails?.cancelReason}
              />
            )}

            {/* Các phần thông tin */}
            {renderCarDetails()}
            {renderOwnerDetails()}
            {renderDriverInfo()}
            {renderBookingDetails()}
            {renderPaymentDetails()}

            {/* Nút thao tác */}
            {renderActions()}
          </div>
        )}

        {/* Modals */}
        <ConfirmBookingModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancelBooking}
          title="Xác nhận huỷ đơn đặt xe"
          message="Bạn có chắc chắn muốn huỷ đơn đặt xe này? Hành động này sẽ hủy yêu cầu đặt xe."
          confirmText="Huỷ yêu cầu"
        />

        {showFeedbackModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md p-6 bg-white rounded-lg">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Đánh giá chuyến đi
              </h3>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    className={`text-2xl ${
                      star >= num ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setStar(num)}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                className="w-full p-2 mb-4 border rounded-md"
                rows="4"
                placeholder="Chia sẻ trải nghiệm của bạn..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Hủy
                </button>
                <button
                  disabled={loading}
                  onClick={handleSendReview}
                  className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  {loading ? "Đang gửi..." : "Gửi đánh giá"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
