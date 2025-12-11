import React from "react";

export default function BookingRow({ booking = {}, onAction = () => {} }) {
  const id = booking._id || booking.id || booking.bookingId || "n/a";
  const status = (booking.status || "").toLowerCase();

  function readableStatus() {
    if (status === "completed") return "Completed";
    if (status === "pending") return "Pending";
    if (status === "cancelled") return "Cancelled";
    return booking.status || "Unknown";
  }

  return (
    <tr>
      <td className="mono">#{booking.bookingId || id}</td>
      <td>{booking.guestName || booking.guest || "-"}</td>
      <td>{booking.roomName || booking.room || "-"}</td>
      <td>{booking.checkIn || booking.check_in || "-"}</td>
      <td>{booking.checkOut || booking.check_out || "-"}</td>
      <td className="mono">{booking.price ? `$${booking.price}` : "-"}</td>
      <td>
        <span className={`status-badge status-${status}`}>{readableStatus()}</span>
      </td>
      <td className="actions">
        <button className="link" onClick={() => onAction(id, "approve")} disabled={status === "completed"}>
          Approve
        </button>
        <button className="link danger" onClick={() => onAction(id, "cancel")} disabled={status === "cancelled"}>
          Cancel
        </button>
      </td>
    </tr>
  );
}
