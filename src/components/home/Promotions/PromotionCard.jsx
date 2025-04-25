import { Link } from "react-router-dom";
import { clsx } from "clsx";

// Component PromotionCard
export const PromotionCard = ({ id, imageUrl }) => {
  return (
    <Link
      to={`/promotion/${id}`}
      className={clsx("group block overflow-hidden rounded-lg transition-all")}
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt="Promotion"
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </div>
    </Link>
  );
};
