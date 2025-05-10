export default function Features({transmission, seats, fuel, fuelConsumption}) {
  return (
    <>
      {/* Features */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold">Đặc điểm</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
            <svg
              className="w-6 h-6 mb-2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="text-xs text-gray-500">Truyền động</span>
            <span className="font-medium">{transmission}</span>
          </div>
          <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
            <svg
              className="w-6 h-6 mb-2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-xs text-gray-500">Số ghế</span>
            <span className="font-medium">{seats} chỗ</span>
          </div>
          <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
            <svg
              className="w-6 h-6 mb-2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="text-xs text-gray-500">Nhiên liệu</span>
            <span className="font-medium">{fuel}</span>
          </div>
          <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
            <svg
              className="w-6 h-6 mb-2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs text-gray-500">Tiêu hao</span>
            <span className="font-medium">{fuelConsumption} L/100km</span>
          </div>
        </div>
      </div>
    </>
  );
}
