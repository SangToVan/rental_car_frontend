import { FaChair, FaMapMarkerAlt, FaRegHeart, FaStar, FaWhatsapp } from "react-icons/fa";
import { RiCarLine, RiGasStationFill } from "react-icons/ri";

export default function CarCard({ car }) {
  return (
    <div className="relative bg-white rounded-lg shadow-lg">
      {/* Car Image */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img
          src={car.image}
          alt={car.name}
          className="object-cover w-full h-full"
        />
        <button className="absolute flex items-center justify-center w-8 h-8 text-gray-600 bg-white rounded-full shadow-md right-2 top-2 hover:text-red-500">
          <FaRegHeart />
        </button>
        {car.discount && (
          <div className="absolute px-2 py-1 text-xs font-bold text-white bg-orange-500 rounded-lg bottom-2 right-2">
            Giảm {car.discount}%
          </div>
        )}

        {/* Image navigation dots */}
        <div className="absolute flex space-x-1 -translate-x-1/2 bottom-2 left-1/2">
          <div className="w-2 h-2 bg-white rounded-full opacity-100"></div>
          <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
        </div>
      </div>

      {/* Car Info */}
      <div className="p-3">
        {/* Free cancellation badge */}
        <div className="flex items-center mb-1">
          <div className="mr-1 flex items-center rounded-full bg-green-100 px-2 py-0.5">
            <FaWhatsapp className="mr-1 text-xs text-green-600" />
            <span className="text-xs text-green-600">Miễn thế chấp</span>
          </div>
          {car.deliveryOption && (
            <div className="ml-1 flex items-center rounded-full bg-blue-100 px-2 py-0.5">
              <span className="text-xs text-blue-600">Giao xe tận nơi</span>
            </div>
          )}
        </div>

        {/* Car Name */}
        <h3 className="mb-1 font-bold uppercase">
          {car.name} {car.year}
        </h3>

        {/* Car Features */}
        <div className="flex items-center mb-2 space-x-2 text-sm text-gray-700">
          <div className="flex items-center">
            <RiCarLine className="mr-1" />
            <span>Số tự động</span>
          </div>
          <div className="flex items-center">
            <FaChair className="mr-1" />
            <span>{car.seats} chỗ</span>
          </div>
          <div className="flex items-center">
            <RiGasStationFill className="mr-1" />
            <span>Xăng</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center mb-2 text-sm text-gray-700">
          <FaMapMarkerAlt className="mr-1 text-gray-500" />
          <span>{car.location}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="flex items-center text-sm">
              <FaStar className="mr-1 text-yellow-400" />
              <span>{car.rating}</span>
            </div>
            <div className="flex items-center ml-2 text-sm text-gray-600">
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-1 text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
                {car.trips} chuyến
              </span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            {car.originalPrice && (
              <p className="text-sm text-gray-500 line-through">
                {car.originalPrice.toLocaleString()}₫/ngày
              </p>
            )}
            <p className="text-lg font-bold text-green-600">
              {car.price.toLocaleString()}₫/ngày
            </p>
            {car.hourlyPrice && (
              <p className="mt-[-4px] text-xs text-blue-500">
                <span className="mr-1 rounded-full bg-blue-100 px-1 py-0.5 text-blue-700">
                  ◓
                </span>
                {car.hourlyPrice.toLocaleString()} giá 4 giờ
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
