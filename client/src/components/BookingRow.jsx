import React from "react";

export default function BookingRow({ booking = {}, onAction = () => {} }) {
  const id = booking._id || booking.id || booking.bookingId || "n/a";
  const status = (booking.status || "").toLowerCase();
  
  // Get guest name from populated user object
  const guestName = booking.user?.name || booking.guestName || booking.guest || "-";
  
  // Get room name from populated room object
  const roomName = booking.room?.name || booking.roomName || booking.room || "-";
  
  // Format check-in and check-out dates
  const checkInDate = booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : booking.check_in || "-";
  const checkOutDate = booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : booking.check_out || "-";
  
  // Get total price
  const totalPrice = booking.totalPrice || booking.price || 0;

  function readableStatus() {
    if (status === "completed") return "Completed";
    if (status === "confirmed") return "Confirmed";
    if (status === "pending") return "Pending";
    if (status === "cancelled") return "Cancelled";
    if (status === "checked-in") return "Checked In";
    if (status === "checked-out") return "Checked Out";
    return booking.status || "Unknown";
  }

  return (
    <tr>
      <td className="mono">#{id.slice(-8)}</td>
      <td>{guestName}</td>
      <td>{roomName}</td>
      <td>{checkInDate}</td>
      <td>{checkOutDate}</td>
      <td className="mono">${totalPrice.toFixed(2)}</td>
      <td>
        <span className={`status-badge status-${status}`}>{readableStatus()}</span>
      </td>
      <td className="actions">
        <button className="link" onClick={() => onAction(id, "approve")} disabled={status === "completed" || status === "confirmed"}>
          Approve
        </button>
        <button className="link danger" onClick={() => onAction(id, "cancel")} disabled={status === "cancelled"}>
          Cancel
        </button>
      </td>
    </tr>
  );
}
