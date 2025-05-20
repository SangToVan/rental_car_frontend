import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCarBookingApi,
  getCarDetailForOwnerApi,
  updateCarInfoApi,
  updateCarPricingApi,
} from "../../../shared/apis/carApi";
import ImageSlider from "../../common/ImageSlider";
import AddressModal from "../../modals/AddressModal/AddressModal";
import { ADDITIONAL_FUNCTIONS } from "../../cars/CarConstants";

const transmissionMap = {
  AUTOMATIC: "Số tự động",
  MANUAL: "Số sàn",
  SEMI_AUTOMATIC: "Bán tự động",
};

const fuelTypeMap = {
  PETRO: "Xăng",
  DIESEL: "Dầu",
  ELECTRIC: "Điện",
  HYBRID: "Hybrid",
};

const bookingStatusMap = {
  PENDING: "Chờ thanh toán",
  PAID: "Đã thanh toán",
  CONFIRMED: "Đã xác nhận",
  IN_PROGRESS: "Đang thuê",
  RETURNED: "Đã trả xe",
  COMPLETED: "Hoàn tất",
  CANCELLED: "Đã huỷ",
};

const carStatusMap = {
  ACTIVE: "Đang hoạt động",
  UNVERIFIED: "Đã từ chối",
  WAITING: "Chờ xác thực",
  SUSPENDED: "Ngừng cho thuê",
  RENTED: "Đang được thuê",
};

const getStatusInfo = (status) => {
  switch (status) {
    case "PENDING":
      return {
        label: "Chờ thanh toán",
        color: "bg-yellow-100 text-yellow-700",
      };
    case "PAID":
      return { label: "Đã thanh toán", color: "bg-blue-100 text-blue-700" };
    case "CONFIRMED":
      return { label: "Đã xác nhận", color: "bg-green-100 text-green-700" };
    case "IN_PROGRESS":
      return { label: "Đang thuê", color: "bg-orange-100 text-orange-700" };
    case "RETURNED":
      return { label: "Đã trả xe", color: "bg-purple-100 text-purple-700" };
    case "COMPLETED":
      return { label: "Hoàn tất", color: "bg-green-100 text-green-700" };
    case "CANCELLED":
      return { label: "Đã huỷ", color: "bg-red-100 text-red-700" };
    default:
      return { label: "Không xác định", color: "bg-gray-100 text-gray-700" };
  }
};

export default function CarSetting() {
  const { carId } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [form, setForm] = useState({});
  const [carFeatures, setCarFeatures] = useState(() =>
    Object.fromEntries(ADDITIONAL_FUNCTIONS.map((f) => [f.value, false]))
  );
  const [activeTab, setActiveTab] = useState("basic-info");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchCar = async () => {
    const res = await getCarDetailForOwnerApi(carId);
    const data = res.data;
    setCar(data);
    setForm({
      mileage: data.mileage || "",
      address: data.address || "",
      fuelConsumption: data.fuelConsumption?.toString() || "",
      description: data.description || "",
      termOfUse: data.termOfUse || "",
      basePrice: data.basePrice || "",
      deliveryFee: data.deliveryFee || "",
      freeDeliveryDistance: data.freeDeliveryDistance || "",
      maxDeliveryDistance: data.maxDeliveryDistance || "",
      kmPerDay: data.kmPerDay || "",
      kmOverDayFee: data.kmOverDayFee || "",
      discountPerWeek: data.discountPerWeek || "",
      quickRent: data.quickRent || false,
    });

    const initialFeatures = Object.fromEntries(
      ADDITIONAL_FUNCTIONS.map((f) => [f.value, false])
    );
    if (data.additionalFunctions) {
      const features = data.additionalFunctions.split(",").map((f) => f.trim());
      features.forEach((f) => {
        if (initialFeatures.hasOwnProperty(f)) {
          initialFeatures[f] = true;
        }
      });
    }
    setCarFeatures(initialFeatures);
  };

  useEffect(() => {
    fetchCar();
  }, [carId]);

  const handleInfoSave = async () => {
    try {
      const selectedFeatures = Object.entries(carFeatures)
        .filter(([_, enabled]) => enabled)
        .map(([key]) => key);

      const payload = {
        mileage: parseInt(form.mileage),
        fuelConsumption: parseFloat(form.fuelConsumption),
        address: form.address,
        description: form.description,
        termOfUse: form.termOfUse,
        additionalFunctions: selectedFeatures.join(","),
      };

      await updateCarInfoApi(carId, payload);
      await fetchCar();
      alert("Đã lưu thông tin cơ bản thành công!");
    } catch (error) {
      console.error("Lỗi khi lưu thông tin:", error);
      alert("Có lỗi xảy ra khi lưu thông tin.");
    }
  };

  const handlePricingSave = async () => {
    try {
      await updateCarPricingApi(carId, {
        basePrice: form.basePrice,
        quickRent: form.quickRent,
        maxDeliveryDistance: parseInt(form.maxDeliveryDistance),
        deliveryFee: parseInt(form.deliveryFee),
        freeDeliveryDistance: parseInt(form.freeDeliveryDistance),
        kmPerDay: parseInt(form.kmPerDay),
        kmOverDayFee: parseInt(form.kmOverDayFee),
        discountPerWeek: parseInt(form.discountPerWeek),
      });
      await fetchCar();
      alert("Đã lưu thông tin giá thuê!");
    } catch (error) {
      console.error("Lỗi khi lưu thông tin giá thuê:", error);
      alert("Có lỗi xảy ra khi lưu thông tin giá thuê.");
    }
  };

  const [bookings, setBookings] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(""); // mặc định tab đầu tiên
  const [loadingBookings, setLoadingBookings] = useState(false);

  const fetchBookings = async (status = "") => {
    try {
      setLoadingBookings(true);
      const res = await getCarBookingApi(carId, status);
      setBookings(res.data || []);
    } catch (error) {
      setBookings([]);
      console.error("Lỗi khi lấy danh sách booking:", error);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    if (activeTab === "bookings") {
      fetchBookings(bookingStatus);
    }
  }, [activeTab, bookingStatus]);

  const getStatusDisplay = (status) => {
    switch (status) {
      case "UNVERIFIED":
        return {
          label: "Chưa xác thực",
          className: "bg-yellow-100 text-yellow-800",
        };
      case "WAITING":
        return {
          label: "Chờ xác thực",
          className: "bg-orange-100 text-orange-800",
        };
      case "ACTIVE":
        return {
          label: "Đã xác thực",
          className: "bg-green-100 text-green-800",
        };
      case "SUSPENDED":
        return {
          label: "Dừng cho thuê",
          className: "bg-red-100 text-red-800",
        };
      case "RENTED":
        return {
          label: "Đang được thuê",
          className: "bg-indigo-100 text-indigo-800",
        };
      default:
        return { label: status, className: "bg-gray-100 text-gray-800" };
    }
  };

  const formatCurrency = (str) => {
    const num = Number(str);
    return num.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="p-4">
      {car && (
        <div className="p-4 mb-6 space-y-4 bg-white rounded-lg shadow">
          <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">
            Thông tin xe
          </h2>
          {/* Block: Trạng thái + nút dừng */}
          <div className="flex items-center justify-between">
            <span
              className={`px-3 py-1 text-sm rounded font-medium ${
                getStatusDisplay(car.carStatus).className
              }`}
            >
              {getStatusDisplay(car.carStatus).label}
            </span>
            {car.carStatus === "ACTIVE" && (
              <button
                onClick={() => {
                  // TODO: Gọi API dừng cho thuê
                  alert("Đã nhấn Dừng cho thuê");
                }}
                className="px-4 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
              >
                Dừng cho thuê
              </button>
            )}
          </div>

          {/* Block: Ảnh + thông tin */}
          <div className="flex flex-col items-start gap-6 md:flex-row">
            {/* Ảnh */}
            <div className="w-full md:w-[40%]">
              <ImageSlider images={car.images || []} height="h-60" />
            </div>

            {/* Thông tin */}
            <div className="flex-1 space-y-4 text-base text-gray-700">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <span className="font-medium">Tên xe:</span> {car.name}
                </div>
                <div>
                  <span className="font-medium">Biển số:</span>{" "}
                  {car.licensePlate}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                <div>
                  <span className="font-medium">Số ghế:</span>{" "}
                  {car.numberOfSeats}
                </div>
                <div>
                  <span className="font-medium">Truyền động:</span>{" "}
                  {transmissionMap[car.transmission]}
                </div>
                <div>
                  <span className="font-medium">Nhiên liệu:</span>{" "}
                  {fuelTypeMap[car.fuelType]}
                </div>
                <div>
                  <span className="font-medium">Trạng thái:</span>{" "}
                  {carStatusMap[car.carStatus]}
                </div>
                <div>
                  <span className="font-medium">Đánh giá:</span>{" "}
                  {car.rating || 0}/5 ⭐
                </div>
                <div>
                  <span className="font-medium">Chuyến hoàn thành:</span>{" "}
                  {car.completeBookingCount}
                </div>
                <div>
                  <span className="font-medium">Chuyến chưa hoàn thành:</span>{" "}
                  {car.inProgressBookingCount}
                </div>
                <div>
                  <span className="font-medium">Chuyến đang chờ:</span>{" "}
                  {car.pendingBookingCount}
                </div>
                <div>
                  <span className="font-medium">Ngày tạo:</span> {car.createdAt}
                </div>
                <div>
                  <span className="font-medium">Ngày cập nhật:</span>{" "}
                  {car.updatedAt}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("basic-info")}
          className={`px-4 py-2 rounded ${
            activeTab === "basic-info"
              ? "bg-green-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Thông tin cơ bản
        </button>
        <button
          onClick={() => setActiveTab("pricing")}
          className={`px-4 py-2 rounded ${
            activeTab === "pricing" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Giá thuê
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-4 py-2 rounded ${
            activeTab === "bookings" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Đơn đặt xe
        </button>
      </div>

      {activeTab === "basic-info" && (
        <div className="p-6 space-y-4 bg-white rounded shadow">
          <label className="block mb-1 font-medium">Số km đã đi (km)</label>
          <input
            type="number"
            step={1}
            name="mileage"
            value={form.mileage || ""}
            onChange={handleChange}
            placeholder="Số km đã đi (km)"
            className="w-full p-2 border rounded"
          />

          <label className="block mb-1 font-medium">Địa chỉ</label>
          <button
            type="button"
            onClick={() => setIsAddressModalOpen(true)}
            className="w-full text-left border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#61c596]"
          >
            {form.address || "Chọn địa chỉ xe"}
          </button>

          <label className="block mb-1 font-medium">
            Mức tiêu thụ nhiên liệu (L/100km)
          </label>
          <input
            type="number"
            step={0.1}
            name="fuelConsumption"
            value={form.fuelConsumption || ""}
            onChange={handleChange}
            placeholder="Tiêu hao nhiên liệu (L/100km)"
            className="w-full p-2 border rounded"
          />

          <label className="block mb-1 font-medium">Mô tả xe</label>
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            placeholder="Mô tả xe"
            className="w-full p-2 border rounded"
            rows={3}
          />

          <label className="block mb-1 font-medium">Điều khoản sử dụng</label>
          <textarea
            name="termOfUse"
            value={form.termOfUse || ""}
            onChange={handleChange}
            placeholder="Điều khoản sử dụng"
            className="w-full p-2 border rounded"
            rows={3}
          />

          <div>
            <label className="block mb-1 font-medium">Tính năng xe</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {ADDITIONAL_FUNCTIONS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() =>
                    setCarFeatures((prev) => ({
                      ...prev,
                      [f.value]: !prev[f.value],
                    }))
                  }
                  className={`border px-3 py-2 rounded h-14 text-sm text-left flex items-center gap-2 ${
                    carFeatures[f.value]
                      ? "bg-green-100 border-green-500"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <span>{f.icon}</span>
                  <span>{f.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleInfoSave}
              className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      )}

      {activeTab === "pricing" && (
        <div className="p-6 mb-6 bg-white rounded-md shadow-sm">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">
            Đơn giá thuê mặc định
          </h2>

          {/* basePrice */}
          <div className="flex items-center mb-6">
            <div className="relative w-40">
              <input
                type="number"
                name="basePrice"
                value={form.basePrice || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
              />
              <div className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2">
                VND
              </div>
            </div>
          </div>

          {/* Toggle: Giảm giá theo tuần */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Giảm giá</h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="enableDiscount"
                  className="sr-only peer"
                  checked={!!form.discountPerWeek}
                  onChange={(e) => {
                    const enabled = e.target.checked;
                    setForm((prev) => ({
                      ...prev,
                      discountPerWeek: enabled ? 5 : "",
                    }));
                  }}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#61c596]"></div>
              </label>
            </div>

            {form.discountPerWeek && (
              <div>
                <p className="mb-4 text-sm text-gray-600">
                  Giảm giá thuê tuần (% trên đơn giá)
                </p>
                <div className="flex items-center mb-4 space-x-2">
                  <input
                    name="discountPerWeek"
                    type="number"
                    className="w-20 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
                    value={form.discountPerWeek || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Toggle: Cho thuê nhanh */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Đặt xe nhanh
            </h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="quickRent"
                className="sr-only peer"
                checked={form.quickRent || false}
                onChange={handleChange}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#61c596]"></div>
            </label>
          </div>

          {/* Slider: Tối đa giao xe */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Quãng đường giao xe tối đa:{" "}
              <span className="text-[#61c596] font-semibold">
                {form.maxDeliveryDistance || 0} km
              </span>
            </label>
            <input
              type="range"
              name="maxDeliveryDistance"
              min={0}
              max={40}
              step={5}
              value={form.maxDeliveryDistance || 0}
              onChange={handleChange}
              className="w-full accent-primary"
            />
          </div>

          {/* Slider: Phí giao xe */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Phí giao nhận xe cho mỗi km:{" "}
              <span className="text-[#61c596] font-semibold">
                {form.deliveryFee || 0} VND
              </span>
            </label>
            <input
              type="range"
              name="deliveryFee"
              min={0}
              max={50000}
              step={1000}
              value={form.deliveryFee || 0}
              onChange={handleChange}
              className="w-full accent-primary"
            />
          </div>

          {/* Slider: Số km giao miễn phí */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Miễn phí giao nhận xe trong vòng:{" "}
              <span className="text-[#61c596] font-semibold">
                {form.freeDeliveryDistance || 0} km
              </span>
            </label>
            <input
              type="range"
              name="freeDeliveryDistance"
              min={0}
              max={50}
              step={1}
              value={form.freeDeliveryDistance || 0}
              onChange={handleChange}
              className="w-full accent-primary"
            />
          </div>

          {/* Slider: Số km/ngày */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Số km tối đa trong 1 ngày:{" "}
              <span className="text-[#61c596] font-semibold">
                {form.kmPerDay || 0} km
              </span>
            </label>
            <input
              type="range"
              name="kmPerDay"
              min={100}
              max={1000}
              step={50}
              value={form.kmPerDay || 0}
              onChange={handleChange}
              className="w-full accent-primary"
            />
          </div>

          {/* Slider: Phí vượt km/ngày */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">
              Phí vượt giới hạn (tính mỗi km):{" "}
              <span className="text-[#61c596] font-semibold">
                {form.kmOverDayFee || 0} VND
              </span>
            </label>
            <input
              type="range"
              name="kmOverDayFee"
              min={1000}
              max={10000}
              step={1000}
              value={form.kmOverDayFee || 0}
              onChange={handleChange}
              className="w-full accent-primary"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handlePricingSave}
              className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
            >
              Lưu thông tin giá
            </button>
          </div>
        </div>
      )}

      {activeTab === "bookings" && (
        <div className="p-6 mb-6 bg-white rounded-md shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Đơn đặt xe
          </h2>

          <div className="w-64 mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Lọc theo trạng thái
            </label>
            <select
              value={bookingStatus || ""}
              onChange={(e) => setBookingStatus(e.target.value || null)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
            >
              <option value="">Tất cả</option>
              <option value="PENDING">Chờ thanh toán</option>
              <option value="PAID">Đã thanh toán</option>
              <option value="CONFIRMED">Đã xác nhận</option>
              <option value="IN_PROGRESS">Đang thuê</option>
              <option value="RETURNED">Đã trả xe</option>
              <option value="COMPLETED">Hoàn tất</option>
              <option value="CANCELLED">Đã huỷ</option>
            </select>
          </div>

          {loadingBookings ? (
            <div className="text-center text-gray-500">Đang tải...</div>
          ) : bookings.length === 0 ? (
            <div className="text-center text-gray-500">
              Không có đơn đặt xe nào.
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const { label, color } = getStatusInfo(booking.status);
                return (
                  <div
                    key={booking.bookingId}
                    onClick={() =>
                      navigate(`/owner/booking/${booking.bookingId}`)
                    }
                    className="p-4 transition border rounded-md cursor-pointer hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 text-xs rounded ${color}`}>
                        {label}
                      </span>
                      <span className="text-sm text-gray-600">
                        Đặt lúc: {booking.bookingDate}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={booking.customerInfo.avatar}
                        alt="avatar"
                        className="object-cover w-10 h-10 border rounded-full"
                      />
                      <div className="text-sm">
                        <div className="font-medium text-gray-800">
                          {booking.customerInfo.username}
                        </div>
                        <div className="text-gray-600">
                          {booking.customerInfo.phoneNumber}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 text-sm text-gray-700 md:grid-cols-3">
                      <div>
                        <strong>Ngày lấy xe:</strong> {booking.startDateTime}
                      </div>
                      <div>
                        <strong>Ngày trả xe:</strong> {booking.endDateTime}
                      </div>
                      <div>
                        <strong>Tổng giá:</strong>{" "}
                        {formatCurrency(booking.totalPrice)} VND
                      </div>
                      <div>
                        <strong>Đã thanh toán:</strong>{" "}
                        {formatCurrency(booking.totalPaidAmount)} VND
                      </div>
                      <div>
                        <strong>Thanh toán khi nhận xe:</strong>{" "}
                        {formatCurrency(booking.needToPayInCash)} VND
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onApply={(address) => {
          setForm((prev) => ({ ...prev, address }));
          setIsAddressModalOpen(false);
        }}
        initialAddress={form.address}
      />
    </div>
  );
}
