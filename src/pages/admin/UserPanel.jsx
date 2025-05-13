// Updated UserPanel.jsx using DTO
import { useEffect, useMemo, useState } from "react";
import { getUserApi } from "../../shared/apis/adminApi";
import UserDetailPage from "./UserDetailPanel";

const ROLES = [
  { key: "CUSTOMER", label: "Khách hàng" },
  { key: "OWNER", label: "Chủ xe" },
];

function formatCurrency(str) {
  return Number(str).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function UserPanel() {
  const [activeTab, setActiveTab] = useState("CUSTOMER");
  const [users, setUsers] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [ownerCount, setOwnerCount] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const roleParam = activeTab !== null ? activeTab : "";

  useEffect(() => {
    getUserApi(roleParam).then((res) => {
      setUsers(res?.data?.list || []);
      setCustomerCount(res?.data?.customerCount || 0);
      setOwnerCount(res?.data?.ownerCount || 0);
    });
  }, [roleParam]);

  const summary = useMemo(() => {
    return {
      CUSTOMER: customerCount,
      OWNER: ownerCount,
    };
  }, [customerCount, ownerCount]);

  const filteredUsers = users.filter((u) => u.role === activeTab);
  const selectedUser = users.find((u) => u.userId === selectedUserId);

  return selectedUserId ? (
    <UserDetailPage
      userId={selectedUserId}
      onBack={() => setSelectedUserId(null)}
    />
  ) : (
    <div className="w-full">
      <h1 className="mb-4 text-2xl font-bold">Quản lý người dùng</h1>
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {ROLES.map((role) => (
          <div
            key={role.key}
            className={`flex flex-col items-center py-5 rounded-lg ${
              role.key === "OWNER"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            <div className="text-2xl font-bold">{summary[role.key]}</div>
            <div className="mt-1 text-sm font-medium">{role.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex gap-1">
          {ROLES.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`min-w-[128px] whitespace-nowrap pb-2 pt-2 px-3 border-b-2 transition-colors duration-200 font-medium text-sm ${
                activeTab === tab.key
                  ? "border-green-500 text-green-700"
                  : "border-transparent text-gray-600 hover:text-green-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* User list */}
      <div className="space-y-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.userId}
              className="flex flex-col items-center gap-4 px-6 py-4 bg-white rounded-lg shadow cursor-pointer md:flex-row md:items-stretch hover:bg-green-50"
              onClick={() => setSelectedUserId(user.userId)}
            >
              <div className="flex justify-center mr-2 md:justify-start">
                <img
                  src={user.avatar || "/default-user.png"}
                  alt={user.username}
                  className="object-cover w-20 h-20 border rounded-full"
                />
              </div>
              <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2 md:gap-4">
                <div>
                  <span className="font-medium">Tên đăng nhập:</span>{" "}
                  {user.username}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {user.email}
                </div>
                <div>
                  <span className="font-medium">Số điện thoại:</span>{" "}
                  {user.phoneNumber}
                </div>
                <div>
                  <span className="font-medium">Ngày tạo:</span>{" "}
                  {formatDate(user.createdAt)}
                </div>
                <div>
                  <span className="font-medium">CMND/CCCD:</span>{" "}
                  {user.citizenId}
                </div>
                <div>
                  <span className="font-medium">Số dư ví:</span>{" "}
                  {formatCurrency(user.balance)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-gray-500">
            Không tìm thấy người dùng nào
          </div>
        )}
      </div>
    </div>
  );
}
