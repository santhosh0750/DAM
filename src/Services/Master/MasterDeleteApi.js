import axiosInstance from "../../Services/axios";

export const TeamDeleteAPI = (id) => {
  return axiosInstance.get(`/team/delete/${id}`);
};
export const RoleDeleteAPI = (id) => {
  return axiosInstance.get(`/role/delete/${id}`);
};

export const UserGroupdeleteAPI = (id) => {
  return axiosInstance.get(`/userGroup/delete/${id}`);
};

export const ProjectdeleteAPI = (id) => {
  return axiosInstance.get(`/project/deleteProject/${id}`);
};

export const CustomerdeleteAPI = (id) => {
  return axiosInstance.get(`/customerGroup/delete/${id}`);
};
