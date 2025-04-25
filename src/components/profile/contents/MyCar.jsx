import { useState } from "react";
import { FiEye } from "react-icons/fi";

export default function MyCar() {
  const [activeTab, setActiveTab] = useState("list");
  const [carType, setCarType] = useState("self-drive");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Xe của tôi</h1>
        <div className="flex items-center">
          <span className="text-sm text-gray-500">Số dư: </span>
          <span className="ml-2 text-lg font-bold text-green-500">0đ</span>
          <svg
            className="w-5 h-5 ml-1 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Tabs */}
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
              activeTab === "rental-info"
                ? "relative text-green-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-green-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("rental-info")}
          >
            Thông tin khai thuế
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
              activeTab === "gps-wired"
                ? "relative text-green-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-green-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("gps-wired")}
          >
            GPS có dây
          </button>
          <button
            className={`whitespace-nowrap pb-4 pt-2 px-4 ${
              activeTab === "gps-wireless"
                ? "relative text-green-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-green-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("gps-wireless")}
          >
            GPS không dây
          </button>
          <button
            className={`whitespace-nowrap pb-4 pt-2 px-4 ${
              activeTab === "contract"
                ? "relative text-green-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-green-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("contract")}
          >
            Hợp đồng mẫu
          </button>
          <button
            className={`whitespace-nowrap pb-4 pt-2 px-4 ${
              activeTab === "wallet"
                ? "relative text-green-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-green-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("wallet")}
          >
            Ví của tôi
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

      {/* Dropdown Filter */}
      <div className="flex justify-end mb-6">
        <div className="relative inline-block">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <span>Tất cả</span>
            <svg
              className="w-5 h-5 ml-2 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Car Listings */}
      <div className="space-y-6">
        {/* Car 1 */}
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img
                src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_co_tai_xe/toyota/fortuner/p/cho_thue_xe_toyota_fortuner_2017_tuan_1_ho_chi_minh_cong_hoa-2020-01-02-17-15-12.jpg"
                alt="TOBE MCAR 2025"
                className="object-cover w-full h-64 md:h-full"
              />
            </div>
            <div className="flex flex-col flex-1 p-6">
              <div className="flex items-center mb-2">
                <span className="px-3 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded">
                  Chờ duyệt
                </span>
              </div>
              <h2 className="mb-1 text-xl font-bold">TOBE MCAR 2025</h2>
              <p className="text-sm text-gray-500">Chưa có chuyến</p>

              <div className="flex items-center mt-4">
                <p className="font-semibold">Giá từ lái: 250K</p>
              </div>

              <div className="flex items-center mt-2 text-sm text-gray-600">
                <svg
                  className="w-5 h-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Huyện Bình Chánh, TP Hồ Chí Minh</span>
              </div>

              <div className="flex items-center justify-end mt-auto">
                <button className="px-4 py-2 font-medium text-white bg-green-500 rounded-md hover:bg-green-600">
                  Quản lý xe
                </button>
                <button className="px-4 py-2 ml-2 font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50">
                  <span className="flex items-center">
                    <FiEye className="mr-1" />
                    Xem chi tiết
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Car 2 */}
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img
                src="https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich/vinfast/vf_9/p/cho_thue_xe_vinfast_vf9_2023_ha_noi_vinfast_westlake-2023-09-25-10-55-47.jpg"
                alt="VINFAST VF9 ECO 2025"
                className="object-cover w-full h-64 md:h-full"
              />
            </div>
            <div className="flex flex-col flex-1 p-6">
              <div className="flex items-center mb-2">
                <span className="px-3 py-1 text-xs font-medium text-red-800 bg-red-100 rounded">
                  Đã bị từ chối
                </span>
              </div>
              <h2 className="mb-1 text-xl font-bold">VINFAST VF9 ECO 2025</h2>
              <p className="text-sm text-gray-500">Chưa có chuyến</p>

              <div className="flex items-center mt-4">
                <p className="font-semibold">Giá từ lái: 1.600K</p>
              </div>

              <div className="flex items-center mt-2 text-sm text-gray-600">
                <svg
                  className="w-5 h-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Quận Bắc Từ Liêm, Hà Nội</span>
              </div>

              <div className="flex items-center justify-end mt-auto">
                <button className="px-4 py-2 font-medium text-white bg-green-500 rounded-md hover:bg-green-600">
                  Quản lý xe
                </button>
                <button className="px-4 py-2 ml-2 font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50">
                  <span className="flex items-center">
                    <FiEye className="mr-1" />
                    Xem chi tiết
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
