import { generateMetaSearchParams } from "../utils";
import axiosInstance from "../utils/authorizedAxios";

export const getCarFeedbackApi = async (id, page = 1, size = 5) => {
  const metaParams = generateMetaSearchParams(page, size, "id:desc");
  const res = await axiosInstance.get(
    `feedbacks/cars/${id}?${metaParams}`
  );
  return res.data;
};

export const getRatingApi = async (bookingId) => {
  const res = await axiosInstance.get(`feedbacks/${bookingId}/rating`);
  return res.data;
};
