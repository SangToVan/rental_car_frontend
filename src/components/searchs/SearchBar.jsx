import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaChevronLeft } from "react-icons/fa";
import Select from "react-select";
import TimeModal from "./modals/TimeModal";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInfor } from "../../shared/toolkits/searchSlice";
import { Controller, useForm } from "react-hook-form";
import {
  checkReturnDateTime,
  convertToLocalDateTime,
} from "../../shared/utils";
import { getProvinces } from "@do-kevin/pc-vn";

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

  const provinces = getProvinces();
  const locationOptions = provinces.map((p) => ({
    label: p.name,
    value: p.name,
  }));
  const [location, setLocation] = useState(null);
  const [pickupDateTime, setPickupDateTime] = useState(null);
  const [returnDateTime, setReturnDateTime] = useState(null);
  const [showTimeModal, setShowTimeModal] = useState(false);

  useEffect(() => {
    reset(searchInfor);
  }, [searchInfor, reset]);

  useEffect(() => {
    if (
      searchInfor?.sD &&
      searchInfor?.sT &&
      searchInfor?.eD &&
      searchInfor?.eT
    ) {
      const pickup = convertToLocalDateTime(searchInfor.sD, searchInfor.sT);
      const dropoff = convertToLocalDateTime(searchInfor.eD, searchInfor.eT);
      setPickupDateTime(pickup);
      setReturnDateTime(dropoff);
    }
  }, [searchInfor]);

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

  return (
    <form
      onSubmit={handleSubmit(onHandleSubmit)}
      className="bg-white shadow-sm"
    >
      <div className="container px-4 py-4 mx-auto space-y-4">
        {/* Top search section */}
        <div className="flex flex-wrap items-center gap-4">
          <button type="button" className="text-gray-500">
            <FaChevronLeft />
          </button>

          <div className="flex items-center gap-2 text-gray-800">
            <FaMapMarkerAlt className="text-gray-600" />
            <Controller
              name="location"
              control={control}
              defaultValue={location}
              rules={{ required: "Hãy cung cấp địa điểm lấy xe!" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={locationOptions}
                  placeholder="Chọn địa điểm"
                  classNamePrefix="react-select"
                  className="w-64"
                  isSearchable
                  value={locationOptions.find(
                    (opt) => opt.value === field.value
                  )}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption.value);
                  }}
                />
              )}
            />
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>

          <div
            className="flex items-center text-gray-800 cursor-pointer"
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

        {/* Hidden time values */}
        <input type="hidden" {...register("sD")} />
        <input type="hidden" {...register("sT")} />
        <input type="hidden" {...register("eD")} />
        <input type="hidden" {...register("eT")} />

        {/* Bộ lọc mở rộng */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            {...register("brand")}
            placeholder="Hãng xe (VD: Toyota)"
            className="p-2 border rounded"
          />
          <input
            type="number"
            {...register("numberOfSeats")}
            placeholder="Số chỗ ngồi"
            className="p-2 border rounded"
          />
          <select {...register("transmission")} className="p-2 border rounded">
            <option value="">-- Hộp số --</option>
            <option value="AUTOMATIC">Tự động</option>
            <option value="MANUAL">Số sàn</option>
            <option value="SEMI_AUTOMATIC">Bán tự động</option>
          </select>
          <select {...register("fuelType")} className="p-2 border rounded">
            <option value="">-- Nhiên liệu --</option>
            <option value="PETRO">Xăng</option>
            <option value="DIESEL">Dầu</option>
            <option value="ELECTRIC">Điện</option>
            <option value="HYBRID">Hybrid</option>
          </select>
          <input
            type="number"
            {...register("minPrice")}
            placeholder="Giá từ"
            className="p-2 border rounded"
          />
          <input
            type="number"
            {...register("maxPrice")}
            placeholder="Giá đến"
            className="p-2 border rounded"
          />
        </div>

        {/* Submit */}
        <div className="mt-4 text-center">
          <button
            type="submit"
            className="px-6 py-2 text-white rounded-md bg-primary hover:bg-primary-dark"
          >
            Tìm xe
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
