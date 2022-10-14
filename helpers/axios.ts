import axios from "axios";

const instance = axios.create({
  baseURL: "http://167.172.70.208:8001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
