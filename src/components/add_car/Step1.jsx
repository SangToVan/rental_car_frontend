import { useState } from "react";
import { Link } from "react-router-dom";

export default function Step1() {
  const [carFeatures, setCarFeatures] = useState({
    "Bản đồ": true,
    Bluetooth: true,
    "Camera 360": false,
    "Camera cập lề": false,
    "Camera hành trình": true,
    "Camera lùi": true,
    "Cảm biến lốp": false,
    "Cảm biến va chạm": false,
    "Cửa sổ trời": false,
    "Định vị GPS": true,
    "Ghế trẻ em": false,
    "Khe cắm USB": true,
    "Lốp dự phòng": false,
    "Màn hình DVD": false,
    "Nắp thùng xe bán tải": false,
    "Túi khí an toàn": true,
    ETC: false,
  });

  const toggleFeature = (feature) => {
    setCarFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  return (
    <div className="bg-[#f8f9f9] min-h-screen">
      <div className="container py-6">
        {/* Back button */}
        <div className="mb-6">
          <Link
            to="/"
            className="flex items-center text-gray-700 hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Quay lại
          </Link>
        </div>

        {/* Title */}
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Đăng ký xe
        </h1>

        {/* Progress Steps */}
        <div className="mb-6 overflow-hidden bg-white rounded-md shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-1/3 text-center py-4 border-b-2 border-[#61c596]">
              <div className="bg-[#61c596] mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2">
                <span className="font-semibold text-white">1</span>
              </div>
              <div className="text-sm text-gray-600">Thông tin</div>
            </div>

            <div className="w-1/3 py-4 text-center border-b-2 border-gray-200">
              <div className="bg-[#f8f9f9] mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2">
                <span className="font-semibold text-gray-800">2</span>
              </div>
              <div className="text-sm text-gray-600">Cho thuê</div>
            </div>

            <div className="w-1/3 py-4 text-center border-b-2 border-gray-200">
              <div className="bg-[#f8f9f9] mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2">
                <span className="font-semibold text-gray-800">3</span>
              </div>
              <div className="text-sm text-gray-600">Hình ảnh</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 mb-6 bg-white rounded-md shadow-sm">
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Biển số xe
            </h2>
            <p className="mb-4 text-sm text-red-500">
              Lưu ý: Biển số không thay đổi sau khi đăng ký
            </p>
            <input
              type="text"
              placeholder="Nhập biển số xe"
              value="95D16653"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
            />
          </div>

          <div className="pt-6 mb-6 border-t border-gray-200">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Thông tin cơ bản
            </h2>
            <p className="mb-4 text-sm text-red-500">
              Lưu ý: Các thông tin cơ bản sau không thể thay đổi sau khi đăng ký
            </p>

            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Hãng xe
                </label>
                <div className="relative">
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent">
                    <option>Audi</option>
                    <option>BMW</option>
                    <option>Honda</option>
                    <option>Toyota</option>
                    <option>Mercedes</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Mẫu xe
                </label>
                <div className="relative">
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent">
                    <option>AUDI A5 (4T)</option>
                    <option>AUDI A4</option>
                    <option>AUDI Q5</option>
                    <option>AUDI Q7</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Số ghế
                </label>
                <div className="relative">
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent">
                    <option>4</option>
                    <option>5</option>
                    <option>7</option>
                    <option>9</option>
                    <option>16</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Năm sản xuất
                </label>
                <div className="relative">
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent">
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Truyền động
                </label>
                <div className="relative">
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent">
                    <option>Số tự động</option>
                    <option>Số sàn</option>
                    <option>Bán tự động</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Loại nhiên liệu
                </label>
                <div className="relative">
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent">
                    <option>Xăng</option>
                    <option>Dầu</option>
                    <option>Điện</option>
                    <option>Hybrid</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mb-6 border-t border-gray-200">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Mức tiêu thụ nhiên liệu
            </h2>
            <p className="mb-2 text-sm text-gray-600">
              (Lít nhiên liệu cho quãng đường 100km)
            </p>
            <input
              type="text"
              value="10"
              className="w-20 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
            />
          </div>

          <div className="pt-6 mb-6 border-t border-gray-200">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">Mô tả</h2>
            <textarea
              placeholder="Viết nội dung mô tả thuê xe"
              className="w-full h-24 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
            ></textarea>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Tính năng
            </h2>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Object.entries(carFeatures).map(([feature, isActive]) => (
                <div
                  key={feature}
                  onClick={() => toggleFeature(feature)}
                  className={`border ${
                    isActive
                      ? "border-[#61c596] bg-green-50"
                      : "border-gray-200"
                  } rounded-md p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#61c596] transition-colors`}
                >
                  <div
                    className={`w-8 h-8 mb-2 flex items-center justify-center ${
                      isActive ? "text-[#61c596]" : "text-gray-500"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {feature === "Bản đồ" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      )}
                      {feature === "Bluetooth" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.246-3.905 14.15 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                        />
                      )}
                      {feature === "Camera 360" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      )}
                      {feature === "Camera cập lề" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      )}
                      {feature === "Camera hành trình" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      )}
                      {feature === "Camera lùi" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      )}
                      {feature === "Cảm biến lốp" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      )}
                      {feature === "Cảm biến va chạm" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      )}
                      {feature === "Cửa sổ trời" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                        />
                      )}
                      {feature === "Định vị GPS" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      )}
                      {feature === "Ghế trẻ em" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      )}
                      {feature === "Khe cắm USB" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        />
                      )}
                      {feature === "Lốp dự phòng" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      )}
                      {feature === "Màn hình DVD" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                        />
                      )}
                      {feature === "Nắp thùng xe bán tải" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                      )}
                      {feature === "Túi khí an toàn" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      )}
                      {feature === "ETC" && (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      )}
                    </svg>
                  </div>
                  <span className="text-xs text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex mb-8 space-x-4">
          <Link
            to="/"
            className="w-1/2 py-3 font-medium text-center text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Quay lại
          </Link>
          <Link
            to="/add-car/step2"
            className="w-1/2 py-3 text-center rounded-md bg-[#61c596] text-white font-medium hover:bg-opacity-90"
          >
            Kế tiếp
          </Link>
        </div>
      </div>
    </div>
  );
}
