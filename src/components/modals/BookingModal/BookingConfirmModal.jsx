import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

export default function BookingConfirmModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Lưu ý" className="max-w-lg">
      <div className="text-center">
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-medium">[+] Xe Số sẵn</h3>
          <p className="text-gray-600">
            Bạn cần có GPLX (B2 trở lên) và kỹ năng phù hợp.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="mb-3 text-lg font-medium">[+] Bảo hiểm thuê xe</h3>
          <p className="text-gray-600">
            Chuyến đi của bạn được mua <strong>Bảo hiểm thuê xe</strong>. Trường
            hợp xảy ra sự cố ngoài ý muốn, bạn chỉ phải bồi thường tối đa
            2.000.000 VNĐ cho các thiệt hại về xe.
          </p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-8 py-3 font-medium text-gray-700 border border-gray-300 rounded-md"
          >
            Hủy thuê
          </button>

          <Button onClick={onConfirm} className="px-8">
            Gửi yêu cầu thuê xe
          </Button>
        </div>
      </div>
    </Modal>
  );
}
