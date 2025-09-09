import axios from "axios";
import type { Product } from "../interfaces/products/Product";

export function getAllProducts() {
  return axios.get<Product[]>("/fluxServer/products");
}
