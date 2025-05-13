import { useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const CarGallery = ({ images = [], alt, className }) => {
  if (images.length === 0) {
    return null;
  }

  const [mainImage, setMainImage] = useState(images[0].imageUrl);

  return (
    <div className={cn("", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <img src={mainImage} alt={alt} className="object-cover w-full h-full" />
        <button
          className="absolute p-2 rounded-full right-4 top-4 bg-white/80"
          aria-label="View all images"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-2">
        {images.map((image, index) => (
          <button
            key={image?.id || index} // Using the image URL as key
            className={cn(
              "relative aspect-[4/3] overflow-hidden rounded-lg",
              image === mainImage && "ring-2 ring-primary"
            )}
            onClick={() => setMainImage(image.imageUrl)}
          >
            <img
              src={image.imageUrl}
              alt={`${alt} thumbnail`}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      <div className="mt-2 text-center">
        <button className="text-sm text-primary hover:underline">
          Xem tất cả ảnh
        </button>
      </div>
    </div>
  );
};

export default CarGallery;
