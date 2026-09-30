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

export function imageFileToDataUrl(file, maxBytes = 1500000) {
  if (!file || !file.type.startsWith("image/")) {
    return Promise.reject(new Error("Selecione um arquivo de imagem."));
  }
  if (file.size > maxBytes) {
    return Promise.reject(new Error("A imagem deve ter no máximo 1,5 MB."));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const image = new Image();
      image.addEventListener("load", () => resolve(reader.result), { once: true });
      image.addEventListener("error", () => reject(new Error("O arquivo selecionado não parece ser uma imagem válida.")), { once: true });
      image.src = reader.result;
    });
    reader.addEventListener("error", () => reject(new Error("Não foi possível carregar a imagem.")));
    reader.readAsDataURL(file);
  });
}
