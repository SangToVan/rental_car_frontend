import { useState } from "react";
import { FiCalendar, FiEye } from "react-icons/fi";

export default function MyBooking() {
  const [activeTab, setActiveTab] = useState("current");
  // Mock data for bookings
  const bookings = [
    {
      id: 1,
      status: "completed",
      statusLabel: "Chủ thuê hoàn",
      car: "VINFAST FADIL 2021",
      price: "623K",
      dates: "21:00 T5, 25/04 - 20:00 T7, 26/04",
      owner: "MICARIO",
      time: "23:00, 24/04/2025",
      isSelfDriven: true,
    },
    {
      id: 2,
      status: "cancelled",
      statusLabel: "Bạn đã hủy",
      car: "MG5 LUXURY 2023",
      price: "983K",
      dates: "21:00 T5, 25/04 - 20:00 T6, 26/04",
      owner: "Minh",
      time: "22:36, 24/04/2025",
      isSelfDriven: true,
      ownerImage: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 3,
      status: "cancelled",
      statusLabel: "Bạn đã hủy",
      car: "KIA CARNIVAL PREMIUM 2022",
      price: "2113K",
      dates: "21:00 T5, 25/04 - 20:00 T6, 26/04",
      owner: "Thụ Kim",
      time: "22:32, 24/04/2025",
      isSelfDriven: true,
      ownerImage: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 4,
      status: "waiting",
      statusLabel: "Chờ xác nhận thuê",
      car: "HYUNDAI CUSTIN LUXURY 2024",
      price: "1.352K",
      dates: "21:00 T5, 25/04 - 20:00 T6, 26/04",
      owner: "Trần Nguyễn Hải",
      time: "22:28, 24/04/2025",
      isSelfDriven: true,
      ownerImage: "https://i.pravatar.cc/150?img=9",
    },
    {
      id: 5,
      status: "waiting",
      statusLabel: "Chờ xác nhận thuê",
      car: "CHEVROLET CRUZE 2018",
      price: "663K",
      dates: "21:00 T5, 25/04 - 20:00 T6, 26/04",
      owner: "PHAM VĂN PHƯƠNG",
      time: "22:26, 24/04/2025",
      isSelfDriven: true,
      ownerImage: "https://i.pravatar.cc/150?img=12",
    },
  ];
  // Get car image based on car model (mock implementation)
  const getCarImage = (car) => {
    const images = {
      "VINFAST FADIL 2021":
        "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/vinfast/fadil/p/cho_thue_xe_vinfast_fadil_2020_thanh_le_tp_ho_chi_minh-2020-11-19-15-43-36.jpg",
      "MG5 LUXURY 2023":
        "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/mg/mg_5/p/cho_thue_xe_mg_mg5_2023_quoc_hung_bac_lieu-2023-12-23-12-19-08.jpg",
      "KIA CARNIVAL PREMIUM 2022":
        "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/kia/carnival/p/cho_thue_xe_kia_carnival_2022_thanh_tung_tp_ho_chi_minh-2022-12-20-11-07-26.jpg",
      "HYUNDAI CUSTIN LUXURY 2024":
        "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/hyundai/custin/p/cho_thue_xe_hyundai_custin_2023_minh_nghia_tp_ho_chi_minh-2023-10-28-11-37-53.jpg",
      "CHEVROLET CRUZE 2018":
        "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/chevrolet/cruze/p/cho_thue_xe_chevrolet_cruze_2017_huu_trung_tp_ho_chi_minh-2023-11-28-16-39-44.jpg",
    };
    return (
      images[car] ||
      "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/toyota/fortuner/p/cho_thue_xe_toyota_fortuner_2017_tuan_1_ho_chi_minh_cong_hoa-2020-01-02-17-15-12.jpg"
    );
  };
  // Get status color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "waiting":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Chuyến của tôi</h1>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("current")}
            className={`pb-4 px-1 ${
              activeTab === "current"
                ? "border-b-2 border-green-500 text-green-600 font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Chuyến hiện tại
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`pb-4 px-1 ${
              activeTab === "history"
                ? "border-b-2 border-green-500 text-green-600 font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Lịch sử chuyến
          </button>
        </div>
      </div>

      {/* Filter Button */}
      <div className="flex justify-end mb-4">
        <button className="flex items-center px-4 py-2 space-x-2 text-sm bg-white border border-gray-200 rounded-md">
          <span>Bộ lọc</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M7 12H17M9 18H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Booking List */}
      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="overflow-hidden bg-white rounded-lg shadow-sm"
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.statusLabel}
                </span>
                <span className="text-sm text-gray-500">{booking.time}</span>
              </div>
            </div>

            <div className="flex flex-col p-4 md:flex-row">
              <div className="w-full mb-4 md:w-1/3 md:mb-0">
                <img
                  src={getCarImage(booking.car)}
                  alt={booking.car}
                  className="object-cover w-full h-48 rounded-lg"
                />
              </div>

              <div className="w-full md:w-2/3 md:pl-6">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold">{booking.car}</h3>
                  {booking.isSelfDriven && (
                    <span className="flex items-center px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full">
                      Tự lái
                      {booking.isSelfDriven && (
                        <svg
                          className="w-3 h-3 ml-1"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </span>
                  )}
                </div>

                <div className="flex items-center mt-3 text-gray-600">
                  <FiCalendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{booking.dates}</span>
                </div>

                <div className="flex items-center mt-3">
                  {booking.ownerImage ? (
                    <img
                      src={booking.ownerImage}
                      alt={booking.owner}
                      className="w-6 h-6 mr-2 rounded-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-6 h-6 mr-2 text-xs bg-gray-200 rounded-full">
                      {booking.owner.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm">{booking.owner}</span>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <span className="font-semibold text-green-600">
                    {booking.price}
                  </span>
                  <button className="flex items-center space-x-1 text-sm text-blue-600">
                    <FiEye className="w-4 h-4" />
                    <span>Xem chi tiết</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
