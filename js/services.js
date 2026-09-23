import { services } from "./data.js";

function getStoredServices() {
  try {
    return JSON.parse(localStorage.getItem("condoConnectServices")) || [];
  } catch {
    return [];
  }
}

export function getServices() {
  return [...services, ...getStoredServices()];
}

export function searchServices(query, serviceList = getServices()) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return serviceList;

  return serviceList.filter((service) =>
    [service.name, service.category, service.categoryName, service.description, service.providerName]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(normalizedQuery))
  );
}

export function filterServices(serviceList, filters = {}) {
  const { category = "todos", price = "todos", rating = "todas" } = filters;
  return serviceList.filter((service) => {
    const matchesCategory = category === "todos" || service.category === category;
    const matchesPrice = price === "todos" || (price === "30" && service.price <= 30) || (price === "30-50" && service.price > 30 && service.price <= 50) || (price === "50-100" && service.price > 50 && service.price <= 100) || (price === "100+" && service.price > 100);
    const matchesRating = rating === "todas" || (rating === "4" && service.rating >= 4) || (rating === "45" && service.rating >= 4.5);
    return matchesCategory && matchesPrice && matchesRating;
  });
}

export function getServiceById(id) {
  return getServices().find((service) => String(service.id) === String(id));
}

export function saveRegisteredService(service) {
  const storedServices = getStoredServices();
  storedServices.push(service);
  localStorage.setItem("condoConnectServices", JSON.stringify(storedServices));
  return service;
}
