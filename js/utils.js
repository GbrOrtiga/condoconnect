// Funções genéricas compartilhadas pela interface.
export function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

export function getElement(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getInitials(name = "") {
  return name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
