import { useEffect, useState } from "react";
import {
  getUserDetailApi,
  verifyUserLicenseApi,
  unverifyUserLicenseApi,
} from "../../shared/apis/adminApi";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatCurrency(str) {
  return Number(str).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
}

export default function UserDetailPage({ userId, onBack }) {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    getUserDetailApi(userId).then((data) => {
      setUser(data.data.userInfo);
      setWallet(data.data.wallet);
    });
  }, [userId]);

  const handleVerify = async () => {
    await verifyUserLicenseApi(userId);
    const data = await getUserDetailApi(userId);
    setUser(data.userInfo);
  };

  const handleUnverify = async () => {
    await unverifyUserLicenseApi(userId);
    const data = await getUserDetailApi(userId);
    setUser(data.userInfo);
  };

  if (!user) return <div>Đang tải dữ liệu người dùng...</div>;

  return (
    <div className="p-6 space-y-6 bg-white rounded shadow">
      <button onClick={onBack} className="text-blue-500 hover:underline">
        ← Quay lại danh sách
      </button>

      <div className="flex items-center gap-4">
        <img
          src={user.avatar || "/default-user.png"}
          alt={user.username}
          className="object-cover w-24 h-24 border rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.username}</h2>
          <div>Email: {user.email}</div>
          <div>Ngày sinh: {formatDate(user.birthday)}</div>
          <div>Giới tính: {user.gender}</div>
          <div>Vai trò: {user.role}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <span className="font-medium">Số điện thoại:</span> {user.phoneNumber}
        </div>
        <div>
          <span className="font-medium">CMND/CCCD:</span> {user.citizenId}
        </div>
        <div>
          <span className="font-medium">Ngày đăng ký:</span>{" "}
          {formatDate(user.createdAt)}
        </div>
        <div>
          <span className="font-medium">Trạng thái:</span>{" "}
          {user.isActive ? "Hoạt động" : "Khóa"}
        </div>
      </div>

      <div className="p-4 border rounded bg-gray-50">
        <h3 className="mb-2 text-lg font-semibold">Thông tin bằng lái xe</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <span className="font-medium">Số bằng lái:</span>{" "}
            {user.drivingLicense}
          </div>
          <div>
            <span className="font-medium">Họ tên trên bằng lái:</span>{" "}
            {user.licenseFullName}
          </div>
          <div>
            <span className="font-medium">Ngày cấp:</span>{" "}
            {formatDate(user.licenseBirthday)}
          </div>
          <div>
            <span className="font-medium">Trạng thái:</span>{" "}
            {user.verifiedLicense}
            {user.verifiedLicense === "WAITING" && (
              <div className="mt-2 space-x-2">
                <button
                  onClick={handleVerify}
                  className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700"
                >
                  Xác thực
                </button>
                <button
                  onClick={handleUnverify}
                  className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Hủy xác thực
                </button>
              </div>
            )}
          </div>
        </div>
        {user.licenseImage && (
          <div className="mt-4">
            <img
              src={user.licenseImage}
              alt="License"
              className="max-w-xs border rounded"
            />
          </div>
        )}
      </div>

      <div className="p-4 border rounded bg-gray-50">
        <h3 className="mb-2 text-lg font-semibold">Ví người dùng</h3>
        <div className="mb-2 font-medium">
          Số dư: {formatCurrency(wallet?.balance || 0)}
        </div>
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Loại giao dịch</th>
              <th className="p-2 border">Số tiền</th>
              <th className="p-2 border">Mô tả</th>
              <th className="p-2 border">Ngày</th>
              <th className="p-2 border">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {wallet?.transactionList?.map((txn, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{txn.transactionType}</td>
                <td className="p-2 border">{formatCurrency(txn.amount)}</td>
                <td className="p-2 border">{txn.description}</td>
                <td className="p-2 border">{txn.transactionDate}</td>
                <td className="p-2 border">{txn.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
