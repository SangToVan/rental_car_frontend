import { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMapMarkedAlt,
  FaChevronLeft,
  FaSync,
  FaCarSide,
  FaBuilding,
  FaUser,
  FaClock,
  FaFileInvoiceDollar,
  FaImage,
} from "react-icons/fa";
import Select from "react-select";
import { vietnamLocations } from "../../shared/locations";
import TimeModal from "./modals/TimeModal";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInfor } from "../../shared/toolkits/searchSlice";
import { Controller, useForm } from "react-hook-form";
import {
  checkReturnDateTime,
  convertToLocalDateTime,
} from "../../shared/utils";

export default function SearchBar({ onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const searchInfor = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const [location, setLocation] = useState(null);
  const [pickupDateTime, setPickupDateTime] = useState(null);
  const [returnDateTime, setReturnDateTime] = useState(null);
  const [showTimeModal, setShowTimeModal] = useState(false);

  useEffect(() => {
    reset(searchInfor);
  }, [searchInfor, reset]);

  useEffect(() => {
    if (pickupDateTime && returnDateTime) {
      const sD = pickupDateTime.toISOString().split("T")[0];
      const sT = pickupDateTime.toTimeString().slice(0, 5);
      const eD = returnDateTime.toISOString().split("T")[0];
      const eT = returnDateTime.toTimeString().slice(0, 5);

      setValue("sD", sD);
      setValue("sT", sT);
      setValue("eD", eD);
      setValue("eT", eT);
    }
  }, [pickupDateTime, returnDateTime, setValue]);

  const handleTimeSelection = ({
    pickupDateTime,
    returnDateTime,
    sD,
    sT,
    eD,
    eT,
  }) => {
    setPickupDateTime(pickupDateTime);
    setReturnDateTime(returnDateTime);

    // Cập nhật vào react-hook-form
    setValue("sD", sD);
    setValue("sT", sT);
    setValue("eD", eD);
    setValue("eT", eT);

    setShowTimeModal(false);
  };

  const onHandleSubmit = (data) => {
    const { sD, sT, eD, eT } = data;

    if (convertToLocalDateTime(sD, sT) < new Date()) {
      setError("sD", {
        type: "custom",
        message: "Ngày lấy xe phải muộn hơn bây giờ!",
      });
      return;
    }

    if (!checkReturnDateTime(sD, sT, eD, eT)) {
      setError("eD", {
        type: "custom",
        message: "Ngày trả xe phải muộn hơn ngày lấy xe!",
      });
      return;
    }

    dispatch(setSearchInfor(data));
    if (onSubmit) onSubmit(data);
  };

  const timeRangeDisplay =
    pickupDateTime && returnDateTime
      ? `${pickupDateTime.toLocaleString()} → ${returnDateTime.toLocaleString()}`
      : null;

  return (
    // <form onSubmit={handleSubmit(onHandleSubmit)}>
    //   <div className="p-4 bg-white shadow-sm">
    //     <div className="flex flex-wrap items-center gap-4">
    //       <div className="flex items-center w-72">
    //         <FaMapMarkerAlt className="mr-2 text-gray-600" />
    //         <Select
    //           value={location}
    //           onChange={handleLocationChange}
    //           options={vietnamLocations}
    //           placeholder="Chọn địa điểm"
    //           classNamePrefix="react-select"
    //           className="flex-1"
    //           isSearchable
    //         />
    //         <input
    //           type="hidden"
    //           {...register("location", { required: "Vui lòng chọn địa điểm!" })}
    //         />
    //       </div>

    //       <div
    //         className="flex items-center text-gray-800 cursor-pointer"
    //         onClick={() => setShowTimeModal(true)}
    //       >
    //         <FaCalendarAlt className="mr-2 text-gray-600" />
    //         <span>{timeRangeDisplay || "Chọn thời gian thuê"}</span>
    //       </div>
    //     </div>

    //     <input type="hidden" {...register("sD")} />
    //     <input type="hidden" {...register("sT")} />
    //     <input type="hidden" {...register("eD")} />
    //     <input type="hidden" {...register("eT")} />

    //     {showTimeModal && (
    //       <TimeModal
    //         onClose={() => setShowTimeModal(false)}
    //         onSelectTime={handleTimeSelection}
    //       />
    //     )}
    //   </div>
    // </form>

    <form
      onSubmit={handleSubmit(onHandleSubmit)}
      className="bg-white shadow-sm"
    >
      <div className="container px-4 mx-auto">
        {/* Top search bar */}
        <div className="flex items-center py-3">
          <button className="mr-2 text-gray-500">
            <FaChevronLeft />
          </button>

          <div className="flex items-center ml-2 text-gray-800 cursor-pointer">
            <FaMapMarkerAlt className="mr-2 text-gray-600" />
            <Controller
              name="location"
              control={control}
              defaultValue={location}
              rules={{ required: "Hãy cung cấp địa điểm lấy xe!" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={vietnamLocations}
                  placeholder="Chọn địa điểm"
                  classNamePrefix="react-select"
                  className="w-64"
                  isSearchable
                  value={vietnamLocations.find(
                    (option) => option.value === field.value
                  )}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption.value);
                  }}
                />
              )}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>

          <div
            className="flex items-center ml-4 text-gray-800 cursor-pointer"
            onClick={() => setShowTimeModal(true)}
          >
            <FaCalendarAlt className="mr-2 text-gray-600" />
            <span>
              {pickupDateTime && returnDateTime
                ? `${pickupDateTime.toLocaleString()} → ${returnDateTime.toLocaleString()}`
                : "Chọn thời gian nhận và trả xe"}
            </span>
          </div>
        </div>

        <input type="hidden" {...register("sD")} />
        <input type="hidden" {...register("sT")} />
        <input type="hidden" {...register("eD")} />
        <input type="hidden" {...register("eT")} />

        {/* Filter options */}
        <div className="flex flex-wrap items-center py-3 border-t border-gray-200">
          <button className="flex items-center mr-4 text-gray-700">
            <FaSync className="mr-2" />
            <span>Cập nhật</span>
          </button>

          <button className="flex items-center mr-4 text-gray-700">
            <FaCarSide className="mr-2" />
            <span>Loại xe</span>
          </button>

          <button className="flex items-center mr-4 text-gray-700">
            <FaBuilding className="mr-2" />
            <span>Hãng xe</span>
          </button>

          <button className="flex items-center mr-4 text-gray-700">
            <FaUser className="mr-2" />
            <span>Chủ xe 5⭐</span>
          </button>

          <button className="flex items-center mr-4 text-gray-700">
            <FaMapMarkedAlt className="mr-2" />
            <span>Giao nhận tận nơi</span>
          </button>

          <button className="flex items-center mr-4 text-gray-700">
            <FaClock className="mr-2" />
            <span>Thuê giờ</span>
          </button>

          <button className="flex items-center mr-4 text-gray-700">
            <FaFileInvoiceDollar className="mr-2" />
            <span>Đặt xe nhanh</span>
          </button>

          <button className="flex items-center mr-4 text-gray-700">
            <FaImage className="mr-2" />
            <span>Miễn thế chấp</span>
          </button>

          <button className="flex items-center ml-auto text-gray-700">
            <span>Bộ lọc</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {showTimeModal && (
        <TimeModal
          onClose={() => setShowTimeModal(false)}
          onSelectTime={handleTimeSelection}
        />
      )}
    </form>
  );
}
