export default function RentalAccessories() {
  return (
    <div className="p-6 overflow-hidden bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-800">
        Tài sản thế chấp
      </h3>

      <div className="flex items-start">
        <div className="flex items-center justify-center w-8 h-8 mt-1 mr-3 text-orange-500 bg-orange-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>
        <div>
          <p className="font-medium text-gray-700">
            Không yêu cầu khách thuê thế chấp Tiền mặt hoặc Xe máy
          </p>
        </div>
      </div>
    </div>
  );
}
