import { axiosInstance } from "../utils/axios-instance";

const root = "/api/register";

export const postRegister = (register) => {
  return axiosInstance().post(root, register);
};
