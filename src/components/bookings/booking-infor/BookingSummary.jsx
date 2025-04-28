export default function BookingSummary({ status }) {
  const isPending = status === "pending";

  return (
    <div className="p-6 overflow-hidden bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-800">Bảng tính giá</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-gray-600">Đơn giá thuê</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 ml-1 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <span className="font-medium text-gray-800">610.000 /ngày</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-gray-600">Phí dịch vụ Mioto</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 ml-1 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <span className="font-medium text-gray-800">90.280 /ngày</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-gray-600">Bảo hiểm thuê xe</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 ml-1 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <span className="font-medium text-gray-800">62.831 /ngày</span>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-gray-200">
        <div className="flex items-center justify-between font-medium">
          <span className="text-gray-600">Tổng cộng</span>
          <span className="text-lg text-gray-800">763.111 x 1 ngày</span>
        </div>
      </div>

      <div className="p-3 mt-4 bg-gray-100 rounded-md">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 mr-2 text-orange-500"
          >
            <path
              fillRule="evenodd"
              d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39.92 3.31 0l4.23-4.231a2.25 2.25 0 0 0 0-3.31l-9.58-9.581a3 3 0 0 0-2.12-.879H5.25Zm1.5 6a.75.75 0 0 0 0 1.5.75.75 0 0 0 0-1.5Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium text-gray-700">
            Chương trình giảm giá
          </span>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className="text-gray-600">Giảm giá</span>
          <span className="font-medium text-red-600">-100.000</span>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-gray-200">
        <div className="flex items-center justify-between font-medium">
          <span className="text-gray-700">Thành tiền</span>
          <span className="text-xl text-gray-800">663.111đ</span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <span>Thanh toán giữ chỗ</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 ml-1 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <span className="font-medium text-green-600">265.111đ</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <span>Thanh toán khi nhận xe</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 ml-1 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <span className="font-medium text-gray-800">398.000đ</span>
        </div>
      </div>

      <div className="pt-4 mt-6 border-t border-gray-200">
        <h4 className="mb-2 text-base font-medium text-gray-800">
          Lời nhắn riêng
        </h4>
        <p className="text-sm text-gray-600">Không có lời nhắn</p>
      </div>

      <div className="mt-6">
        {isPending ? (
          <button className="w-full py-3 font-medium text-center text-white transition bg-green-500 rounded-md hover:bg-green-600">
            Thanh toán giữ chỗ
          </button>
        ) : (
          <button className="w-full py-3 font-medium text-center text-white transition bg-red-500 rounded-md hover:bg-red-600">
            Huỷ chuyến
          </button>
        )}
      </div>
    </div>
  );
}
