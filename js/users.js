import { providers, users } from "./data.js";

export function getUsers() {
  return [...users, ...getStoredUsers()];
}

export function getProviders() {
  return [...providers];
}

// Autenticacao propositalmente simples para o prototipo. Nao representa seguranca real.
export function authenticateUser(email, password) {
  return getUsers().find((user) => user.email.toLowerCase() === email.trim().toLowerCase() && user.password === password) || null;
}

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem("condoConnectUsers")) || [];
  } catch {
    return [];
  }
}

export function saveRegisteredAccount(account) {
  const storedUsers = getStoredUsers().filter((user) => user.email.toLowerCase() !== account.email.toLowerCase());
  storedUsers.push(account);
  localStorage.setItem("condoConnectUsers", JSON.stringify(storedUsers));
  return account;
}

export function saveLoggedUser(user) {
  const { password, ...safeUser } = user;
  localStorage.setItem("usuarioLogado", JSON.stringify(safeUser));
  return safeUser;
}

export function getLoggedUser() {
  try {
    return JSON.parse(localStorage.getItem("usuarioLogado")) || null;
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem("usuarioLogado");
}
