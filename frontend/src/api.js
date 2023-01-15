import axios from "axios";

const development = process.env.NODE_ENV === "development";

export default axios.create({
  baseURL: development
    ? "http://localhost:3800"
    : "https://mern-ecommerce-api-cczd.onrender.com/",
});