import axios from "axios";

export const MAIN_URL= "http://127.0.0.1:8000/api"

const api = axios.create({
  baseURL: MAIN_URL
});

export default api;