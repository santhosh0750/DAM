import axiosInstance from "../../Services/axios";

export const TeamAdd = (payload) => {
  return axiosInstance.post("/team/add", payload);
};

export const AddRole = (payload) => {
  return axiosInstance.post("/role/add", payload);
};

export const AddUserGroup = (payload) => {
  return axiosInstance.post("/userGroup/add", payload);
};
