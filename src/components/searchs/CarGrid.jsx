import { useEffect, useRef, useState } from "react";
import CarCard from "./CarCard";
import { FaSpinner } from "react-icons/fa";

export default function CarGrid({ cars = [] }) {
  console.log("CarGrid render, cars length:", cars.length);
  const [carData, setCarData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const initialCars = useRef(cars);
  const loaderRef = useRef(null);

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    if (carData.length === 0) {
      loadMoreCars();
    }
  }, []);

  const loadMoreCars = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const start = carData.length;
      const end = start + ITEMS_PER_PAGE;
      const newCars = initialCars.current.slice(start, end);

      if (newCars.length > 0) {
        setCarData((prevCars) => [...prevCars, ...newCars]);
      }

      if (end >= initialCars.current.length) {
        setHasMore(false);
      }
    } catch (err) {
      setError("Failed to load more cars. Please try again.");
      console.error("Error loading more cars:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreCars(); // load đúng version mới nhất
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, isLoading]);

  return (
    <div className="container px-4 py-6 mx-auto">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {carData.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      <div ref={loaderRef} className="flex items-center justify-center mt-8">
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <FaSpinner className="text-2xl text-green-500 animate-spin" />
            <span>Đang tải thêm xe...</span>
          </div>
        )}

        {error && (
          <div className="p-4 text-red-700 bg-red-100 rounded">
            <p>{error}</p>
            <button
              onClick={() => loadMoreCars()}
              className="px-4 py-2 mt-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Thử lại
            </button>
          </div>
        )}

        {!hasMore && !isLoading && carData.length > 0 && (
          <div className="text-gray-500">
            <p>Bạn đã xem hết tất cả xe</p>
          </div>
        )}

        {!isLoading && carData.length === 0 && (
          <div className="text-gray-500">
            <p>Không tìm thấy xe nào</p>
          </div>
        )}
      </div>

      {/* Pagination dots */}
      {hasMore && carData.length > 0 && (
        <div className="flex items-center justify-center mt-8">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}
