import { useState, useEffect } from "react";
import {
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaInfoCircle,
  FaChevronLeft,
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
  addHours,
  addMinutes,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  startOfMonth,
  setHours,
  setMinutes,
  isAfter,
  isSameDay,
} from "date-fns";
import { vi } from "date-fns/locale";

export default function TimeModal({ onClose }) {
  const [activeTab, setActiveTab] = useState("day");

  // Current date for reference
  const today = new Date();

  // Calendar navigation
  const [currentMonth, setCurrentMonth] = useState(today);
  const nextMonth = addMonths(currentMonth, 1);

  // Selected dates
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  // References to the dates with times for display and calculations
  const [effectivePickupDate, setEffectivePickupDate] = useState(null);
  const [effectiveReturnDate, setEffectiveReturnDate] = useState(null);

  // Selection state
  const [selectionState, setSelectionState] = useState("pickup");

  // Time selection
  const [pickupTime, setPickupTime] = useState("21:00");
  const [returnTime, setReturnTime] = useState("20:00");

  // Error handling
  const [error, setError] = useState(null);

  // Reset dates when tab changes
  useEffect(() => {
    setPickupDate(null);
    setReturnDate(null);
    setEffectivePickupDate(null);
    setEffectiveReturnDate(null);
    setSelectionState("pickup");
    setError(null);
  }, [activeTab]);

  // Generate time options in 15-minute intervals
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  // Update full date objects when time changes
  useEffect(() => {
    if (!pickupDate) return;

    // Update the pickup date with selected time
    const [pickupHours, pickupMinutes] = pickupTime.split(":").map(Number);
    const newPickupDate = setMinutes(
      setHours(new Date(pickupDate), pickupHours),
      pickupMinutes
    );
    setEffectivePickupDate(newPickupDate);

    // Update the return date with selected time (if it exists)
    if (returnDate) {
      const [returnHours, returnMinutes] = returnTime.split(":").map(Number);
      const newReturnDate = setMinutes(
        setHours(new Date(returnDate), returnHours),
        returnMinutes
      );
      setEffectiveReturnDate(newReturnDate);

      // Validate times
      if (
        isSameDay(newPickupDate, newReturnDate) &&
        !isAfter(newReturnDate, newPickupDate)
      ) {
        setError("Thời gian trả xe phải sau thời gian nhận xe");
      } else {
        setError(null);
      }
    }
  }, [pickupTime, returnTime, pickupDate, returnDate]);

  // Calculate rental duration - Fixed version
  const calculateDuration = () => {
    if (!effectivePickupDate || !effectiveReturnDate) return "";

    // Calculate total difference in minutes
    const totalMinutes = differenceInMinutes(
      effectiveReturnDate,
      effectivePickupDate
    );

    // Calculate days, hours, and minutes
    const days = Math.floor(totalMinutes / (24 * 60));
    const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
    const minutes = totalMinutes % 60;

    // Format the output string
    if (days > 0) {
      if (hours > 0) {
        return `${days} ngày ${hours} giờ`;
      }
      return `${days} ngày`;
    }

    if (hours > 0) {
      if (minutes > 0) {
        return `${hours} giờ ${minutes} phút`;
      }
      return `${hours} giờ`;
    }

    return `${minutes} phút`;
  };

  // Helper to get day of week adjusted for Vietnam calendar (Monday as first day)
  const getVietnamDay = (date) => {
    const day = getDay(date);
    return day === 0 ? 6 : day - 1; // Convert Sunday (0) to 6, and shift others by -1
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Handle date selection
  const handleDateSelection = (date) => {
    // Prevent selecting dates in the past
    if (isBefore(date, today) && !isToday(date)) return;

    if (selectionState === "pickup") {
      // Clear both dates and set a new pickup date
      setPickupDate(date);
      setReturnDate(null);
      setEffectiveReturnDate(null);

      // Update effective pickup date with selected time
      const [hours, minutes] = pickupTime.split(":").map(Number);
      const dateWithTime = setMinutes(setHours(new Date(date), hours), minutes);
      setEffectivePickupDate(dateWithTime);

      setSelectionState("return");
    } else {
      // Second selection - return date
      let newPickupDate = pickupDate;
      let newReturnDate = date;

      if (isBefore(date, pickupDate)) {
        // If selected date is before pickup date, swap them
        newReturnDate = pickupDate;
        newPickupDate = date;
      }

      setPickupDate(newPickupDate);
      setReturnDate(newReturnDate);

      // Update effective dates with selected times
      const [pickupHours, pickupMinutes] = pickupTime.split(":").map(Number);
      const [returnHours, returnMinutes] = returnTime.split(":").map(Number);

      const effectivePickup = setMinutes(
        setHours(new Date(newPickupDate), pickupHours),
        pickupMinutes
      );
      const effectiveReturn = setMinutes(
        setHours(new Date(newReturnDate), returnHours),
        returnMinutes
      );

      setEffectivePickupDate(effectivePickup);
      setEffectiveReturnDate(effectiveReturn);

      setSelectionState("pickup"); // Reset for next selection
    }
  };

  // Render calendar for a specific month
  const renderCalendar = (month) => {
    const monthStart = startOfMonth(month);
    const daysInMonth = getDaysInMonth(month);
    const startDay = getVietnamDay(monthStart);
    const days = [];
    const daysOfWeek = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

    // Render days of week header
    const header = daysOfWeek.map((day) => (
      <div
        key={`header-${day}`}
        className="w-8 h-8 text-sm font-medium text-center text-gray-600"
      >
        {day}
      </div>
    ));

    // Add empty cells for days before the start day
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}-${month}`} className="w-8 h-8" />);
    }

    // Render the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(getYear(month), getMonth(month), day);
      const isPickupDay = pickupDate ? isSameDay(date, pickupDate) : false;
      const isReturnDay = returnDate ? isSameDay(date, returnDate) : false;
      const isInRange =
        pickupDate &&
        returnDate &&
        isAfter(date, pickupDate) &&
        isBefore(date, returnDate);
      const isPastDate = isBefore(date, today) && !isToday(date);
      const isWeekendDay = isWeekend(date);
      const isTodayDate = isToday(date);

      days.push(
        <div
          key={`day-${day}-${month}`}
          className={`
            flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm
            ${isPastDate ? "cursor-not-allowed opacity-30" : ""}
            ${isPickupDay ? "bg-green-500 text-white" : ""}
            ${isReturnDay ? "bg-green-500 text-white" : ""}
            ${isInRange ? "bg-green-100 text-green-800" : ""}
            ${
              isWeekendDay && !isPickupDay && !isReturnDay && !isInRange
                ? "text-red-500"
                : ""
            }
            ${
              isTodayDate && !isPickupDay && !isReturnDay
                ? "border border-green-500"
                : ""
            }
            ${
              !isPastDate && !isPickupDay && !isReturnDay && !isInRange
                ? "hover:bg-gray-100"
                : ""
            }
          `}
          onClick={() => {
            if (!isPastDate) {
              handleDateSelection(date);
            }
          }}
        >
          {day}
        </div>
      );
    }

    return (
      <div>
        <div className="grid grid-cols-7 gap-2">{header}</div>
        <div className="grid grid-cols-7 gap-2 mt-2">{days}</div>
      </div>
    );
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

        {/* Rental Type Tabs */}
        <div className="mb-6">
          <div className="relative flex border-b border-gray-200">
            <button
              className={`mr-8 pb-3 font-medium ${
                activeTab === "day" ? "text-green-500" : "text-gray-700"
              }`}
              onClick={() => {
                setActiveTab("day");
              }}
            >
              Thuê theo ngày
            </button>
            <button
              className={`pb-3 font-medium ${
                activeTab === "hour" ? "text-green-500" : "text-gray-700"
              }`}
              onClick={() => {
                setActiveTab("hour");
              }}
            >
              Thuê theo giờ
            </button>
            <div
              className={`absolute bottom-0 h-0.5 w-24 bg-green-500 transition-all duration-200 ${
                activeTab === "hour" ? "left-32" : "left-0"
              }`}
            />
          </div>
        </div>

        {/* Current Selection State */}
        <div className="mb-3 text-sm font-medium text-gray-600">
          {selectionState === "pickup"
            ? "Chọn ngày nhận xe"
            : "Chọn ngày trả xe"}
        </div>

        {/* Calendar Section */}
        <div className="flex mb-6">
          <div className="flex-1 mr-4">
            <div className="flex items-center justify-between mb-3">
              <button
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                onClick={goToPreviousMonth}
                disabled={
                  getMonth(currentMonth) === getMonth(today) &&
                  getYear(currentMonth) === getYear(today)
                }
              >
                <FaChevronLeft className="text-gray-600" />
              </button>
              <h3 className="text-lg font-medium text-center">
                {format(currentMonth, "MMMM yyyy", { locale: vi })}
              </h3>
            </div>
            {renderCalendar(currentMonth)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-center">
                {format(nextMonth, "MMMM yyyy", { locale: vi })}
              </h3>
              <button
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                onClick={goToNextMonth}
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            </div>
            {renderCalendar(nextMonth)}
          </div>
        </div>

        {/* Time Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Nhận xe
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-2 pr-8 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:border-green-500 focus:outline-none"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                disabled={!pickupDate}
              >
                {timeOptions.map((time) => (
                  <option key={`pickup-${time}`} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FaChevronDown className="text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Trả xe
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-2 pr-8 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:border-green-500 focus:outline-none"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                disabled={!returnDate}
              >
                {timeOptions.map((time) => (
                  <option key={`return-${time}`} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FaChevronDown className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 mb-4 text-sm text-red-600 bg-red-100 rounded-md">
            <p className="flex items-center">
              <FaInfoCircle className="mr-2" />
              {error}
            </p>
          </div>
        )}

        {/* Summary */}
        <div className="p-4 mb-6 rounded-lg bg-gray-50">
          {pickupDate && returnDate ? (
            <>
              <p className="text-gray-700">
                {format(effectivePickupDate || pickupDate, "HH:mm, dd/MM/yyyy")}{" "}
                -{" "}
                {format(effectiveReturnDate || returnDate, "HH:mm, dd/MM/yyyy")}
              </p>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <p>
                  Thời gian thuê:{" "}
                  <span className="font-medium text-green-600">
                    {calculateDuration()}
                  </span>
                </p>
                <FaInfoCircle className="ml-1 text-gray-400" />
              </div>
            </>
          ) : pickupDate ? (
            <p className="text-gray-700">
              Nhận xe:{" "}
              {format(effectivePickupDate || pickupDate, "HH:mm, dd/MM/yyyy")} -
              Vui lòng chọn ngày trả xe
            </p>
          ) : (
            <p className="text-gray-700">
              Vui lòng chọn ngày nhận xe và trả xe
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            className={`w-full rounded-lg px-4 py-3 font-semibold text-white ${
              !pickupDate || !returnDate || error
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
            disabled={!pickupDate || !returnDate || !!error}
            onClick={onClose}
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
}
