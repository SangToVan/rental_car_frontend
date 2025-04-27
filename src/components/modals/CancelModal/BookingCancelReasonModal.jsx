import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

export default function BookingCancelReasonModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const handleConfirm = () => {
    const finalReason =
      selectedReason === "custom"
        ? customReason
        : `${selectedReason}${customReason ? ` - ${customReason}` : ""}`;

    onConfirm(finalReason);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Huỷ chuyến"
      className="max-w-lg"
    >
      <div className="mb-6">
        <p className="mb-4 text-gray-700">Vui lòng chọn lí do từ chối</p>

        <div className="relative">
          <select
            value={selectedReason}
            onChange={(e) => setSelectedReason(e.target.value)}
            className="w-full p-3 pr-10 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Vui lòng chọn lý do huỷ chuyến</option>
            <option value="Tôi muốn thay đổi kế hoạch">
              Tôi muốn thay đổi kế hoạch
            </option>
            <option value="Tôi tìm thấy xe khác phù hợp hơn">
              Tôi tìm thấy xe khác phù hợp hơn
            </option>
            <option value="Tôi gặp vấn đề về tài chính">
              Tôi gặp vấn đề về tài chính
            </option>
            <option value="Có việc đột xuất">Có việc đột xuất</option>
            <option value="custom">Lý do khác</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="cancel-reason-message"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Lời nhắn hoặc lý do chi tiết
          </label>
          <textarea
            id="cancel-reason-message"
            placeholder="Vui lòng nhập lý do hoặc lời nhắn"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleConfirm}
          disabled={!selectedReason}
          className="px-6"
        >
          Huỷ chuyến
        </Button>
      </div>
    </Modal>
  );
}
