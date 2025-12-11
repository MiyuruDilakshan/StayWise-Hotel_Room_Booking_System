// client/src/services/users.js
const API_BASE = import.meta.env.VITE_API_URL || "";

/**
 * Mock front-end service for users.
 * If you later add a backend, replace mock sections with real fetch() calls.
 */

export async function fetchUsers() {
  // Mock sample users (immediate front-end demo)
  const items = [
    { id: "u1", name: "Liam Fernando", email: "liam.fernando@email.com", role: "Guest" },
    { id: "u2", name: "Isabella Silva", email: "isabella.silva@email.com", role: "Guest" },
    { id: "u3", name: "Ethan Perera", email: "ethan.perera@email.com", role: "Admin" },
    { id: "u4", name: "Olivia De Silva", email: "olivia.desilva@email.com", role: "Guest" },
    { id: "u5", name: "Noah Rajapaksa", email: "noah.rajapaksa@email.com", role: "Guest" },
  ];
  await new Promise((r) => setTimeout(r, 200)); // simulate latency
  return { items, total: items.length };
}

export async function deleteUser(id) {
  // mock success
  await new Promise((r) => setTimeout(r, 200));
  return { success: true };
}

export async function promoteToAdmin(id) {
  // mock success
  await new Promise((r) => setTimeout(r, 250));
  return { success: true };
}
