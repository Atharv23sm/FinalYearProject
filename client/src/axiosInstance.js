import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'https://final-year-project-server-ashen.vercel.app/',
});

// Add an Axios request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        // console.log('Token retrieved:', token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;  // Correct string interpolation
            // console.log('Authorization header set:', config.headers.Authorization);
        } else {
            console.log('No access token found in localStorage');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
