import axiosInstance from "../../Services/axios";

export const AddTeam = (payload) => {
  return axiosInstance.post("/team/add", payload);
};

export const AddRole = (payload) => {
  return axiosInstance.post("/role/add", payload);
};

export const AddUserGroup = (payload) => {
  return axiosInstance.post("/userGroup/add", payload);
};

export const AddUser = (payload) => {
  return axiosInstance.post("/user/createUser", payload);
};

export const AddProject = (payload) => {
  return axiosInstance.post("/project/addProject", payload);
};

export const AddCustomer = (payload) => {
  return axiosInstance.post("/customer/add", payload);
};

export const AddCustomerGroup = (payload) => {
  return axiosInstance.post("/customerGroup/add", payload);
};
