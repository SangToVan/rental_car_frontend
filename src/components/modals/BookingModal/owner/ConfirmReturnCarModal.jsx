import { useState } from "react";
import Modal from "../../../ui/Modal";

export default function ConfirmReturnCarModal({ isOpen, onClose, onConfirm }) {
  const [carCondition, setCarCondition] = useState("good");
  const [odometerReading, setOdometerReading] = useState("");
  const [fuelLevel, setFuelLevel] = useState("full");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!odometerReading) {
      alert("Vui lòng nhập số km hiện tại của xe");
      return;
    }

    onConfirm({
      carCondition,
      odometerReading,
      fuelLevel,
      notes,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Xác nhận trả xe">
      <div className="pt-2">
        <div className="flex items-start mb-6">
          <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <div className="w-full ml-4">
            <div className="w-full space-y-4">
              {/* Car Condition */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Tình trạng xe
                </label>
                <select
                  value={carCondition}
                  onChange={(e) => setCarCondition(e.target.value)}
                  className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value="good">Tốt - Không có vấn đề</option>
                  <option value="minor_issues">Có vấn đề nhỏ</option>
                  <option value="damaged">Bị hư hại</option>
                </select>
              </div>

              {/* Odometer Reading */}
              <div>
                <label
                  htmlFor="odometer"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Số km hiện tại
                </label>
                <input
                  type="number"
                  id="odometer"
                  value={odometerReading}
                  onChange={(e) => setOdometerReading(e.target.value)}
                  className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Nhập số km hiện tại của xe"
                  required
                />
              </div>

              {/* Fuel Level */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Mức nhiên liệu
                </label>
                <select
                  value={fuelLevel}
                  onChange={(e) => setFuelLevel(e.target.value)}
                  className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value="full">Đầy</option>
                  <option value="three_quarters">3/4</option>
                  <option value="half">1/2</option>
                  <option value="quarter">1/4</option>
                  <option value="empty">Gần hết</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Ghi chú (nếu có)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Thêm ghi chú về tình trạng xe nếu cần..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleSubmit}
          >
            Xác nhận trả xe
          </button>
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Hủy
          </button>
        </div>
      </div>
    </Modal>
  );
}
