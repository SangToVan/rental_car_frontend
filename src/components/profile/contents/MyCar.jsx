import { useState } from "react";
import {
  FiClock,
  FiDollarSign,
  FiEye,
  FiMapPin,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const myCars = [
  {
    id: 1,
    name: "TOBE MCAR 2025",
    image:
      "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_co_tai_xe/toyota/fortuner/p/cho_thue_xe_toyota_fortuner_2017_tuan_1_ho_chi_minh_cong_hoa-2020-01-02-17-15-12.jpg",
    status: "Chờ duyệt",
    statusClass: "bg-yellow-100 text-yellow-800",
    trips: 0,
    pendingBookings: 2,
    price: 250000,
    priceWithDriver: 350000,
    rating: 0,
    location: "Huyện Bình Chánh, TP Hồ Chí Minh",
    type: "self-drive",
  },
  {
    id: 2,
    name: "VINFAST VF9 ECO 2025",
    image:
      "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/vinfast/vf_9/p/cho_thue_xe_vinfast_vf9_2023_ha_noi_vinfast_westlake-2023-09-25-10-55-47.jpg",
    status: "Đã bị từ chối",
    statusClass: "bg-red-100 text-red-800",
    trips: 0,
    pendingBookings: 0,
    price: 1600000,
    priceWithDriver: 2200000,
    rating: 0,
    location: "Quận Bắc Từ Liêm, Hà Nội",
    type: "with-driver",
  },
  {
    id: 3,
    name: "HYUNDAI STARGAZER 2023",
    image:
      "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_co_tai_xe/hyundai/stargazer/p/cho_thue_xe_hyundai_stargazer_2023_le_hoang_quan_ho_chi_minh-2023-05-24-15-06-55.jpg",
    status: "Đang hoạt động",
    statusClass: "bg-green-100 text-green-800",
    trips: 18,
    pendingBookings: 5,
    price: 800000,
    priceWithDriver: 1200000,
    rating: 4.8,
    location: "Quận 7, TP Hồ Chí Minh",
    type: "self-drive",
  },
  {
    id: 4,
    name: "TOYOTA INNOVA CROSS 2024",
    image:
      "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/toyota/cross/p/cho_thue_xe_toyota_innova_cross_hybrid_2024_ho_chi_minh_nguyen_van_thu-2024-03-07-11-09-44.jpg",
    status: "Đang hoạt động",
    statusClass: "bg-green-100 text-green-800",
    trips: 7,
    pendingBookings: 1,
    price: 1100000,
    priceWithDriver: 1500000,
    rating: 4.9,
    location: "Quận 1, TP Hồ Chí Minh",
    type: "with-driver",
  },
];

export default function MyCar() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("list");
  const [carType, setCarType] = useState("all");

  // Filter cars based on selected type
  const filteredCars =
    carType === "all" ? myCars : myCars.filter((car) => car.type === carType);

  const formatCurrency = (amount) => {
    return `${amount / 1000}K`;
  };

  const handleManageCar = (carId) => {
    navigate(`/user/car-setting/${carId}`);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Xe của tôi</h1>
        <button className="px-4 py-2 font-medium text-white bg-green-500 rounded-md hover:bg-green-600">
          Đăng ký xe mới
        </button>
      </div>

      {/* Simplified Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex overflow-x-auto flex-nowrap">
          <button
            className={`whitespace-nowrap pb-4 pt-2 px-4 ${
              activeTab === "list"
                ? "relative text-green-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-green-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("list")}
          >
            Danh sách xe
          </button>
          <button
            className={`whitespace-nowrap pb-4 pt-2 px-4 ${
              activeTab === "schedule"
                ? "relative text-green-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-green-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("schedule")}
          >
            Lịch xe
          </button>
          <button
            className={`whitespace-nowrap pb-4 pt-2 px-4 ${
              activeTab === "register"
                ? "relative text-green-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-green-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Đăng ký xe
          </button>
        </div>
      </div>

      {/* Car Type Filter */}
      <div className="flex mb-6">
        <button
          className={`rounded-full px-6 py-2 ${
            carType === "all"
              ? "bg-green-50 text-green-600"
              : "bg-white text-gray-700"
          }`}
          onClick={() => setCarType("all")}
        >
          <span className="font-medium">Tất cả</span>
        </button>
        <button
          className={`ml-2 rounded-full px-6 py-2 ${
            carType === "self-drive"
              ? "bg-green-50 text-green-600"
              : "bg-white text-gray-700"
          }`}
          onClick={() => setCarType("self-drive")}
        >
          <span className="font-medium">Xe tự lái</span>
        </button>
        <button
          className={`ml-2 rounded-full px-6 py-2 ${
            carType === "with-driver"
              ? "bg-green-50 text-green-600"
              : "bg-white text-gray-700"
          }`}
          onClick={() => setCarType("with-driver")}
        >
          <span className="font-medium">Xe có tài</span>
        </button>
      </div>

      {/* Car Listings */}
      <div className="space-y-6">
        {filteredCars.map((car) => (
          <div
            key={car.id}
            className="overflow-hidden bg-white rounded-lg shadow"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 md:max-w-[300px]">
                <img
                  src={car.image}
                  alt={car.name}
                  className="object-cover w-full h-64 md:h-full"
                />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center mb-2">
                  <span
                    className={`rounded px-3 py-1 text-xs font-medium ${car.statusClass}`}
                  >
                    {car.status}
                  </span>
                </div>
                <h2 className="mb-1 text-xl font-bold">{car.name}</h2>

                <div className="flex items-center mt-2">
                  <div className="flex items-center mr-4 text-sm">
                    <FiStar className="mr-1 text-yellow-500" />
                    <span>
                      {car.rating > 0 ? car.rating : "Chưa có đánh giá"}
                    </span>
                  </div>
                  <div className="flex items-center mr-4 text-sm">
                    <FiUsers className="mr-1 text-blue-500" />
                    <span>{car.trips} chuyến</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FiClock className="mr-1 text-orange-500" />
                    <span>{car.pendingBookings} đơn chờ duyệt</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center mt-4">
                  <div className="flex items-center mb-2 mr-6">
                    <FiDollarSign className="mr-1 text-green-600" />
                    <p className="font-semibold">
                      Tự lái: {formatCurrency(car.price)}
                    </p>
                  </div>
                  {car.priceWithDriver > 0 && (
                    <div className="flex items-center mb-2">
                      <FiDollarSign className="mr-1 text-green-600" />
                      <p className="font-semibold">
                        Có tài: {formatCurrency(car.priceWithDriver)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <FiMapPin className="w-5 h-5 mr-1" />
                  <span>{car.location}</span>
                </div>

                <div className="flex items-center justify-end mt-4">
                  <button className="px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                    <span className="flex items-center">
                      <FiEye className="mr-1" />
                      Xem chi tiết
                    </span>
                  </button>
                  <button
                    onClick={() => handleManageCar(car.id)}
                    className="px-4 py-2 ml-2 font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                  >
                    Quản lý xe
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredCars.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-gray-500">Không tìm thấy xe phù hợp</p>
          </div>
        )}
      </div>
    </div>
  );
}
