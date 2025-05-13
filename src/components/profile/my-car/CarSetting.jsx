import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCarBookingApi,
  getCarDetailForOwnerApi,
  updateCarInfoApi,
  updateCarPricingApi,
} from "../../../shared/apis/carApi";
import ImageSlider from "../../common/ImageSlider";

const allCarFeatures = {
  "Bản đồ": false,
  Bluetooth: false,
  "Camera 360": false,
  "Camera cập lề": false,
  "Camera hành trình": false,
  "Camera lùi": false,
  "Cảm biến lốp": false,
  "Cảm biến va chạm": false,
  "Cửa sổ trời": false,
  "Định vị GPS": false,
  "Ghế trẻ em": false,
  "Khe cắm USB": false,
  "Lốp dự phòng": false,
  "Màn hình DVD": false,
  "Nắp thùng xe bán tải": false,
  "Túi khí an toàn": false,
  ETC: false,
};

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

const carStatusMap = {
  ACTIVE: "Đang hoạt động",
  UNVERIFIED: "Chờ duyệt",
  SUSPENDED: "Ngừng cho thuê",
  REJECTED: "Đã từ chối",
};

export default function CarSetting() {
  const { carId } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [form, setForm] = useState({});
  const [carFeatures, setCarFeatures] = useState({ ...allCarFeatures });
  const [activeTab, setActiveTab] = useState("basic-info");

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

    const initialFeatures = { ...allCarFeatures };
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
        .map(([feature]) => feature);

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
  const [bookingStatus, setBookingStatus] = useState("PENDING"); // mặc định tab đầu tiên
  const [loadingBookings, setLoadingBookings] = useState(false);

  const fetchBookings = async (status = "PENDING") => {
    try {
      setLoadingBookings(true);
      const res = await getCarBookingApi(carId, status);
      setBookings(res.data || []);
    } catch (error) {
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

  const formatCurrency = (str) => {
    const num = Number(str);
    return num.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="p-6">
      {car && (
        <div className="p-4 mb-6 bg-white rounded-lg shadow">
          <div className="flex flex-col items-start gap-6 md:flex-row">
            <div className="w-full md:max-w-[400px] aspect-video flex-shrink-0">
              <ImageSlider images={car.images || []} />
            </div>
            <div className="flex-1 space-y-2 text-gray-700">
              <p>
                <strong>Tên xe:</strong> {car.name}
              </p>
              <p>
                <strong>Biển số:</strong> {car.licensePlate}
              </p>
              <p>
                <strong>Hãng:</strong> {car.brand}
              </p>
              <p>
                <strong>Dòng xe:</strong> {car.model}
              </p>
              <p>
                <strong>Màu:</strong> {car.color}
              </p>
              <p>
                <strong>Số ghế:</strong> {car.numberOfSeats}
              </p>
              <p>
                <strong>Năm sản xuất:</strong> {car.productionYear}
              </p>
              <p>
                <strong>Truyền động:</strong>{" "}
                {transmissionMap[car.transmission]}
              </p>
              <p>
                <strong>Nhiên liệu:</strong> {fuelTypeMap[car.fuelType]}
              </p>
              <p>
                <strong>Trạng thái:</strong> {carStatusMap[car.carStatus]}
              </p>
              <p>
                <strong>Đánh giá:</strong> {car?.rating || 0}/5 ⭐
              </p>
              <p>
                <strong>Chuyến hoàn thành:</strong> {car.completeBookingCount}
              </p>
              <p>
                <strong>Chuyến đang chờ:</strong> {car.pendingBookingCount}
              </p>
              <p>
                <strong>Ngày tạo:</strong> {car.createdAt}
              </p>
              <p>
                <strong>Ngày cập nhật:</strong> {car.updatedAt}
              </p>
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
          Đơn hàng
        </button>
      </div>

      {activeTab === "basic-info" && (
        <div className="p-6 space-y-4 bg-white rounded shadow">
          <label className="block mb-1 font-medium">Số km đã đi (km)</label>
          <input
            name="mileage"
            value={form.mileage || ""}
            onChange={handleChange}
            placeholder="Số km đã đi (km)"
            className="w-full p-2 border rounded"
          />

          <label className="block mb-1 font-medium">Địa chỉ</label>
          <input
            name="address"
            value={form.address || ""}
            onChange={handleChange}
            placeholder="Địa chỉ"
            className="w-full p-2 border rounded"
          />

          <label className="block mb-1 font-medium">
            Tiêu hao nhiên liệu (L/100km)
          </label>
          <input
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
              {Object.entries(carFeatures).map(([feature, enabled]) => (
                <button
                  key={feature}
                  type="button"
                  onClick={() =>
                    setCarFeatures((prev) => ({
                      ...prev,
                      [feature]: !prev[feature],
                    }))
                  }
                  className={`border px-3 py-2 rounded text-sm text-left ${
                    enabled
                      ? "bg-green-100 border-green-500"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {feature}
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
        <div className="p-6 space-y-4 bg-white rounded shadow">
          <h2 className="mb-4 text-lg font-semibold">Thông tin giá thuê</h2>
          <label className="block mb-1 font-medium">
            Giá cơ bản (VND/ngày)
          </label>
          <input
            name="basePrice"
            value={form.basePrice || ""}
            onChange={handleChange}
            placeholder="Giá cơ bản (VND/ngày)"
            className="w-full p-2 border rounded"
          />
          <label className="block mb-1 font-medium">Phí giao xe (VND)</label>
          <input
            name="deliveryFee"
            value={form.deliveryFee || ""}
            onChange={handleChange}
            placeholder="Phí giao xe (VND)"
            className="w-full p-2 border rounded"
          />
          <label className="block mb-1 font-medium">Số km giao miễn phí</label>
          <input
            name="freeDeliveryDistance"
            value={form.freeDeliveryDistance || ""}
            onChange={handleChange}
            placeholder="Số km giao miễn phí"
            className="w-full p-2 border rounded"
          />
          <label className="block mb-1 font-medium">Tối đa giao xe (km)</label>
          <input
            name="maxDeliveryDistance"
            value={form.maxDeliveryDistance || ""}
            onChange={handleChange}
            placeholder="Tối đa giao xe (km)"
            className="w-full p-2 border rounded"
          />
          <label className="block mb-1 font-medium">Số km/ngày</label>
          <input
            name="kmPerDay"
            value={form.kmPerDay || ""}
            onChange={handleChange}
            placeholder="Số km/ngày"
            className="w-full p-2 border rounded"
          />
          <label className="block mb-1 font-medium">Phí vượt km/ngày</label>
          <input
            name="kmOverDayFee"
            value={form.kmOverDayFee || ""}
            onChange={handleChange}
            placeholder="Phí vượt km/ngày"
            className="w-full p-2 border rounded"
          />
          <label className="block mb-1 font-medium">
            Giảm giá theo tuần (%)
          </label>
          <input
            name="discountPerWeek"
            value={form.discountPerWeek || ""}
            onChange={handleChange}
            placeholder="Giảm giá theo tuần (%)"
            className="w-full p-2 border rounded"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="quickRent"
              checked={form.quickRent || false}
              onChange={handleChange}
            />
            Cho thuê nhanh
          </label>
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
        <div className="p-6 space-y-4 bg-white rounded shadow">
          <div className="flex gap-2 mb-4">
            {[
              "PENDING",
              "PAID",
              "CONFIRMED",
              "IN_PROGRESS",
              "RETURNED",
              "COMPLETED",
              "CANCELLED",
            ].map((status) => (
              <button
                key={status}
                onClick={() => setBookingStatus(status)}
                className={`px-3 py-1 rounded text-sm ${
                  bookingStatus === status
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {loadingBookings ? (
            <p>Đang tải danh sách đơn hàng...</p>
          ) : bookings.length === 0 ? (
            <p>Không có đơn hàng nào.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.bookingId}
                  className="p-4 border rounded cursor-pointer hover:bg-gray-50"
                  onClick={() => navigate(`/owner/booking/${b.bookingId}`)}
                >
                  <p>
                    <strong>Khách: </strong> {b.customerInfo?.username}
                  </p>
                  <p>
                    <strong>Trạng thái: </strong> {b.status}
                  </p>
                  <p>
                    <strong>Thời gian: </strong> {b.startDateTime} →{" "}
                    {b.endDateTime}
                  </p>
                  <p>
                    <strong>Ngày đặt: </strong> {b.bookingDate}
                  </p>
                  <p>
                    <strong>Thanh toán: </strong> {b?.paymentMethod}
                  </p>
                  <p>
                    <strong>Giá: </strong> {formatCurrency(b.totalPrice)}
                  </p>
                  <p>
                    <strong>Đã thanh toán: </strong>
                    {formatCurrency(b.totalPaidAmount)}
                  </p>
                  <p>
                    <strong>Thanh toán khi nhận xe: </strong>
                    {formatCurrency(b.needToPayInCash)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
