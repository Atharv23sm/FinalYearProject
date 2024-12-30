import axios from "axios";

// Create an Axios instance
const axiosCandidateInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

// Add an Axios request interceptor to include the token in headers
axiosCandidateInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("candidate_token");
    // console.log("Token retrieved:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
      // console.log("Authorization header set:", config.headers.Authorization);
    } else {
      console.log("No access token found in localStorage");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosCandidateInstance;
