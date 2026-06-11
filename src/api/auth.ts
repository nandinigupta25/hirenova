import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1",
})

export const registerUser = (data: { name: string; email: string; password: string }) =>
  API.post("/auth/register", data)

export const loginUser = (data: { email: string; password: string }) =>
  API.post("/auth/login", data)
