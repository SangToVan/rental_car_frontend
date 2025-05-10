import { useNavigate, useSearchParams } from "react-router-dom";
import BookingSummary from "../components/bookings/booking-infor/BookingSummary";
import CarInformation from "../components/bookings/booking-infor/CarInformation";
import OwnerInformation from "../components/bookings/booking-infor/OwnerInformation";
import BookingNotice from "../components/bookings/common/BookingNotice";
import CancellationPolicy from "../components/bookings/common/CancellationPolicy";
import RentalAccessories from "../components/bookings/common/RentalAccessories";
import RentalDocuments from "../components/bookings/common/RentalDocuments";
import RentalPeriod from "../components/bookings/common/RentalPeriod";
import RentalTerms from "../components/bookings/common/RentalTerms";
import { useEffect, useState } from "react";
import RequestError from "./error/RequestError";
import ProgressSteps from "../components/bookings/ProgressSteps";
import { mockBookings } from "../utils/mockData";
import { getCarsById } from "../shared/apis/carApi";
import { currencyFormat } from "../shared/utils";
import {
  calculateRentalDays,
  calculateTotalRentalCost,
  INSURANCE_FEE_PER_DAY,
  PASSENGER_INSURANCE_FEE_PER_DAY,
} from "../shared/utils/rentalPrice";
import { addBookingApi } from "../shared/apis/bookingApi";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState("04/04/2025 21:00");
  const [endDate, setEndDate] = useState("05/04/2025 20:00");
  const [totalPrice, setTotalPrice] = useState(0);
  const [rentalDays, setRentalDays] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [documentRental, setDocumentRental] = useState("NATIVE");
  const [driverInfo, setDriverInfo] = useState({});
  const [bookingResData, setBookingResData] = useState(null);
  const navigate = useNavigate();

  const requiredParams = ["carId", "location", "sD", "sT", "eD", "eT"];
  const missingParams = requiredParams.filter(
    (param) => !searchParams.get(param)
  );

  useEffect(() => {
    if (missingParams.length === 0) {
      getCarsById(searchParams.get("carId")).then((data) => setCar(data.data));
    }
  }, [searchParams]);

  useEffect(() => {
    const sD = searchParams.get("sD");
    const sT = searchParams.get("sT");
    const startDateTime = `${sD} ${sT}`;

    const eD = searchParams.get("eD");
    const eT = searchParams.get("eT");
    const endDateTime = `${eD} ${eT}`;

    setStartDate(startDateTime);
    setEndDate(endDateTime);
  }, [searchParams]);

  useEffect(() => {
    if (startDate && endDate && car) {
      const days = calculateRentalDays(startDate, endDate);
      const total = calculateTotalRentalCost(car.basePrice, days);
      setRentalDays(days);
      setTotalPrice(total);
    }
  }, [startDate, endDate, car]);

  if (missingParams.length > 0) return <RequestError />;

  const handleSubmit = async (event) => {
    event?.preventDefault();
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      const payload = {
        carId: parseInt(searchParams.get("carId")),
        startDateTime: startDate,
        endDateTime: endDate,
        documentRental,
        driverName: driverInfo.name || null,
        driverPhone: driverInfo.phone || null,
        driverCitizenId: driverInfo.idNumber || null,
        relationship: driverInfo.relationship || null,
      };
      console.log("Payload:", payload);
      const response = await addBookingApi(payload);
      setBookingResData(response.data);
      setShowSuccess(true);
    } catch (error) {
      console.error("Booking API error:", error);
      setSubmitError("Có lỗi xảy ra khi đặt thuê xe. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const SuccessModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-xl w-[90%] max-w-md">
        <h2 className="mb-4 text-xl font-bold text-green-600">
          Đặt xe thành công!
        </h2>
        <p className="mb-6 text-sm text-gray-700">
          Cảm ơn bạn đã sử dụng dịch vụ. Bạn có thể xem chi tiết đơn đặt xe hoặc
          quay về trang chủ.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded hover:bg-gray-600"
          >
            Trang chủ
          </button>
          <button
            onClick={() =>
              navigate(`/user/bookings/${bookingResData?.bookingId}`)
            }
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </div>
  );

  const ErrorModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-lg shadow-xl w-[90%] max-w-md">
        <h2 className="mb-4 text-xl font-bold text-red-600">Đặt xe thất bại</h2>
        <p className="mb-6 text-sm text-gray-700">{submitError}</p>
        <div className="flex justify-end">
          <button
            onClick={() => setSubmitError(null)}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded hover:bg-gray-600"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-8 bg-gray-100">
      <div className="container px-4 mx-auto">
        <ProgressSteps currentStep={1} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div className="grid grid-cols-1 gap-8 mb-8 bg-white rounded-lg shadow-sm lg:grid-cols-12">
              <div className="m-4 lg:col-span-12">
                <div className="flex flex-col mb-6 md:flex-row">
                  <div className="pr-4 md:w-1/2">
                    <img
                      src={car?.images[0].imageUrl}
                      alt={car?.name}
                      className="object-cover w-full h-auto rounded-lg aspect-video"
                    />
                  </div>
                  <div className="mt-4 md:w-1/2 md:mt-0">
                    <h2 className="text-xl font-bold uppercase">{car?.name}</h2>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-600">{car?.type}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 fill-[#ffc107]"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span className="ml-1 font-medium">{car?.rating}</span>
                      <span className="mx-1">•</span>
                      <span className="text-sm text-gray-600">
                        {car?.trips} chuyến
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
                      <span className="ml-2 text-sm">{car?.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 overflow-hidden bg-white rounded-lg shadow-sm">
              <h3 className="mb-4 text-lg font-medium text-gray-800">
                Thời gian thuê xe
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="p-4 border border-gray-200 rounded-md">
                  <div className="flex items-center mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-2 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                      />
                    </svg>
                    <p className="text-sm font-medium text-gray-700">
                      Bắt đầu thuê xe
                    </p>
                  </div>
                  <div className="ml-7">
                    <p className="text-lg font-semibold text-gray-800">
                      {startDate}
                    </p>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-md">
                  <div className="flex items-center mb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-2 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                      />
                    </svg>
                    <p className="text-sm font-medium text-gray-700">
                      Kết thúc thuê xe
                    </p>
                  </div>
                  <div className="ml-7">
                    <p className="text-lg font-semibold text-gray-800">
                      {endDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <RentalDocuments
              onChange={({ documentType, driver }) => {
                setDocumentRental(documentType);
                setDriverInfo(driver || {});
              }}
            />
            {/* <RentalAccessories />
              <RentalTerms />
              <CancellationPolicy /> */}
          </div>

          <div className="space-y-8 lg:col-span-1">
            <div className="p-6 overflow-hidden bg-white rounded-lg shadow-sm">
              <div className="p-6 mb-6 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 mr-3 overflow-hidden rounded-full">
                    <img
                      src={car?.carOwner.avatar}
                      alt={car?.carOwner.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Chủ xe</h3>
                    <p className="text-lg font-medium">{car?.carOwner.name}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#ffc107]">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="ml-1 text-sm font-medium">
                    {car?.carOwner.rating}
                  </span>
                  <span className="mx-1 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    {car?.carOwner.trips} chuyến
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 overflow-hidden bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-gray-600">Phí thuê cố định</span>
                <span className="font-medium">
                  {currencyFormat(car?.basePrice)}/ngày
                </span>
              </div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-gray-600">Bảo hiểm thuê xe</span>
                <span className="font-medium">
                  {currencyFormat(INSURANCE_FEE_PER_DAY)}/ngày
                </span>
              </div>
              <div className="flex items-center justify-between mb-2 text-sm">
                <span className="text-gray-600">Bảo hiểm người trên xe</span>
                <span className="font-medium">
                  {currencyFormat(PASSENGER_INSURANCE_FEE_PER_DAY)}/ngày
                </span>
              </div>
              <div className="flex items-center justify-between mt-4 mb-2 text-sm font-medium">
                <span>Tổng cộng / ngày</span>
                <span>
                  {currencyFormat(
                    car?.basePrice +
                      INSURANCE_FEE_PER_DAY +
                      PASSENGER_INSURANCE_FEE_PER_DAY
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2 text-sm font-medium">
                <span>Số ngày thuê</span>
                <span>{rentalDays} ngày</span>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold">Thành tiền</span>
                  <span className="text-xl font-bold text-primary">
                    {currencyFormat(totalPrice)}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className={`w-full my-3 py-3 text-center rounded-md bg-[#61c596] text-white font-medium hover:bg-opacity-90 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Đang xử lý..." : "Xác nhận gửi yêu cầu"}
              </button>
              <button
                onClick={handleCancel}
                className="w-full py-3 my-3 font-medium text-center text-white transition bg-red-500 rounded-md hover:bg-red-600"
              >
                Huỷ yêu cầu
              </button>
            </div>
          </div>
        </div>
        {showSuccess && <SuccessModal />}
        {submitError && <ErrorModal />}
      </div>
    </div>
  );
}
