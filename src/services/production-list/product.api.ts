import axios from "axios";
import { Product } from "../../types/production-list/type";

const BASE_URL = "https://dummyjson.com/products";

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function getProducts(
  page: number,
  limit = 10
): Promise<ProductResponse> {
  const skip = (page - 1) * limit;

  const res = await axios.get<ProductResponse>(BASE_URL, {
    params: {
      limit,
      skip,
      select:
        "title,price,sku,stock,category,thumbnail,added",
    },
  });

  return res.data;
}
