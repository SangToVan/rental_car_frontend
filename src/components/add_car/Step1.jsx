import { useEffect, useState } from "react";
import AdditionalFunctions from "../cars/AdditionalFunctions";
import { useForm } from "react-hook-form";

export default function Step1({ newCar = {}, setNewCar, nextStep, onCancel }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: newCar,
  });

  const [functions, setFunctions] = useState([]);
  const brand = watch("brand") || "";
  const model = watch("model") || "";
  const productionYear = watch("productionYear") || "";

  // Tự động cập nhật name dựa trên brand + model + productionYear
  useEffect(() => {
    const generatedName = `${brand} ${model} ${productionYear}`;
    setNewCar((prev) => ({ ...prev, name: generatedName }));
  }, [brand, model, productionYear, setNewCar]);

  const handleFunctionsChange = (data) => {
    setFunctions(data);
  };

  useEffect(() => {
    if (newCar.additionalFunctions !== functions.join(",")) {
      setNewCar((prevCar) => ({
        ...prevCar,
        additionalFunctions: functions.join(","),
      }));
    }
  }, [functions, newCar.additionalFunctions, setNewCar]);

  const onSubmit = (data) => {
    const fullName = `${data.brand} ${data.model} ${data.productionYear}`;
    setNewCar({
      ...newCar,
      ...data,
      name: fullName,
      additionalFunctions: functions.join(","),
    });
    nextStep();
  };

  return (
    <>
      {/* Main Content */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6 mb-6 bg-white rounded-md shadow-sm">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-800">
                Biển số xe
              </h2>
              <p className="mb-4 text-sm text-red-500">
                Lưu ý: Biển số không thay đổi sau khi đăng ký
              </p>
              <input
                type="text"
                placeholder="Nhập biển số xe"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
                {...register("licensePlate", { required: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="mb-2 text-lg font-semibold text-gray-800">
                Tên hiển thị
              </h2>
              <input
                type="text"
                readOnly
                value={`${brand} ${model} ${productionYear}`}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-6 mb-6 border-t border-gray-200">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Thông tin cơ bản
            </h2>
            <p className="mb-4 text-sm text-red-500">
              Lưu ý: Các thông tin cơ bản sau không thể thay đổi sau khi đăng ký
            </p>

            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Hãng xe
                </label>
                <div className="relative">
                  {/* <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent">
                    <option>Audi</option>
                    <option>BMW</option>
                    <option>Honda</option>
                    <option>Toyota</option>
                    <option>Mercedes</option>
                  </select> */}
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
                    {...register("brand", { required: true })}
                  />
                  {/* <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div> */}
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Mẫu xe
                </label>
                <div className="relative">
                  {/* <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent">
                    <option>AUDI A5 (4T)</option>
                    <option>AUDI A4</option>
                    <option>AUDI Q5</option>
                    <option>AUDI Q7</option>
                  </select> */}
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
                    {...register("model", { required: true })}
                  />
                  {/* <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Số ghế
                </label>
                <div className="relative">
                  {/* <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent">
                    <option>4</option>
                    <option>5</option>
                    <option>7</option>
                    <option>9</option>
                    <option>16</option>
                  </select> */}
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
                    {...register("numberOfSeats", { required: true })}
                  />
                  {/* <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div> */}
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Năm sản xuất
                </label>
                <div className="relative">
                  {/* <select className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent">
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                  </select> */}
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
                    {...register("productionYear", { required: true })}
                  />
                  {/* <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Truyền động
                </label>
                <div className="relative">
                  <select
                    name="transmission"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
                    {...register("transmission", { required: true })}
                  >
                    <option value="AUTOMATIC">Số tự động</option>
                    <option value="MANUAL">Số sàn</option>
                    <option value="SEMI_AUTOMATIC">Bán tự động</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  Loại nhiên liệu
                </label>
                <div className="relative">
                  <select
                    name="fuelType"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
                  >
                    <option value="PETRO">Xăng</option>
                    <option value="DIESEL">Dầu</option>
                    <option value="ELECTRIC">Điện</option>
                    <option value="HYBRID">Hybrid</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 mb-6 border-t border-gray-200">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Số km đã đi
            </h2>
            <input
              type="number"
              step={1}
              className="w-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
              {...register("mileage", { required: true })}
            />
          </div>

          <div className="pt-6 mb-6 border-t border-gray-200">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Mức tiêu thụ nhiên liệu
            </h2>
            <p className="mb-2 text-sm text-gray-600">
              (Lít nhiên liệu cho quãng đường 100km)
            </p>
            <input
              type="number"
              step={0.1}
              className="w-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
              {...register("fuelConsumption", { required: true })}
            />
          </div>

          <div className="pt-6 mb-6 border-t border-gray-200">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">Mô tả</h2>
            <textarea
              placeholder="Viết nội dung mô tả thuê xe"
              rows={8}
              className="w-full h-24 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#61c596] focus:border-transparent"
              {...register("description", { required: true })}
            ></textarea>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Tính năng
            </h2>

            <AdditionalFunctions
              additionalFunctions={functions}
              onChange={handleFunctionsChange}
            />
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
    </>
  );
}
