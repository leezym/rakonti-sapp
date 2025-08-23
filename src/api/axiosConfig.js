import axios from "axios";

// URL base de tu backend
//const PROD_URL = "https://tu-servidor.com/api";
const DEV_URL = "http://localhost:5001/rakonti"

const api = axios.create({
  baseURL: DEV_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
export { DEV_URL };
