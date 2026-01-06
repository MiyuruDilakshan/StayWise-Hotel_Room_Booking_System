import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRoomById, updateRoom } from "../../services/adminService";
import RoomImageGallery from "../../components/RoomImageGallery";
import ImageUploader from "../../components/ImageUploader";

import "../../styles/EditRoom.css";

export default function EditRoom() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [room, setRoom] = useState({
        name: "",
        bedType: "",
        description: "",
        price: "",
        capacity: "",
        amenities: [],
        images: [],
    });

    const fileInputRef = useRef(null);

    useEffect(() => {
        async function load() {
            try {
                const result = await fetchRoomById(id);
                if (result.success) {
                    const data = result.data;
                    // Normalize images to strings if they are objects
                    let normalizedImages = [];
                    if (data.images && Array.isArray(data.images)) {
                        normalizedImages = data.images.map(img => img.src || img);
                    }
                    
                    setRoom({
                        name: data.name || "",
                        bedType: data.bedType || "",
                        description: data.description || "",
                        price: data.price || "",
                        capacity: data.capacity || "",
                        amenities: data.amenities || [],
                        images: normalizedImages
                    });
                }
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

    function toggleAmenity(amenity) {
        setRoom((prev) => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter((a) => a !== amenity)
                : [...prev.amenities, amenity],
        }));
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    async function handleImagesAdded(files) {
        try {
            const base64Files = await Promise.all(Array.from(files).map(convertToBase64));
            setRoom((prev) => ({ ...prev, images: [...prev.images, ...base64Files] }));
        } catch (err) {
            console.error("Failed to process images", err);
        }
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

    const availableAmenities = [
        "WiFi", "Free WiFi", "High-Speed WiFi", 
        "Air Conditioning", "Climate Control",
        "TV", "Flat-screen TV", "55\" 4K TV", "Smart TV System",
        "Minibar", "Premium Minibar",
        "Balcony", "Private Balcony", "Ocean View Balcony",
        "Safe", 
        "Workspace", "Ergonomic Workspace",
        "Bathtub", "Jacuzzi", "Soaking Tub", "Spa Bath",
        "Shower", "Rainfall Shower", "Walk-in Shower", "Steam Shower",
        "Kitchenette", "Dining Area", "Formal Dining Room",
        "Living Area", "Separate Living Room",
        "Sofa Bed",
        "Room Service", "24/7 Butler Service", "Concierge Service",
        "City View", "Ocean View", "Panoramic View",
        "Beach Access", "Executive Lounge Access",
        "Coffee Maker", "Tea & Coffee Maker", "Nespresso Machine",
        "Bathrobe", "Bathrobes", "Premium Toiletries",
        "Soundproof Windows", "Smart Lighting", "Bluetooth Sound System"
    ];

    return (
        <div className="edit-room-page">
            <div className="edit-room-container">
                <div className="edit-room-header">
                    <h1>Edit Room</h1>
                    <button className="back-btn" onClick={() => navigate("/admin/rooms")}>
                        Back to Rooms
                    </button>
                </div>

                <form onSubmit={handleSave} className="edit-room-form">
                    <div className="form-section">
                        <h3>Basic Information</h3>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Room Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={room.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Bed Type</label>
                                <select
                                    name="bedType"
                                    value={room.bedType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="Single">Single</option>
                                    <option value="Double">Double</option>
                                    <option value="Queen">Queen</option>
                                    <option value="King">King</option>
                                    <option value="Twin">Twin</option>
                                    <option value="Family">Family</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={room.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Capacity</label>
                                <input
                                    type="number"
                                    name="capacity"
                                    value={room.capacity}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={room.description}
                                onChange={handleChange}
                                rows="4"
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Amenities</h3>
                        <div className="amenities-grid">
                            {availableAmenities.map((amenity) => (
                                <label key={amenity} className="amenity-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={room.amenities.includes(amenity)}
                                        onChange={() => toggleAmenity(amenity)}
                                    />
                                    <span>{amenity}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>Images</h3>
                        <ImageUploader onFilesSelected={handleImagesAdded} />
                        <RoomImageGallery 
                            images={room.images} 
                            onRemove={handleImageRemove} 
                            editable={true}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={() => navigate("/admin/rooms")}>
                            Cancel
                        </button>
                        <button type="submit" className="save-btn" disabled={saving}>
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
