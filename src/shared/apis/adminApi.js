import axiosInstance from "../utils/authorizedAxios";

export const getDashboardApi = async () => {
  const res = await axiosInstance.get("admin/dashboard");
  return res.data;
};

export const getBookingApi = async (status) => {
  const res = await axiosInstance.get("admin/bookings", {
    params: { status },
  });
  return res.data;
};

export const getBookingDetailApi = async (bookingId) => {
  const res = await axiosInstance.get(`admin/bookings/${bookingId}`);
  return res.data;
};

export const getEscrowApi = async () => {
  const res = await axiosInstance.get("admin/escrows");
  return res.data;
};

export const getCarApi = async (status) => {
  const res = await axiosInstance.get("admin/cars", {
    params: { status },
  });
  return res.data;
};

export const getCarDetailApi = async (carId) => {
  const res = await axiosInstance.get(`admin/cars/${carId}`);
  return res.data;
};

export const verifyCarApi = async (carId) => {
  const res = await axiosInstance.patch(`admin/cars/${carId}/verify`);
  return res.data;
};

export const getUserApi = async (role) => {
  const res = await axiosInstance.get("admin/users", {
    params: { role },
  });
  return res.data;
};

export const getUserDetailApi = async (userId) => {
  const res = await axiosInstance.get(`admin/users/${userId}`);
  return res.data;
};

export const verifyUserLicenseApi = async (userId) => {
  const res = await axiosInstance.patch(`admin/users/${userId}/verify`);
  return res.data;
};

export const unverifyUserLicenseApi = async (userId) => {
  const res = await axiosInstance.patch(`admin/users/${userId}/unverify`);
  return res.data;
};
