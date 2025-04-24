import { useState } from "react";
import NoticeDropdownItem from "./NoticeDropdownItem";

export default function NoticeDropdown({ notices = [] }) {
  const [notifications, setNotifications] = useState(notices);

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="z-50 mt-2 overflow-hidden bg-white rounded-md shadow-lg w-80 md:w-96">
      <div className="sticky top-0 z-10 p-4 text-xl font-bold bg-white border-b">
        Thông báo
      </div>

      <div className="max-h-[350px] overflow-y-auto overflow-x-hidden">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NoticeDropdownItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleMarkAsRead}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            Không có thông báo nào
          </div>
        )}
      </div>
    </div>
  );
}
