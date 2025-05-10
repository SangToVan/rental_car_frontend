import { useForm } from "react-hook-form";
import { changePasswordApi } from "../../../shared/apis/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleChangePassword = async (data) => {
    const { newPassword, oldPassword } = data;
    const { message } = await changePasswordApi({ newPassword, oldPassword });
    navigate("/user/profile");
    toast.success(message);
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Đổi mật khẩu</h1>
      <p className="mb-8 text-gray-600">
        Vui lòng nhập mật khẩu hiện tại của bạn để thay đổi mật khẩu
      </p>

      <div className="max-w-xl p-6 mx-auto bg-white rounded-lg shadow-sm">
        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className="space-y-6"
        >
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
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                {...register("oldPassword", {
                  required: "This field is required",
                })}
              />
              {errors.oldPassword && (
                <span className="text-red-500">
                  {errors.oldPassword.message}
                </span>
              )}
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
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                {...register("newPassword", {
                  required: "This field is required",
                })}
              />
              {errors.newPassword && (
                <span className="text-red-500">
                  {errors.newPassword.message}
                </span>
              )}
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
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                {...register("confirmNewPassword", {
                  validate: (value) => {
                    if (value === watch("newPassword")) return true;
                    return "Passwords do not match";
                  },
                })}
              />
              {errors.confirmNewPassword && (
                <span className="text-red-500">
                  {errors.confirmNewPassword.message}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-primary hover:text-white"
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
