import { useState } from "react";
import { convertToBase64 } from "../../shared/utils/convertToBase64";
import { FaUpload } from "react-icons/fa";

export default function ImageUploadItem({
  title,
  index,
  imageItem,
  onImageChange,
}) {
  const [dragActive, setDragActive] = useState(false);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      onImageChange(index, base64);
    }
  };

  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      setDragActive(false);
      const base64 = await convertToBase64(file);
      onImageChange(index, base64);
      event.dataTransfer.clearData();
    }
  };

  return (
    <div className="mb-4">
      {title && (
        <div className="mb-2 text-sm font-medium text-gray-700">{title}</div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        id={`imageUpload${index}`}
        className="hidden"
      />
      <label
        htmlFor={`imageUpload${index}`}
        className="block w-full cursor-pointer"
      >
        <div
          className={`relative w-full h-56 md:h-72 rounded border-2 border-dashed overflow-hidden ${
            dragActive
              ? "border-blue-500 text-blue-500"
              : "border-gray-300 text-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {imageItem ? (
            <img
              src={imageItem}
              alt="Uploaded"
              className="absolute inset-0 object-cover w-full h-full rounded"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
              <FaUpload className="w-6 h-6" />
              <span className="text-sm">KÉO VÀ THẢ</span>
              <span className="text-xs">hoặc</span>
              <span className="text-sm font-medium">Chọn file</span>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}
