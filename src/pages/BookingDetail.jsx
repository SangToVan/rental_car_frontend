import { useEffect, useState } from "react";
import ProgressSteps from "../components/bookings/ProgressSteps";
import BookingNotice from "../components/bookings/common/BookingNotice";
import CarInformation from "../components/bookings/booking-infor/CarInformation";
import OwnerInformation from "../components/bookings/booking-infor/OwnerInformation";
import BookingSummary from "../components/bookings/booking-infor/BookingSummary";
import RentalPeriod from "../components/bookings/common/RentalPeriod";
import RentalDocuments from "../components/bookings/common/RentalDocuments";
import RentalAccessories from "../components/bookings/common/RentalAccessories";
import RentalTerms from "../components/bookings/common/RentalTerms";
import CancellationPolicy from "../components/bookings/common/CancellationPolicy";
import PaymentOption from "../components/bookings/payment/PaymentOption";
import Reviews from "../components/bookings/reviews/Reviews";
import { mockBookings } from "../utils/mockData";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import RequestError from "../pages/error/RequestError";
import { addBookingApi } from "../shared/apis/bookingApi";

export default function BookingDetail() {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [carInfor, setCarInfor] = useState(null);
  const [renterInfor, setRenterInfor] = useState(null);
  const [rentalDays, setRentalDays] = useState(1);
  const [startDate, setStartDate] = useState("04/04/2025 21:00");
  const [endDate, setEndDate] = useState("05/04/2025 20:00");
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmDepositModal, setShowConfirmDepositModal] = useState(false);
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
  }, [id]);

  useEffect(() => {
    if (startDate && endDate && carInfor) {
      const days = calculateRentalDays(startDate, endDate);
      const total = calculateTotalRentalCost(carInfor?.basePrice, days);
      setRentalDays(days);
      setTotalPrice(total);
    }
  }, [startDate, endDate, carInfor]);

  const handleConfirmDeposit = async () => {
    const { message } = await confirmDepositApi(bookingId);
    toast.success(message);
  };

  // Local state
  const [bookingStatus, setBookingStatus] = useState(bookingDetails?.status);
  const [currentStep, setCurrentStep] = useState(2);
  // Local UI state
  const [paymentOption, setPaymentOption] = useState("partial");
  const [showCancelled, setShowCancelled] = useState(false);

  // Initial reviews
  const initialReviews = [
    {
      id: "r1",
      name: "Nguyễn Văn A",
      rating: 5,
      comment:
        "Dịch vụ rất tốt, xe sạch sẽ và chủ xe nhiệt tình. Sẽ thuê lại lần sau!",
      date: "26/04/2025",
      avatarUrl: "https://ext.same-assets.com/1283309287/1369451906.svg",
    },
    {
      id: "r2",
      name: "Trần Thị B",
      rating: 4,
      comment:
        "Xe chạy êm, tốt. Chỉ hơi muộn giờ một chút khi giao xe nhưng nhìn chung vẫn hài lòng.",
      date: "24/04/2025",
      avatarUrl: "https://ext.same-assets.com/1283309287/3335277324.svg",
    },
  ];

  const [reviewList, setReviewList] = useState(initialReviews);
  const [averageRating, setAverageRating] = useState(
    calculateAverageRating(initialReviews)
  );

  // Calculate average rating
  function calculateAverageRating(reviews) {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }

  // Update currentStep based on bookingStatus
  useEffect(() => {
    switch (bookingStatus) {
      case "pending":
        setCurrentStep(1);
        break;
      case "confirm":
        setCurrentStep(2);
        break;
      case "payment":
        setCurrentStep(3);
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

  // Function to add a new review
  const addReview = (newReview) => {
    const updatedReviews = [newReview, ...reviewList];
    setReviewList(updatedReviews);
    setAverageRating(calculateAverageRating(updatedReviews));
  };

  // Utility function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VND";
  };

  // Handle payment option change
  const handlePaymentOptionChange = (option) => {
    setPaymentOption(option);
  };

  // Toggle cancelled notification (for demo purposes)
  const toggleNotification = () => {
    setShowCancelled(!showCancelled);
  };

  // Function to update the booking status
  const updateBookingStatus = (newStatus) => {
    setBookingStatus(newStatus);
  };

  return (
    <div className="py-8 bg-gray-100">
      <div className="container px-4 mx-auto">
        <ProgressSteps currentStep={currentStep} />

        {/* Render different content based on booking status */}
        {currentStep == 1 || currentStep == 2 && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <BookingNotice
                status={bookingStatus}
                timeRemaining="1 giờ 36 phút"
                notificationText="Thời gian thanh toán giữ chỗ còn lại 1 giờ 36 phút"
              />

              <CarInformation car={car} />
              <RentalPeriod booking={mockBookings[1]} />
              <RentalDocuments />
              <RentalAccessories />
              <RentalTerms />
              <CancellationPolicy />

              {/* Navigation Button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => updateBookingStatus("confirm")}
                  className="px-6 py-3 font-semibold text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
                >
                  Tiếp tục
                </button>
              </div>
            </div>

            <div className="space-y-8 lg:col-span-1">
              <OwnerInformation owner={car.owner} />
              <BookingSummary booking={mockBookings[1]} />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="p-8 mb-8 bg-white rounded-lg shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Duyệt yêu cầu
            </h2>

            {showCancelled ? (
              <BookingNotice
                status="cancelled"
                cancelReason={mockBookings[1].cancellationReason}
              />
            ) : (
              <BookingNotice
                status="pending"
                timeRemaining="1 giờ 36 phút"
                notificationText="Đang chờ chủ xe phê duyệt yêu cầu"
              />
            )}

            <div className="mt-4 mb-6">
              <button
                onClick={toggleNotification}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                {showCancelled
                  ? "Hiển thị thông báo 'Pending'"
                  : "Hiển thị thông báo 'Cancelled'"}
              </button>
            </div>

            {showCancelled && (
              <div className="p-4 mb-6 border border-gray-200 rounded-lg">
                <h3 className="mb-4 font-medium text-gray-700">
                  Thông tin xe bị hủy
                </h3>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="w-full md:w-1/3">
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="object-cover w-full h-auto rounded-lg"
                    />
                  </div>
                  <div className="w-full md:w-2/3">
                    <p className="text-lg font-semibold">{car.name}</p>
                    <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2">
                      <div>
                        <p className="text-gray-600">Thời gian thuê:</p>
                        <p className="font-medium">
                          {mockBookings[1].startDate} đến{" "}
                          {mockBookings[1].endDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Giá thuê:</p>
                        <p className="font-medium">
                          {formatCurrency(mockBookings[1].price.total)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Example content for Step 2 */}
            <div className="mt-6 space-y-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="mb-2 font-medium text-gray-700">
                  Thông tin duyệt yêu cầu
                </h3>
                <p className="text-gray-600">
                  Chủ xe đang xem xét yêu cầu của bạn và sẽ phản hồi trong thời
                  gian sớm nhất.
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => updateBookingStatus("pending")}
                className="px-6 py-3 font-semibold text-white transition duration-300 bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Quay lại
              </button>
              <button
                onClick={() => updateBookingStatus("payment")}
                className="px-6 py-3 font-semibold text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <>
            {/* Payment Option Selector */}
            <PaymentOption onPaymentOptionChange={handlePaymentOptionChange} />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h3 className="mb-4 text-xl font-semibold text-gray-800">
                    Thông tin thanh toán
                  </h3>

                  <div className="space-y-4">
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
                      <span className="text-gray-600">Tổng tiền:</span>
                      <span className="font-medium text-gray-800">
                        {formatCurrency(bookingData.price.total)}
                      </span>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="font-semibold text-gray-700">
                        Số tiền cần thanh toán:
                      </span>
                      <span className="font-semibold text-green-600">
                        {paymentOption === "partial"
                          ? `${formatCurrency(
                              bookingData.price.depositAmount
                            )} (40%)`
                          : `${formatCurrency(bookingData.price.total)} (100%)`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h3 className="mb-4 text-xl font-semibold text-gray-800">
                    Phương thức thanh toán
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <button className="flex flex-col items-center p-4 transition duration-300 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mb-2 text-gray-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                        />
                      </svg>
                      <span className="block text-sm font-medium text-gray-700">
                        Thẻ tín dụng
                      </span>
                    </button>

                    <button className="flex flex-col items-center p-4 transition duration-300 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mb-2 text-gray-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                        />
                      </svg>
                      <span className="block text-sm font-medium text-gray-700">
                        Ngân hàng
                      </span>
                    </button>

                    <button className="flex flex-col items-center p-4 transition duration-300 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mb-2 text-gray-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 12a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                        />
                      </svg>
                      <span className="block text-sm font-medium text-gray-700">
                        Ví điện tử
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h3 className="mb-4 text-xl font-semibold text-gray-800">
                    Thông tin xe
                  </h3>

                  <div className="mb-4 overflow-hidden bg-gray-100 rounded-lg">
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="object-cover w-full h-auto"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Loại xe:</span>
                      <span className="font-medium text-gray-800">
                        {car.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hộp số:</span>
                      <span className="font-medium text-gray-800">
                        {car.transmission}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thời gian thuê:</span>
                      <span className="font-medium text-gray-800">
                        {bookingData.startDate.split(" - ")[1]} đến{" "}
                        {bookingData.endDate.split(" - ")[1]}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Địa điểm nhận xe:</span>
                      <span className="font-medium text-gray-800">
                        {bookingData.pickupLocation}
                      </span>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => updateBookingStatus("confirm")}
                      className="px-6 py-3 font-semibold text-white transition duration-300 bg-gray-500 rounded-lg hover:bg-gray-600"
                    >
                      Quay lại
                    </button>
                    <button
                      onClick={() => updateBookingStatus("progress")}
                      className="px-6 py-3 font-semibold text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
                    >
                      Tiếp tục
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {currentStep === 4 && (
          <div className="p-8 mb-8 bg-white rounded-lg shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Khởi hành</h2>

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
                    Thông tin đặt xe của bạn đã được xác nhận. Hãy đảm bảo bạn
                    có mặt đúng giờ để nhận xe.
                  </p>
                </div>
              </div>
            </div>

            {/* Example content for Step 4 */}
            <div className="space-y-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="mb-2 font-medium text-gray-700">
                  Thông tin khởi hành
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Ngày nhận xe:</span>
                    <span className="font-medium text-gray-800">
                      25/04/2025
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Giờ nhận xe:</span>
                    <span className="font-medium text-gray-800">10:00 AM</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">
                      Địa điểm nhận xe:
                    </span>
                    <span className="font-medium text-gray-800">
                      123 Nguyễn Văn Linh, Quận 7, TP.HCM
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">
                      Người giao xe:
                    </span>
                    <span className="font-medium text-gray-800">
                      Nguyễn Văn A
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="mb-2 font-medium text-gray-700">
                  Lưu ý khi nhận xe
                </h3>
                <ul className="pl-5 space-y-2 text-gray-600 list-disc">
                  <li>Mang theo CMND/CCCD và giấy phép lái xe bản gốc</li>
                  <li>Kiểm tra kỹ xe trước khi nhận</li>
                  <li>Chụp ảnh xe từ nhiều góc độ</li>
                  <li>Xác nhận với chủ xe về tình trạng xe</li>
                </ul>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => updateBookingStatus("payment")}
                className="px-6 py-3 font-semibold text-white transition duration-300 bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Quay lại
              </button>
              <button
                onClick={() => updateBookingStatus("complete")}
                className="px-6 py-3 font-semibold text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600"
              >
                Tiếp tục
              </button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-8">
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
                  Kết thúc chuyến đi thành công!
                </h2>
                <p className="text-gray-600">
                  Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
                </p>
              </div>

              {/* Example content for Step 5 */}
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
                      <span className="font-medium text-gray-800">3 ngày</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-600">
                        Tổng quãng đường:
                      </span>
                      <span className="font-medium text-gray-800">350 km</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-600">
                        Ngày trả xe:
                      </span>
                      <span className="font-medium text-gray-800">
                        28/04/2025
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-600">Giờ trả xe:</span>
                      <span className="font-medium text-gray-800">
                        10:00 AM
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
                          3,600,000 VND
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phí dịch vụ:</span>
                        <span className="font-medium text-gray-800">
                          360,000 VND
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
                          3,960,000 VND
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

            {/* Car Ratings Summary */}
            <div className="p-6 mb-4 bg-white rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800">
                    Đánh giá về xe
                  </h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className={`w-5 h-5 ${
                            index < Math.floor(averageRating)
                              ? "text-yellow-400"
                              : index === Math.floor(averageRating) &&
                                averageRating % 1 > 0
                              ? "text-yellow-300"
                              : "text-gray-300"
                          }`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-lg font-medium text-gray-800">
                      {averageRating}/5
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({reviewList.length} đánh giá)
                    </span>
                  </div>
                </div>

                <div className="w-20 h-20 overflow-hidden bg-gray-100 rounded-lg">
                  <img
                    src={car.images[0]}
                    alt={car.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  Sạch sẽ
                </span>
                <span className="px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  Đúng giờ
                </span>
                <span className="px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  Xe mới
                </span>
                <span className="px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  Chủ xe thân thiện
                </span>
              </div>
            </div>

            {/* Reviews Form and List */}
            <Reviews
              reviewList={reviewList}
              averageRating={averageRating}
              addReview={addReview}
            />
          </div>
        )}
      </div>
    </div>
  );
}
