import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  getProvinces,
  getDistrictsByProvinceCode,
  getWardsByDistrictCode,
} from "@do-kevin/pc-vn";

const AddressModal = ({ isOpen, onClose, onApply, initialAddress }) => {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [street, setStreet] = useState("");

  const [districtDisabled, setDistrictDisabled] = useState(true);
  const [wardDisabled, setWardDisabled] = useState(true);

  const isFormComplete = city && district && street;

  const provinces = getProvinces();
  const selectedProvince = provinces.find((p) => p.name === city);
  const districts = selectedProvince
    ? getDistrictsByProvinceCode(selectedProvince.code)
    : [];
  const selectedDistrict = districts.find((d) => d.name === district);
  const wards = selectedDistrict
    ? getWardsByDistrictCode(selectedDistrict.code)
    : [];

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setDistrict("");
    setWard("");
    setDistrictDisabled(!value);
    setWardDisabled(true);
  };

  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setDistrict(value);
    setWard("");
    setWardDisabled(!value);
  };

  const handleApply = () => {
    const formatted = [street, ward, district, city].filter(Boolean).join(", ");
    onApply(formatted);
  };

  useEffect(() => {
    if (!initialAddress) return;
    const parts = initialAddress.split(", ");
    setStreet(parts[0] || "");
    setWard(parts[1] || "");
    setDistrict(parts[2] || "");
    setCity(parts[3] || "");
    if (parts[2]) setDistrictDisabled(false);
    if (parts[1]) setWardDisabled(false);
  }, [initialAddress]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md mx-4 bg-white rounded-lg">
        <button
          onClick={onClose}
          className="absolute text-gray-500 top-4 right-4 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
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
        </button>

        <div className="p-6">
          <h2 className="mb-6 text-2xl font-bold text-center">
            Chỉnh sửa địa chỉ
          </h2>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Tỉnh/ Thành phố</label>
            <select
              value={city}
              onChange={handleCityChange}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#61c596]"
            >
              <option value="">Chọn thành phố</option>
              {provinces.map((p) => (
                <option key={p.code} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Quận/ Huyện</label>
            <select
              value={district}
              onChange={handleDistrictChange}
              disabled={districtDisabled}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#61c596] disabled:bg-gray-100"
            >
              <option value="">
                {districtDisabled ? "Chọn thành phố trước" : "Chọn quận/huyện"}
              </option>
              {districts.map((d) => (
                <option key={d.code} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Phường/ Xã</label>
            <select
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              disabled={wardDisabled}
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#61c596] disabled:bg-gray-100"
            >
              <option value="">
                {wardDisabled ? "Chọn quận huyện trước" : "Chọn phường/xã"}
              </option>
              {wards.map((w) => (
                <option key={w.code} value={w.name}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-700">Đường</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Nhập tên đường / tòa nhà"
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-[#61c596]"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={handleApply}
              disabled={!isFormComplete}
              className={`w-full py-3 font-medium rounded-md mb-2 transition-colors ${
                isFormComplete
                  ? "bg-[#61c596] text-white hover:bg-opacity-90"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Áp dụng
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 font-medium text-gray-700"
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddressModal;
