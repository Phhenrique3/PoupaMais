const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export async function api(path, options = {}) {
  const token = localStorage.getItem("poupamais.token");
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Não foi possível concluir a solicitação");
  return data;
}
