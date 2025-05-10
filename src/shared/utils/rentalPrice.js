import { differenceInCalendarDays, isValid, parse } from "date-fns";

// Định dạng ngày mặc định hệ thống
const SUPPORTED_FORMATS = ["yyyy-MM-dd HH:mm", "dd/MM/yyyy HH:mm"];

// Hằng số cố định (vnđ/ngày)
export const INSURANCE_FEE_PER_DAY = 100_000;
export const PASSENGER_INSURANCE_FEE_PER_DAY = 50_000;

/**
 * Tính số ngày thuê dựa vào start và end date string.
 * Nếu khác ngày dù chỉ 1 phút, vẫn tính thêm 1 ngày.
 * @param {string} startDateStr - dạng "dd/MM/yyyy HH:mm"
 * @param {string} endDateStr - dạng "dd/MM/yyyy HH:mm"
 * @returns {number} số ngày thuê (tối thiểu 1)
 */
export function calculateRentalDays(startDateStr, endDateStr) {
  let start, end;

  for (const fmt of SUPPORTED_FORMATS) {
    start = parse(startDateStr, fmt, new Date());
    end = parse(endDateStr, fmt, new Date());
    if (isValid(start) && isValid(end)) break;
  }

  if (!isValid(start) || !isValid(end)) {
    console.warn("❌ Ngày không hợp lệ:", { startDateStr, endDateStr });
    return 0;
  }

  const days = differenceInCalendarDays(end, start) + 1;
  return Math.max(days, 1);
}

/**
 * Tính tổng chi phí thuê xe
 * @param {number} basePricePerDay - giá thuê cơ bản (vnđ/ngày)
 * @param {number} rentalDays - số ngày thuê
 * @param {number} [insurancePerDay=INSURANCE_FEE_PER_DAY]
 * @param {number} [passengerInsurancePerDay=PASSENGER_INSURANCE_FEE_PER_DAY]
 * @returns {number} tổng tiền thuê
 */
export function calculateTotalRentalCost(
  basePricePerDay,
  rentalDays,
  insurancePerDay = INSURANCE_FEE_PER_DAY,
  passengerInsurancePerDay = PASSENGER_INSURANCE_FEE_PER_DAY
) {
  return (
    rentalDays * (basePricePerDay + insurancePerDay + passengerInsurancePerDay)
  );
}
