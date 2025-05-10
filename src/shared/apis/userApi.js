import axiosInstance from "../utils/authorizedAxios";

export const getMyProfileApi = async () => {
  const res = await axiosInstance.get("users/profile");
  return res.data;
};

export const updateMyProfileApi = async (data) => {
  const res = await axiosInstance.patch("users/profile", data);
  return res.data;
};

export const getMyWalletApi = async () => {
  const res = await axiosInstance.get("users/wallet");
  return res.data;
};

export const updateMyWalletApi = async (data) => {
  const res = await axiosInstance.patch("users/wallet", data);
  return res.data;
};
