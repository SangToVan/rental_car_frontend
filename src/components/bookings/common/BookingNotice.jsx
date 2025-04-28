export default function BookingNotice({
  status,
  timeRemaining,
  notificationText,
  cancelReason,
}) {
  if (status === "cancelled") {
    return (
      <div className="relative p-5 overflow-hidden border-l-4 border-red-300 rounded-lg shadow-sm bg-red-50">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-black"
            >
              <path
                d="M12.5 7.00004V9.00004M10.5 9.00004V7.00004M12.5 16C12.5 16.2761 12.2761 16.5 12 16.5C11.7239 16.5 11.5 16.2761 11.5 16C11.5 15.7239 11.7239 15.5 12 15.5C12.2761 15.5 12.5 15.7239 12.5 16ZM7.5 16.5H16.5M7 7.50004H17M12.5 16V12M8.93424 4.00004H15.0658C15.4566 4.00004 15.6521 4.00004 15.8254 4.05328C15.978 4.10062 16.1203 4.1766 16.2433 4.27677C16.3819 4.3892 16.488 4.53463 16.7 4.82349L19.1766 8.32348C19.3886 8.61233 19.4947 8.75676 19.5518 8.91662C19.602 9.05756 19.6217 9.20724 19.609 9.35648C19.5944 9.52884 19.5267 9.69923 19.3911 10.04L16.4142 16.9942C16.2786 17.335 16.2108 17.5054 16.0975 17.6385C15.997 17.7563 15.8717 17.85 15.7316 17.9121C15.5729 17.9829 15.3915 18 15.0288 18H8.97133C8.60858 18 8.4272 18 8.26845 17.9121C8.12835 17.85 8.00309 17.7563 7.90264 17.6385C7.78931 17.5054 7.72154 17.335 7.58599 16.9942L4.60909 10.04C4.47354 9.69923 4.40577 9.52884 4.39116 9.35648C4.37839 9.20724 4.39811 9.05756 4.44833 8.91662C4.50542 8.75676 4.61147 8.61233 4.82358 8.32348L7.30019 4.82349C7.51229 4.53463 7.61834 4.3892 7.75693 4.27677C7.87992 4.1766 8.02214 4.10062 8.17478 4.05328C8.34812 4.00004 8.54355 4.00004 8.93424 4.00004Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-base font-medium text-gray-800">
              Chủ xe đã từ chối.
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Lý do: {cancelReason || "Xe bận"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Original notification for pending or other statuses
  const getBorderColor = () => {
    if (status === "confirm") return "border-blue-500 bg-blue-50";
    return "border-green-500 bg-green-50";
  };

  const getTextColor = () => {
    if (status === "confirm") return "text-blue-800";
    return "text-green-800";
  };

  const getSubTextColor = () => {
    if (status === "confirm") return "text-blue-700";
    return "text-green-700";
  };

  const getIconBgColor = () => {
    if (status === "confirm") return "bg-blue-100";
    return "bg-green-100";
  };

  const getIconColor = () => {
    if (status === "confirm") return "text-blue-500";
    return "text-green-500";
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg border-l-4 p-5 shadow-sm ${getBorderColor()}`}
    >
      <div className="flex items-center">
        <div
          className={`mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${getIconBgColor()}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`h-7 w-7 ${getIconColor()}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div>
          <p className={`text-base font-medium ${getTextColor()}`}>
            {notificationText}
          </p>
          {status === "pending" && (
            <p className={`mt-1 text-sm ${getSubTextColor()}`}>
              Vui lòng thanh toán để hoàn tất đặt xe
            </p>
          )}
          {status === "confirm" && (
            <p className={`mt-1 text-sm ${getSubTextColor()}`}>
              Đặt xe thành công, vui lòng chuẩn bị các giấy tờ cần thiết
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
