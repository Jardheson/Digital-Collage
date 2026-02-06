import { API_URL } from "./config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async (userData: any) => {
  const response = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Erro desconhecido" }));
    throw new Error(error.message || "Erro ao cadastrar");
  }

  return response.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginUser = async (credentials: any) => {
  const response = await fetch(`${API_URL}/user/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Erro desconhecido" }));
    throw new Error(error.message || "Erro ao fazer login");
  }

  return response.json();
};
