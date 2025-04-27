import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../ui/Button";
import BookingCancelConfirmModal from "../modals/CancelModal/BookingCancelConfirmModal";
import BookingCancelReasonModal from "../modals/CancelModal/BookingCancelReasonModal";

export default function BookingStep1({ booking, setBooking }) {
  const { id } = useParams();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);

  const handleCancelClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalOpen(false);
    setIsReasonModalOpen(true);
  };

  const handleCancelWithReason = (reason) => {
    setIsReasonModalOpen(false);
    // In a real app, here we would send a request to update the booking status
    setBooking((prev) => ({
      ...prev,
      status: "cancelled",
      cancellationReason: reason,
    }));
  };

  return (
    <>
      {/* Car details section */}
      <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {booking.status === "cancelled" && (
            <div className="flex items-center p-4 mb-6 border-l-4 border-red-500 bg-red-50">
              <svg
                className="w-8 h-8 mr-3 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium text-red-700">
                Chủ xe đã từ chối
              </span>
            </div>
          )}

          <div className="flex flex-col mb-6 md:flex-row">
            <div className="pr-4 md:w-1/2">
              <img
                src={booking.car.images[0]}
                alt={booking.car.name}
                className="object-cover w-full h-auto rounded-lg aspect-video"
              />
            </div>
            <div className="mt-4 md:w-1/2 md:mt-0">
              <h2 className="text-xl font-bold uppercase">
                {booking.car.name}
              </h2>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-600">
                  {booking.car.type}
                </span>
              </div>
              <div className="flex items-center mt-1">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#ffc107]">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="ml-1 font-medium">{booking.car.rating}</span>
                <span className="mx-1">•</span>
                <span className="text-sm text-gray-600">
                  {booking.car.trips} chuyến
                </span>
              </div>
              <div className="flex items-center mt-2">
                <svg
                  className="w-4 h-4 text-gray-500"
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
                <span className="ml-2 text-sm">{booking.car.location}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-4 font-medium">Thời gian thuê xe</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-3">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-500"
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
                  <span className="font-medium">Bắt đầu thuê xe</span>
                </div>
                <div className="text-xl font-bold">{booking.startDate}</div>
                <div className="mt-1 inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                  Ngày mai
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-3">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-500"
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
                  <span className="font-medium">Kết thúc thuê xe</span>
                </div>
                <div className="text-xl font-bold">{booking.endDate}</div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-4 font-medium">Địa điểm giao nhận xe</h3>
            <div className="p-4 border border-gray-200 rounded-lg">
              <span className="block text-lg">{booking.pickupLocation}</span>
              <div className="mt-3">
                <a
                  href="#"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  Xem bản đồ
                </a>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-4 font-medium">
              Giấy tờ thuê xe{" "}
              <svg
                className="inline-block w-4 h-4 ml-1 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </h3>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center py-2 border-b border-gray-100">
                <div className="flex items-center justify-center w-6 h-6 mr-3 text-xs bg-gray-200 rounded-full">
                  1
                </div>
                <span>Chọn 1 trong 2 hình thức</span>
              </div>
              <div className="flex items-center p-3 mt-3 border rounded-md border-primary bg-primary/5">
                <div className="flex-shrink-0 mr-3">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">
                    GPLX (đối chiếu) & CCCD (đối chiếu VNeID)
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-medium">
              Tài sản thế chấp{" "}
              <svg
                className="inline-block w-4 h-4 ml-1 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </h3>
            <div className="p-4 border-l-4 border-orange-400 rounded-lg bg-orange-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-orange-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-orange-700">
                    Không yêu cầu khách thuê thế chấp Tiền mặt hoặc Xe máy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Pricing and actions */}
        <div className="lg:col-span-5">
          <div className="p-6 mb-6 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 mr-3 overflow-hidden rounded-full">
                <img
                  src={booking.car.owner.avatar}
                  alt={booking.car.owner.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-bold">Chủ xe</h3>
                <p className="text-lg font-medium">{booking.car.owner.name}</p>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#ffc107]">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="ml-1 text-sm font-medium">
                {booking.car.owner.rating}
              </span>
              <span className="mx-1 text-gray-300">•</span>
              <span className="text-sm text-gray-500">
                {booking.car.owner.trips} chuyến
              </span>
            </div>
          </div>

          {/* Insurance section */}
          <div className="p-6 mb-6 border border-gray-200 rounded-lg">
            <h3 className="flex items-center mb-2 font-bold">
              <svg
                className="w-5 h-5 mr-2 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Bảo hiểm thuê xe
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Chuyến đi được bảo hiểm bởi Mioto. Khách hàng sẽ được bồi thường
              tối đa 2.000.000đ trong trường hợp có sự cố ngoài ý muốn.
            </p>
          </div>

          {/* Pricing section */}
          <div className="p-6 mb-6 border border-gray-200 rounded-lg">
            <h3 className="mb-4 font-bold">Bảng tính giá</h3>

            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span>Đơn giá thuê</span>
                  <svg
                    className="w-4 h-4 ml-1 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="font-medium">
                  {booking.price.basePrice.toLocaleString()}đ/ngày
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span>Phí dịch vụ Mioto</span>
                  <svg
                    className="w-4 h-4 ml-1 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="font-medium">
                  {booking.price.serviceFee.toLocaleString()}đ/ngày
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span>Bảo hiểm thuê xe</span>
                  <svg
                    className="w-4 h-4 ml-1 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="font-medium">
                  {booking.price.insurance.toLocaleString()}đ/ngày
                </span>
              </div>

              <div className="flex items-center justify-between font-medium">
                <span>Tổng cộng</span>
                <span>
                  {(
                    booking.price.basePrice +
                    booking.price.serviceFee +
                    booking.price.insurance
                  ).toLocaleString()}
                  đ x 1 ngày
                </span>
              </div>

              {booking.price.discount && (
                <div className="flex items-center justify-between text-red-500">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-orange-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                        clipRule="evenodd"
                      />
                      <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                    </svg>
                    <span>Chương trình giảm giá</span>
                  </div>
                  <span>-{booking.price.discount.toLocaleString()}đ</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold">Thành tiền</span>
                <span className="text-xl font-bold text-gray-800">
                  {booking.price.total.toLocaleString()}đ
                </span>
              </div>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="font-medium">Thanh toán giữ chỗ</span>
                  <svg
                    className="w-4 h-4 ml-1 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="font-medium text-green-600">
                  {booking.price.depositAmount.toLocaleString()}đ
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-medium">Thanh toán khi nhận xe</span>
                  <svg
                    className="w-4 h-4 ml-1 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="font-medium text-green-600">
                  {booking.price.remainingAmount.toLocaleString()}đ
                </span>
              </div>
            </div>
          </div>

          {/* Personal message section */}
          <div className="p-6 mb-6 border border-gray-200 rounded-lg">
            <h3 className="mb-3 font-bold">Lời nhắn riêng:</h3>
            <p className="text-gray-700">
              {booking.requirementMessage || "Không có lời nhắn"}
            </p>
          </div>

          {/* Additional fees section */}
          <div className="p-6 mb-6 border border-gray-200 rounded-lg">
            <h3 className="mb-4 font-bold text-green-600">
              Phụ phí có thể phát sinh
            </h3>

            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="flex items-center justify-center w-6 h-6 text-gray-500 bg-gray-100 rounded-full">
                    1
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Phí vượt giới hạn</h4>
                    <span className="text-gray-700">5.000đ/km</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Phụ phí phát sinh nếu lộ trình di chuyển vượt quá 350km khi
                    thuê xe 1 ngày
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="flex items-center justify-center w-6 h-6 text-gray-500 bg-gray-100 rounded-full">
                    2
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Phí quá giờ</h4>
                    <span className="text-gray-700">60.000đ/giờ</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Phụ phí phát sinh nếu hoàn trả xe trễ giờ. Trường hợp trễ
                    quá 5 giờ, phụ phí thêm 1 ngày thuê
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="flex items-center justify-center w-6 h-6 text-gray-500 bg-gray-100 rounded-full">
                    3
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Phí vệ sinh</h4>
                    <span className="text-gray-700">120.000đ</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Phụ phí phát sinh khi xe hoàn trả không đảm bảo vệ sinh
                    (nhiều vết bẩn, bùn cát, sinh lý...)
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="flex items-center justify-center w-6 h-6 text-gray-500 bg-gray-100 rounded-full">
                    4
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Phí khử mùi</h4>
                    <span className="text-gray-700">400.000đ</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Phụ phí phát sinh khi xe hoàn trả bị ám mùi khó chịu (mùi
                    thuốc lá, thực phẩm nặng mùi...)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          {booking.status !== "cancelled" ? (
            <div className="space-y-4">
              <Link to={`/payment/${id}`}>
                <Button className="w-full py-3" variant="primary">
                  Thanh toán giữ chỗ
                </Button>
              </Link>
              <Button
                className="w-full py-3"
                variant="outline"
                onClick={handleCancelClick}
              >
                Huỷ chuyến
              </Button>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-600 bg-gray-100 rounded-lg">
              <p className="mb-2 font-medium">Chuyến đi đã bị huỷ</p>
              <p className="text-sm">
                Lý do: {booking.cancellationReason || "Không có lý do cụ thể"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Điều khoản section */}
      <div className="mb-8">
        <h3 className="mb-4 text-xl font-bold">Điều khoản</h3>
        <div className="mb-4">
          <h4 className="mb-2 font-medium">Quy định khác:</h4>
          <ul className="pl-5 space-y-2 text-gray-600 list-disc">
            <li>Sử dụng xe đúng mục đích.</li>
            <li>
              Không sử dụng xe thuê vào mục đích phi pháp, trái pháp luật.
            </li>
            <li>Không sử dụng xe thuê để cầm cố, thế chấp.</li>
            <li>Không hút thuốc, nhả kẹo cao su, xả rác trong xe.</li>
            <li>Không chở hàng quốc cấm, dễ cháy nổ.</li>
          </ul>
          <div className="mt-2">
            <button className="text-green-600 hover:underline">Xem thêm</button>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h4 className="mb-4 text-xl font-bold">Chính sách huỷ chuyến</h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="border border-gray-200 rounded-md">
              <div className="p-4 font-medium border-b border-gray-200">
                Thời Điểm Huỷ Chuyến
              </div>
              <div className="p-4">Trong Vòng 1h Sau Giữ Chỗ</div>
              <div className="p-4 bg-gray-50">
                Trước Chuyến Đi &gt; 7 Ngày
                <br />
                (Sau 1h Giữ Chỗ)
              </div>
              <div className="p-4">
                Trong Vòng 7 Ngày Trước Chuyến Đi
                <br />
                (Sau 1h Giữ Chỗ)
              </div>
            </div>

            <div className="border border-gray-200 rounded-md">
              <div className="p-4 font-medium border-b border-gray-200">
                Phí Huỷ Chuyến
              </div>
              <div className="p-4 text-center">
                <div className="inline-flex items-center justify-center w-6 h-6 text-white bg-green-500 rounded-full">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="mt-1 text-sm">Miễn phí</div>
              </div>
              <div className="p-4 text-center bg-gray-50">
                <div className="inline-flex items-center justify-center w-6 h-6 text-white bg-green-500 rounded-full">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="mt-1 text-sm">10% giá trị chuyến đi</div>
              </div>
              <div className="p-4 text-center">
                <div className="inline-flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full">
                  <svg
                    className="w-4 h-4"
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
                </div>
                <div className="mt-1 text-sm">40% giá trị chuyến đi</div>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>
              * Chính sách huỷ chuyến áp dụng chung cho cả khách thuê và chủ xe
              (ngoại ra: tùy vào thời điểm huỷ chuyến, chủ xe có thể bị đánh giá
              từ 2-3* trên hệ thống).
            </p>
            <p>
              * Khách thuê không nhận xe sẽ mất phí huỷ chuyến (40% giá trị
              chuyến đi).
            </p>
            <p>
              * Chủ xe không giao xe sẽ hoàn tiền giữ chỗ &amp; bồi thường phí
              huỷ chuyến cho khách thuê (40% giá trị chuyến đi).
            </p>
            <p>
              * Tiền giữ chỗ &amp; bồi thường do chủ xe huỷ chuyến (nếu có) sẽ
              được Mioto hoàn trả đến khách thuê bằng chuyển khoản ngân hàng
              trong vòng 1-3 ngày làm việc kể tiếp. Xem thêm{" "}
              <span className="text-blue-600">
                Thủ tục hoàn tiền &amp; bồi thường huỷ chuyến
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookingCancelConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmCancel}
      />

      <BookingCancelReasonModal
        isOpen={isReasonModalOpen}
        onClose={() => setIsReasonModalOpen(false)}
        onConfirm={handleCancelWithReason}
      />
    </>
  );
}
