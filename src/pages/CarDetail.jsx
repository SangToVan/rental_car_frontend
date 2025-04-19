import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mockCars } from "/src/utils/mockData.js";
import { CarGallery } from "../components/common/CarGallery";
import Features from "../components/common/Features";
import Reviews from "../components/common/Reviews";
import { Button } from "../components/buttons/Button";
import { CarCard } from "../components/cards/CarCard";

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [similarCars, setSimilarCars] = useState([]);
  const [startDate, setStartDate] = useState("04/04/2025 21:00");
  const [endDate, setEndDate] = useState("05/04/2025 20:00");

  useEffect(() => {
    // In a real app, we would fetch the car data from an API
    const foundCar = mockCars.find((c) => c.id === id);
    if (foundCar) {
      setCar(foundCar);
      // Find similar cars (same type or seats)
      const similar = mockCars
        .filter(
          (c) =>
            c.id !== id &&
            (c.type === foundCar.type || c.seats === foundCar.seats)
        )
        .slice(0, 4);
      setSimilarCars(similar);
    }
  }, [id]);

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
            <CarGallery images={car.images} alt={car.name} />
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold uppercase">{car.name}</h1>
                <div className="flex items-center">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#ffc107]">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="ml-1 font-medium">
                    {car.rating.toFixed(1)}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    {car.trips} chuyến
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full">
                  {car.location}
                </span>
                <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full">
                  {car.type}
                </span>
                <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full">
                  {car.seats} chỗ
                </span>
                <span className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full">
                  {car.fuel}
                </span>
              </div>
            </div>

            <Features
              transmission={car.transmission}
              seats={car.seats}
              fuel={car.fuel}
              fuelConsumption={car.fuelConsumption}
            />

            {/* Description */}
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-bold">Mô tả</h2>
              <p className="text-gray-700">
                {car.description || "Không có mô tả cho xe này."}
              </p>
            </div>

            {/* Car Owner */}
            <div className="mt-8">
              <h2 className="mb-4 text-xl font-bold">Chủ xe</h2>
              <div className="flex items-center">
                <img
                  src={car.owner.avatar}
                  alt={car.owner.name}
                  className="object-cover w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="font-bold">{car.owner.name}</h3>
                  <div className="flex items-center mt-1">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#ffc107]">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="ml-1 text-sm font-medium">
                      {car.owner.rating.toFixed(1)}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {car.owner.trips} chuyến
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-3">
                <div className="p-3 text-center rounded-lg bg-gray-50">
                  <div className="text-xl font-bold text-primary">
                    {car.owner.responseRate}%
                  </div>
                  <div className="text-xs text-gray-500">Tỷ lệ phản hồi</div>
                </div>
                <div className="p-3 text-center rounded-lg bg-gray-50">
                  <div className="text-xl font-bold text-primary">
                    {car.owner.responseTime}
                  </div>
                  <div className="text-xs text-gray-500">
                    Thời gian phản hồi
                  </div>
                </div>
                <div className="p-3 text-center rounded-lg bg-gray-50">
                  <div className="text-xl font-bold text-primary">
                    {car.owner.approvalRate}%
                  </div>
                  <div className="text-xs text-gray-500">Tỷ lệ đồng ý</div>
                </div>
              </div>
            </div>

            <Reviews reviews={car.reviews} />
          </div>

          {/* Booking Panel */}
          <div className="lg:sticky lg:top-20">
            <div className="p-6 border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-gray-400 line-through">
                  {car.originalPrice?.toLocaleString()}đ/ngày
                </span>
                <span className="text-2xl font-bold text-primary">
                  {car.discountedPrice?.toLocaleString()}đ/ngày
                </span>
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Nhận xe
                </label>
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
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
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-gray-600">Đơn giá thuê</span>
                  <span className="font-medium">
                    {car.discountedPrice?.toLocaleString()}đ/ngày
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-gray-600">Bảo hiểm thuê xe</span>
                  <span className="font-medium">112.096đ/ngày</span>
                </div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-gray-600">Bảo hiểm người trên xe</span>
                  <span className="font-medium">50.000đ/ngày</span>
                </div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-gray-600">Chương trình giảm giá</span>
                  <span className="font-medium text-red-500">-120.000đ</span>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Thành tiền</span>
                    <span className="text-xl font-bold text-primary">
                      1.130.912đ
                    </span>
                  </div>
                </div>
              </div>

              <Button className="w-full">CHỌN THUÊ</Button>

              <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium">
                  Phí phụ có thể phát sinh
                </h4>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Phí vượt giới hạn</span>
                    <span className="font-medium">3.000đ/km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Phí quá giờ</span>
                    <span className="font-medium">80.000đ/giờ</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Phí vệ sinh</span>
                    <span className="font-medium">120.000đ</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Phí khử mùi</span>
                    <span className="font-medium">400.000đ</span>
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
              <CarCard
                key={car.id}
                id={car.id}
                name={car.name}
                imageUrl={car.images[0]}
                type={car.type}
                seats={car.seats}
                fuel={car.fuel}
                location={car.location}
                rating={car.rating}
                trips={car.trips}
                originalPrice={car.originalPrice}
                discountedPrice={car.discountedPrice}
                discount={car.discount}
                noDeposit={car.noDeposit}
                delivery={car.delivery}
                hourlyPrice={car.hourlyPrice}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
