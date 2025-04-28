export default function RentalPeriod() {
  return (
    <div className="p-6 overflow-hidden bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-800">
        Thời gian thuê xe
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="p-4 border border-gray-200 rounded-md">
          <div className="flex items-center mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            <p className="text-sm font-medium text-gray-700">Bắt đầu thuê xe</p>
          </div>
          <div className="ml-7">
            <p className="text-lg font-semibold text-gray-800">
              21:00 - 24/04/2025
            </p>
            <span className="mt-1 text-xs text-blue-600">Ngày mai</span>
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-md">
          <div className="flex items-center mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            <p className="text-sm font-medium text-gray-700">
              Kết thúc thuê xe
            </p>
          </div>
          <div className="ml-7">
            <p className="text-lg font-semibold text-gray-800">
              20:00 - 25/04/2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
