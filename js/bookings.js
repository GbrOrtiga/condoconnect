function getStoredBookings() {
  try {
    return JSON.parse(localStorage.getItem("condoConnectBookings")) || [];
  } catch {
    return [];
  }
}

export function getBookingsForProvider(providerId) {
  return getStoredBookings().filter((booking) => String(booking.providerId) === String(providerId));
}

export function saveVisitRequest({ providerId, serviceId, date, resident }) {
  const bookings = getStoredBookings();
  const alreadyRequested = bookings.some((booking) =>
    String(booking.providerId) === String(providerId) && booking.date === date
  );

  if (alreadyRequested) return { saved: false, reason: "unavailable" };

  bookings.push({
    id: `${providerId}-${date}-${Date.now()}`,
    providerId,
    serviceId,
    date,
    residentId: resident.id,
    residentName: resident.name,
    status: "solicitada",
    createdAt: new Date().toISOString()
  });
  localStorage.setItem("condoConnectBookings", JSON.stringify(bookings));
  return { saved: true };
}