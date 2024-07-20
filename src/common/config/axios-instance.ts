// imports
import axios from 'axios';

// check if the API_BASEURL is set
if (!process.env.API_BASEURL) {
  throw new Error('API_BASEURL is not set');
}

// create an axios instance
const axiosInstance = axios.create({
  baseURL: process.env.API_BASEURL,
});

export default axiosInstance;