import { useEffect, useRef, useState } from "react";
import CarCard from "./CarCard";

export default function CarGrid({ cars = [] }) {
  const [visibleCars, setVisibleCars] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [message, setMessage] = useState("");
  const observerTarget = useRef(null);

  const CARS_PER_PAGE = 4;

  // Initial load
  useEffect(() => {
    if (cars.length > 0) {
      loadMoreCars();
    }
  }, [cars]);

  // Setup Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreCars();
        }
      },
      { threshold: 1.0 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [observerTarget, hasMore, loading]);

  const loadMoreCars = () => {
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const startIndex = (page - 1) * CARS_PER_PAGE;
      const endIndex = startIndex + CARS_PER_PAGE;
      const newCars = cars.slice(startIndex, endIndex);

      if (newCars.length > 0) {
        setVisibleCars((prev) => [...prev, ...newCars]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
        setMessage("Không còn xe nào để hiển thị");
      }

      setLoading(false);
    }, 800); // Simulate loading delay of 800ms
  };

  return (
    <div className="container px-4 py-6 mx-auto">
      {cars.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {/* Loading indicator and messages */}
          <div className="flex flex-col items-center justify-center mt-8">
            {loading && (
              <div className="flex flex-col items-center justify-center">
                <div className="w-8 h-8 mb-2 border-t-2 border-b-2 border-green-500 rounded-full animate-spin"></div>
                <p className="text-gray-600">Đang tải thêm xe...</p>
              </div>
            )}

            {!hasMore && message && (
              <div className="mt-4 text-center text-gray-600">
                <p>{message}</p>
              </div>
            )}

            {/* Observer target element */}
            <div ref={observerTarget} className="w-full h-4"></div>
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
