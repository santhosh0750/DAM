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
