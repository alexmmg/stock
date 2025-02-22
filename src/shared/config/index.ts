export const config = {
  API_URL: import.meta.env.VITE_API_URL as string,
  AUTH: {
    username: import.meta.env.VITE_AUTH_USERNAME as string,
    password: import.meta.env.VITE_AUTH_PASSWORD as string,
  },
};
