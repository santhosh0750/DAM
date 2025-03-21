import axiosInstance from "../../Services/axios";

export const TeamlistAPI = () => {
  return axiosInstance.get("/team");
};

export const RolelistAPI = () => {
  return axiosInstance.get("/role");
};
export const UsergrouplistAPI = () => {
  return axiosInstance.get("/userGroup");
};

export const ProjectlistAPI = () => {
  return axiosInstance.get("/project/getProjects");
};

export const CustomerlistAPI = () => {
  return axiosInstance.get("/customer");
};
