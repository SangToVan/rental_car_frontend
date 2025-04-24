import { Link } from "react-router-dom";
import logoImg from "/src/assets/logo.png";
import LoginModal from "/src/components/modals/LoginModal";
import SignupModal from "/src/components/modals/SignupModal";
import NoticeDropdown from "/src/components/notifications/NoticeDropdown";
import { useState } from "react";
import { mockNotice } from "/src/utils/mockData.js";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logoImg} alt="logo" className="h-10" />
          </Link>
          <div className="items-center hidden space-x-6 md:flex">
            <div className="flex gap-6">
              <Link
                to="/about"
                className="font-medium text-mioto-dark hover:text-primary"
              >
                Về chúng tôi
              </Link>
              <Link
                to="/add-car/step1"
                className="font-medium text-mioto-dark hover:text-primary"
              >
                Trở thành chủ xe
              </Link>
              {isLoggedIn && (
                <Link
                  to="/trips"
                  className="font-medium text-mioto-dark hover:text-primary"
                >
                  Chuyến của tôi
                </Link>
              )}
            </div>
            {/* User Actions */}
            <div className="flex items-center gap-5 pl-4 border-l border-gray-200">
              {isLoggedIn ? (
                <>
                  {/* Notification Bell */}
                  <div className="relative">
                    <button
                      className="relative"
                      onClick={() => setShowNotifications(!showNotifications)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </button>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                      <div className="absolute right-0 top-full">
                        <NoticeDropdown notices={mockNotice} />
                      </div>
                    )}
                  </div>

                  {/* User Profile */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-blue-500 rounded-full">
                      S
                    </div>
                    <div className="relative group">
                      <div className="flex items-center gap-1 cursor-pointer">
                        <span className="text-sm font-medium">
                          Sinh viên tìm tài liệu
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowSignupModal(true)}
                    className="font-medium text-gray-800 hover:text-green-500"
                  >
                    Đăng ký
                  </button>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="px-4 py-2 font-medium text-gray-800 border border-gray-800 rounded-md hover:text-green-500 hover:border-green-500"
                  >
                    Đăng nhập
                  </button>
                </>
              )}
            </div>
          </div>
          {/* Login Modal */}
          {showLoginModal && (
            <LoginModal
              onClose={() => setShowLoginModal(false)}
              onLogin={handleLogin}
              onSwitchToSignup={() => {
                setShowLoginModal(false);
                setShowSignupModal(true);
              }}
            />
          )}

          {/* Signup Modal */}
          {showSignupModal && (
            <SignupModal
              onClose={() => setShowSignupModal(false)}
              onSwitchToLogin={() => {
                setShowSignupModal(false);
                setShowLoginModal(true);
              }}
            />
          )}
        </div>
      </header>
    </>
  );
}
