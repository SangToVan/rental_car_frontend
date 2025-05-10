import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 mx-4 text-center bg-white rounded-lg">
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

        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-[#61c596]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Đăng ký thành công!
        </h1>

        <p className="mb-8 text-gray-600">
          Xe của bạn đã được đăng ký thành công trên hệ thống của chúng tôi. Bạn
          có thể bắt đầu quản lý lịch cho thuê và theo dõi thu nhập từ ngay bây
          giờ.
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full py-3 px-4 bg-[#61c596] hover:bg-opacity-90 text-white font-medium text-center rounded-md transition duration-200"
          >
            Về trang chủ
          </Link>

          <Link
            to="/my-cars"
            className="block w-full px-4 py-3 font-medium text-center text-gray-700 transition duration-200 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Quản lý xe của tôi
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SuccessModal;
