import { BASE_URL } from "@/config/env";
import axios from "axios";

export interface ProductPayload {
  title: string;
  description: string;
  category: string;
  price: number;
  sku: string;
  stock: number;
}

export const getProductById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const updateProduct = async (id: string, payload: ProductPayload) => {
  const res = await axios.put(`${BASE_URL}/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
