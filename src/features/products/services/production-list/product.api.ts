import axios from "axios";
import { Product } from "../../types/production-list/type";
import { BASE_URL } from "@/config/env";

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function getProducts(
  page: number,
  limit = 10,
): Promise<ProductResponse> {
  const skip = (page - 1) * limit;

  const res = await axios.get<ProductResponse>(BASE_URL, {
    params: {
      limit,
      skip,
      select: "title,price,sku,stock,category,thumbnail,meta",
    },
  });

  return res.data;
}
