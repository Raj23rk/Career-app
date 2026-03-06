import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api" || "https://career-app-kwbn.vercel.app/api"
});

export default API;