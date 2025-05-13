import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/**
 * ImageSlider component
 * @param {Array} images - Mảng các object chứa imageUrl
 * @param {string} height - Chiều cao ảnh (ví dụ: 'h-64', 'h-40') mặc định: h-64
 * @param {string} width - Chiều rộng ảnh hoặc khối slider (ví dụ: 'w-full', 'max-w-sm') mặc định: w-full
 * @param {string} className - Class bổ sung từ ngoài (tuỳ chọn)
 */
const ImageSlider = ({
  images = [],
  height = "h-64",
  width = "w-full",
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage =
    images.length > 0 ? images[currentIndex].imageUrl : "/no-image.jpg";

  return (
    <div className={`relative ${width} ${className}`}>
      <div className={`relative w-full overflow-hidden rounded-lg ${height}`}>
        <img
          src={currentImage || "/no-image.jpg"}
          alt={`Image ${currentIndex + 1}`}
          className="object-cover w-full h-full"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute p-2 transform -translate-y-1/2 bg-white rounded-full left-2 top-1/2 bg-opacity-70 hover:bg-opacity-100"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={goToNext}
              className="absolute p-2 transform -translate-y-1/2 bg-white rounded-full right-2 top-1/2 bg-opacity-70 hover:bg-opacity-100"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
