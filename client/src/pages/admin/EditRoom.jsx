import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from '../../components/AdminNavbar';
import { fetchRoomById, updateRoom } from "../../../../server/src/services/rooms";
import RoomImageGallery from "../../components/RoomImageGallery";
import ImageUploader from "../../components/ImageUploader";

import "../../styles/EditRoom.css";

export default function EditRoom() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [room, setRoom] = useState({
        roomNumber: "",
        roomType: "",
        description: "",
        price: "",
        capacity: "",
        facilities: [],
        images: [],
    });

    const fileInputRef = useRef(null);

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchRoomById(id);
                setRoom((prev) => ({ ...prev, ...data }));
            } catch (err) {
                console.error("Failed to load room:", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [id]);

    function handleChange(e) {
        setRoom({ ...room, [e.target.name]: e.target.value });
    }

    function toggleFacility(facility) {
        setRoom((prev) => ({
            ...prev,
            facilities: prev.facilities.includes(facility)
                ? prev.facilities.filter((f) => f !== facility)
                : [...prev.facilities, facility],
        }));
    }

    function handleImagesAdded(files) {
        const previews = files.map((f) => URL.createObjectURL(f));
        setRoom((prev) => ({ ...prev, images: [...prev.images, ...previews] }));
    }

    function handleImageRemove(index) {
        setRoom((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    }

    async function handleSave(e) {
        e.preventDefault();
        setSaving(true);

        try {
            await updateRoom(id, room);
            navigate("/admin/rooms");
        } catch (err) {
            console.error("Save failed:", err);
            alert("Error saving room.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div className="edit-room-loading">Loading...</div>;

    const facilitiesList = ["Wi-Fi", "Air Conditioning", "Mini Bar", "Safe", "Balcony"];

    return (
        <main className="edit-room-page">
            <h1 className="page-title">Edit Room</h1>

            <form className="edit-room-form" onSubmit={handleSave}>

                <div className="form-row">
                    <label>Room Number</label>
                    <input name="roomNumber" value={room.roomNumber} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <label>Room Type</label>
                    <input name="roomType" value={room.roomType} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <label>Description</label>
                    <textarea name="description" value={room.description} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <label>Price</label>
                    <input name="price" value={room.price} onChange={handleChange} />
                </div>

                <div className="form-row">
                    <label>Capacity</label>
                    <input name="capacity" value={room.capacity} onChange={handleChange} />
                </div>

                <fieldset className="facilities-group">
                    <legend>Facilities</legend>

                    <div className="facilities-list">
                        {facilitiesList.map((f) => (
                            <label key={f} className="checkbox-row">
                                <input
                                    type="checkbox"
                                    checked={room.facilities.includes(f)}
                                    onChange={() => toggleFacility(f)}
                                />
                                {f}
                            </label>
                        ))}
                    </div>
                </fieldset>

                <div className="images-section">
                    <label>Images</label>
                    <RoomImageGallery images={room.images} onRemove={handleImageRemove} />
                </div>

                <ImageUploader onFilesSelected={handleImagesAdded} inputRef={fileInputRef} />

                <div className="form-actions">
                    <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </main>
    );
}
