import { useState } from "react";

export default function PaymentOption({ onPaymentOptionChange }) {
  const [selectedOption, setSelectedOption] = useState("partial");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (onPaymentOptionChange) {
      onPaymentOptionChange(option);
    }
  };

  return (
    <div className="w-full mb-6 bg-white rounded-lg shadow-sm">
      <h2 className="py-6 text-2xl font-bold text-center">
        Chọn Phương Thức Thanh Toán
      </h2>

      <div className="p-6 bg-white border border-gray-100 rounded-lg">
        <div className="space-y-6">
          <label className="flex items-start cursor-pointer group">
            <div className="relative flex items-center h-6">
              <input
                type="radio"
                className="sr-only"
                checked={selectedOption === "partial"}
                onChange={() => handleOptionChange("partial")}
              />
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                  selectedOption === "partial"
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
              >
                {selectedOption === "partial" && (
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                )}
              </div>
            </div>
            <div className="ml-3">
              <span
                className={`block text-base font-medium ${
                  selectedOption === "partial"
                    ? "text-green-500"
                    : "text-gray-800"
                }`}
              >
                Thanh toán 40% giá trị chuyến
              </span>
              <span className="block mt-1 text-sm text-gray-600">
                Bạn sẽ thanh toán số tiền còn lại trực tiếp cho chủ xe khi làm
                thủ tục nhận xe
              </span>
            </div>
          </label>

          <label className="flex items-start cursor-pointer group">
            <div className="relative flex items-center h-6">
              <input
                type="radio"
                className="sr-only"
                checked={selectedOption === "full"}
                onChange={() => handleOptionChange("full")}
              />
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                  selectedOption === "full"
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
              >
                {selectedOption === "full" && (
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                )}
              </div>
            </div>
            <div className="ml-3">
              <span
                className={`block text-base font-medium ${
                  selectedOption === "full" ? "text-green-500" : "text-gray-800"
                }`}
              >
                Thanh toán toàn bộ giá trị chuyến
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
