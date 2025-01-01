import axios from "axios";

const axiosCandidateInstance = axios.create({
  baseURL: "https://raa-server.vercel.app/",
  // baseURL: "http://localhost:3000",
});

axiosCandidateInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("candidate_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
