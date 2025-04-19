import { useState } from "react";
import { Link } from "react-router-dom";

export default function Step2() {
  const [price, setPrice] = useState("1100");
  const [priceDiscount, setPriceDiscount] = useState(false);
  const [discountAmount, setDiscountAmount] = useState("5");
  const [quickRent, setQuickRent] = useState(false);
  const [deliveryCar, setDeliveryCar] = useState(true);
  const [deliveryDistance, setDeliveryDistance] = useState("20");
  const [limitKm, setLimitKm] = useState(true);
  const [kmPerDay, setKmPerDay] = useState("400");
  const [kmOverday, setKmOverday] = useState("50000");

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
              <div className="bg-[#f8f9f9] mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2">
                <span className="font-semibold text-gray-800">1</span>
              </div>
              <div className="text-sm text-gray-600">Thông tin</div>
            </div>

            <div className="w-1/3 text-center py-4 border-b-2 border-[#61c596] relative">
              <div className="bg-[#61c596] mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2">
                <span className="font-semibold text-white">2</span>
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
          <h2 className="mb-2 text-lg font-semibold text-gray-800">
            Đơn giá thuê mặc định
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            Đơn giá thuê xe sẽ không thay đổi theo ngày trong tuần. Bạn có thể
            thay đổi giá thuê các ngày đặc biệt như cuối tuần, lễ, tết... trong
            mục quản lý xe.
          </p>

          <div className="flex items-center mb-6">
            <div className="relative w-40">
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
              />
              <div className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2">
                K
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Giảm giá</h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={priceDiscount}
                  onChange={() => setPriceDiscount(!priceDiscount)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#61c596]"></div>
              </label>
            </div>

            {priceDiscount && (
              <div>
                <p className="mb-4 text-sm text-gray-600">
                  Giảm giá thuê tuần (% trên đơn giá)
                </p>
                <div className="flex items-center mb-4 space-x-2">
                  <span className="bg-[#61c596] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    ?
                  </span>
                  <input
                    type="text"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                    className="w-20 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
                  />
                  <span className="text-gray-600">%</span>
                </div>
                <p className="mb-4 text-sm text-gray-600">
                  Giảm giá thuê tháng (% trên đơn giá)
                </p>
                <div className="flex items-center mb-4 space-x-2">
                  <input
                    type="text"
                    value="25"
                    className="w-20 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
                  />
                  <span className="text-gray-600">%</span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Đặt xe nhanh
              </h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={quickRent}
                  onChange={() => setQuickRent(!quickRent)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#61c596]"></div>
              </label>
            </div>

            <p className="mb-6 text-sm text-red-500">
              Bật tính năng cho phép khách hàng đặt xe ngay lập tức không cần
              chờ xác nhận. (Phù hợp với chủ xe không thường xuyên online hoặc
              luôn tin tưởng khách).
            </p>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Địa chỉ xe
            </h2>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Địa chỉ mặc định chỗ giao nhận xe"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
              />
              <span className="absolute transform -translate-y-1/2 right-3 top-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Giao xe tận nơi
              </h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={deliveryCar}
                  onChange={() => setDeliveryCar(!deliveryCar)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#61c596]"></div>
              </label>
            </div>

            {deliveryCar && (
              <>
                <div className="mb-6">
                  <p className="mb-2 text-sm text-gray-600">
                    Quãng đường giao xe tối đa
                  </p>
                  <div className="flex items-center mb-2">
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={deliveryDistance}
                      onChange={(e) => setDeliveryDistance(e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#61c596]"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Quãng đường tối đa: {deliveryDistance}km</span>
                    <span>20km</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="mb-2 text-sm text-gray-600">
                    Phí giao nhận xe và cho thuê lái
                  </p>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#61c596]"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>[object Object]</span>
                    <span>[object Object]</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="mb-2 text-sm text-gray-600">
                    Miễn phí giao nhận xe trong vòng
                  </p>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#61c596]"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Quãng đường tối đa: 0km</span>
                    <span>0km</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Giới hạn số km
              </h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={limitKm}
                  onChange={() => setLimitKm(!limitKm)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#61c596]"></div>
              </label>
            </div>

            {limitKm && (
              <>
                <div className="mb-6">
                  <p className="mb-2 text-sm text-gray-600">
                    Số km tối đa trong 1 ngày
                  </p>
                  <div className="flex items-center mb-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={kmPerDay}
                      onChange={(e) => setKmPerDay(e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#61c596]"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>400km</span>
                    <span>400km</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="mb-2 text-sm text-gray-600">
                    Phí vượt giới hạn (tính mỗi km)
                  </p>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#61c596]"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>[object Object]</span>
                    <span>[object Object]</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Điều khoản thuê xe
            </h2>
            <div className="p-4 mb-6 border border-gray-200 rounded-md">
              <p className="text-sm text-gray-600">
                Các lưu ý khi thuê xe sẽ được đính kèm phiếu thuê và hiển thành
                điều khoản giữa hai bên khi thuê xe. Chủ xe có thể thêm các điều
                khoản riêng ở mục "sửa thông tin".
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex mb-8 space-x-4">
          <Link
            to="/add-car/step1"
            className="w-1/2 py-3 font-medium text-center text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Quay lại
          </Link>
          <Link
            to="/add-car/step3"
            className="w-1/2 py-3 text-center rounded-md bg-[#61c596] text-white font-medium hover:bg-opacity-90"
          >
            Kế tiếp
          </Link>
        </div>
      </div>
    </div>
  );
}
