import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

export default function BookingCancelConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Huỷ chuyến"
      className="max-w-md"
      showCloseButton={true}
    >
      <div className="mb-8 text-center">
        <p className="text-lg text-gray-700">Bạn có chắc muốn huỷ chuyến?</p>
      </div>

      <div className="flex justify-center space-x-4">
        <Button onClick={onConfirm} variant="primary" className="w-full">
          Tiếp tục
        </Button>
      </div>
    </Modal>
  );
}
