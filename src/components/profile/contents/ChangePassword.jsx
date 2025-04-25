import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
    console.log("Password change submitted:", formData);
  };
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Đổi mật khẩu</h1>
      <p className="mb-8 text-gray-600">
        Vui lòng nhập mật khẩu hiện tại của bạn để thay đổi mật khẩu
      </p>

      <div className="max-w-xl p-6 mx-auto bg-white rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div>
            <label
              htmlFor="currentPassword"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Mật khẩu hiện tại
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button
                type="button"
                className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button
                type="button"
                className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Xác nhận mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button
                type="button"
                className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
