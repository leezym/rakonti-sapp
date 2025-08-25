import axios from "axios";

// URL base de tu backend
const DEV_URL = "http://localhost:5001/rakonti";
const PROD_URL = "http://cards-transfer.gl.at.ply.gg:55303/rakonti"; // la de Playit.gg

const api = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? PROD_URL : DEV_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;