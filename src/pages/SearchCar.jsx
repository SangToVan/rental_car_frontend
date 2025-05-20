import { useState, useEffect, useCallback } from "react";
import SearchBar from "../components/searchs/SearchBar";
import CarGrid from "../components/searchs/CarGrid";
import { useDispatch, useSelector } from "react-redux";
import { getCarsApi } from "../shared/apis/carApi";

export default function SearchCar() {
  const [perPage, setPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState("id:desc");
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const searchInfor = useSelector((state) => state.search);
  const { displayType } = useSelector(
    (state) => state.searchResultsDisplayType
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    getCarsApi(currentPage, perPage, sortType, searchInfor)
      .then((data) => {
        setCars(data?.data || []);
        const meta = data?.meta || {};
        setTotalItems(meta.totalItems || 0);
        setTotalPages(meta.totalPages || 1);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách xe:", err);
        setCars([]);
        setTotalItems(0);
        setTotalPages(1);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [perPage, currentPage, sortType, searchInfor]);

  console.log(cars.length);

  const handlePerPageChange = useCallback((e) => {
    const value = parseInt(e.target.value, 10);
    if (value < 1) setPerPage(1);
    else setPerPage(value);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchBar onSubmit={() => setCurrentPage(1)} />
      <div className="p-4">
        {loading ? (
          <div className="text-center text-gray-500">Đang tải dữ liệu...</div>
        ) : cars.length === 0 ? (
          <div className="text-center text-gray-500">
            Không tìm thấy xe phù hợp
          </div>
        ) : (
          <CarGrid cars={cars} />
        )}
      </div>
    </div>
  );
}
