// Updated MyCar.jsx with logic for displaying buttons based on status
import { useCallback, useEffect, useState } from "react";
import {
  FiClock,
  FiDollarSign,
  FiEye,
  FiMapPin,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { getCarsByOwner } from "../../../shared/apis/carApi";
import ImageSlider from "../../common/ImageSlider";

export default function MyCar() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [total, setTotal] = useState(1);
  const [sortType, setSortType] = useState("id:desc");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    setLoading(true);
    getCarsByOwner({ page: currentPage, size: perPage, sort: sortType })
      .then((data) => {
        setCars(data.data);
        const meta = data.meta;
        if (meta.totalPages !== total) setTotal(meta.totalPages);
        if (meta.currentPage + 1 !== currentPage)
          setCurrentPage(meta.currentPage + 1);
      })
      .finally(() => setLoading(false));
  }, [currentPage, perPage, sortType, total]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleManageCar = (carId) => {
    navigate(`/user/car-setting/${carId}`);
  };

  const handleCarDetail = (carId) => {
    navigate(`/car/${carId}`);
  };

  const handleUpdateCar = (carId) => {
    navigate(`/user/car-register/${carId}`);
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case "UNVERIFIED":
        return {
          label: "Chưa xác thực",
          className: "bg-yellow-100 text-yellow-800",
        };
      case "WAITING":
        return {
          label: "Chờ xác thực",
          className: "bg-orange-100 text-orange-800",
        };
      case "ACTIVE":
        return {
          label: "Đã xác thực",
          className: "bg-green-100 text-green-800",
        };
      case "SUSPENDED":
        return { label: "Dừng cho thuê", className: "bg-red-100 text-red-800" };
      case "RENTED":
        return {
          label: "Đang được thuê",
          className: "bg-indigo-100 text-indigo-800",
        };
      default:
        return { label: status, className: "bg-gray-100 text-gray-800" };
    }
  };

  const formatCurrency = (value) => {
    const num = Number(value);
    return num.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Xe của tôi</h1>
        <Link
          to="/add-car"
          className="px-4 py-2 font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          Đăng ký xe mới
        </Link>
      </div>

      <div className="space-y-6">
        {cars.map((car) => {
          const status = car.status === "VERIFIED" ? "ACTIVE" : car.status;
          const statusDisplay = getStatusDisplay(status);
          const images = car.images || [];

          return (
            <div
              key={car.carId}
              className="overflow-hidden bg-white rounded-lg shadow"
            >
              <div className="flex flex-col md:flex-row">
                <ImageSlider
                  images={images}
                  height="h-64"
                  width="max-w-sm"
                  className="rounded shadow"
                />

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center mb-2">
                    <span
                      className={`rounded px-3 py-1 text-xs font-medium ${statusDisplay.className}`}
                    >
                      {statusDisplay.label}
                    </span>
                  </div>
                  <h2 className="mb-1 text-xl font-bold">{car.name}</h2>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center mr-4 text-sm">
                      <FiStar className="mr-1 text-yellow-500" />
                      <span>
                        {car.rating && car.rating > 0
                          ? car.rating.toFixed(1)
                          : "Chưa có đánh giá"}
                      </span>
                    </div>
                    <div className="flex items-center mr-4 text-sm">
                      <FiUsers className="mr-1 text-blue-500" />
                      <span>{car.completeBookingCount} chuyến</span>
                    </div>
                    <div className="flex items-center mr-4 text-sm">
                      <FiClock className="mr-1 text-orange-500" />
                      <span>
                        {car.inProgressBookingCount} đơn chưa hoàn thành
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FiClock className="mr-1 text-orange-500" />
                      <span>{car.pendingBookingCount} đơn chờ duyệt</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center mt-4">
                    <div className="flex items-center mb-2 mr-6">
                      <FiDollarSign className="mr-1 text-green-600" />
                      <p className="font-semibold">
                        Giá thuê:{" "}
                        {(Number(car.basePrice) / 1000).toLocaleString()} K/ngày
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <FiMapPin className="w-5 h-5 mr-1" />
                    <span>{car.address}</span>
                  </div>

                  <div className="flex items-center justify-end gap-2 mt-4">
                    <button
                      onClick={() => handleCarDetail(car.carId)}
                      className="px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <span className="flex items-center">
                        <FiEye className="mr-1" /> Xem chi tiết
                      </span>
                    </button>

                    {car.status === "UNVERIFIED" ? (
                      <button
                        onClick={() => handleUpdateCar(car.carId)}
                        className="px-4 py-2 font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                      >
                        Cập nhật thông tin
                      </button>
                    ) : car.status === "WAITING" ? (
                      <button
                        disabled
                        className="px-4 py-2 font-medium text-white bg-gray-300 rounded-md cursor-not-allowed"
                      >
                        Quản lý xe (đang chờ)
                      </button>
                    ) : (
                      <button
                        onClick={() => handleManageCar(car.carId)}
                        className="px-4 py-2 font-medium text-white bg-green-500 rounded-md hover:bg-green-600"
                      >
                        Quản lý xe
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {cars.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-gray-500">Không tìm thấy xe phù hợp</p>
          </div>
        )}
      </div>
    </div>
  );
}
