import { useState } from "react";
import { useForm } from "react-hook-form";
import AddressModal from "../modals/AddressModal/AddressModal";

export default function Step2({ newCar = {}, setNewCar, nextStep, onCancel }) {
  const [showPriceDiscount, setShowPriceDiscount] = useState(false);
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(true);
  const [showKmLimitOptions, setShowKmLimitOptions] = useState(true);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(newCar.address || "");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: newCar,
  });

  // Theo dõi các giá trị slider để vẽ progress bar
  const quickRent = watch("quickRent");
  const deliveryDistance = watch("maxDeliveryDistance");
  const deliveryFee = watch("deliveryFee");
  const freeDeliveryDistance = watch("freeDeliveryDistance");
  const kmPerDay = watch("kmPerDay");
  const kmOverdayFee = watch("kmOverDayFee");

  const onSubmit = (data) => {
    const newData = {
      ...data,
      address: selectedAddress,
      discountPerWeek: showPriceDiscount ? data.discountPerWeek : 0,
      maxDeliveryDistance: showDeliveryOptions ? data.maxDeliveryDistance : 0,
      deliveryFee: showDeliveryOptions ? data.deliveryFee : 0,
      freeDeliveryDistance: showDeliveryOptions ? data.freeDeliveryDistance : 0,
      kmPerDay: showKmLimitOptions ? data.kmPerDay : 0,
      kmOverDayFee: showKmLimitOptions ? data.kmOverDayFee : 0,
    };

    setNewCar({ ...newCar, ...newData });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Main Content */}
      <div className="p-6 mb-6 bg-white rounded-md shadow-sm">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">
          Đơn giá thuê mặc định
        </h2>
        <p className="mb-4 text-sm text-gray-600">
          Đơn giá thuê xe sẽ không thay đổi theo ngày trong tuần. Bạn có thể
          thay đổi giá thuê các ngày đặc biệt như cuối tuần, lễ, tết... trong
          mục quản lý xe.
        </p>

        <div className="flex items-center mb-6">
          <div className="relative w-40">
            <input
              type="number"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
              {...register("basePrice", { required: true })}
            />
            <div className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2">
              K
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Giảm giá</h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showPriceDiscount}
                onChange={(e) => setShowPriceDiscount(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#61c596]"></div>
            </label>
          </div>

          {showPriceDiscount && (
            <div>
              <p className="mb-4 text-sm text-gray-600">
                Giảm giá thuê tuần (% trên đơn giá)
              </p>
              <div className="flex items-center mb-4 space-x-2">
                {/* <span className="bg-[#61c596] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  ?
                </span> */}
                <input
                  type="number"
                  className="w-20 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
                  {...register("discountPerWeek", { required: true })}
                />
                <span className="text-gray-600">%</span>
              </div>
              {/* <p className="mb-4 text-sm text-gray-600">
                Giảm giá thuê tháng (% trên đơn giá)
              </p>
              <div className="flex items-center mb-4 space-x-2">
                <input
                  type="text"
                  name="monthlyDiscountAmount"
                  value={monthlyDiscountAmount}
                  onChange={handleInputChange}
                  className="w-20 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
                />
                <span className="text-gray-600">%</span>
              </div> */}
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Đặt xe nhanh
            </h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                {...register("quickRent", { required: false })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#61c596]"></div>
            </label>
          </div>

          <p className="mb-6 text-sm text-red-500">
            Bật tính năng cho phép khách hàng đặt xe ngay lập tức không cần chờ
            xác nhận. (Phù hợp với chủ xe không thường xuyên online hoặc luôn
            tin tưởng khách).
          </p>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Địa chỉ xe
          </h2>
          <div className="relative mb-6">
            <button
              type="button"
              onClick={() => setIsAddressModalOpen(true)}
              className="w-full text-left border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
            >
              {selectedAddress || "Chọn địa chỉ giao nhận xe"}
            </button>
            <span className="absolute transform -translate-y-1/2 right-3 top-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>

        <AddressModal
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
          onApply={(address) => {
            setSelectedAddress(address);
            setIsAddressModalOpen(false);
          }}
          initialAddress={selectedAddress}
        />

        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Giao xe tận nơi
            </h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showDeliveryOptions}
                onChange={(e) => setShowDeliveryOptions(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#61c596]"></div>
            </label>
          </div>

          {showDeliveryOptions && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="mb-6">
                <p className="mb-2 text-sm text-gray-600">
                  Quãng đường giao xe tối đa
                </p>
                <div className="relative mb-3">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-[#61c596] rounded-full"
                      style={{
                        width: `${(parseInt(deliveryDistance) / 40) * 100}%`,
                      }}
                    ></div>
                    <div
                      className="w-5 h-5 bg-black absolute rounded-full -top-1.5"
                      style={{
                        left: `calc(${
                          (parseInt(deliveryDistance) / 40) * 100
                        }% - 0.6rem)`,
                      }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    name="deliveryDistance"
                    min="0"
                    max="40"
                    className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                    {...register("maxDeliveryDistance", { required: true })}
                  />
                </div>
                <div className="text-sm font-medium text-right text-gray-700">
                  {deliveryDistance}km
                </div>
              </div>

              <div className="mb-6">
                <p className="mb-2 text-sm text-gray-600">
                  Phí giao nhận xe cho mỗi km
                </p>
                <div className="relative mb-3">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-[#61c596] rounded-full"
                      style={{
                        width: `${(parseInt(deliveryFee) / 50) * 100}%`,
                      }}
                    ></div>
                    <div
                      className="w-5 h-5 bg-black absolute rounded-full -top-1.5"
                      style={{
                        left: `calc(${
                          (parseInt(deliveryFee) / 50) * 100
                        }% - 0.6rem)`,
                      }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    name="deliveryFee"
                    min="0"
                    max="50"
                    className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                    {...register("deliveryFee", { required: true })}
                  />
                </div>
                <div className="text-sm font-medium text-right text-gray-700">
                  {deliveryFee}K
                </div>
              </div>

              <div className="mb-6">
                <p className="mb-2 text-sm text-gray-600">
                  Miễn phí giao nhận xe trong vòng
                </p>
                <div className="relative mb-3">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-[#61c596] rounded-full"
                      style={{
                        width: `${
                          (parseInt(freeDeliveryDistance) / 10) * 100
                        }%`,
                      }}
                    ></div>
                    <div
                      className="w-5 h-5 bg-black absolute rounded-full -top-1.5"
                      style={{
                        left: `calc(${
                          (parseInt(freeDeliveryDistance) / 10) * 100
                        }% - 0.6rem)`,
                      }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    name="freeDeliveryDistance"
                    min="0"
                    max="10"
                    className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                    {...register("freeDeliveryDistance", { required: true })}
                  />
                </div>
                <div className="text-sm font-medium text-right text-gray-700">
                  {freeDeliveryDistance}km
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Giới hạn số km
            </h2>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showKmLimitOptions}
                onChange={(e) => setShowKmLimitOptions(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#61c596]"></div>
            </label>
          </div>

          {showKmLimitOptions && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="mb-6">
                <p className="mb-2 text-sm text-gray-600">
                  Số km tối đa trong 1 ngày
                </p>
                <div className="relative mb-3">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-[#61c596] rounded-full"
                      style={{ width: `${(parseInt(kmPerDay) / 1000) * 100}%` }}
                    ></div>
                    <div
                      className="w-5 h-5 bg-black absolute rounded-full -top-1.5"
                      style={{
                        left: `calc(${
                          (parseInt(kmPerDay) / 1000) * 100
                        }% - 0.6rem)`,
                      }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    name="kmPerDay"
                    min="100"
                    max="1000"
                    step="50"
                    className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                    {...register("kmPerDay", { required: true })}
                  />
                </div>
                <div className="text-sm font-medium text-right text-gray-700">
                  {kmPerDay}km
                </div>
              </div>

              <div className="mb-6">
                <p className="mb-2 text-sm text-gray-600">
                  Phí vượt giới hạn (tính mỗi km)
                </p>
                <div className="relative mb-3">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-[#61c596] rounded-full"
                      style={{
                        width: `${(parseInt(kmOverdayFee) / 10) * 100}%`,
                      }}
                    ></div>
                    <div
                      className="w-5 h-5 bg-black absolute rounded-full -top-1.5"
                      style={{
                        left: `calc(${
                          (parseInt(kmOverdayFee) / 10) * 100
                        }% - 0.6rem)`,
                      }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    name="kmOverdayFee"
                    min="0"
                    max="10"
                    step="1"
                    className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                    {...register("kmOverDayFee", { required: true })}
                  />
                </div>
                <div className="text-sm font-medium text-right text-gray-700">
                  {kmOverdayFee}K
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-6 mb-6 border-t border-gray-200">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Điều khoản thuê xe
          </h2>
          <textarea
            placeholder="Các lưu ý khi thuê xe sẽ được đính kèm phiếu thuê và hiển thành điều khoản giữa hai bên khi thuê xe. Chủ xe có thể thêm các điều khoản riêng ở mục sửa thông tin."
            rows={8}
            className="w-full h-24 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
            {...register("termOfUse", { required: true })}
          ></textarea>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex mb-8 space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="w-1/2 py-3 font-medium text-center text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Quay lại
        </button>
        <button
          type="submit"
          className="w-1/2 py-3 text-center rounded-md bg-[#61c596] text-white font-medium hover:bg-opacity-90"
        >
          Kế tiếp
        </button>
      </div>
    </form>
  );
}
