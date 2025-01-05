import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// console.log("baseUrl", baseUrl);

export const APIConfig = axios.create({
  baseURL: `${baseUrl}/api`,
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
