import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
  withCredentials: false,
});

export default axiosInstance;
