import { useState } from "react";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCarSide,
  FaChevronLeft,
  FaClock,
  FaFileInvoiceDollar,
  FaImage,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaSync,
  FaUser,
} from "react-icons/fa";
import LocationModal from "./modals/LocationModal";
import TimeModal from "./modals/TimeModal";

export default function SearchBar() {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);

  return (
    <div className="bg-white shadow-sm">
      <div className="container px-4 mx-auto">
        {/* Top search bar */}
        <div className="flex items-center py-3">
          <button className="mr-2 text-gray-500">
            <FaChevronLeft />
          </button>

          <div
            className="flex items-center ml-2 text-gray-800 cursor-pointer"
            onClick={() => setShowLocationModal(true)}
          >
            <FaMapMarkerAlt className="mr-2 text-gray-600" />
            <span>TP. Hồ Chí Minh</span>
          </div>

          <div
            className="flex items-center ml-4 text-gray-800 cursor-pointer"
            onClick={() => setShowTimeModal(true)}
          >
            <FaCalendarAlt className="mr-2 text-gray-600" />
            <span>21:00, 20/04/2025 - 20:00, 21/04/2025</span>
          </div>
        </div>

        {/* Filter options */}
        <div className="flex flex-wrap items-center py-3 border-t border-gray-200">
          <button className="flex items-center mr-4 text-gray-700">
            <FaSync className="mr-2" />
            <span>Cập nhật</span>
          </button>

          <button className="flex items-center mr-4 text-gray-700">
            <FaCarSide className="mr-2" />
            <span>Loại xe</span>
          </button>

          <button className="flex items-center mr-4 text-gray-700">
            <FaBuilding className="mr-2" />
            <span>Hãng xe</span>
          </button>

          <button className="flex items-center mr-4 text-gray-700">
            <FaUser className="mr-2" />
            <span>Chủ xe 5⭐</span>
          </button>

          <button className="flex items-center mr-4 text-gray-700">
            <FaMapMarkedAlt className="mr-2" />
            <span>Giao nhận tận nơi</span>
          </button>

          <button className="flex items-center mr-4 text-gray-700">
            <FaClock className="mr-2" />
            <span>Thuê giờ</span>
          </button>

          <button className="flex items-center mr-4 text-gray-700">
            <FaFileInvoiceDollar className="mr-2" />
            <span>Đặt xe nhanh</span>
          </button>

          <button className="flex items-center mr-4 text-gray-700">
            <FaImage className="mr-2" />
            <span>Miễn thế chấp</span>
          </button>

          <button className="flex items-center ml-auto text-gray-700">
            <span>Bộ lọc</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Modals */}
      {showLocationModal && (
        <LocationModal onClose={() => setShowLocationModal(false)} />
      )}

      {showTimeModal && <TimeModal onClose={() => setShowTimeModal(false)} />}
    </div>
  );
}
