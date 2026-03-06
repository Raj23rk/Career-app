import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api" || "https://career-app-ph4c.onrender.com/api"
});

export default API;