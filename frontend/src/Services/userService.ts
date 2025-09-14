import axios from "axios";
import type { User } from "../interfaces/users/User";

const API: string = import.meta.env.VITE_API_BASE;

// Register new user
export function registerUser(normalizedUser: User) {
  return axios.post(`${API}users`, normalizedUser);
}

// Login exist user
export function loginUser(user: any) {
  return axios.post(`${API}users/login`, user);
}

// get user by id
export function getUserById(id: string) {
  return axios.get(`${API}/${id}`, {
    headers: {
      "x-auth-token": localStorage.getItem("x-auth-token"),
    },
  });
}

// get all users (admin only)
export function getAllUsers() {
  return axios.get(`${API}users`, {
    headers: {
      "x-auth-token": localStorage.getItem("x-auth-token"),
    },
  });
}
