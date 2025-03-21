import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://172.16.5.213:3000/",
  // baseURL: "http://172.16.5.22:4400/", // Replace with your API base URL
  // NEXT_PUBLIC_Backend_URL: "http://172.16.5.22:4400/",
  // baseURL: "https://numedlabapi.treeone.one/", // Replace with your API base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      if (config.headers) config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(new Error(error.message));
  }
);
axiosInstance.interceptors.response.use(function (response) {
  if (
    response.data.status === "failed" &&
    response.data.message === "invalid token"
  ) {
    console.log("aoi check");
    // window.location.href = "/auth";
    localStorage.clear();
    throw new Error("Invalid token"); // or return an error response
  }
  return response;
});

export default axiosInstance;
