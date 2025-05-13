import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImagesUpload from "../cars/ImagesUpload"; // new component
import { addCarApi } from "../../shared/apis/carApi"; // make sure the path is correct
import SuccessModal from "../modals/SuccessModal/SuccessModal";

export default function Step3({ newCar = {}, setNewCar, nextStep, onCancel }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [images, setImages] = useState(
    new Array(4).fill({ id: null, imageItem: null })
  );

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event?.preventDefault();

    const validImages = images.filter((img) => !!img.imageItem);
    if (validImages.length < 4) {
      setSubmitError("Vui lòng tải đủ 4 hình ảnh xe (trước, sau, trái, phải)");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      await addCarApi({
        ...newCar,
        images: images.map((img) => img.imageItem),
        basePrice: newCar?.basePrice,
      });

      setShowSuccess(true);
    } catch (error) {
      setSubmitError("Có lỗi xảy ra khi đăng ký xe. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="p-6 mb-6 bg-white rounded-md shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Hình ảnh</h2>
          <p className="mb-6 text-sm text-gray-600">
            Đăng nhiều hình ở các góc độ khác nhau để tăng thông tin cho xe của
            bạn.
          </p>

          {/* Replace old grid with new component */}
          <ImagesUpload images={images} onChange={setImages} />

          {submitError && (
            <div className="p-4 mb-6 text-red-700 bg-red-100 rounded-md">
              {submitError}
            </div>
          )}

          <div className="p-4 mb-6 text-blue-700 rounded-md bg-blue-50">
            <h3 className="mb-2 font-semibold">Lưu ý:</h3>
            <ul className="pl-5 list-disc">
              <li>Hãy đăng tải ảnh chất lượng cao, rõ nét của xe</li>
              <li>
                Không chèn số điện thoại, logo hoặc thông tin cá nhân vào ảnh
              </li>
              <li>
                Đăng tải đầy đủ các góc: ngoại thất, nội thất, mặt trước và sau
                của xe
              </li>
            </ul>
          </div>
        </div>

        <div className="flex mb-8 space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="w-1/2 py-3 font-medium text-center text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Quay lại
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-1/2 py-3 text-center rounded-md bg-[#61c596] text-white font-medium hover:bg-opacity-90 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </div>
      </form>
      <SuccessModal isOpen={showSuccess} onClose={() => navigate("/my-cars")} />
    </>
  );
}
