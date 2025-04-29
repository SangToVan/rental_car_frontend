import { useEffect, useState } from "react";

export default function RentalDocuments() {
  // Replace context with local state
  const [selectedDocumentOption, setSelectedDocumentOption] =
    useState("option1");
  const [driverInfo, setDriverInfo] = useState({
    name: "",
    phone: "",
    idNumber: "",
    relationship: "family",
  });

  const [showDriverForm, setShowDriverForm] = useState(false);

  const documentOptions = [
    {
      id: "option1",
      title: "CMND/CCCD (bản gốc) & GPLX (bản gốc)",
      description:
        "Khách thuê cần mang theo bản gốc CMND/CCCD và GPLX khi đến nhận xe để chủ xe kiểm tra",
      forType: "Công dân Việt Nam",
    },
    {
      id: "option2",
      title: "GPLX (bản gốc) & Passport (bản gốc)",
      description: "Đối với khách thuê là người nước ngoài",
      forType: "Người nước ngoài",
    },
    {
      id: "option3",
      title: "CMND/CCCD (bản gốc) & Hộ Khẩu (bản gốc)",
      description: "Áp dụng cho người không có GPLX nhưng có người lái hộ",
      forType: "Không có GPLX",
    },
  ];

  // Check if option3 is selected when component mounts or when selectedDocumentOption changes
  useEffect(() => {
    if (selectedDocumentOption === "option3") {
      setShowDriverForm(true);
    } else {
      setShowDriverForm(false);
    }
  }, [selectedDocumentOption]);

  const handleOptionChange = (optionId) => {
    setSelectedDocumentOption(optionId);
  };

  const handleDriverInfoChange = (e) => {
    const { name, value } = e.target;
    setDriverInfo({ ...driverInfo, [name]: value });
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

      {/* Document Options Selector */}
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

      {/* Driver Information Form (for option3) */}
      {showDriverForm && selectedDocumentOption === "option3" && (
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
                <option value="family">Người thân</option>
                <option value="friend">Bạn bè</option>
                <option value="colleague">Đồng nghiệp</option>
                <option value="driver">Tài xế thuê</option>
                <option value="other">Khác</option>
              </select>
            </div>
          </div>

          <div className="p-3 mt-4 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center mb-2 text-amber-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
              <span className="font-medium">Lưu ý quan trọng</span>
            </div>
            <p className="text-sm text-gray-700">
              Người lái xe sẽ phải xuất trình GPLX bản gốc khi nhận xe. Bạn vẫn
              là người chịu trách nhiệm cho việc thuê xe này.
            </p>
          </div>
        </div>
      )}

      {/* Selected Document Details */}
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h4 className="mb-3 font-medium text-gray-700">Yêu cầu giấy tờ</h4>

        {selectedDocumentOption === "option1" && (
          <div className="flex items-start mb-2">
            <div className="flex items-center justify-center w-8 h-8 mt-1 mr-3 text-red-500 bg-red-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-700">
                CMND/CCCD (bản gốc) & GPLX (bản gốc)
              </p>
              <p className="text-sm text-gray-600">
                Khách thuê cần mang theo bản gốc CMND/CCCD và GPLX khi đến nhận
                xe để chủ xe kiểm tra
              </p>
            </div>
          </div>
        )}

        {selectedDocumentOption === "option2" && (
          <div className="flex items-start mb-2">
            <div className="flex items-center justify-center w-8 h-8 mt-1 mr-3 text-red-500 bg-red-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-700">
                GPLX (bản gốc) & Passport (bản gốc)
              </p>
              <p className="text-sm text-gray-600">
                Đối với khách thuê là người nước ngoài
              </p>
            </div>
          </div>
        )}

        {selectedDocumentOption === "option3" && (
          <div className="flex items-start mb-2">
            <div className="flex items-center justify-center w-8 h-8 mt-1 mr-3 text-red-500 bg-red-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-700">
                CMND/CCCD (bản gốc) & Hộ Khẩu (bản gốc)
              </p>
              <p className="text-sm text-gray-600">
                Áp dụng cho người không có GPLX nhưng có người lái hộ
              </p>
              <p className="mt-1 text-sm text-amber-600">
                {driverInfo.name
                  ? `Người lái xe: ${driverInfo.name}, ${
                      driverInfo.relationship === "family"
                        ? "Người thân"
                        : driverInfo.relationship === "friend"
                        ? "Bạn bè"
                        : driverInfo.relationship === "colleague"
                        ? "Đồng nghiệp"
                        : driverInfo.relationship === "driver"
                        ? "Tài xế thuê"
                        : "Khác"
                    }`
                  : "Lưu ý: Bạn cần cung cấp thông tin người lái xe thay bạn và giấy tờ của họ"}
              </p>
            </div>
          </div>
        )}

        {/* Additional information */}
        <div className="p-3 mt-4 border border-blue-100 rounded-lg bg-blue-50">
          <div className="flex items-center mb-2 text-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
            <span className="font-medium">Thông tin quan trọng</span>
          </div>
          <p className="text-sm text-blue-700">
            Tất cả giấy tờ phải là bản gốc và còn hiệu lực. Chủ xe sẽ kiểm tra
            kỹ các giấy tờ khi giao xe.
          </p>
        </div>
      </div>
    </div>
  );
}
