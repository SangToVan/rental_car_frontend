export default function CancellationPolicy() {
  return (
    <div className="p-6 overflow-hidden bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-800">
        Chính sách huỷ chuyến
      </h3>

      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="mb-2 text-sm font-medium text-gray-700">
            Thời Điểm Huỷ Chuyến
          </h4>
          <p className="text-sm font-medium text-gray-900">
            Trong Vòng 1h Sau Đặt Chỗ
          </p>
          <p className="text-xs text-gray-500">(Miễn phí huỷ chuyến)</p>
        </div>

        <div className="flex items-center justify-center p-4 border border-gray-200 rounded-lg">
          <div className="text-center">
            <p className="mb-1 text-sm font-medium text-green-600">Miễn phí</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mx-auto text-green-500"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="mb-2 text-sm font-medium text-gray-700">
            Thời Điểm Huỷ Chuyến
          </h4>
          <p className="text-sm font-medium text-gray-900">
            Trước Chuyến Đi 7+ Ngày
          </p>
          <p className="text-xs text-gray-500">(Sau Thời Gian Đặt Chỗ)</p>
        </div>

        <div className="flex items-center justify-center p-4 border border-gray-200 rounded-lg">
          <div className="text-center">
            <p className="mb-1 text-sm font-medium text-green-600">
              100% phí trả trước
            </p>
            <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-green-400 rounded-full">
              100% phí trả trước
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="mb-2 text-sm font-medium text-gray-700">
            Thời Điểm Huỷ Chuyến
          </h4>
          <p className="text-sm font-medium text-gray-900">
            Trong Vòng 7 Ngày Trước Chuyến Đi
          </p>
          <p className="text-xs text-gray-500">(Sau Thời Gian Đặt Chỗ)</p>
        </div>

        <div className="flex items-center justify-center p-4 border border-gray-200 rounded-lg">
          <div className="text-center">
            <p className="mb-1 text-sm font-medium text-red-600">
              40% phí trả trước
            </p>
            <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-red-400 rounded-full">
              40% phí trả trước
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        * Chính sách huỷ chuyến áp dụng cho những chuyến đi không sử dụng tính
        năng Đặt xe nhanh hoặc trạng thái đặt xe đã được chấp thuận. Chủ xe có
        thể áp dụng chính sách huỷ chuyến chặt chẽ hơn.
      </p>

      <div className="mt-4 text-right">
        <a
          href="#"
          className="text-xs font-medium text-green-600 hover:underline"
        >
          Đọc kỹ điều khoản trước &amp; sau khi đặt cọc &rarr;
        </a>
      </div>
    </div>
  );
}
