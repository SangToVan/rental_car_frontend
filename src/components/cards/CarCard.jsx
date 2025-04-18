import { Link } from "react-router-dom";
import clsx from "clsx";

export const CarCard = ({
  id,
  name,
  imageUrl,
  type,
  seats,
  fuel,
  location,
  rating,
  trips,
  originalPrice,
  discountedPrice,
  discount,
  noDeposit,
  delivery,
}) => {
  return (
    <Link
      to={`/car/${id}`}
      className={clsx(
        "group block overflow-hidden rounded-lg bg-white shadow-card transition-all hover:shadow-lg"
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute flex flex-col gap-1 left-2 top-2">
          {discount && (
            <span className="rounded bg-[#F57C00] px-2 py-0.5 text-xs font-medium text-white">
              Giảm {discount}%
            </span>
          )}
          {noDeposit && (
            <span className="rounded bg-[#D32F2F] px-2 py-0.5 text-xs font-medium text-white">
              Miễn thế chấp
            </span>
          )}
          {delivery && (
            <span className="rounded bg-[#388E3C] px-2 py-0.5 text-xs font-medium text-white">
              Giao xe tận nơi
            </span>
          )}
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-sm font-bold uppercase text-mioto-dark line-clamp-1">
          {name}
        </h3>

        <div className="flex items-center mt-1 text-xs text-gray-500">
          <span className="mr-2">{type}</span>
          <span className="mx-2">{seats} chỗ</span>
          <span className="ml-2">{fuel}</span>
        </div>

        <div className="mt-2 text-xs text-gray-500">{location}</div>

        <div className="flex items-center mt-2">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#ffc107]">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span className="ml-1 text-xs font-medium">{rating.toFixed(1)}</span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-xs text-gray-500">{trips} chuyến</span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div>
            {originalPrice && (
              <span className="mr-1 text-xs text-gray-400 line-through">
                {originalPrice.toLocaleString()}đ/ngày
              </span>
            )}
            {discountedPrice ? (
              <span className="font-bold text-primary">
                {discountedPrice.toLocaleString()}đ/ngày
              </span>
            ) : (
              originalPrice && (
                <span className="font-bold text-primary">
                  {originalPrice.toLocaleString()}đ/ngày
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
