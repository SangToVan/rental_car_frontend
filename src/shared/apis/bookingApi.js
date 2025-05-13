import { generateMetaSearchParams } from "../utils";
import axiosInstance from "../utils/authorizedAxios";

export const getBookingDetailsApi = async (bookingId) => {
  const res = await axiosInstance.get(`bookings/${bookingId}`);
  return res.data;
};

export const updateBookingApi = async (bookingId, updateData) => {
  const res = await axiosInstance.patch(
    `bookings/own/${bookingId}`,
    updateData
  );
  return res.data;
};

export const paymentBooking = async (bookingId, paymentData) => {
  const res = await axiosInstance.patch(
    `bookings/${bookingId}/payment-booking`,
    paymentData
  );
  return res.data;
};

export const getMyBookingApi = async ({
  page = 1,
  size = 5,
  sort = "id:desc",
}) => {
  const searchParams = generateMetaSearchParams(page, size, sort);
  const res = await axiosInstance.get(`bookings/own?${searchParams}`);
  return res.data;
};

export const getUnfinishedMyBookingApi = async ({
  page = 1,
  size = 5,
  sort = "bookingDate:desc",
}) => {
  const searchParams = generateMetaSearchParams(page, size, sort);
  const res = await axiosInstance.get(
    `bookings/own/unfinished?${searchParams}`
  );
  return res.data;
};

export const getFinishedMyBookingApi = async ({
  page = 1,
  size = 5,
  sort = "bookingDate:desc",
}) => {
  const searchParams = generateMetaSearchParams(page, size, sort);
  const res = await axiosInstance.get(`bookings/own/finished?${searchParams}`);
  return res.data;
};

export const addBookingApi = async (data) => {
  const res = await axiosInstance.post("bookings", data);
  return res.data;
};

export const confirmPickUpApi = async (bookingId) => {
  const res = await axiosInstance.patch(`bookings/${bookingId}/confirm-pickup`);
  return res.data;
};

export const confirmBookingApi = async (bookingId) => {
  const res = await axiosInstance.patch(
    `bookings/${bookingId}/confirm-booking`
  );
  return res.data;
};

export const cancelBookingApi = async (bookingId) => {
  const res = await axiosInstance.patch(`bookings/${bookingId}/cancel`);
  return res.data;
};

export const confirmReturnApi = async (bookingId) => {
  const res = await axiosInstance.patch(`bookings/${bookingId}/confirm-return`);
  return res.data;
};

export const completeBookingApi = async (bookingId) => {
  const res = await axiosInstance.patch(
    `bookings/${bookingId}/complete-booking`
  );
  return res.data;
};

export const addFeedbackApi = async (bookingId, data) => {
  const res = await axiosInstance.post(`bookings/${bookingId}/feedback`, data);
  return res.data;
};
