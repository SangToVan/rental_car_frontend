import { FaBriefcase, FaChevronDown, FaHandshake, FaMapMarkerAlt, FaTimes, FaUser, FaUsers } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";

export default function LocationModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-xl p-5 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Tìm kiếm</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <FaTimes />
          </button>
        </div>

        {/* Location Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="mr-2 text-gray-600" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-600">Địa điểm</h3>
              <div className="flex items-center justify-between">
                <p className="text-base">TP. Hồ Chí Minh</p>
                <FaChevronDown className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* By Purpose Section */}
        <div className="mb-4">
          <h3 className="flex items-center mb-3 text-sm font-medium text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Theo nhu cầu
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            <div className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg">
              <FaUser className="mb-1 text-xl text-gray-600" />
              <span className="text-sm text-center">Lái mới</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg">
              <FaBriefcase className="mb-1 text-xl text-gray-600" />
              <span className="text-sm text-center">Công việc, đi lại</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg">
              <MdFamilyRestroom className="mb-1 text-xl text-gray-600" />
              <span className="text-sm text-center">Gia đình</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg">
              <FaUsers className="mb-1 text-xl text-gray-600" />
              <span className="text-sm text-center">Cắm trại, chó đỏ</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg">
              <FaHandshake className="mb-1 text-xl text-gray-600" />
              <span className="text-sm text-center">Tiếp khách, dự tiệc</span>
            </div>
          </div>
        </div>

        {/* By Style Section */}
        <div className="mb-4">
          <h3 className="flex items-center mb-3 text-sm font-medium text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            Theo xu hướng
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg">
              <svg
                className="w-5 h-5 mb-1 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6H18M6 12H18M6 18H18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-center">Xe điện</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg">
              <svg
                className="w-5 h-5 mb-1 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6H18M6 12H18M6 18H18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-center">Xe hybrid</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg">
              <svg
                className="w-5 h-5 mb-1 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6H18M6 12H18M6 18H18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm text-center">Xe thể thao</span>
            </div>
          </div>
        </div>

        {/* Budget Section */}
        <div className="mb-4">
          <h3 className="flex items-center mb-3 text-sm font-medium text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            Ngân sách
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg">
              <svg
                className="w-5 h-5 mb-1 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 11V5.5C11 4.67 10.33 4 9.5 4C8.67 4 8 4.67 8 5.5V11H11Z"
                  fill="currentColor"
                />
                <path
                  d="M13 11V5.5C13 4.67 13.67 4 14.5 4C15.33 4 16 4.67 16 5.5V11H13Z"
                  fill="currentColor"
                />
                <path d="M14 16L12 20L10 16H14Z" fill="currentColor" />
                <path
                  d="M20 11H4C3.45 11 3 11.45 3 12V13C3 13.55 3.45 14 4 14H20C20.55 14 21 13.55 21 13V12C21 11.45 20.55 11 20 11Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-sm text-center">Giá rẻ</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg">
              <svg
                className="w-5 h-5 mb-1 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.89 11.1C12.3 11.9 11.45 12.5 10.45 12.7C10.2 12.75 9.95 12.78 9.7 12.78C7.75 12.78 6.17 11.2 6.17 9.25C6.17 7.3 7.75 5.72 9.7 5.72C11.65 5.72 13.23 7.3 13.23 9.25C13.23 9.5 13.2 9.77 13.15 10.01C12.95 10.65 12.75 10.95 12.89 11.1Z"
                  fill="currentColor"
                />
                <path
                  d="M21.2501 14.05V18.65C21.2501 19.9 20.9401 20.55 20.2401 21C19.5701 21.45 18.5201 21.45 17.0401 21.45H6.95008C5.47008 21.45 4.42008 21.45 3.75008 21C3.02008 20.5 2.75008 19.85 2.75008 18.65V14.05C2.75008 12.8 3.05008 12.15 3.75008 11.7C4.06008 11.5 4.45008 11.44 5.00008 11.42C5.15008 12.95 6.40008 14.17 7.96008 14.25C9.00008 14.3 9.91008 13.89 10.55 13.19C10.9201 12.8 11.2101 12.31 11.3401 11.76C11.3401 11.75 11.3401 11.74 11.3501 11.74C11.4401 11.42 11.5001 11.09 11.5001 10.74C11.5001 10.14 11.3501 9.57999 11.0901 9.08999C10.9701 8.84999 10.8301 8.62999 10.6801 8.42999C10.0501 7.63999 9.09008 7.09999 8.00008 7.09999C6.00008 7.09999 4.30008 8.66999 4.11008 10.63C3.95008 10.65 3.81008 10.66 3.67008 10.69C2.98008 10.83 2.51008 11.16 2.20008 11.7C2.08008 11.89 1.98008 12.11 1.91008 12.38C1.81008 12.76 1.76008 13.21 1.75008 13.77V18.93C1.76008 19.47 1.81008 19.91 1.92008 20.29C1.98008 20.54 2.08008 20.78 2.21008 20.98C2.49008 21.43 2.89008 21.74 3.41008 21.91C3.81008 22.04 4.30008 22.12 4.93008 22.15C5.08008 22.16 5.25008 22.16 5.42008 22.17H18.58C18.75 22.16 18.91 22.16 19.07 22.15C19.7001 22.12 20.1901 22.04 20.5901 21.91C21.1101 21.74 21.5101 21.43 21.7901 20.98C21.9201 20.78 22.0201 20.54 22.0901 20.29C22.1901 19.9 22.2401 19.45 22.2501 18.89V14.11C22.2401 13.5 22.1801 13.03 22.0701 12.64C22.0601 12.6 22.0601 12.57 22.0501 12.53C21.9001 12.31 21.7101 12.15 21.4901 12.08C21.3501 12.03 21.1801 12.01 21.0001 12C20.9601 12 20.9201 12 20.8801 12C19.2001 12 17.7901 10.84 17.4301 9.25C17.4001 9.08 17.3801 8.9 17.3801 8.72C17.3801 7.92 17.6401 7.17 18.0801 6.57C18.2201 6.37 18.3801 6.19 18.5601 6.04C19.0901 5.59 19.7801 5.29 20.5301 5.24C20.5901 5.24 20.6601 5.23 20.7201 5.23C20.9101 5.23 21.0901 5.25 21.2701 5.29C21.3301 6.84 21.3901 8.75 21.4201 9.94C21.4301 10.38 21.7801 10.73 22.2201 10.73C22.6601 10.73 23.0201 10.39 23.0001 9.95C22.9601 8.76 22.9001 6.79 22.8401 5.26C22.8301 4.9 22.7101 4.59 22.5101 4.35C22.3101 4.11 22.0301 3.95 21.7101 3.91C21.7001 3.91 21.6901 3.91 21.6801 3.9C21.4801 3.88 21.2701 3.87 21.0501 3.87C20.9601 3.87 20.8601 3.87 20.7701 3.88C19.5101 3.94 18.3601 4.45 17.4901 5.27C17.0001 5.73 16.5901 6.3 16.3001 6.94C16.1801 7.19 16.0801 7.45 16.0101 7.72C15.9301 8.03 15.8901 8.35 15.8901 8.69C15.8901 8.93 15.9101 9.18 15.9601 9.41C16.0801 10.04 16.3301 10.62 16.6801 11.11C16.7201 11.17 16.7601 11.22 16.8001 11.28C16.7101 11.41 16.6301 11.55 16.5701 11.7C16.5501 11.75 16.5301 11.79 16.5101 11.84C15.9901 11.86 15.4801 11.86 14.9801 11.86C14.7701 11.86 14.5701 11.86 14.3701 11.86C14.1801 11.1 13.8601 10.41 13.4201 9.84C13.6201 9.34 13.7301 8.8 13.7301 8.23C13.7301 6.61 12.7601 5.18 11.3401 4.51C11.3501 4.39 11.3601 4.28 11.3601 4.15C11.3601 2.42 9.95008 1.01 8.22008 1.01C6.49008 1.01 5.08008 2.42 5.08008 4.15C5.08008 4.28 5.09008 4.4 5.10008 4.52C3.57008 5.21 2.52008 6.74 2.52008 8.49C2.52008 9.42 2.82008 10.27 3.32008 10.96C3.12008 10.99 2.95008 11.03 2.78008 11.08C1.95008 11.32 1.24008 11.84 0.780078 12.64C0.620078 12.92 0.490078 13.22 0.400078 13.56C0.250078 14.12 0.170078 14.82 0.160078 15.69V18.39C0.170078 19.23 0.250078 19.91 0.390078 20.46C0.470078 20.78 0.600078 21.08 0.760078 21.35C1.16008 22.01 1.72008 22.46 2.46008 22.7C3.00008 22.88 3.66008 22.99 4.51008 23.02C4.74008 23.03 4.98008 23.03 5.24008 23.04H18.76C19.02 23.03 19.25 23.03 19.49 23.02C20.34 22.99 21 22.88 21.54 22.7C22.28 22.46 22.84 22.01 23.24 21.35C23.4 21.08 23.53 20.78 23.61 20.46C23.76 19.9 23.83 19.2 23.84 18.35V15.66C23.83 14.8 23.76 14.09 23.6 13.54C23.5 13.21 23.36 12.9 23.19 12.63C22.76 11.84 22.08 11.33 21.2501 11.08V14.05Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-sm text-center">Tiết kiệm</span>
            </div>
          </div>
        </div>

        {/* Nearby Section */}
        <div className="mb-4">
          <h3 className="flex items-center mb-3 text-sm font-medium text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
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
            Gần đây
          </h3>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center px-3 py-2 bg-gray-100 rounded-full">
              <div className="w-6 h-6 mr-2 overflow-hidden text-sm font-bold text-center text-red-600 bg-red-100 rounded-full">
                <span className="leading-6">T</span>
              </div>
              <span>TOBE MCAR</span>
            </div>
            <div className="flex items-center px-3 py-2 bg-gray-100 rounded-full">
              <div className="w-6 h-6 mr-2 overflow-hidden text-sm font-bold text-center text-white bg-blue-500 rounded-full">
                <span className="leading-6">S</span>
              </div>
              <span>Sáng Tô Văn</span>
            </div>
            <div className="flex items-center px-3 py-2 bg-gray-100 rounded-full">
              <div className="w-6 h-6 mr-2 overflow-hidden text-sm font-bold text-center text-green-600 bg-green-100 rounded-full">
                <span className="leading-6">V</span>
              </div>
              <span>VINFAST VF9 ECO</span>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6">
          <button className="w-full px-4 py-3 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600">
            Tìm xe
          </button>
        </div>
      </div>
    </div>
  );
}
