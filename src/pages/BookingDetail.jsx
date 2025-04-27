import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mockBookings } from "../utils/mockData";
import BookingStep1 from "../components/bookings/BookingStep1";

export default function BookingDetail() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    // Simulate fetching booking data
    const foundBooking = mockBookings.find((booking) => booking.id === id);
    if (foundBooking) {
      setBooking(foundBooking);
    } else {
      // If no booking found, use the first one for demo purposes
      setBooking(mockBookings[0]);
    }
  }, [id]);

  if (!booking) {
    return (
      <div className="container py-12">
        <h1 className="mb-4 text-2xl font-bold">
          Đang tải thông tin đặt xe...
        </h1>
      </div>
    );
  }

  // Determine the status step
  const bookingStatusSteps = [
    {
      id: 1,
      name: "Gửi yêu cầu",
      status: booking.status !== "cancelled" ? "complete" : "cancelled",
    },
    {
      id: 2,
      name: "Duyệt yêu cầu",
      status: ["approved", "active", "completed"].includes(booking.status)
        ? "complete"
        : booking.status === "cancelled"
        ? "cancelled"
        : "upcoming",
    },
    {
      id: 3,
      name: "Thanh toán giữ chỗ",
      status: ["approved", "active", "completed"].includes(booking.status)
        ? "complete"
        : booking.status === "cancelled"
        ? "cancelled"
        : "upcoming",
    },
    {
      id: 4,
      name: "Khởi hành",
      status: ["active", "completed"].includes(booking.status)
        ? "complete"
        : booking.status === "cancelled"
        ? "cancelled"
        : "upcoming",
    },
    {
      id: 5,
      name: "Kết thúc",
      status:
        booking.status === "completed"
          ? "complete"
          : booking.status === "cancelled"
          ? "cancelled"
          : "upcoming",
    },
  ];

  // Define icons for each step
  const stepIcons = {
    1: (status) => (
      <svg
        className={`w-5 h-5 ${
          status === "complete"
            ? "text-white"
            : status === "cancelled"
            ? "text-white"
            : "text-gray-500"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
    2: (status) => (
      <svg
        className={`w-5 h-5 ${
          status === "complete"
            ? "text-white"
            : status === "cancelled"
            ? "text-white"
            : "text-gray-500"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    3: (status) => (
      <svg
        className={`w-5 h-5 ${
          status === "complete"
            ? "text-white"
            : status === "cancelled"
            ? "text-white"
            : "text-gray-500"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
        />
      </svg>
    ),
    4: (status) => (
      <svg
        className={`w-5 h-5 ${
          status === "complete"
            ? "text-white"
            : status === "cancelled"
            ? "text-white"
            : "text-gray-500"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    5: (status) => (
      <svg
        className={`w-5 h-5 ${
          status === "complete"
            ? "text-white"
            : status === "cancelled"
            ? "text-white"
            : "text-gray-500"
        }`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  };

  return (
    <div className="container py-8">
      {/* Booking status section */}
      {booking.status === "cancelled" ? (
        <div className="flex items-center p-4 mb-6 rounded-lg bg-red-50">
          <svg
            className="w-6 h-6 mr-3 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h2 className="text-lg font-medium text-red-700">
              Chủ xe đã từ chối
            </h2>
            <p className="mt-1 text-sm text-red-600">
              {booking.cancellationReason ||
                "Lý do: Chủ xe không thể cho thuê xe vào thời gian này"}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-6 mb-8 rounded-lg bg-green-50">
          <div className="flex items-center mb-4">
            <svg
              className="w-6 h-6 mr-3 text-green-500"
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
            <span className="font-medium text-green-700">
              Thời gian thanh toán giữ chỗ còn lại:{" "}
              <b>11 giờ 28 phút 35 giây</b>
            </span>
          </div>

          {/* Progress steps */}
          <div className="relative flex items-center justify-between">
            {/* Progress line */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>

            {bookingStatusSteps.map((step) => (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center"
              >
                {step.status === "complete" ? (
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
                    {stepIcons[step.id](step.status)}
                  </div>
                ) : step.status === "cancelled" ? (
                  <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full">
                    <svg
                      className="w-5 h-5 text-white"
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
                ) : (
                  <div className="flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-300 rounded-full">
                    {stepIcons[step.id](step.status)}
                  </div>
                )}
                <div className="mt-2 text-sm text-center">{step.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <BookingStep1 booking={booking} setBooking={setBooking} />
    </div>
  );
}
