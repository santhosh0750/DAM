import axiosInstance from "../../Services/axios";

export const TeamEdit = (payload) => {
  return axiosInstance.post("/team/update", payload);
};

export const RoleEdit = (payload) => {
  return axiosInstance.post("/role/update", payload);
};

export const UsergroupEdit = (payload) => {
  return axiosInstance.post("/userGroup/update", payload);
};
