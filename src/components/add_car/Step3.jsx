import { useState } from "react";
import { Link } from "react-router-dom";

export default function Step3() {
  const [selectedImages, setSelectedImages] = useState({
    sideImage: true,
    backImage: true,
  });

  return (
    <div className="bg-[#f8f9f9] min-h-screen">
      <div className="container py-6">
        {/* Back button */}
        <div className="mb-6">
          <Link
            to="/page1"
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
              <div className="bg-[#f8f9f9] mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2">
                <span className="font-semibold text-gray-800">1</span>
              </div>
              <div className="text-sm text-gray-600">Thông tin</div>
            </div>

            <div className="w-1/3 text-center py-4 border-b-2 border-[#61c596]">
              <div className="bg-[#f8f9f9] mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2">
                <span className="font-semibold text-gray-800">2</span>
              </div>
              <div className="text-sm text-gray-600">Cho thuê</div>
            </div>

            <div className="w-1/3 text-center py-4 border-b-2 border-[#61c596]">
              <div className="bg-[#61c596] mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2">
                <span className="font-semibold text-white">3</span>
              </div>
              <div className="text-sm text-gray-600">Hình ảnh</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 mb-6 bg-white rounded-md shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Hình ảnh</h2>
          <p className="mb-6 text-sm text-gray-600">
            Đăng nhiều hình ở các góc độ khác nhau để tăng thông tin cho xe của
            bạn.
          </p>

          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
            {/* Side Image */}
            <div className="relative overflow-hidden group">
              <img
                src="https://ext.same-assets.com/602671651/354092277.png"
                alt="Car side view"
                className="object-cover w-full h-40 rounded-md"
              />

              {selectedImages.sideImage && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <button className="bg-[#61c596] text-white px-4 py-2 rounded-md">
                    CHỌN HÌNH
                  </button>
                </div>
              )}
            </div>

            {/* Back Image */}
            <div className="relative overflow-hidden group">
              <img
                src="https://ext.same-assets.com/602671651/2315755350.jpeg"
                alt="Car back view"
                className="object-cover w-full h-40 rounded-md"
              />

              {selectedImages.backImage && (
                <div className="absolute inset-0 flex items-center justify-center bg-black opacity-0 bg-opacity-30">
                  <button className="bg-[#61c596] text-white px-4 py-2 rounded-md">
                    CHỌN HÌNH
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Additional content for uploaded images */}
          <div className="hidden md:block">
            {/* This section can be populated with more images or upload options */}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex mb-8 space-x-4">
          <Link
            to="/add-car/step2"
            className="w-1/2 py-3 font-medium text-center text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Quay lại
          </Link>
          <Link
            to="/"
            className="w-1/2 py-3 text-center rounded-md bg-[#61c596] text-white font-medium hover:bg-opacity-90"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
}
