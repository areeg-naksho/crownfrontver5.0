import { axiosInstance } from "../utils/axios-instance";

const root = "/api/product";

export const getProducts = () => {
  return axiosInstance().get(root);
};
