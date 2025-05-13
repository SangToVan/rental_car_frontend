// Updated CarPanel.jsx with DTO-based logic
import { useEffect, useState } from "react";
import {
  FiClock,
  FiDollarSign,
  FiEye,
  FiMapPin,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { getCarApi } from "../../shared/apis/adminApi";
import CarDetailPanel from "./CarDetailPanel";

function formatCurrency(value) {
  const num = Number(value);
  return num.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
}

export default function CarPanel() {
  const [activeTab, setActiveTab] = useState("verified");
  const [cars, setCars] = useState([]);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [unverifiedCount, setUnverifiedCount] = useState(0);
  const [waitingCount, setWaitingCount] = useState(0);
  const [selectedCar, setSelectedCar] = useState(null);

  const statusParam =
    activeTab === "waiting"
      ? "WAITING"
      : activeTab === "unverified"
      ? "UNVERIFIED"
      : "";

  useEffect(() => {
    getCarApi(statusParam).then((res) => {
      setCars(res?.data?.list || []);
      setVerifiedCount(res?.data?.verifiedCarCount || 0);
      setUnverifiedCount(res?.data?.unverifiedCarCount || 0);
      setWaitingCount(res?.data?.waitingCarCount || 0);
    });
  }, [statusParam]);

  const tabDefs = [
    { key: "verified", label: `Đã xác thực (${verifiedCount})` },
    { key: "waiting", label: `Chờ xác thực (${waitingCount})` },
    { key: "unverified", label: `Đã bị từ chối (${unverifiedCount})` },
  ];

  return selectedCar ? (
    <CarDetailPanel
      carId={selectedCar.carId}
      onBack={() => setSelectedCar(null)}
    />
  ) : (
    <div className="w-full">
      <div className="mb-2">
        <h1 className="text-2xl font-bold">Danh sách xe</h1>
      </div>
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex gap-1">
          {tabDefs.map((tab) => (
            <button
              key={tab.key}
              className={`min-w-[160px] whitespace-nowrap pb-2 pt-2 px-4 border-b-2 transition-colors duration-200 font-medium text-sm ${
                activeTab === tab.key
                  ? "border-green-500 text-green-700"
                  : "border-transparent text-gray-600 hover:text-green-600"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="space-y-6">
        {cars.map((car) => (
          <div
            key={car.carId}
            className="overflow-hidden bg-white rounded-lg shadow"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 md:max-w-[300px]">
                <img
                  src={car.images?.[0]?.imageUrl || "/default-car.png"}
                  alt={car.name}
                  className="object-cover w-full h-64 md:h-full"
                />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h2 className="mb-1 text-xl font-bold">{car.name}</h2>
                <div className="flex flex-col gap-4 text-sm text-gray-700 omt-2">
                  <div className="flex items-center">
                    <FiStar className="mr-1 text-yellow-500" />
                    <span>
                      {car.rating ? car.rating.toFixed(1) : "Chưa có đánh giá"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FiUsers className="mr-1 text-blue-500" />
                    <span>{car.bookingCount} chuyến</span>
                  </div>
                  <div className="flex items-center">
                    <FiDollarSign className="mr-1 text-green-600" />
                    {formatCurrency(car.basePrice)} / ngày
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="mr-1 text-gray-500" />
                    {car.address}
                  </div>
                </div>
                <div className="flex items-center justify-end mt-4">
                  <button
                    onClick={() => {
                      console.log("Selected car:", car);
                      setSelectedCar(car);
                    }}
                    className="px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <span className="flex items-center">
                      <FiEye className="mr-1" /> Chi tiết
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {cars.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-gray-500">Không tìm thấy xe phù hợp</p>
          </div>
        )}
      </div>
    </div>
  );
}
