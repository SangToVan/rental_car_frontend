import { useEffect, useState } from "react";
import { getCarDetailApi, verifyCarApi } from "../../shared/apis/adminApi";

function formatCurrency(value) {
  return Number(value).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function CarDetailPanel({ carId, onBack }) {
  const [car, setCar] = useState(null);

  useEffect(() => {
    getCarDetailApi(carId).then((res) => setCar(res.data));
  }, [carId]);

  const handleVerify = async () => {
    await verifyCarApi(carId);
    const updated = await getCarDetailApi(carId);
    setCar(updated);
  };

  if (!car) return <div>Đang tải dữ liệu xe...</div>;

  return (
    <div className="p-6 space-y-6 bg-white rounded shadow">
      <button
        onClick={onBack}
        className="flex items-center px-4 py-2 mb-4 font-medium text-gray-800 bg-gray-100 rounded hover:bg-gray-200"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        Quay lại danh sách
      </button>

      {/* Hình ảnh */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {car.images?.map((img) => (
          <img
            key={img.id}
            src={img.imageUrl}
            alt={img.imageName}
            className="object-cover w-full h-48 border rounded"
          />
        ))}
      </div>

      {/* Thông tin xe */}
      <div>
        <h2 className="mb-2 text-2xl font-bold">{car.name}</h2>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            car.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : car.status === "WAITING"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {car.status === "ACTIVE"
            ? "Đang hoạt động"
            : car.status === "WAITING"
            ? "Chờ xác thực"
            : "Không xác định"}
        </span>

        <section className="pt-6 mb-8 border-t border-gray-100">
          <h3 className="mb-2 text-lg font-semibold">Thông tin xe</h3>
          <div className="grid grid-cols-1 text-sm text-gray-700 md:grid-cols-2 gap-x-8 gap-y-3">
            <div>
              <strong>Tên xe:</strong> {car.name}
            </div>
            <div>
              <strong>Hãng:</strong> {car.brand}
            </div>
            <div>
              <strong>Dòng xe:</strong> {car.model}
            </div>
            <div>
              <strong>Màu:</strong> {car.color}
            </div>
            <div>
              <strong>Số ghế:</strong> {car.numberOfSeats}
            </div>
            <div>
              <strong>Năm sản xuất:</strong> {car.productionYear}
            </div>
            <div>
              <strong>Hộp số:</strong> {car.transmission}
            </div>
            <div>
              <strong>Nhiên liệu:</strong> {car.fuelType}
            </div>
            <div>
              <strong>Km đã đi:</strong> {car.mileage}
            </div>
            <div>
              <strong>Tiêu hao nhiên liệu:</strong> {car.fuelConsumption}{" "}
              L/100km
            </div>
            <div>
              <strong>Địa chỉ xe:</strong> {car.address}
            </div>
          </div>
        </section>

        <section className="pt-6 mb-8 border-t border-gray-100">
          <h3 className="mb-2 text-lg font-semibold">Giá và phí thuê</h3>
          <div className="grid grid-cols-1 text-sm text-gray-700 md:grid-cols-2 gap-x-8 gap-y-3">
            <div>
              <strong>Giá thuê cơ bản:</strong> {formatCurrency(car.basePrice)}{" "}
              / ngày
            </div>
            <div>
              <strong>Giới hạn km/ngày:</strong> {car.kmPerDay} km
            </div>
            <div>
              <strong>Phí vượt km/ngày:</strong>{" "}
              {formatCurrency(car.kmOverDayFee)}
            </div>
            <div>
              <strong>Giao xe miễn phí trong:</strong>{" "}
              {car.freeDeliveryDistance} km
            </div>
            <div>
              <strong>Phí giao xe/km:</strong> {formatCurrency(car.deliveryFee)}
            </div>
            <div>
              <strong>Khoảng cách giao tối đa:</strong>{" "}
              {car.maxDeliveryDistance} km
            </div>
          </div>
        </section>

        {car.status === "WAITING" || car.status === "UNVERIFIED" ? (
          <button
            onClick={handleVerify}
            className="px-4 py-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Xác thực xe
          </button>
        ) : (
          <button
            onClick={handleVerify}
            className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Hủy xác thực xe
          </button>
        )}
      </div>

      {/* Mô tả & Điều khoản */}
      <section className="pt-6 mb-8 border-t border-gray-100">
        <h3 className="mb-2 text-lg font-semibold">Mô tả xe</h3>
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {car.description || "Không có mô tả"}
        </p>

        <h3 className="mt-6 mb-2 text-lg font-semibold">Điều khoản sử dụng</h3>
        <p className="text-sm text-gray-700 whitespace-pre-line">
          {car.termOfUse || "Không có điều khoản cụ thể"}
        </p>
      </section>

      {/* Chủ xe */}
      <div className="p-4 mt-6 border rounded bg-gray-50">
        <h3 className="mb-2 text-lg font-semibold">Chủ xe</h3>
        <div className="flex items-center gap-4">
          <img
            src={car.carOwner?.avatar || "/default-user.png"}
            alt={car.carOwner?.username}
            className="object-cover w-16 h-16 border rounded-full"
          />
          <div>
            <div>
              <strong>{car.carOwner?.username}</strong>
            </div>
            <div>Email: {car.carOwner?.email}</div>
            <div>SĐT: {car.carOwner?.phoneNumber}</div>
          </div>
        </div>
      </div>

      {/* Feedbacks */}
      <section className="pt-6 mb-8 border-t border-gray-100">
        <h3 className="mb-2 text-lg font-semibold">Đánh giá</h3>

        {car.feedbacks && car.feedbacks.length > 0 ? (
          <div className="space-y-4">
            {car.feedbacks.map((fb, idx) => (
              <div key={idx} className="p-4 bg-white border rounded shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={fb.avatar || "/default-user.png"}
                    alt={fb.username}
                    className="object-cover w-10 h-10 border rounded-full"
                  />
                  <div>
                    <div className="font-medium">{fb.username}</div>
                    <div className="text-sm text-gray-500">
                      {formatDate(fb.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-yellow-500">
                  {"★".repeat(fb.rating)}
                  {"☆".repeat(5 - fb.rating)}
                </div>
                <p className="mt-2 text-sm text-gray-800 whitespace-pre-line">
                  {fb.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Chưa có đánh giá nào</p>
        )}
      </section>
    </div>
  );
}
