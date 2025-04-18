import { LocationCard } from "../cards/LocationCard";
import { mockLocations } from "/src/utils/mockData.js";

export default function Location() {
  return (
    <>
      {/* Locations Section */}
      <section className="py-12">
        <div className="container">
          <h2 className="mb-8 text-2xl font-bold text-mioto-dark md:text-3xl">
            Địa Điểm Nổi Bật
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
            {mockLocations.map((location) => (
              <LocationCard
                key={location.id}
                id={location.id}
                name={location.name}
                cars={location.cars}
                imageUrl={location.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
