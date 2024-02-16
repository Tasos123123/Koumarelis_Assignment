import axios from "axios";

const baseDomain = "https://api.openweathermap.org/data/2.5";
const baseURL = `${baseDomain}`; 


export default axios.create({
  baseURL,
  headers: {
    // "Authorization": "Bearer xxxxx"
  }
});