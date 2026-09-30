import { providers, users } from "./data.js";

export function getUsers() {
  const profileUpdates = getStoredProfiles();
  return [...users, ...getStoredUsers()].map((user) => ({ ...user, ...(profileUpdates[String(user.id)] || {}) }));
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

function getStoredProfiles() {
  try {
    return JSON.parse(localStorage.getItem("condoConnectProfiles")) || {};
  } catch {
    return {};
  }
}

export function getUserByProviderId(providerId) {
  return getUsers().find((user) => user.type === "prestador" && String(user.providerId) === String(providerId)) || null;
}

export function saveUserProfile(user) {
  const profiles = getStoredProfiles();
  const { id, ...profile } = user;
  profiles[String(id)] = { ...(profiles[String(id)] || {}), ...profile };
  localStorage.setItem("condoConnectProfiles", JSON.stringify(profiles));

  const storedUsers = getStoredUsers();
  const storedIndex = storedUsers.findIndex((storedUser) => String(storedUser.id) === String(id));
  if (storedIndex >= 0) {
    storedUsers[storedIndex] = { ...storedUsers[storedIndex], ...profile };
    localStorage.setItem("condoConnectUsers", JSON.stringify(storedUsers));
  }
  return { ...user };
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
