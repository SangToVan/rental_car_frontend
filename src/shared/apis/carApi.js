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

export const getCarsById = async (carId) => {
  const res = await axiosInstance.get(`cars/${carId}`);
  return res.data;
};

export const updateCarApi = async (carId, data) => {
  const res = await axiosInstance.patch(`cars/own/${carId}`, data);
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

  const search = {};
  const { location, sD, sT, eD, eT } = searchInfor;
  search.address = location;
  search.startTime = `${sD} ${sT}`;
  search.endTime = `${eD} ${eT}`;

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
  page = 1,
  size = 5,
  sort = "id:desc"
) => {
  const searchParams = generateMetaSearchParams(page, size, sort);
  const res = await axiosInstance.get(
    `cars/own/${carId}/bookings?${searchParams}`
  );
  return res.data;
};
