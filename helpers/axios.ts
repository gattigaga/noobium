import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshToken = async () => {
  try {
    const token = localStorage.getItem("access_token");

    const response = await instance.post("/refresh", undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.setItem("access_token", response.data.data.access_token.token);
    localStorage.setItem("access_token_generated_at", `${Date.now()}`);

    localStorage.setItem(
      "access_token_expired_at",
      `${Date.now() + 3600 * 1000}`
    );
  } catch (error) {
    console.error(error);
  }
};

export default instance;
