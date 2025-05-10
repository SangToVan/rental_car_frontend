import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import LoginModal from "../../components/modals/AuthModal/LoginModal";
import SignupModal from "../../components/modals/AuthModal/SignupModal";
import NoticeDropdown from "../../components/home/Notifications/NoticeDropdown";
import { useState } from "react";
import { mockNotice } from "/src/utils/mockData.js";
import { useSelector } from "react-redux";

export default function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogin = () => {
    setShowLoginModal(false);
  };

  const handleSignUp = () => {
    setShowSignupModal(false);
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
                to="/add-car"
                className="font-medium text-mioto-dark hover:text-primary"
              >
                Trở thành chủ xe
              </Link>
              {isAuthenticated && (
                <Link
                  to="/booking"
                  className="font-medium text-mioto-dark hover:text-primary"
                >
                  Chuyến của tôi
                </Link>
              )}
            </div>
            {/* User Actions */}
            <div className="flex items-center gap-5 pl-4 border-l border-gray-200">
              {isAuthenticated ? (
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
                  <Link to="/user/profile">
                    <div className="flex items-center gap-2">
                      <img
                        src={
                          user?.avatar ||
                          "https://ui-avatars.com/api/?name=" +
                            (user?.username || "User")
                        }
                        alt="User avatar"
                        className="object-cover w-10 h-10 border border-gray-200 rounded-full"
                      />
                      <div className="relative group">
                        <div className="flex items-center gap-1 cursor-pointer">
                          <span className="text-sm font-medium">
                            {user?.username}
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
                  </Link>
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
              onSignup={handleSignUp}
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
