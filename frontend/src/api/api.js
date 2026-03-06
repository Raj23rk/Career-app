import axios from "axios";

const API = axios.create({
  baseURL: "https://career-app-ph4c.onrender.com/api"
});

export default API;