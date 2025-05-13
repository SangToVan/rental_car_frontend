const USER = "rcs_user";
const ACCESS_TOKEN = "rcs_access_token";
const REFRESH_TOKEN = "rcs_refresh_token";
const DISPLAY_TYPE = "rcs_display_type";
const SEARCH_LOCATION = "rcs_location";
const SEARCH_TIME = "rcs_search_time";

export const setSearchTime = (sD, sT, eD, eT) => {
  const payload = { sD, sT, eD, eT };
  localStorage.setItem(SEARCH_TIME, JSON.stringify(payload));
};

export const getSearchTime = () => {
  const raw = localStorage.getItem(SEARCH_TIME);
  try {
    const data = JSON.parse(raw);
    return data || {};
  } catch {
    return {};
  }
};


export const setSearchResultsDisplayType = (type) => {
  localStorage.setItem(DISPLAY_TYPE, type);
};

export const getSearchResultsDisplayType = () => {
  const type = localStorage.getItem(DISPLAY_TYPE);
  if (type !== "GRID" && type !== "TABLE") return "GRID";
  return type;
};

export const setSearchLocation = (addr) => {
  localStorage.setItem(SEARCH_LOCATION, addr);
};

export const getSearchLocation = () => {
  return localStorage.getItem(SEARCH_LOCATION);
};

export const setToken = (token) => {
  localStorage.setItem(ACCESS_TOKEN, token);
};

export const setRefreshToken = (token) => {
  localStorage.setItem(REFRESH_TOKEN, token);
};

export const setUser = (user) => {
  localStorage.setItem(USER, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(USER);
  return user ? JSON.parse(user) : null;
};

export const getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};

export const isLogin = () => {
  const token = getToken();
  const user = getUser();
  return token && user && user?.role;
};

export const removeLoginInfo = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(USER);
};
