import React, { useEffect, useState } from "react";
import AdminNavbar from '../../components/AdminNavbar';
import { fetchBookings, updateBookingStatus } from "../../../../server/src/services/bookings";
import BookingRow from "../../components/BookingRow";
import "../../styles/Bookings.css";

const STATUS_ALL = "all";
const STATUS_OPTIONS = ["Completed", "Pending", "Cancelled"];

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState(STATUS_ALL);
    const [page, setPage] = useState(1);
    const perPage = 10;
    const [error, setError] = useState(null);

    useEffect(() => {
        loadBookings();
        // eslint-disable-next-line
    }, [statusFilter, page]);

    async function loadBookings() {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchBookings({
                status: statusFilter === STATUS_ALL ? "" : statusFilter.toLowerCase(),
                page,
                perPage,
            });
            setBookings(data.items || []);
        } catch (err) {
            console.error("Failed to load bookings", err);
            setError("Failed to load bookings");
        } finally {
            setLoading(false);
        }
    }

    async function handleAction(id, action) {
        const newStatus = action === "approve" ? "completed" : "cancelled";
        if (!window.confirm(`Are you sure you want to ${action} this booking?`)) return;
        try {
            await updateBookingStatus(id, newStatus);
            await loadBookings();
        } catch (err) {
            console.error("Action failed", err);
            alert("Action failed. See console.");
        }
    }

    return (
        <main className="admin-bookings-page">
            <div className="page-header">
                <h1>Booking Management</h1>

                <div className="filters">
                    <div className="filter-pill">
                        <label>Filter</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setPage(1);
                                setStatusFilter(e.target.value);
                            }}
                        >
                            <option value={STATUS_ALL}>All</option>
                            {STATUS_OPTIONS.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="loading">Loading bookings…</div>
            ) : error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="bookings-table-wrapper">
                    <table className="bookings-table" aria-label="Bookings table">
                        <thead>
                            <tr>
                                <th>Booking ID</th>
                                <th>Guest Name</th>
                                <th>Room</th>
                                <th>Check-in</th>
                                <th>Check-out</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="no-results">
                                        No bookings found.
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((b) => (
                                    <BookingRow key={b._id || b.id || b.bookingId} booking={b} onAction={handleAction} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="table-footer">
                <div className="pagination">
                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                        Prev
                    </button>
                    <span>Page {page}</span>
                    <button onClick={() => setPage((p) => p + 1)}>Next</button>
                </div>
            </div>
        </main>
    );
}
