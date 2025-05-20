import axios from "axios";
import { generateMetaSearchParams } from "../utils";
import axiosInstance from "../utils/authorizedAxios";
import { API_URL } from "../constants";

export const getCarsByOwner = async ({
  page = 1,
  size = 5,
  sort = "id:desc",
}) => {
  const searchParams = generateMetaSearchParams(page, size, sort);
  const res = await axiosInstance.get(`cars/own?${searchParams}`);
  return res.data;
};

export const getCarsById = async (carId, startDateTime, endDateTime) => {
  const params = {};

  if (startDateTime && endDateTime) {
    params.startDateTime = startDateTime;
    params.endDateTime = endDateTime;
  }

  const res = await axiosInstance.get(`cars/${carId}`, { params });
  return res.data;
};

export const getCarDetailForOwnerApi = async (carId) => {
  const res = await axiosInstance.get(`cars/own/${carId}`);
  return res.data;
};

export const getRegisterCarApi = async (carId) => {
  const res = await axiosInstance.get(`cars/own/register/${carId}`);
  return res.data;
};

export const registerCarApi = async (carId, data) => {
  const res = await axiosInstance.patch(`cars/own/register/${carId}`, data);
  return res.data;
};

export const updateCarApi = async (carId, data) => {
  const res = await axiosInstance.patch(`cars/own/${carId}`, data);
  return res.data;
};

export const updateCarInfoApi = async (carId, data) => {
  const res = await axiosInstance.patch(`cars/own/${carId}/info`, data);
  return res.data;
};

export const updateCarPricingApi = async (carId, data) => {
  const res = await axiosInstance.patch(`cars/own/${carId}/pricing`, data);
  return res.data;
};

export const addCarApi = async (data) => {
  const res = await axiosInstance.post("cars", data);
  return res.data;
};

export const getCarsApi = async (
  page = 1,
  size = 5,
  sort = "id:desc",
  searchInfor
) => {
  const metaParams = generateMetaSearchParams(page, size, sort);

  const {
    location,
    sD,
    sT,
    eD,
    eT,
    brand,
    numberOfSeats,
    transmission,
    fuelType,
    minPrice,
    maxPrice,
  } = searchInfor;

  const search = {
    address: location,
    startTime: `${sD} ${sT}`,
    endTime: `${eD} ${eT}`,
  };

  // ✅ Thêm các filter nếu có
  if (brand) search.brand = brand;
  if (numberOfSeats) search.numberOfSeats = numberOfSeats;
  if (transmission) search.transmission = transmission;
  if (fuelType) search.fuelType = fuelType;
  if (minPrice) search.minPrice = minPrice;
  if (maxPrice) search.maxPrice = maxPrice;

  const searchInforParams = new URLSearchParams(search).toString();

  const res = await axios.get(
    `${API_URL}cars?${metaParams}&${searchInforParams}`
  );
  return res.data;
};

export const stopRentingApi = async (carId) => {
  const res = await axiosInstance.patch(`cars/${carId}/status`);
  return res.data;
};

export const getCarBookingApi = async (
  carId,
  status,
  page = 1,
  size = 5,
  sort = "id:desc"
) => {
  const searchParams = generateMetaSearchParams(page, size, sort);
  const query = new URLSearchParams(searchParams);

  if (status) {
    query.append("status", status);
  }

  const res = await axiosInstance.get(
    `cars/own/${carId}/bookings?${query.toString()}`
  );
  return res.data;
};
