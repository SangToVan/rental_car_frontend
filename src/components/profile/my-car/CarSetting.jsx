import { useEffect, useState } from "react";
import {
  FiCheck,
  FiChevronLeft,
  FiClock,
  FiDollarSign,
  FiInfo,
  FiList,
  FiMapPin,
  FiPause,
  FiStar,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

// Mock data for cars - same data structure as in MyCarsPage for consistency
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
    description:
      "Xe gia đình, nội thất sạch sẽ, được bảo dưỡng thường xuyên, thích hợp cho gia đình nhỏ và chuyến đi gần.",
    features: ["Bluetooth", "Camera lùi", "Bản đồ", "Cảm biến áp suất lốp"],
    documents: ["Đăng ký xe", "Bảo hiểm", "Đăng kiểm"],
    licensePlate: "51A-12345",
    specifications: {
      seats: 5,
      transmission: "Số tự động",
      fuel: "Xăng",
      consumption: "8L/100km",
      year: 2025,
    },
    images: [
      "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_co_tai_xe/toyota/fortuner/p/cho_thue_xe_toyota_fortuner_2017_tuan_1_ho_chi_minh_cong_hoa-2020-01-02-17-15-12.jpg",
      "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/toyota/fortuner/p/cho_thue_xe_toyota_fortuner_2020_jared_ho_chi_minh-2022-10-31-14-43-49.jpg",
      "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/toyota/fortuner/p/cho_thue_xe_toyota_fortuner_2020_ho_chi_minh_ha_anh-2022-06-07-11-31-08.jpg",
    ],
    brand: "Toyota",
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
    description:
      "Xe điện VinFast cao cấp, không gian rộng rãi, công nghệ hiện đại, phù hợp cho gia đình lớn hoặc đi du lịch xa.",
    features: [
      "Xe điện",
      "Màn hình cảm ứng",
      "Apple CarPlay",
      "Android Auto",
      "Camera 360",
      "Cửa sổ trời",
    ],
    documents: ["Đăng ký xe", "Bảo hiểm", "Đăng kiểm"],
    licensePlate: "30A-67890",
    specifications: {
      seats: 7,
      transmission: "Số tự động",
      fuel: "Điện",
      consumption: "19.6 kWh/100km",
      year: 2023,
    },
    images: [
      "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/vinfast/vf_9/p/cho_thue_xe_vinfast_vf9_2023_ha_noi_vinfast_westlake-2023-09-25-10-55-47.jpg",
      "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/vinfast/vf_9/p/cho_thue_xe_vinfast_vf9_2023_ha_noi_pham_van_dong-2023-10-12-12-01-29.jpg",
      "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/vinfast/vf_9/p/cho_thue_xe_vinfast_vf9_plus_2023_ha_noi_hoang_minh_giam-2023-11-07-14-23-26.jpg",
    ],
    brand: "VinFast",
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
    description:
      "MPV 7 chỗ hiện đại, nội thất rộng rãi, phù hợp cho gia đình đông người. Xe đầy đủ tiện nghi, vận hành êm ái.",
    features: [
      "Bluetooth",
      "Camera lùi",
      "Cảm biến lùi",
      "Màn hình giải trí",
      "Ghế trẻ em",
    ],
    documents: ["Đăng ký xe", "Bảo hiểm", "Đăng kiểm"],
    licensePlate: "51H-56789",
    specifications: {
      seats: 7,
      transmission: "Số tự động",
      fuel: "Xăng",
      consumption: "7L/100km",
      year: 2023,
    },
    images: [
      "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_co_tai_xe/hyundai/stargazer/p/cho_thue_xe_hyundai_stargazer_2023_le_hoang_quan_ho_chi_minh-2023-05-24-15-06-55.jpg",
      "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/hyundai/stargazer/p/cho_thue_xe_hyundai_stargazer_2023_hai_duong_bui_thi_thom-2023-12-26-10-24-52.jpg",
      "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/hyundai/stargazer/p/cho_thue_xe_hyundai_stargazer_2022_ben_tre_le_hoang_vu-2023-11-14-11-03-09.jpg",
    ],
    brand: "Hyundai",
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
    description:
      "Innova Cross Hybrid mới nhất, kết hợp giữa động cơ xăng và điện, tiết kiệm nhiên liệu. Xe rộng rãi, thiết kế hiện đại.",
    features: [
      "Hybrid",
      "Camera 360",
      "Màn hình cảm ứng",
      "Cửa sổ trời",
      "Loa JBL",
      "Cốp điện",
    ],
    documents: ["Đăng ký xe", "Bảo hiểm", "Đăng kiểm"],
    licensePlate: "51K-78901",
    specifications: {
      seats: 7,
      transmission: "Số tự động",
      fuel: "Hybrid",
      consumption: "5.5L/100km",
      year: 2024,
    },
    images: [
      "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/toyota/cross/p/cho_thue_xe_toyota_innova_cross_hybrid_2024_ho_chi_minh_nguyen_van_thu-2024-03-07-11-09-44.jpg",
      "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/toyota/cross/p/cho_thue_xe_toyota_innova_cross_hybrid_2024_ho_chi_minh_nguyen_tat_thanh-2024-03-15-12-53-24.jpg",
      "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/toyota/cross/p/cho_thue_xe_toyota_innova_cross_hybrid_2024_ho_chi_minh_an_suong-2024-03-17-09-19-49.jpg",
    ],
    brand: "Toyota",
  },
];

// Feature options list for car features
const allCarFeatures = {
  "Bản đồ": false,
  Bluetooth: false,
  "Camera 360": false,
  "Camera cập lề": false,
  "Camera hành trình": false,
  "Camera lùi": false,
  "Cảm biến lốp": false,
  "Cảm biến va chạm": false,
  "Cửa sổ trời": false,
  "Định vị GPS": false,
  "Ghế trẻ em": false,
  "Khe cắm USB": false,
  "Lốp dự phòng": false,
  "Màn hình DVD": false,
  "Nắp thùng xe bán tải": false,
  "Túi khí an toàn": false,
  ETC: false,
};

// Mock data for bookings
const mockBookings = [
  {
    id: 101,
    carId: 1,
    customerName: "Nguyễn Văn A",
    phoneNumber: "0912345678",
    startDate: "2025-05-01",
    endDate: "2025-05-03",
    status: "pending",
    totalAmount: 750000,
    createDate: "2025-04-25",
    pickupLocation: "Huyện Bình Chánh, TP Hồ Chí Minh",
    notes: "Tôi sẽ đến đúng hẹn và cần xe trong tình trạng sạch sẽ.",
  },
  {
    id: 102,
    carId: 1,
    customerName: "Trần Thị B",
    phoneNumber: "0923456789",
    startDate: "2025-05-05",
    endDate: "2025-05-06",
    status: "pending",
    totalAmount: 500000,
    createDate: "2025-04-26",
    pickupLocation: "Quận 7, TP Hồ Chí Minh",
    notes: "Chỉ thuê 1 ngày để đi công việc.",
  },
  {
    id: 103,
    carId: 3,
    customerName: "Lê Văn C",
    phoneNumber: "0934567890",
    startDate: "2025-05-02",
    endDate: "2025-05-04",
    status: "pending",
    totalAmount: 1600000,
    createDate: "2025-04-28",
    pickupLocation: "Quận 2, TP Hồ Chí Minh",
    notes: "Cần xe đi du lịch cuối tuần.",
  },
  {
    id: 104,
    carId: 3,
    customerName: "Phạm Thị D",
    phoneNumber: "0945678901",
    startDate: "2025-05-10",
    endDate: "2025-05-12",
    status: "pending",
    totalAmount: 1600000,
    createDate: "2025-04-29",
    pickupLocation: "Quận 1, TP Hồ Chí Minh",
    notes: "",
  },
  {
    id: 105,
    carId: 3,
    customerName: "Hoàng Văn E",
    phoneNumber: "0956789012",
    startDate: "2025-05-15",
    endDate: "2025-05-18",
    status: "pending",
    totalAmount: 2400000,
    createDate: "2025-04-30",
    pickupLocation: "Quận 7, TP Hồ Chí Minh",
    notes: "Đi công tác xa, cần xe bền và tiết kiệm nhiên liệu.",
  },
];

export default function CarSetting() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("basic-info");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Form state for basic info
  const [address, setAddress] = useState("");
  const [consumption, setConsumption] = useState("");
  const [description, setDescription] = useState("");
  const [carFeatures, setCarFeatures] = useState({ ...allCarFeatures });

  // Form state for pricing
  const [regularPrice, setRegularPrice] = useState(0);
  const [priceWithDriver, setPriceWithDriver] = useState(0);
  const [weekendSurcharge, setWeekendSurcharge] = useState(10);
  const [weeklyDiscount, setWeeklyDiscount] = useState(5);
  const [monthlyDiscount, setMonthlyDiscount] = useState(10);
  const [enableDelivery, setEnableDelivery] = useState(true);
  const [deliveryFee, setDeliveryFee] = useState(50000);
  const [maxDeliveryDistance, setMaxDeliveryDistance] = useState(10);

  // Get bookings for this car
  const carBookings = mockBookings.filter(
    (booking) =>
      booking.carId === parseInt(carId, 10) && booking.status === "pending"
  );

  // Find car by ID from the mock data
  const car = myCars.find((car) => car.id === parseInt(carId, 10));

  // Initialize form data when car data is loaded
  useEffect(() => {
    if (car) {
      // Basic info
      setAddress(car.location);
      setConsumption(car.specifications.consumption.replace("L/100km", ""));
      setDescription(car.description);

      // Initialize features
      const initialFeatures = { ...allCarFeatures };
      car.features.forEach((feature) => {
        if (initialFeatures.hasOwnProperty(feature)) {
          initialFeatures[feature] = true;
        }
      });
      setCarFeatures(initialFeatures);

      // Pricing info
      setRegularPrice(car.price);
      setPriceWithDriver(car.priceWithDriver || 0);
    }
  }, [car]);

  const handleSave = () => {
    // Mock saving data (would connect to API in a real application)
    alert("Đã lưu thông tin xe thành công!");
  };

  const handleSavePricing = () => {
    // Mock saving pricing data
    alert("Đã lưu thông tin giá thành công!");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const toggleFeature = (feature) => {
    setCarFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Đang hoạt động":
        return <FiCheck className="w-4 h-4 mr-1 text-green-600" />;
      case "Chờ duyệt":
        return <FiClock className="w-4 h-4 mr-1 text-yellow-600" />;
      case "Đã bị từ chối":
        return <FiX className="w-4 h-4 mr-1 text-red-600" />;
      case "Ngừng cho thuê":
        return <FiPause className="w-4 h-4 mr-1 text-gray-600" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  const formatPhoneNumber = (phone) => {
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  };

  const handleApproveBooking = (bookingId) => {
    alert(`Đã duyệt đơn đặt xe #${bookingId}`);
  };

  const handleRejectBooking = (bookingId) => {
    alert(`Đã từ chối đơn đặt xe #${bookingId}`);
  };

  const handleViewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedBooking(null);
  };

  // If car not found
  if (!car) {
    return (
      <div className="p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold">Không tìm thấy thông tin xe</h2>
        <button
          onClick={() => navigate("/my-cars")}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Quay lại danh sách xe
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/user/cars")}
            className="flex items-center mr-4 text-gray-600 hover:text-green-600"
          >
            <FiChevronLeft className="w-5 h-5" />
            <span>Quay lại</span>
          </button>
          <h1 className="text-2xl font-bold">Thông tin xe</h1>
        </div>
      </div>

      {/* Car header info */}
      <div className="p-6 mb-6 bg-white rounded-lg shadow">
        <div className="flex flex-col md:flex-row">
          <div className="mb-4 md:w-1/3 md:pr-6 md:mb-0">
            <img
              src={car.image}
              alt={car.name}
              className="object-cover w-full rounded-lg h-60"
            />
          </div>
          <div className="md:w-2/3">
            <div className="flex items-center mb-2 space-x-2">
              <div
                className={`flex items-center rounded px-3 py-1 text-xs font-medium ${car.statusClass}`}
              >
                {getStatusIcon(car.status)}
                {car.status}
              </div>
            </div>
            <h2 className="mb-1 text-2xl font-bold">{car.name}</h2>
            <p className="mb-2 text-gray-600">Thương hiệu: {car.brand}</p>
            <p className="mb-4 text-gray-700">{car.description}</p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center">
                <FiUsers className="mr-2 text-green-500" />
                <span className="text-gray-700">
                  {car.trips} chuyến đã hoàn thành
                </span>
              </div>
              <div className="flex items-center">
                <FiDollarSign className="mr-2 text-green-500" />
                <span className="text-gray-700">
                  {formatCurrency(car.price)}/ngày
                </span>
              </div>
              <div className="flex items-center">
                <FiMapPin className="mr-2 text-green-500" />
                <span className="text-gray-700">{car.location}</span>
              </div>
              <div className="flex items-center">
                <FiStar className="mr-2 text-yellow-500" />
                <span className="text-gray-700">
                  {car.rating > 0 ? `${car.rating}/5 sao` : "Chưa có đánh giá"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Navigation */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSection("basic-info")}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
              activeSection === "basic-info"
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FiInfo className="w-5 h-5" />
            <span>Thông tin cơ bản</span>
          </button>
          <button
            onClick={() => setActiveSection("pricing")}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
              activeSection === "pricing"
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FiDollarSign className="w-5 h-5" />
            <span>Cài đặt giá</span>
          </button>
          <button
            onClick={() => setActiveSection("bookings")}
            className={`px-4 py-2 rounded-md flex items-center space-x-2 relative ${
              activeSection === "bookings"
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FiList className="w-5 h-5" />
            <span>Danh sách đặt xe</span>
            {carBookings.length > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                {carBookings.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="p-6 bg-white rounded-lg shadow">
        {activeSection === "basic-info" && (
          <div>
            <h2 className="mb-6 text-xl font-semibold">Thông tin cơ bản</h2>

            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">
                Địa chỉ
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nhập địa chỉ xe"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">
                Tiêu thụ nhiên liệu (lít/100km)
              </label>
              <input
                type="text"
                value={consumption}
                onChange={(e) => setConsumption(e.target.value)}
                className="w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Lít/100km"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">
                Mô tả
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Mô tả thông tin về xe"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block mb-4 font-medium text-gray-700">
                Tính năng của xe
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {Object.entries(carFeatures).map(([feature, isActive]) => (
                  <div
                    key={feature}
                    onClick={() => toggleFeature(feature)}
                    className={`border ${
                      isActive
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200"
                    } rounded-md p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:border-green-500 transition-colors`}
                  >
                    <div
                      className={`w-8 h-8 mb-2 flex items-center justify-center ${
                        isActive ? "text-green-500" : "text-gray-500"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        )}

        {activeSection === "pricing" && (
          <div>
            <h2 className="mb-6 text-xl font-semibold">Cài đặt giá thuê xe</h2>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Giá thuê tự lái (VND/ngày)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={regularPrice}
                    onChange={(e) =>
                      setRegularPrice(parseInt(e.target.value) || 0)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Nhập giá thuê"
                  />
                  <div className="absolute inset-y-0 flex items-center pointer-events-none right-3">
                    <span className="text-gray-500">VND</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Giá thuê có tài xế (VND/ngày)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={priceWithDriver}
                    onChange={(e) =>
                      setPriceWithDriver(parseInt(e.target.value) || 0)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Nhập giá thuê có tài xế"
                  />
                  <div className="absolute inset-y-0 flex items-center pointer-events-none right-3">
                    <span className="text-gray-500">VND</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium text-gray-700">
                Phụ thu cuối tuần (%)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={weekendSurcharge}
                  onChange={(e) =>
                    setWeekendSurcharge(parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <span className="text-gray-700 min-w-[40px] text-center">
                  {weekendSurcharge}%
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Phụ thu thêm vào ngày cuối tuần (thứ 6, 7, chủ nhật)
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Giảm giá thuê theo tuần (%)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={weeklyDiscount}
                    onChange={(e) =>
                      setWeeklyDiscount(parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <span className="text-gray-700 min-w-[40px] text-center">
                    {weeklyDiscount}%
                  </span>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Giảm giá thuê theo tháng (%)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={monthlyDiscount}
                    onChange={(e) =>
                      setMonthlyDiscount(parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <span className="text-gray-700 min-w-[40px] text-center">
                    {monthlyDiscount}%
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 mb-6 rounded-lg bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium text-gray-800">Giao xe tận nơi</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Cho phép giao xe đến địa điểm khách hàng yêu cầu
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableDelivery}
                    onChange={() => setEnableDelivery(!enableDelivery)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>

              {enableDelivery && (
                <>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Phí giao xe (VND/km)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={deliveryFee}
                        onChange={(e) =>
                          setDeliveryFee(parseInt(e.target.value) || 0)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Nhập phí giao xe"
                      />
                      <div className="absolute inset-y-0 flex items-center pointer-events-none right-3">
                        <span className="text-gray-500">VND</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Khoảng cách giao xe tối đa (km)
                    </label>
                    <div className="flex items-center mb-2 space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={maxDeliveryDistance}
                        onChange={(e) =>
                          setMaxDeliveryDistance(parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                      />
                      <span className="text-gray-700 min-w-[40px] text-center">
                        {maxDeliveryDistance}km
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSavePricing}
                className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Lưu cài đặt giá
              </button>
            </div>
          </div>
        )}

        {activeSection === "bookings" && (
          <div>
            <h2 className="mb-6 text-xl font-semibold">Danh sách đơn đặt xe</h2>

            {carBookings.length > 0 ? (
              <div className="space-y-4">
                {carBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="overflow-hidden transition-shadow duration-200 border border-gray-200 rounded-lg hover:shadow-md"
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center font-medium text-blue-600 bg-blue-100 rounded-full w-9 h-9">
                          {booking.customerName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {booking.customerName}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {formatPhoneNumber(booking.phoneNumber)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="px-2.5 py-1 bg-yellow-50 text-yellow-600 text-xs font-medium rounded-full border border-yellow-200">
                          Chờ xác nhận
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
                        <div>
                          <div className="mb-1 text-xs text-gray-500 uppercase">
                            Thời gian thuê
                          </div>
                          <div className="flex items-center text-sm font-medium text-gray-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 mr-1 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {formatDate(booking.startDate)} -{" "}
                            {formatDate(booking.endDate)}
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            {Math.ceil(
                              (new Date(booking.endDate) -
                                new Date(booking.startDate)) /
                                86400000
                            )}{" "}
                            ngày
                          </div>
                        </div>

                        <div>
                          <div className="mb-1 text-xs text-gray-500 uppercase">
                            Giá trị
                          </div>
                          <div className="flex items-center text-sm font-medium text-gray-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 mr-1 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {formatCurrency(booking.totalAmount)}
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            Ngày đặt: {formatDate(booking.createDate)}
                          </div>
                        </div>

                        <div>
                          <div className="mb-1 text-xs text-gray-500 uppercase">
                            Địa điểm giao nhận
                          </div>
                          <div className="flex items-start text-sm text-gray-800">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1 text-gray-500 shrink-0 mt-0.5"
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
                            <span className="line-clamp-2">
                              {booking.pickupLocation}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4 space-x-2 border-t border-gray-100">
                        <button
                          onClick={() => handleViewBookingDetails(booking)}
                          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded border border-blue-200 transition-colors duration-200 text-sm"
                        >
                          Chi tiết
                        </button>
                        <button
                          onClick={() => handleApproveBooking(booking.id)}
                          className="px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-600 rounded border border-green-200 transition-colors duration-200 text-sm"
                        >
                          Đồng ý
                        </button>
                        <button
                          onClick={() => handleRejectBooking(booking.id)}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded border border-red-200 transition-colors duration-200 text-sm"
                        >
                          Từ chối
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center rounded-lg bg-gray-50">
                <FiList className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="mb-2 text-xl font-semibold">
                  Không có đơn đặt xe nào đang chờ xử lý
                </h3>
                <p className="max-w-md mx-auto text-gray-500">
                  Khi có khách đặt xe, thông tin sẽ xuất hiện ở đây để bạn có
                  thể xử lý.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {showBookingModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Chi tiết đơn đặt xe #{selectedBooking.id}
              </h3>
              <button
                onClick={closeBookingModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 mr-4 text-lg font-medium text-blue-600 bg-blue-100 rounded-full">
                  {selectedBooking.customerName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {selectedBooking.customerName}
                  </h4>
                  <p className="text-gray-600">
                    {formatPhoneNumber(selectedBooking.phoneNumber)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-gray-50">
                  <h5 className="mb-2 text-sm text-gray-500 uppercase">
                    Thông tin thuê xe
                  </h5>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Ngày bắt đầu:</span>
                      <span className="font-medium">
                        {formatDate(selectedBooking.startDate)}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Ngày kết thúc:</span>
                      <span className="font-medium">
                        {formatDate(selectedBooking.endDate)}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Tổng thời gian:</span>
                      <span className="font-medium">
                        {Math.ceil(
                          (new Date(selectedBooking.endDate) -
                            new Date(selectedBooking.startDate)) /
                            86400000
                        )}{" "}
                        ngày
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Ngày đặt:</span>
                      <span className="font-medium">
                        {formatDate(selectedBooking.createDate)}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-gray-50">
                  <h5 className="mb-2 text-sm text-gray-500 uppercase">
                    Thanh toán
                  </h5>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Giá thuê:</span>
                      <span className="font-medium">
                        {formatCurrency(car.price)}/ngày
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Số ngày:</span>
                      <span className="font-medium">
                        {Math.ceil(
                          (new Date(selectedBooking.endDate) -
                            new Date(selectedBooking.startDate)) /
                            86400000
                        )}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Tổng thanh toán:</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(selectedBooking.totalAmount)}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 mb-6 rounded-lg bg-gray-50">
                <h5 className="mb-2 text-sm text-gray-500 uppercase">
                  Thông tin xe
                </h5>
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full mb-3 sm:w-1/3 sm:mb-0">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="object-cover w-full h-32 rounded"
                    />
                  </div>
                  <div className="flex-1 sm:pl-4">
                    <h4 className="mb-1 font-medium text-gray-800">
                      {car.name}
                    </h4>
                    <div className="mb-2 text-sm text-gray-600">
                      Biển số: {car.licensePlate}
                    </div>
                    <div className="grid grid-cols-2 text-sm gap-x-4 gap-y-1">
                      <div className="flex items-center">
                        <span className="w-20 text-gray-500">Nhiên liệu:</span>
                        <span>{car.specifications.fuel}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-gray-500">Số ghế:</span>
                        <span>{car.specifications.seats}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-gray-500">Hộp số:</span>
                        <span>{car.specifications.transmission}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-gray-500">Tiêu thụ:</span>
                        <span>{car.specifications.consumption}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h5 className="mb-2 text-sm text-gray-500 uppercase">
                  Địa điểm giao nhận xe
                </h5>
                <div className="flex items-start p-3 rounded-lg bg-gray-50">
                  <FiMapPin className="mt-0.5 mr-2 text-gray-500" />
                  <span className="text-gray-700">
                    {selectedBooking.pickupLocation}
                  </span>
                </div>
              </div>

              {selectedBooking.notes && (
                <div className="mb-6">
                  <h5 className="mb-2 text-sm text-gray-500 uppercase">
                    Ghi chú
                  </h5>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-gray-700">{selectedBooking.notes}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-6 mt-6 space-x-3 border-t border-gray-200">
                <button
                  onClick={closeBookingModal}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    handleApproveBooking(selectedBooking.id);
                    closeBookingModal();
                  }}
                  className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                >
                  Đồng ý đơn
                </button>
                <button
                  onClick={() => {
                    handleRejectBooking(selectedBooking.id);
                    closeBookingModal();
                  }}
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Từ chối đơn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
