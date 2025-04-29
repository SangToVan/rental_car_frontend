import { useState } from "react";
import { FiEdit2, FiX } from "react-icons/fi";

const Profile = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "Sáng Tô Văn",
    joinDate: "13/01/2025",
    email: "sangtovanz204@gmail.com",
    isEmailVerified: true,
    phone: "+84336429298",
    isPhoneVerified: true,
    facebook: "",
    google: "Sáng Tô Văn",
    points: 0,
    idNumber: "21091400574",
    fullName: "TÔ VĂN SÁNG",
    birthDate: "02/07/2003",
    gender: "Nam",
    referralCode: "PTLA8RJV",
  });

  const [formData, setFormData] = useState({ ...currentUser });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentUser({ ...formData });
    setIsEditModalOpen(false);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setCurrentUser({ ...currentUser, phone: formData.phone });
    setIsPhoneModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Thông tin tài khoản</h1>
      </div>

      <div className="max-w-4xl">
        {/* Integrated User Info and General Information */}
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-start">
            <div className="mr-8">
              <div className="relative">
                <div className="flex items-center justify-center w-24 h-24 text-4xl font-semibold text-white bg-blue-500 rounded-full">
                  {currentUser.name.charAt(0)}
                </div>
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-lg font-semibold">
                  {currentUser.fullName}
                </h2>
                <p className="text-sm text-gray-500">
                  Tham gia: {currentUser.joinDate}
                </p>

                <div className="mt-3">
                  <span className="flex items-center justify-center px-3 py-1 text-sm text-yellow-800 rounded-full bg-yellow-50">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {currentUser.points} điểm
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Thông tin tài khoản</h3>
                <button
                  className="flex items-center text-green-500"
                  onClick={() => {
                    setFormData({ ...currentUser });
                    setIsEditModalOpen(true);
                  }}
                >
                  <FiEdit2 className="mr-1" />
                  Chỉnh sửa
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-3">
                  <div className="text-sm text-gray-500">Ngày sinh</div>
                  <div className="font-medium md:col-span-2">
                    {currentUser.birthDate}
                  </div>
                </div>

                <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-3">
                  <div className="text-sm text-gray-500">Giới tính</div>
                  <div className="font-medium md:col-span-2">
                    {currentUser.gender}
                  </div>
                </div>

                <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-3">
                  <div className="text-sm text-gray-500">Số điện thoại</div>
                  <div className="flex items-center font-medium md:col-span-2">
                    {currentUser.phone}
                    {currentUser.isPhoneVerified && (
                      <span className="ml-2 rounded bg-green-100 px-2 py-0.5 text-xs text-green-600">
                        Đã xác thực
                      </span>
                    )}
                    <button
                      className="ml-2"
                      onClick={() => {
                        setFormData({ ...currentUser });
                        setIsPhoneModalOpen(true);
                      }}
                    >
                      <FiEdit2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-3">
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="flex items-center font-medium md:col-span-2">
                    {currentUser.email}
                    {currentUser.isEmailVerified && (
                      <span className="ml-2 rounded bg-green-100 px-2 py-0.5 text-xs text-green-600">
                        Đã xác thực
                      </span>
                    )}
                    <button className="ml-2">
                      <FiEdit2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-3">
                  <div className="text-sm text-gray-500">Facebook</div>
                  <div className="flex items-center font-medium md:col-span-2">
                    {currentUser.facebook || "Thêm liên kết"}
                    <button className="ml-2">
                      <FiEdit2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-3">
                  <div className="text-sm text-gray-500">Google</div>
                  <div className="flex items-center font-medium md:col-span-2">
                    {currentUser.google}
                    <button className="ml-2">
                      <FiEdit2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-3">
                  <div className="text-sm text-gray-500">Số CMND</div>
                  <div className="font-medium md:col-span-2">
                    {currentUser.idNumber}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Driver License */}
        <div className="p-6 mt-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold">Giấy phép lái xe</h3>
              <span className="px-3 py-1 ml-3 text-sm text-green-600 bg-green-100 rounded-full">
                Đang chờ xác thực
              </span>
            </div>
            <button className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
              <span>Chỉnh sửa</span>
              <FiEdit2 className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="p-3 mt-3 rounded-md bg-red-50">
            <p className="text-sm text-red-600">
              Lưu ý: để tránh phát sinh vấn đề trong quá trình thuê xe,
              <a href="#" className="font-medium text-red-600">
                {" "}
                người đặt xe{" "}
              </a>
              trên Mioto (đã xác thực GPLX)
              <span className="font-bold text-red-700">ĐỒNG THỜI</span>
              phải là
              <a href="#" className="font-medium text-red-600">
                {" "}
                người nhận xe.
              </a>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
            <div>
              <h4 className="mb-3 font-medium">Hình ảnh</h4>
              <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
                <img
                  src="https://www.mioto.vn/static/media/gplx-sample.8412e228.png"
                  alt="Driver License"
                  className="object-cover w-full"
                />
              </div>
              <div className="mt-3">
                <button className="flex items-center text-sm text-blue-600">
                  <svg
                    className="w-5 h-5 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 8V16M8 12H16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Vì sao tôi phải xác thực GPLX
                </button>
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-medium">Thông tin chung</h4>

              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-xs text-gray-500">Số GPLX</p>
                  <div className="px-4 py-3 rounded-lg bg-gray-50">
                    {currentUser.idNumber || "000000000000"}
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-xs text-gray-500">Họ và tên</p>
                  <div className="px-4 py-3 rounded-lg bg-gray-50">
                    {currentUser.fullName}
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-xs text-gray-500">Ngày sinh</p>
                  <div className="px-4 py-3 rounded-lg bg-gray-50">
                    {currentUser.birthDate}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="p-6 mt-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Thẻ của tôi</h3>
            <button className="text-sm text-blue-500">Thêm thẻ</button>
          </div>
          <div className="flex justify-center mt-4">
            <div className="max-w-xs py-12">
              <img
                src="https://www.mioto.vn/static/media/empty-card.b1670571.svg"
                alt="No Card"
                className="h-32 mx-auto"
              />
              <p className="mt-4 text-center text-gray-500">
                Bạn chưa có thẻ nào
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Information Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Cập nhật thông tin</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm text-gray-700">
                    Tên tài khoản
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Tên tài khoản"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm text-gray-700">
                    Ngày sinh
                  </label>
                  <input
                    type="text"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="DD-MM-YYYY"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm text-gray-700">
                    Giới tính
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Phone Update Modal */}
      {isPhoneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Cập nhật số điện thoại</h2>
              <button
                onClick={() => setIsPhoneModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handlePhoneSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="+84xxxxxxxxx"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 text-white transition-colors bg-green-500 rounded-md hover:bg-green-600"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
