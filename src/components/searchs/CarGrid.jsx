import CarCard from "./CarCard";

export default function CarGrid({ cars = [] }) {
  return (
    <div className="container px-4 py-6 mx-auto">
      {cars.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-64">
          <p className="text-gray-500">Không tìm thấy xe nào</p>
        </div>
      )}
    </div>
  );
}
