import axios from "axios";

const baseUrl = "http://localhost:5000/api";

export const APIConfig = axios.create({
  baseURL: baseUrl,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// axios.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (error) => {
//     throw error.response.data; // Propagate the error
//   }
// );
