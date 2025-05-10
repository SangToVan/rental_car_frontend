import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerApi } from "../../../shared/apis/authApi";
import { login } from "../../../shared/toolkits/authSlice";
import { toast } from "react-toastify";

export default function SignupModal({ onClose, onSignup, onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const dispatch = useDispatch();

  const {
    register: registerSignUp,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
  } = useForm();

  const handleSignUp = async (signupData) => {
    registerApi({ ...signupData, agreeToTerms }).then((data) => {
      dispatch(
        login({
          access_token: data.data.token,
          user: data.data.info,
        })
      );
      if (data.data.info?.username) {
        toast.success(`Welcome, ${data.data.info?.username}`);
      }
      onClose();
      onSignup();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 bg-white rounded-md">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute text-gray-500 top-4 right-4 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <h2 className="mb-6 text-2xl font-bold text-center">Đăng ký</h2>

        {/* Form */}
        <form onSubmit={handleSignUpSubmit(handleSignUp)}>
          {/* Phone Number Field */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Số điện thoại</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              {...registerSignUp("phoneNumber", {
                required: "Không được bỏ trống ô này",
              })}
            />
            {signUpErrors.phoneNumber && (
              <span className="text-danger">
                {signUpErrors.phoneNumber.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-700">Địa chỉ email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              {...registerSignUp("email", {
                required: "Không được bỏ trống ô này",
              })}
            />
            {signUpErrors.email && (
              <span className="text-danger">{signUpErrors.email.message}</span>
            )}
          </div>

          {/* Display Name Field */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Tên hiển thị</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              {...registerSignUp("username", {
                required: "Không được bỏ trống ô này",
              })}
            />
            {signUpErrors.username && (
              <span className="text-danger">
                {signUpErrors.username.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                {...registerSignUp("password", {
                  required: "Không được bỏ trống ô này",
                })}
              />
              {signUpErrors.password && (
                <span className="text-red-500">
                  {signUpErrors.password.message}
                </span>
              )}
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                {...registerSignUp("confirmPassword", {
                  required: "Không được bỏ trống ô này",
                })}
              />
              {signUpErrors.confirmPassword && (
                <span className="text-danger">
                  {signUpErrors.confirmPassword.message}
                </span>
              )}
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 accent-green-500"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-700">
                Tôi đã đọc và đồng ý với{" "}
                <a href="#" className="text-green-500 hover:underline">
                  Chính sách & quy định
                </a>{" "}
                và{" "}
                <a href="#" className="text-green-500 hover:underline">
                  Chính sách bảo vệ dữ liệu cá nhân
                </a>{" "}
                của Saoto.
              </label>
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white transition duration-200 bg-green-500 rounded-md hover:bg-green-600"
          >
            Đăng ký
          </button>
        </form>

        {/* Login Prompt */}
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Đã có tài khoản?{" "}
            <button
              onClick={onSwitchToLogin}
              className="font-medium text-green-500 hover:underline"
            >
              Đăng nhập
            </button>
          </p>
        </div>

        {/* Social Login */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="w-full border-t border-gray-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="flex items-center justify-center px-4 py-2 transition duration-200 border border-gray-300 rounded-md hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2 text-blue-600"
                viewBox="0 0 320 512"
                fill="currentColor"
              >
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
              </svg>
              <span>Facebook</span>
            </button>
            <button className="flex items-center justify-center px-4 py-2 transition duration-200 border border-gray-300 rounded-md hover:bg-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                viewBox="0 0 488 512"
                fill="currentColor"
              >
                <path
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  fill="#DB4437"
                />
              </svg>
              <span>Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
