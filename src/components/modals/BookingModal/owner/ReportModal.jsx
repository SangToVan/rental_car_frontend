import { useState } from "react";
import Modal from "../../../ui/Modal";

export default function ReportModal({ isOpen, onClose, onSubmit }) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [selectedReason, setSelectedReason] = useState("");

  const reasonOptions = [
    { id: "late-return", label: "Trả xe trễ hẹn" },
    { id: "damage", label: "Làm hỏng xe" },
    { id: "dirty", label: "Trả xe không sạch sẽ" },
    { id: "rules", label: "Vi phạm quy định" },
    { id: "other", label: "Lý do khác" },
  ];

  const handleSubmit = () => {
    if (!selectedReason) {
      alert("Vui lòng chọn lý do báo cáo");
      return;
    }

    onSubmit({
      reason: selectedReason,
      details: details,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Báo cáo khách hàng">
      <div className="pt-2">
        <div className="flex items-start mb-6">
          <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-yellow-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-yellow-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>
          <div className="w-full ml-4">
            <div className="w-full">
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Lý do báo cáo
                </label>
                <div className="space-y-2">
                  {reasonOptions.map((option) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        id={option.id}
                        name="report-reason"
                        type="radio"
                        className="w-4 h-4 text-green-600 border-gray-300"
                        checked={selectedReason === option.id}
                        onChange={() => setSelectedReason(option.id)}
                      />
                      <label
                        htmlFor={option.id}
                        className="block ml-3 text-sm text-gray-700"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="details"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Chi tiết báo cáo
                </label>
                <textarea
                  id="details"
                  rows={4}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Mô tả chi tiết về vấn đề bạn gặp phải..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleSubmit}
          >
            Gửi báo cáo
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
