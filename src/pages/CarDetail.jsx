import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mockCars } from "../utils/mockData";
import CarGallery from "../components/common/CarGallery";
import Features from "../components/common/Features";
import Reviews from "../components/common/Reviews";
import Button from "../components/ui/Button";
import CarCard from "../components/searchs/CarCard";
import BookingDetailModal from "../components/modals/BookingModal/BookingDetailModal";
import BookingConfirmModal from "../components/modals/BookingModal/BookingConfirmModal";
import { useSelector } from "react-redux";
import { getCarsById } from "../shared/apis/carApi";
import { transmissionMap, fuelTypeMap } from "../shared/utils/labelMap";
import { convertToQueryParams, currencyFormat } from "../shared/utils";
import {
  calculateRentalDays,
  calculateTotalRentalCost,
  INSURANCE_FEE_PER_DAY,
  PASSENGER_INSURANCE_FEE_PER_DAY,
} from "../shared/utils/rentalPrice";
import AdditionalFunctions from "../components/cars/AdditionalFunctions";
import { ADDITIONAL_FUNCTIONS } from "../components/cars/CarConstants";

export default function CarDetail() {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [images, setImages] = useState([]);
  const searchInfor = useSelector((state) => state.search);
  const [similarCars, setSimilarCars] = useState([]);
  const [startDate, setStartDate] = useState("04/04/2025 21:00");
  const [endDate, setEndDate] = useState("05/04/2025 20:00");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [rentalDays, setRentalDays] = useState(1);

  useEffect(() => {
    getCarsById(carId).then((data) => {
      setCar(data.data);
      setImages(data.data?.images);
    });
  }, [carId]);

  useEffect(() => {
    if (
      searchInfor?.sD &&
      searchInfor?.sT &&
      searchInfor?.eD &&
      searchInfor?.eT
    ) {
      setStartDate(`${searchInfor.sD} ${searchInfor.sT}`);
      setEndDate(`${searchInfor.eD} ${searchInfor.eT}`);
    }
  }, [searchInfor]);

  useEffect(() => {
    // In a real app, we would fetch the car data from an API
    const foundCar = mockCars.find((c) => c.id === carId);
    if (foundCar) {
      setCar(foundCar);
      // Find similar cars (same type or seats)
      const similar = mockCars
        .filter(
          (c) =>
            c.id !== carId &&
            (c.type === foundCar.type || c.seats === foundCar.seats)
        )
        .slice(0, 4);
      setSimilarCars(similar);
    }
  }, [carId]);

  useEffect(() => {
    if (startDate && endDate && car) {
      const days = calculateRentalDays(startDate, endDate);
      const total = calculateTotalRentalCost(car.basePrice, days);
      setRentalDays(days);
      setTotalPrice(total);
    }
  }, [startDate, endDate, car]);

  const handleOpenBookingModal = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const handleOpenConfirmModal = () => {
    setIsBookingModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmBooking = () => {
    setIsConfirmModalOpen(false);
    // Here you would typically submit the booking to your backend
    alert("Đặt xe thành công! Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.");
  };

  const parsedAdditionalFunctions = car?.additionalFunctions
    ? car.additionalFunctions.split(",").map((s) => s.trim())
    : [];

  if (!car) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center">
          <svg
            className="w-8 h-8 animate-spin text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="ml-2 text-lg font-medium">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 mb-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CarGallery images={images} alt={car.name} />
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold uppercase">{car.name}</h1>
                <div className="flex items-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#ffc107]">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="ml-1 font-medium">{car?.rating || 0}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    {car.bookingCount} chuyến
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full">
                  {car.address}
                </span>
                {/* <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full">
                  {transmissionMap[car.transmission]}
                </span>
                <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full">
                  {car.numberOfSeats} chỗ
                </span>
                <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full">
                  {fuelTypeMap[car.fuelType]}
                </span> */}
              </div>
            </div>

            <Features
              transmission={transmissionMap[car.transmission]}
              seats={car.numberOfSeats}
              fuel={fuelTypeMap[car.fuelType]}
              fuelConsumption={car.fuelConsumption}
            />

            {/* Description */}
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-bold">Mô tả</h2>
              <p className="text-gray-700">
                {car.description || "Không có mô tả cho xe này."}
              </p>
            </div>

            {car.termOfUse && (
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-bold">Điều khoản sử dụng</h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {car.termOfUse}
                </p>
              </div>
            )}

            {parsedAdditionalFunctions?.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-bold">Chức năng khác</h2>
                <AdditionalFunctions
                  additionalFunctions={parsedAdditionalFunctions}
                  onChange={() => {}}
                  className="pointer-events-none select-none"
                  functionsToShow={ADDITIONAL_FUNCTIONS.filter((f) =>
                    parsedAdditionalFunctions.includes(f.value)
                  )}
                />
              </div>
            )}

            {/* Car Owner */}
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-bold">Chủ xe</h2>
              <div className="flex items-center">
                <img
                  src={car.carOwner?.avatar}
                  alt={car.carOwner?.username}
                  className="object-cover w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="font-bold">{car.carOwner?.username}</h3>
                  <div className="flex items-center mt-1">
                    {/* <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#ffc107]">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg> */}
                    <span className="text-sm font-medium ">Tham gia:</span>
                    <span className="ml-2 text-sm text-gray-500">
                      {car.carOwner?.createdAt}
                    </span>
                  </div>
                </div>
              </div>
              {/* <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-3">
                <div className="p-3 text-center rounded-lg bg-gray-50">
                  <div className="text-xl font-bold text-primary">0%</div>
                  <div className="text-xs text-gray-500">Tỷ lệ phản hồi</div>
                </div>
                <div className="p-3 text-center rounded-lg bg-gray-50">
                  <div className="text-xl font-bold text-primary">0</div>
                  <div className="text-xs text-gray-500">
                    Thời gian phản hồi
                  </div>
                </div>
                <div className="p-3 text-center rounded-lg bg-gray-50">
                  <div className="text-xl font-bold text-primary">0%</div>
                  <div className="text-xs text-gray-500">Tỷ lệ đồng ý</div>
                </div>
              </div> */}
            </div>

            <Reviews reviews={car.feedbacks} />
          </div>

          {/* Booking Panel */}
          <div className="lg:sticky lg:top-20">
            <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-gray-400 line-through">
                  {car.basePrice / 1000}K/ngày
                </span>
                <span className="text-2xl font-bold text-primary">
                  {car.basePrice / 1000}K/ngày
                </span>
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Nhận xe
                </label>
                <input
                  type="text"
                  value={startDate}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Trả xe
                </label>
                <input
                  type="text"
                  value={endDate}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-gray-600">Phí thuê cố định</span>
                  <span className="font-medium">
                    {currencyFormat(car.basePrice)}/ngày
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
                      car.basePrice +
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

              <Button className="w-full" disabled={car.isOwner}>
                <Link
                  to={`/rent-car?carId=${carId}&${convertToQueryParams(
                    searchInfor
                  )}`}
                  className={
                    car.isOwner ? "pointer-events-none text-gray-400" : ""
                  }
                >
                  THUÊ NGAY
                </Link>
              </Button>
              {car.isOwner && (
                <p className="mt-2 text-sm text-center text-red-500">
                  * Bạn là chủ xe này. Không thể tự thuê xe của mình.
                </p>
              )}

              <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium">
                  Phụ phí có thể phát sinh
                </h4>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center justify-between">
                    <span> Quãng đường giao xe tối đa</span>
                    <span className="font-medium">
                      {car.maxDeliveryDistance} km
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Phí giao xe</span>
                    <span className="font-medium">
                      {currencyFormat(car.deliveryFee)} /km
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Miễn phí giao xe trong</span>
                    <span className="font-medium">
                      {car.freeDeliveryDistance} km
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Giới hạn km/ngày</span>
                    <span className="font-medium">{car.kmPerDay} km/ngày</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Phí vượt km/ngày</span>
                    <span className="font-medium">
                      {currencyFormat(car.kmOverDayFee)}/km
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Cars */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Xe tương tự</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similarCars.map((car) => (
              <CarCard car={car} />
            ))}
          </div>
        </div>
      </div>

      {/* Booking Detail Modal */}
      <BookingDetailModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        car={car}
        startDate={startDate}
        endDate={endDate}
        onConfirm={handleOpenConfirmModal}
      />

      {/* Confirmation Modal */}
      <BookingConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
}
