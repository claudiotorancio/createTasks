export const API_URL = import.meta.env.VITE_API_URL;

fetch(`${API_URL}/endpoint`, {
  method: "GET",
}).then((response) => response.json());
