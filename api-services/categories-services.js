import { axiosInstance } from "../utils/axios-instance";

const root = "/api/category";

export const getCategories = () => {
    return axiosInstance().get(root);
};
