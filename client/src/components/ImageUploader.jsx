import React, { useRef } from "react";

export default function ImageUploader({ onFilesSelected, inputRef }) {
  const ref = inputRef || useRef();

  function handleClick() {
    ref.current.click();
  }

  function handleChange(e) {
    const files = Array.from(e.target.files);
    onFilesSelected(files);
  }

  return (
    <div className="uploader">
      <p>Upload Images</p>
      <button className="btn" type="button" onClick={handleClick}>
        Select Files
      </button>

      <input
        ref={ref}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
