import axiosInstance from "../Services/axios";

export const Loginapi = (payload) => {
  return axiosInstance.post("/user/userLogin", payload);
};

export const verfiyOTP = (payload) => {
  return axiosInstance.post("/user/verifyOtp", payload);
};

export const Resendotp = (payload) => {
  return axiosInstance.post("/user/loginOtpResend", payload);
};
// export default {
//   Loginapi,
// };
