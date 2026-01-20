import axios from "axios";

export const deleteProduct = async (id: number) => {
  return axios.delete(
    `https://dummyjson.com/productssss/${id}`
  );
};
