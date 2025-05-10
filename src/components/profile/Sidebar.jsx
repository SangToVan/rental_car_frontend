import {
  FiCreditCard,
  FiGift,
  FiHeart,
  FiLock,
  FiLogOut,
  FiMapPin,
  FiPackage,
  FiTruck,
  FiUser,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../shared/toolkits/authSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {/* Main Content */}
      <div className="container flex flex-col flex-1 mx-auto md:flex-row">
        {/* Sidebar */}
        <aside className="w-full bg-white border-r border-gray-200 md:w-64">
          <div className="p-6">
            <h2 className="mb-6 text-2xl font-bold">Xin chào bạn!</h2>
            <nav className="space-y-1">
              <NavLink
                to="/user/profile"
                className={({ isActive }) =>
                  `flex items-center space-x-3 rounded-lg px-4 py-3 ${
                    isActive
                      ? "border-l-4 border-green-500 bg-gray-100 text-green-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <FiUser className="w-5 h-5" />
                <span>Tài khoản của tôi</span>
              </NavLink>

              <NavLink
                to="/user/favorites"
                className={({ isActive }) =>
                  `flex items-center space-x-3 rounded-lg px-4 py-3 ${
                    isActive
                      ? "border-l-4 border-green-500 bg-gray-100 text-green-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <FiHeart className="w-5 h-5" />
                <span>Xe yêu thích</span>
              </NavLink>

              <NavLink
                to="/user/cars"
                className={({ isActive }) =>
                  `flex items-center space-x-3 rounded-lg px-4 py-3 ${
                    isActive
                      ? "border-l-4 border-green-500 bg-gray-100 text-green-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <FiTruck className="w-5 h-5" />
                <span>Xe của tôi</span>
              </NavLink>

              <NavLink
                to="/user/bookings"
                className={({ isActive }) =>
                  `flex items-center space-x-3 rounded-lg px-4 py-3 ${
                    isActive
                      ? "border-l-4 border-green-500 bg-gray-100 text-green-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <FiPackage className="w-5 h-5" />
                <span>Chuyến của tôi</span>
              </NavLink>

              <NavLink
                to="/user/wallet"
                className={({ isActive }) =>
                  `flex items-center space-x-3 rounded-lg px-4 py-3 ${
                    isActive
                      ? "border-l-4 border-green-500 bg-gray-100 text-green-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <FiCreditCard className="w-5 h-5" />
                <span>Ví của tôi</span>
              </NavLink>

              <NavLink
                to="/user/change-password"
                className={({ isActive }) =>
                  `flex items-center space-x-3 rounded-lg px-4 py-3 ${
                    isActive
                      ? "border-l-4 border-green-500 bg-gray-100 text-green-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <FiLock className="w-5 h-5" />
                <span>Đổi mật khẩu</span>
              </NavLink>

              <div
                onClick={handleLogout}
                className="flex items-center px-4 py-3 space-x-3 text-red-500 rounded-lg hover:bg-gray-100"
              >
                <FiLogOut className="w-5 h-5" />
                <span>Đăng xuất</span>
              </div>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </>
  );
}
