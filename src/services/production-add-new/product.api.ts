import { BASE_URL } from "@/config/env";
import axios from "axios";

const API_URL = `${BASE_URL}/add`;

export interface CreateProductPayload {
  title: string;
  description: string;
  category: string;
  price: number;
  sku: string;
  stock: number;
}

export const createProduct = async (payload: CreateProductPayload) => {
  const { data } = await axios.post(API_URL, payload);
  return data;
};
