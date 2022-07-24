import axios from "axios";
import Cookies from "universal-cookie";
export const axiosInstance = () => {
  const cookeis = new Cookies();
  const token = cookeis.get("token");

  const a = axios.create({
    baseURL: "https://emkantech.com/",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return a;
};
