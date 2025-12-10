// Vite uses import.meta.env — NOT process.env
const API_BASE = import.meta.env.VITE_API_URL || "";

export async function fetchRoomById(id) {
  try {
    const res = await fetch(`${API_BASE}/api/rooms/${id}`);
    if (!res.ok) throw new Error("Failed to fetch room");
    return await res.json();
  } catch (err) {
    console.error("fetchRoomById:", err);
    return {
      roomNumber: "101",
      roomType: "Deluxe",
      description: "Sample description",
      price: "120",
      capacity: "2",
      facilities: ["Wi-Fi"],
      images: [],
    };
  }
}

export async function updateRoom(id, data) {
  const res = await fetch(`${API_BASE}/api/rooms/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update room");
  return res.json();
}
