import { axiosInstance } from "../utils/axios-instance";

const root = "/api/settings";

export const getSettings = () => {
  return axiosInstance().get(root);
};
