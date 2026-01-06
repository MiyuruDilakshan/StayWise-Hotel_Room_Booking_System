// client/src/pages/admin/Users.jsx
import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/adminService";
import "../../styles/Users.css";

function UserRow({ user, onDelete }) {
  return (
    <tr>
      <td>{user.name || 'N/A'}</td>
      <td className="muted mono">{user.email}</td>
      <td>
        <span className={`role-pill role-user`}>
          User
        </span>
      </td>
      <td className="actions">
        <button
          className="link danger"
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this user?')) {
              onDelete(user._id);
            }
          }}
        >
          Delete User
        </button>
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
      const result = await getUsers();
      setUsers(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error("load users error", err);
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(userId) {
    try {
      await deleteUser(userId);
      setUsers(users.filter((u) => u._id !== userId));
    } catch (err) {
      console.error("delete error", err);
      alert("Failed to delete user");
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
                users.map((user) => (
                  <UserRow key={user._id} user={user} onDelete={onDelete} />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
