// RentalDocuments.jsx
import { useEffect, useState } from "react";

export default function RentalDocuments({ onChange }) {
  const [selectedDocumentOption, setSelectedDocumentOption] =
    useState("option1");
  const [driverInfo, setDriverInfo] = useState({
    name: "",
    phone: "",
    idNumber: "",
    relationship: "FAMILY",
  });
  const [showDriverForm, setShowDriverForm] = useState(false);

  const documentOptions = [
    {
      id: "option1",
      type: "NATIVE",
      title: "CMND/CCCD (bản gốc) & GPLX (bản gốc)",
      description:
        "Khách thuê cần mang theo bản gốc CMND/CCCD và GPLX khi đến nhận xe để chủ xe kiểm tra",
      forType: "Công dân Việt Nam",
    },
    {
      id: "option2",
      type: "FOREIGNER",
      title: "GPLX (bản gốc) & Passport (bản gốc)",
      description: "Đối với khách thuê là người nước ngoài",
      forType: "Người nước ngoài",
    },
    {
      id: "option3",
      type: "NONE",
      title: "CMND/CCCD (bản gốc) & Hộ Khẩu (bản gốc)",
      description: "Áp dụng cho người không có GPLX nhưng có người lái hộ",
      forType: "Không có GPLX",
    },
  ];

  useEffect(() => {
    const option = documentOptions.find(
      (opt) => opt.id === selectedDocumentOption
    );
    const documentType = option?.type || "NATIVE";
    const driver = selectedDocumentOption === "option3" ? driverInfo : null;
    setShowDriverForm(selectedDocumentOption === "option3");
    onChange?.({ documentType, driver });
  }, [selectedDocumentOption, driverInfo]);

  const handleOptionChange = (optionId) => setSelectedDocumentOption(optionId);
  const handleDriverInfoChange = (e) => {
    const { name, value } = e.target;
    setDriverInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 overflow-hidden bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-gray-800">
        Giấy tờ thuê xe
      </h3>
      <div className="flex items-center mb-4">
        <div className="p-1 mr-2 bg-gray-200 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
          </svg>
        </div>
        <span className="text-sm text-gray-600">
          Chọn loại giấy tờ phù hợp với bạn
        </span>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
          {documentOptions.map((option) => (
            <div
              key={option.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedDocumentOption === option.id
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleOptionChange(option.id)}
            >
              <div className="flex items-center mb-2">
                <div
                  className={`w-5 h-5 flex items-center justify-center rounded-full border ${
                    selectedDocumentOption === option.id
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedDocumentOption === option.id && (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  )}
                </div>
                <span className="ml-2 font-medium text-gray-800">
                  {option.forType}
                </span>
              </div>
              <p className="mb-1 text-sm font-medium text-gray-700">
                {option.title}
              </p>
              <p className="text-xs text-gray-600">{option.description}</p>
            </div>
          ))}
        </div>
      </div>

      {showDriverForm && (
        <div className="p-4 mb-6 border border-yellow-200 rounded-lg bg-yellow-50">
          <h4 className="mb-3 font-medium text-gray-800">
            Thông tin người lái xe thay bạn
          </h4>
          <p className="mb-4 text-sm text-gray-600">
            Vui lòng cung cấp thông tin chi tiết về người sẽ lái xe thay bạn. Họ
            cần có GPLX hợp lệ.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Họ và tên người lái xe
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={driverInfo.name}
                onChange={handleDriverInfoChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Nhập họ tên đầy đủ"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={driverInfo.phone}
                onChange={handleDriverInfoChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div>
              <label
                htmlFor="idNumber"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Số CMND/CCCD
              </label>
              <input
                type="text"
                id="idNumber"
                name="idNumber"
                value={driverInfo.idNumber}
                onChange={handleDriverInfoChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Nhập số CMND/CCCD"
              />
            </div>
            <div>
              <label
                htmlFor="relationship"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Mối quan hệ với bạn
              </label>
              <select
                id="relationship"
                name="relationship"
                value={driverInfo.relationship}
                onChange={handleDriverInfoChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="FAMILY">Người thân</option>
                <option value="FRIEND">Bạn bè</option>
                <option value="COLLEAGUE">Đồng nghiệp</option>
                <option value="DRIVER">Tài xế thuê</option>
                <option value="OTHER">Khác</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
