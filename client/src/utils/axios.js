import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: { ContentType: "application/json" },
});

instance.interceptors.request.use((req) => {
    // before making any api request, check if the auth token exist
    let token = localStorage.getItem("auth-token");
    // if it exist, put the authorization header with Bearer token scheme
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });

export default instance;