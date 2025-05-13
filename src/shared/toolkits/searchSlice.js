import { createSlice } from "@reduxjs/toolkit";
import {
  getSearchLocation,
  setSearchLocation,
  getSearchTime,
  setSearchTime,
} from "../services/storageService";

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatTime = (date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

const today = new Date();
const nextHour = new Date(today);
nextHour.setHours(today.getHours() + 1);

const savedTime = getSearchTime();

const initialState = {
  location: getSearchLocation(),
  sD: savedTime.sD || formatDate(nextHour),
  sT: savedTime.sT || formatTime(nextHour),
  eD: savedTime.eD || formatDate(addDays(nextHour, 2)),
  eT: savedTime.eT || formatTime(nextHour),
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchInfor: (state, action) => {
      Object.assign(state, action.payload);
      if (
        action.payload.sD &&
        action.payload.sT &&
        action.payload.eD &&
        action.payload.eT
      ) {
        setSearchTime(
          action.payload.sD,
          action.payload.sT,
          action.payload.eD,
          action.payload.eT
        );
      }
    },
  },
});

export const { setSearchInfor } = searchSlice.actions;

export default searchSlice.reducer;
