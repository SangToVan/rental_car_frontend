import { useState } from "react";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

export default function BookingDetailModal({
  isOpen,
  onClose,
  car,
  startDate,
  endDate,
  onConfirm,
}) {
  const [selectedIdType, setSelectedIdType] = useState(null);
  const [messageToOwner, setMessageToOwner] = useState(
    "Chào anh chủ xe!\n\nTôi cần thuê xe của anh để đi du lịch cùng gia đình với thời gian như trên.\nTôi có đầy đủ giấy tờ thuê xe và tài sản thế chấp như yêu cầu."
  );

  // Format dates for display
  const formattedStartDate = startDate ? startDate.split(" ")[0] : "24/04/2025";
  const formattedStartTime = startDate ? startDate.split(" ")[1] : "21:00";
  const formattedEndDate = endDate ? endDate.split(" ")[0] : "25/04/2025";
  const formattedEndTime = endDate ? endDate.split(" ")[1] : "20:00";

  // Car Details
  const carName = car?.name || "KIA MORNING 2017";
  const carRating = car?.rating || 4.8;
  const carTrips = car?.trips || 66;
  const carLocation = car?.location || "Quận Bình Thạnh, TP. Hồ Chí Minh";
  const carImageUrl =
    car?.images?.[0] ||
    "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/kia_morning_2017/p/g/2018/06/01/15/oUE9_pVwREiAEbk7Nt7xSA.jpg";

  // Owner details
  const ownerName = car?.owner?.name || "VŨ ĐĂNG KHOA";
  const ownerRating = car?.owner?.rating || 4.8;
  const ownerTrips = car?.owner?.trips || 66;
  const ownerAvatar =
    car?.owner?.avatar ||
    "https://n1-pstg.mioto.vn/cho_thue_xe_o_to_tu_lai_thue_xe_du_lich_hochiminh/avatar/p/g/2018/03/24/11/H4O8aYOUQnGIDHfLvZO-AA.png";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Xác nhận đặt xe"
      className="max-w-2xl max-h-[90vh]"
    >
      <div className="overflow-y-auto pr-2 max-h-[70vh] custom-scrollbar">
        {/* Step 2 - Car Details */}
        <div className="pb-8 border-b border-gray-200">
          <div className="flex flex-col md:flex-row">
            <div className="pr-4 md:w-1/3">
              <img
                src={carImageUrl}
                alt={carName}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="mt-4 md:w-2/3 md:mt-0">
              <h3 className="text-xl font-bold uppercase">{carName}</h3>
              <div className="flex items-center mt-1">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#ffc107]">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="ml-1 font-medium">{carRating}</span>
                <span className="mx-1">•</span>
                <span className="text-sm text-gray-600">{carTrips} chuyến</span>
              </div>
              <div className="flex items-center mt-2">
                <svg
                  className="w-5 h-5 text-gray-500"
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
                <span className="ml-2 text-sm">{carLocation}</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-start p-4 rounded-lg bg-green-50">
              <svg
                className="h-6 w-6 text-green-500 mr-3 mt-0.5"
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
              <div>
                <h4 className="font-medium text-green-700">Bảo hiểm thuê xe</h4>
                <p className="mt-1 text-sm text-green-600">
                  Chuyến đi có mua bảo hiểm. Khách thuê bồi thường tối đa
                  2.000.000 VND trong trường hợp có sự cố ngoài ý muốn.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
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
                <div className="text-xl font-bold">
                  {formattedStartTime} - {formattedStartDate}
                </div>
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
                <div className="text-xl font-bold">
                  {formattedEndTime} - {formattedEndDate}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 font-medium">Địa chỉ giao nhận xe</h3>
            <div className="p-4 border border-gray-200 rounded-lg">
              <span className="block text-lg">{carLocation}</span>
              <span className="block mt-1 text-sm text-gray-500">
                Địa chỉ cụ thể sẽ được hiển thị sau khi giữ chỗ.
              </span>

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
        </div>

        {/* Step 3 - Owner Section */}
        <div className="py-8 border-b border-gray-200">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <img
                src={ownerAvatar}
                alt={ownerName}
                className="object-cover border-2 border-yellow-400 rounded-full w-14 h-14"
              />
            </div>
            <div className="ml-4">
              <h3 className="font-medium">Chủ xe</h3>
              <div className="flex items-center mt-1">
                <span className="text-xl font-bold">{ownerName}</span>
              </div>
              <div className="flex items-center mt-1">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#ffc107]">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="ml-1 text-sm font-medium">{ownerRating}</span>
                <span className="mx-1 text-gray-300">•</span>
                <span className="text-sm text-gray-500">
                  {ownerTrips} chuyến
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            <p>
              Nhằm bảo mật thông tin cá nhân, Mioto sẽ gửi chi tiết liên hệ của
              chủ xe sau khi khách hàng hoàn tất bước thanh toán trên ứng dụng.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 font-medium">Lời nhắn đến chủ xe</h3>
            <textarea
              value={messageToOwner}
              onChange={(e) => setMessageToOwner(e.target.value)}
              className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Gửi ý:"
            ></textarea>
          </div>

          <div className="flex items-start p-4 mt-4 rounded-md bg-blue-50">
            <div className="flex-shrink-0 mr-3">
              <svg
                className="w-6 h-6 text-blue-500"
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
            <p className="text-sm text-blue-600">
              Giao dịch qua Mioto để chúng tôi bảo vệ bạn tốt nhất trong trường
              hợp bị hủy chuyến ngoài ý muốn & phát sinh sự cố bảo hiểm
            </p>
          </div>
        </div>

        {/* Step 4 - ID Requirements */}
        <div className="py-8 border-b border-gray-200">
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="mb-4 font-medium">Giấy tờ thuê xe</h3>
            <div className="space-y-5">
              <div className="flex items-center text-sm">
                <div className="flex items-center justify-center w-5 h-5 mr-3 text-xs bg-gray-200 rounded-full">
                  1
                </div>
                <span>Chọn 1 trong 2 hình thức</span>
              </div>

              <div
                className={`flex items-center p-3 border rounded-md cursor-pointer ${
                  selectedIdType === "gplx-cccd"
                    ? "border-primary bg-primary/5"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedIdType("gplx-cccd")}
              >
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

              <div
                className={`flex items-center p-3 border rounded-md cursor-pointer ${
                  selectedIdType === "gplx-passport"
                    ? "border-primary bg-primary/5"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedIdType("gplx-passport")}
              >
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">
                    GPLX (đối chiếu) & Passport (giữ lại)
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 12l2 2 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>
                    Tôi cam kết tuân thủ{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Điều khoản dịch vụ
                    </a>{" "}
                    của Mioto
                  </p>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 12l2 2 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>
                    Tôi đã đọc kỹ và đồng ý với{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Trách nhiệm và các giới hạn của chính sách bảo hiểm áp
                      dụng
                    </a>
                  </p>
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9 12l2 2 4-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>
                    Tôi hiểu rằng tôi chịu trách nhiệm với tình trạng xe từ thời
                    điểm nhận xe đến khi kết thúc chuyến
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1 - Pricing Section */}
        <div className="pt-8">
          <div className="flex items-center mb-4">
            <div className="flex items-center justify-center w-6 h-6 mr-3 text-xs border border-gray-400 rounded-full">
              ?
            </div>
            <h3 className="text-lg font-medium">Tài sản thế chấp</h3>
          </div>

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

          <div className="mt-6">
            <h3 className="mb-4 font-medium">Bảng tính giá</h3>

            <div className="space-y-3">
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
                <span className="font-medium">399.000 /ngày</span>
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
                <span className="font-medium">59.052 /ngày</span>
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
                <span className="font-medium">41.097 /ngày</span>
              </div>

              <div className="flex items-center justify-between font-medium">
                <span>Tổng cộng</span>
                <span>499.149 x 1 ngày</span>
              </div>

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
                  <div className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded">
                    Giảm 100K trên đơn giá
                  </div>
                </div>
                <span>-100.000</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-6 border-t">
              <span className="font-bold">Thành tiền</span>
              <span className="text-xl font-bold text-green-600">399.149đ</span>
            </div>

            <div className="flex items-center justify-between pt-4 mt-6 border-t">
              <span className="font-medium">Thanh toán giữ chỗ</span>
              <span className="font-medium text-green-600">159.149đ</span>
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="font-medium">Thanh toán khi nhận xe</span>
              <span className="font-medium text-green-600">240.000đ</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-3 mt-5 border-t border-gray-200">
        <button
          onClick={onClose}
          className="px-16 py-3 font-medium text-gray-700 border border-gray-300 rounded-md"
        >
          Hủy
        </button>

        <Button onClick={onConfirm} className="px-10">
          Gửi yêu cầu thuê xe
        </Button>
      </div>

      <div className="mt-4 text-xs text-center text-gray-500">
        (*Trường hợp nhiều khách đặt xe cùng một thời điểm, hệ thống sẽ ưu tiên
        khách hàng thanh toán sớm nhất)
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c5c5c5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </Modal>
  );
}
