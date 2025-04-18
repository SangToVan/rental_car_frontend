import { mockCars } from "/src/utils/mockData.js";
import { CarCard } from "../cards/CarCard";
import { Button } from "../buttons/Button";

export default function Suggestion() {
  return (
    <>
      {/* Cars Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="mb-8 text-2xl font-bold text-mioto-dark md:text-3xl">
            Xe Dành Cho Bạn
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockCars.map((car) => (
              <CarCard
                key={car.id}
                id={car.id}
                name={car.name}
                imageUrl={car.images[0]}
                type={car.type}
                seats={car.seats}
                fuel={car.fuel}
                location={car.location}
                rating={car.rating}
                trips={car.trips}
                originalPrice={car.originalPrice}
                discountedPrice={car.discountedPrice}
                discount={car.discount}
                noDeposit={car.noDeposit}
                delivery={car.delivery}
                hourlyPrice={car.hourlyPrice}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              Xem thêm xe
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
