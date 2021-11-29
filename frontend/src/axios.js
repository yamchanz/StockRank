import axios from "axios";

const baseURL = "http://localhost:8000/api/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "JWT " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

/**
 * @description helper function to refresh access token
 * @returns true if the access token is successfully refreshed
 */
const refreshAccessToken = async () => {
  if (localStorage.getItem("refresh_token") === null) {
    return false;
  }

  return await axiosInstance
    .post("token/refresh/", { refresh: localStorage.getItem("refresh_token") })
    .then((res) => {
      localStorage.setItem("access_token", res.data.access);
      axiosInstance.defaults.headers["Authorization"] =
        "JWT " + res.data.access;
      return true;
    })
    .catch((_err) => {
      return false;
    });
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;
    if (
      !originalRequest._retry &&
      status === 401 &&
      (await refreshAccessToken())
    ) {
      // retry the failed request
      originalRequest._retry = true;
      originalRequest.headers["Authorization"] =
        axiosInstance.defaults.headers["Authorization"];
      console.log("RETRYING FAILED REQUEST");
      return axiosInstance(error.config);
    }

    originalRequest._retry = true;
    return Promise.reject(error);
  }
);

export { axiosInstance };
