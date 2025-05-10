import axiosInstance from "../utils/authorizedAxios";

export const getListCarApi = async () => {
  const res = await axiosInstance.get(`home/car`);
  return res.data;
};
