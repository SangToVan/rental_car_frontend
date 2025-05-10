import CarCard from "../searchs/CarCard";
import Button from "../ui/Button";

export default function Suggestion({ cars = [] }) {
  return (
    <>
      {/* Cars Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="mb-8 text-2xl font-bold text-mioto-dark md:text-3xl">
            Xe Dành Cho Bạn
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cars.map((item) => (
              <CarCard key={item.carId} car={item} />
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
