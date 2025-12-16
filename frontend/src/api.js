import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.MAIN_URL
});

export default api;