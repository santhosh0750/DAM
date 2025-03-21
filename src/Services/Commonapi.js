import axiosInstance from "../Services/axios";

export const UserlistAPI = () => {
  return axiosInstance.get("/user");
};

export const FileUploadAPI = (data) => {
  return axiosInstance.post("/file/fileUpload", data);
};

export const PreSignedUrlAPI = (data, payload) => {
  return axiosInstance.put(data, payload, {
    headers: {
      "Content-Type": File.type,
    },
    transformRequest: (data, headers) => {
      delete headers["Authorization"];
      return data;
    },
  });
};
