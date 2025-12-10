// client/src/pages/admin/Users.jsx
import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser, promoteToAdmin } from "../../../../server/src/services/users";
import "../../styles/Users.css";

function UserRow({ user, onDelete, onPromote }) {
  return (
    <tr>
      <td>{user.name}</td>
      <td className="muted mono">{user.email}</td>
      <td>
        <span className={`role-pill role-${user.role.toLowerCase()}`}>
          {user.role}
        </span>
      </td>
      <td className="actions">
        <button
          className="link danger"
          onClick={() => onDelete(user.id)}
        >
          Delete User
        </button>
        {user.role !== "Admin" && (
          <button className="link" onClick={() => onPromote(user.id)}>
            Promote to Admin
          </button>
        )}
      </td>
    </tr>
  );
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      // supports either { items: [...] } or direct array
      setUsers(Array.isArray(data) ? data : data.items || []);
    } catch (err) {
      console.error("load users error", err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this user? This action cannot be undone.")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("delete failed", err);
      alert("Delete failed. See console.");
    }
  }

  async function handlePromote(id) {
    if (!window.confirm("Promote this user to Admin?")) return;
    try {
      await promoteToAdmin(id);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: "Admin" } : u)));
    } catch (err) {
      console.error("promote failed", err);
      alert("Promote failed. See console.");
    }
  }

  return (
    <main className="admin-users-page">
      <h1 className="page-title">User Management</h1>

      {loading ? (
        <div className="loading">Loading users…</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="users-table-wrapper">
          <table className="users-table" aria-label="Users table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-results">No users found.</td>
                </tr>
              ) : (
                users.map((u) => (
                  <UserRow key={u.id} user={u} onDelete={handleDelete} onPromote={handlePromote} />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
