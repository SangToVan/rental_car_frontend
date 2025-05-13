import { useState } from "react";
import DashboardPanel from "./admin/Dashboard";
import CarPanel from "./admin/CarPanel";
import BookingPanel from "./admin/BookingPanel";
import EscrowPanel from "./admin/EscrowPanel";
import UserPanel from "./admin/UserPanel";
import {
  BiCalendar,
  BiCar,
  BiHome,
  BiLogOut,
  BiShield,
  BiUser,
} from "react-icons/bi";

const sidebarItems = [
  { key: "dashboard", label: "Dashboard", icon: BiHome },
  { key: "cars", label: "Danh sách xe", icon: BiCar },
  { key: "bookings", label: "Danh sách đơn hàng", icon: BiCalendar },
  { key: "escrow", label: "Ký quỹ", icon: BiShield },
  { key: "user", label: "Người dùng", icon: BiUser },
];

export default function AdminPage() {
  const [active, setActive] = useState("dashboard");

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return <DashboardPanel />;
      case "cars":
        return <CarPanel />;
      case "bookings":
        return <BookingPanel />;
      case "escrow":
        return <EscrowPanel />;
      case "user":
        return <UserPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-0 flex-col hidden w-64 min-h-screen pt-6 pb-8 bg-white border-r border-gray-200 md:flex">
          <div className="flex-1 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`w-full flex items-center px-6 py-3 text-base font-medium transition-colors rounded-l-full hover:bg-green-50 hover:text-green-600 ${
                  active === item.key
                    ? "bg-green-50 text-green-700 font-semibold"
                    : "text-gray-700"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center px-6 mt-auto">
            <button className="flex items-center w-full gap-3 py-3 font-medium text-red-600 rounded-l-full hover:bg-red-50">
              <BiLogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-8 min-h-[calc(100vh-4rem)]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
