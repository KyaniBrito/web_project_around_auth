const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

// Função para verificar resposta da API
const checkResponse = (res) => {
  if (res.ok) return res.json();
  return res.json().then((err) => Promise.reject(`Error: ${res.status}`));
};

// ✅ Registro de usuário
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

// 🔐 Login (autorização)
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

// 🧾 Verificar token e obter dados do usuário
export const getUserData = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
