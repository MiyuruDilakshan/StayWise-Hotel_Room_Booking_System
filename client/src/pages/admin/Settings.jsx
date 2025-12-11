// client/src/pages/admin/Settings.jsx
import React, { useEffect, useState, useRef } from "react";
import { fetchSettings, updateSettings } from "../../../../server/src/services//settings";
import ImageUploader from "../../components/ImageUploader";
import "../../styles/Settings.css";

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    hotelName: "",
    address: "",
    logoUrl: "/assets/admin-logo.png",
  });

  const currentPassRef = useRef();
  const newPassRef = useRef();
  const confirmPassRef = useRef();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchSettings();
        if (!mounted) return;
        setSettings((s) => ({ ...s, ...data }));
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setSettings((p) => ({ ...p, [name]: value }));
  }

  function onFilesSelected(files) {
    // For demo: use objectURL of first file as logo preview
    if (!files || files.length === 0) return;
    const url = URL.createObjectURL(files[0]);
    setSettings((p) => ({ ...p, logoUrl: url }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      // Password change fields (optional)
      const currentPassword = currentPassRef.current?.value || "";
      const newPassword = newPassRef.current?.value || "";
      const confirmPassword = confirmPassRef.current?.value || "";

      if (newPassword || confirmPassword) {
        if (newPassword !== confirmPassword) {
          alert("New password and confirm password do not match.");
          setSaving(false);
          return;
        }
      }

      // Construct payload
      const payload = {
        hotelName: settings.hotelName,
        address: settings.address,
        logoUrl: settings.logoUrl,
        // In a real app you'd send currentPassword & newPassword securely
      };

      await updateSettings(payload);
      alert("Settings saved");
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save settings. See console.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="settings-loading">Loading…</div>;

  return (
    <main className="admin-settings-page">
      <h1 className="page-title">Settings</h1>

      <form className="settings-form" onSubmit={handleSave}>
        <section className="card">
          <h2 className="section-title">Hotel Information</h2>

          <label className="label">Hotel Name</label>
          <input
            className="input"
            name="hotelName"
            value={settings.hotelName || ""}
            onChange={handleChange}
            placeholder="Enter hotel name"
          />

          <label className="label">Address</label>
          <textarea
            className="textarea"
            name="address"
            value={settings.address || ""}
            onChange={handleChange}
            rows={5}
            placeholder="Enter hotel address"
          />
        </section>

        <section className="card">
          <h2 className="section-title">Hotel Logo</h2>

          <div className="logo-preview">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt="Hotel logo" />
            ) : (
              <div className="logo-placeholder">No logo uploaded</div>
            )}
          </div>

          <div className="uploader-row">
            <ImageUploader onFilesSelected={onFilesSelected} />
          </div>
        </section>

        <section className="card">
          <h2 className="section-title">Change Admin Password</h2>

          <label className="label">Current Password</label>
          <input ref={currentPassRef} type="password" className="input" placeholder="Enter current password" />

          <label className="label">New Password</label>
          <input ref={newPassRef} type="password" className="input" placeholder="Enter new password" />

          <label className="label">Confirm New Password</label>
          <input ref={confirmPassRef} type="password" className="input" placeholder="Confirm new password" />
        </section>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </main>
  );
}
