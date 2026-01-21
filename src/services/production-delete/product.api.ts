import { BASE_URL } from "@/config/env";
import axios from "axios";

export const deleteProduct = async (id: number) => {
  return axios.delete(`${BASE_URL}/${id}`);
};
