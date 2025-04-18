import { Link } from "react-router-dom";
import clsx from "clsx";

export const LocationCard = ({ id, name, cars, imageUrl, className }) => {
  return (
    <Link
      to={`/city/${id}`}
      className={clsx(
        "group relative block overflow-hidden rounded-lg transition-all"
      )}
    >
      <div className="relative overflow-hidden rounded-lg aspect-square">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm">{cars}+ xe</p>
        </div>
      </div>
    </Link>
  );
};
