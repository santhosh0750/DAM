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

export const UserEdit = (payload) => {
  return axiosInstance.post("/user/updateUser", payload);
};

export const ProjectEdit = (payload) => {
  return axiosInstance.post("/project/updateProject", payload);
};

export const CustomerGroupEdit = (payload) => {
  return axiosInstance.post("/customerGroup/update", payload);
};
