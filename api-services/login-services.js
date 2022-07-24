import { axiosInstance } from "../utils/axios-instance";

const root = "/api/login";

export const postLogin = (login) => {
  return axiosInstance().post(root, login);
};
