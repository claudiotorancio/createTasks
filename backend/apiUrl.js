//backend/apiUrl.js

export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://create-tasks-pi.vercel.app"
    : "http://localhost:4000";
