import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FaCalendarAlt } from "react-icons/fa";
import TimeModal from "../searchs/modals/TimeModal";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInfor } from "../../shared/toolkits/searchSlice";
import {
  checkReturnDateTime,
  convertToLocalDateTime,
} from "../../shared/utils";
import { Controller, useForm } from "react-hook-form";
import { addDays, addHours } from "date-fns";
import { getProvinces } from "@do-kevin/pc-vn";

export default function SearchForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    control, // THÊM control
    formState: { errors },
  } = useForm();

  const searchInfor = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const provinces = getProvinces();
  const locationOptions = provinces.map((p) => ({
    label: p.name,
    value: p.name,
  }));
  const today = new Date();
  const [pickupDateTime, setPickupDateTime] = useState(
    new Date(addHours(today, 2))
  );
  const [returnDateTime, setReturnDateTime] = useState(
    new Date(addDays(pickupDateTime, 2))
  );
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

  const onSubmit = (data) => {
    const { sD, sT, eD, eT } = data;

    if (convertToLocalDateTime(sD, sT) < new Date()) {
      setError("sD", {
        type: "custom",
        message: "Thời gian lấy xe phải muộn hơn thời gian hiện tại",
      });
      return;
    }

    if (!checkReturnDateTime(sD, sT, eD, eT)) {
      setError("eD", {
        type: "custom",
        message: "Thời gian trả xe phải muộn hơn thời gian lấy xe",
      });
      return;
    }

    dispatch(setSearchInfor(data));
    navigate("/search");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full px-4 py-6 bg-white rounded-lg shadow-md"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative">
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Địa điểm nhận xe
          </label>
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
                isSearchable
                value={locationOptions.find((opt) => opt.value === field.value)}
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

        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-600">
            Thời gian thuê xe
          </label>
          <div
            onClick={() => setShowTimeModal(true)}
            className="flex items-center justify-between w-full px-4 py-2 text-gray-700 border rounded-md cursor-pointer hover:border-blue-500"
          >
            <span>
              {pickupDateTime && returnDateTime
                ? `${pickupDateTime.toLocaleString()} → ${returnDateTime.toLocaleString()}`
                : "Chọn thời gian nhận và trả xe"}
            </span>
            <FaCalendarAlt className="ml-2 text-gray-400" />
          </div>
        </div>
      </div>

      <input type="hidden" {...register("sD")} />
      <input type="hidden" {...register("sT")} />
      <input type="hidden" {...register("eD")} />
      <input type="hidden" {...register("eT")} />

      <div className="mt-6 text-center">
        <button
          type="submit"
          className="px-6 py-2 text-white rounded-md bg-primary hover:bg-primary-dark"
        >
          Tìm xe
        </button>
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
