const API_BASE = import.meta.env.VITE_API_URL || "";

/**
 * fetchBookings({ status, page, perPage })
 * Returns { items: [...], total: number } — adapt if your backend differs.
 */
export async function fetchBookings({ status = "", page = 1, perPage = 10 } = {}) {
  try {
    // If you have a backend, uncomment the fetch below and remove the fallback mock.
    /*
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    params.set("page", page);
    params.set("perPage", perPage);
    const res = await fetch(`${API_BASE}/api/bookings?${params.toString()}`, { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch bookings");
    return await res.json();
    */

    // FALLBACK MOCK (runs when no backend)
    const sample = Array.from({ length: 10 }).map((_, i) => ({
      _id: `b${1000 + i}`,
      bookingId: `${12345 + i}`,
      guestName: ["Emily Carter","Ethan Bennett","Olivia Harper","Liam Foster","Sophia Hayes","Noah Parker","Ava Reed","Jackson Cole","Isabella Grant","Lucas West"][i % 10],
      roomName: ["Deluxe Suite","Standard Room","Executive Suite"][i % 3],
      checkIn: `2024-07-${15 + i}`,
      checkOut: `2024-07-${20 + i}`,
      price: [500,200,750][i % 3],
      status: ["completed","pending","cancelled"][i % 3],
    }));
    return { items: sample, total: 100 };
  } catch (err) {
    console.error("fetchBookings error", err);
    return { items: [], total: 0 };
  }
}

export async function updateBookingStatus(id, status) {
  try {
    // If backend exists, uncomment and use it:
    /*
    const res = await fetch(`${API_BASE}/api/bookings/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
      credentials: "include",
    });
    if (!res.ok) throw new Error("Update failed");
    return await res.json();
    */
    // Mock delay + success
    await new Promise((r) => setTimeout(r, 400));
    return { success: true };
  } catch (err) {
    console.error("updateBookingStatus error", err);
    throw err;
  }
}
