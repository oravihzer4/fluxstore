export function createProduct(newProduct: Partial<Product>) {
  return axios.post(`${API}products`, newProduct, {
    headers: {
      "x-auth-token": localStorage.getItem("x-auth-token"),
    },
  });
}
import axios from "axios";
import type { Product } from "../interfaces/products/Product";

const API: string = import.meta.env.VITE_API_BASE;

export function getAllProducts() {
  return axios.get<Product[]>(`${API}products`);
}

export function deleteProduct(id: string) {
  return axios.delete(`${API}products/${id}`, {
    headers: {
      "x-auth-token": localStorage.getItem("x-auth-token"),
    },
  });
}

export function updateProduct(id: string, updatedProduct: Partial<Product>) {
  return axios.put(`${API}products/${id}`, updatedProduct, {
    headers: {
      "x-auth-token": localStorage.getItem("x-auth-token"),
    },
  });
}
