// client/src/services/settings.js
const API_BASE = import.meta.env.VITE_API_URL || "";

/**
 * Mock frontend-only settings service.
 * Replace with real fetch() calls to your server when available.
 */

export async function fetchSettings() {
  // simulated latency
  await new Promise((r) => setTimeout(r, 150));
  return {
    hotelName: "StayWise Hotels",
    address: "123 Ocean Drive, Colombo",
    logoUrl: "",
  };
}

export async function updateSettings(payload) {
  // in real app you'd call API here:
  // return fetch(`${API_BASE}/api/settings`, { method:'PUT', ... })
  console.log("Mock updateSettings payload:", payload);
  await new Promise((r) => setTimeout(r, 200));
  return { success: true };
}
