import axiosInstance from "../Services/axios";

export const UserlistAPI = () => {
  return axiosInstance.get("/user");
};
