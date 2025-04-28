export default function OwnerInformation({ owner }) {
  return (
    <div className="p-6 overflow-hidden bg-white rounded-lg shadow-sm">
      <div className="p-6 mb-6 border border-gray-200 rounded-lg">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 mr-3 overflow-hidden rounded-full">
            <img
              src={owner.avatar}
              alt={owner.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="font-bold">Chủ xe</h3>
            <p className="text-lg font-medium">{owner.name}</p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#ffc107]">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span className="ml-1 text-sm font-medium">{owner.rating}</span>
          <span className="mx-1 text-gray-300">•</span>
          <span className="text-sm text-gray-500">{owner.trips} chuyến</span>
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
          Chuyến đi được bảo hiểm bởi Mioto. Khách hàng sẽ được bồi thường tối
          đa 2.000.000đ trong trường hợp có sự cố ngoài ý muốn.
        </p>
      </div>
    </div>
  );
}
