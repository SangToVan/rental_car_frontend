import { useEffect, useState } from "react";
import ImageUploadItem from "./ImageUploadItem";
const IMAGES_TITLE = ["Trước", "Sau", "Trái", "Phải"];

export default function ImagesUpload({ images = [], onChange }) {
  const [currentImages, setCurrentImages] = useState(
    images || new Array(4).fill({ id: null, imageItem: null })
  );

  useEffect(() => {
    setCurrentImages(
      images || new Array(4).fill({ id: null, imageItem: null })
    );
  }, [images]);

  const handleImageChange = async (index, base64) => {
    const updatedImages = [...currentImages];
    updatedImages[index] = {
      ...updatedImages[index],
      imageItem: base64,
      changed: true,
    };
    setCurrentImages(updatedImages);
    onChange(updatedImages);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {IMAGES_TITLE.map((title, index) => (
        <ImageUploadItem
          key={currentImages[index]?.id || index}
          title={title}
          index={index}
          imageItem={currentImages[index]?.imageItem}
          onImageChange={handleImageChange}
        />
      ))}
    </div>
  );
}
