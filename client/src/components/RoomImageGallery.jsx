import React from "react";

export default function RoomImageGallery({ images = [], onRemove }) {
  return (
    <div className="room-images">
      {images.length === 0 && <p>No images uploaded yet.</p>}

      {images.map((img, idx) => (
        <div key={idx} className="image-card">
          <img src={img} alt={`Room ${idx}`} />
          <button className="remove-image-btn" onClick={() => onRemove(idx)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
