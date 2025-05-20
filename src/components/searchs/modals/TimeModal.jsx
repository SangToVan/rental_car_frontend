import { useState, useEffect } from "react";
import {
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaChevronLeft,
  FaInfoCircle,
} from "react-icons/fa";
import {
  format,
  addMonths,
  subMonths,
  getYear,
  getMonth,
  getDaysInMonth,
  getDay,
  isToday,
  isWeekend,
  isBefore,
  setHours,
  setMinutes,
  isAfter,
  isSameDay,
  startOfMonth,
  addHours,
  addDays,
  parse,
} from "date-fns";
import { vi } from "date-fns/locale";
import { useSelector } from "react-redux";

export default function TimeModal({ onClose, onSelectTime }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [error, setError] = useState(null);
  const nextMonth = addMonths(currentMonth, 1);
  const [selectionState, setSelectionState] = useState("pickup");

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        options.push(
          `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`
        );
      }
    }
    return options;
  };
  const timeOptions = generateTimeOptions();
  const searchInfor = useSelector((state) => state.search);

  const [pickupDate, setPickupDate] = useState(new Date(addDays(today, 1)));
  const [returnDate, setReturnDate] = useState(new Date(addDays(today, 3)));
  const [pickupTime, setPickupTime] = useState("8:00");
  const [returnTime, setReturnTime] = useState("20:00");

  useEffect(() => {
    if (
      searchInfor?.sD &&
      searchInfor?.sT &&
      searchInfor?.eD &&
      searchInfor?.eT
    ) {
      const parseDateTime = (dateStr, timeStr) => {
        const combined = `${dateStr} ${timeStr}`;

        const isSlashFormat = dateStr.includes("/"); // "dd/MM/yyyy"
        const formatPattern = isSlashFormat
          ? "dd/MM/yyyy HH:mm"
          : "yyyy-MM-dd HH:mm";

        const parsed = parse(combined, formatPattern, new Date());
        return isNaN(parsed) ? new Date() : parsed;
      };

      const pickup = parseDateTime(searchInfor.sD, searchInfor.sT);
      const ret = parseDateTime(searchInfor.eD, searchInfor.eT);

      setPickupDate(pickup);
      setReturnDate(ret);

      if (timeOptions.includes(searchInfor.sT)) {
        setPickupTime(searchInfor.sT);
      }

      if (timeOptions.includes(searchInfor.eT)) {
        setReturnTime(searchInfor.eT);
      }

      setCurrentMonth(pickup);
    }
  }, [searchInfor]);

  useEffect(() => {
    if (pickupDate && returnDate) {
      const [ph, pm] = pickupTime.split(":").map(Number);
      const [rh, rm] = returnTime.split(":").map(Number);
      const pd = setMinutes(setHours(new Date(pickupDate), ph), pm);
      const rd = setMinutes(setHours(new Date(returnDate), rh), rm);
      if (isSameDay(pd, rd) && !isAfter(rd, pd)) {
        setError("Thời gian trả xe phải sau thời gian nhận xe");
      } else {
        setError(null);
      }
    }
  }, [pickupDate, returnDate, pickupTime, returnTime]);

  const getVietnamDay = (date) => {
    const day = getDay(date);
    return day === 0 ? 6 : day - 1;
  };

  const handleDateSelection = (date) => {
    if (isBefore(date, today) && !isToday(date)) return;
    if (selectionState === "pickup") {
      setPickupDate(date);
      setReturnDate(null);
      setSelectionState("return");
    } else {
      let newPickup = pickupDate;
      let newReturn = date;
      if (isBefore(date, pickupDate)) {
        newReturn = pickupDate;
        newPickup = date;
      }
      setPickupDate(newPickup);
      setReturnDate(newReturn);
      setSelectionState("pickup");
    }
  };

  const renderCalendar = (month) => {
    const start = startOfMonth(month);
    const dim = getDaysInMonth(month);
    const startDay = getVietnamDay(start);
    const days = [];
    const dow = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

    for (let i = 0; i < startDay; i++)
      days.push(<div key={`e-${i}`} className="w-8 h-8" />);

    for (let day = 1; day <= dim; day++) {
      const date = new Date(getYear(month), getMonth(month), day);
      const isSelected =
        (pickupDate && isSameDay(date, pickupDate)) ||
        (returnDate && isSameDay(date, returnDate));
      const isInRange =
        pickupDate &&
        returnDate &&
        isAfter(date, pickupDate) &&
        isBefore(date, returnDate);
      const isPast = isBefore(date, today) && !isToday(date);
      days.push(
        <div
          key={day}
          onClick={() => !isPast && handleDateSelection(date)}
          className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm
            ${isSelected ? "bg-green-500 text-white" : ""}
            ${isInRange ? "bg-green-100 text-green-800" : ""}
            ${isPast ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"}`}
        >
          {day}
        </div>
      );
    }

    return (
      <div>
        <div className="grid grid-cols-7 gap-2">
          {dow.map((d) => (
            <div key={d} className="text-sm text-center">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 mt-2">{days}</div>
      </div>
    );
  };

  const handleConfirm = () => {
    if (pickupDate && returnDate && !error) {
      const [ph, pm] = pickupTime.split(":").map(Number);
      const [rh, rm] = returnTime.split(":").map(Number);
      const pd = setMinutes(setHours(new Date(pickupDate), ph), pm);
      const rd = setMinutes(setHours(new Date(returnDate), rh), rm);

      const formatDate = (date) => date.toISOString().split("T")[0]; // yyyy-MM-dd
      const formatTime = (date) => date.toTimeString().slice(0, 5); // HH:mm

      onSelectTime({
        pickupDateTime: pd,
        returnDateTime: rd,
        sD: formatDate(pd),
        sT: formatTime(pd),
        eD: formatDate(rd),
        eT: formatTime(rd),
      });

      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-xl p-5 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Thời gian</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mb-3 text-sm font-medium text-gray-600">
          {selectionState === "pickup"
            ? "Chọn ngày nhận xe"
            : "Chọn ngày trả xe"}
        </div>

        <div className="flex mb-6">
          <div className="flex-1 mr-4">
            <div className="flex justify-between mb-3">
              <button
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                disabled={
                  getMonth(currentMonth) === getMonth(today) &&
                  getYear(currentMonth) === getYear(today)
                }
              >
                <FaChevronLeft className="text-gray-600" />
              </button>
              <h3 className="text-lg font-medium">
                {format(currentMonth, "MMMM yyyy", { locale: vi })}
              </h3>
            </div>
            {renderCalendar(currentMonth)}
          </div>

          <div className="flex-1">
            <div className="flex justify-between mb-3">
              <h3 className="text-lg font-medium">
                {format(nextMonth, "MMMM yyyy", { locale: vi })}
              </h3>
              <button
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            </div>
            {renderCalendar(nextMonth)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Nhận xe
            </label>
            <select
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              disabled={!pickupDate}
              className="w-full px-4 py-2 pr-8 bg-white border border-gray-300 rounded-lg"
            >
              {timeOptions.map((time) => (
                <option key={`p-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Trả xe
            </label>
            <select
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              disabled={!returnDate}
              className="w-full px-4 py-2 pr-8 bg-white border border-gray-300 rounded-lg"
            >
              {timeOptions.map((time) => (
                <option key={`r-${time}`} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-600 bg-red-100 rounded-md">
            <p className="flex items-center">
              <FaInfoCircle className="mr-2" />
              {error}
            </p>
          </div>
        )}

        <div className="mt-4">
          <button
            onClick={handleConfirm}
            disabled={!pickupDate || !returnDate || !!error}
            className={`w-full rounded-lg px-4 py-3 font-semibold text-white ${
              !pickupDate || !returnDate || error
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
}
