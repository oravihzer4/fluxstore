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

// delete user (admin only)
export function deleteUser(id: string) {
  return axios.delete(`${API}users/${id}`, {
    headers: {
      "x-auth-token": localStorage.getItem("x-auth-token"),
    },
  });
}

// update user (admin only)
export function updateUser(id: string, data: Partial<User>) {
  return axios.put(`${API}users/${id}`, data, {
    headers: {
      "x-auth-token": localStorage.getItem("x-auth-token"),
    },
  });
}

// set admin (admin only)
export function setAdmin(id: string, isAdmin: boolean) {
  return axios.patch(
    `${API}users/${id}/admin`,
    { isAdmin },
    {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    }
  );
}
