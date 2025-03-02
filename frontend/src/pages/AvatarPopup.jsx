import React, { useState } from "react";
import "../styles/AvatarPopup.css"; // Ensure you create this CSS file

function AvatarPopup({ onClose, onUpload }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Show preview before uploading
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload the avatar
  const handleUpload = () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }
    onUpload(selectedImage); // Send the selected file to parent component
    onClose(); // Close the popup after uploading
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Update Avatar</h2>

        {/* Image Preview */}
        {previewImage && (
          <div className="image-preview">
            <img src={previewImage} alt="Preview" />
          </div>
        )}

        {/* File Input */}
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* Upload Button */}
        <button onClick={handleUpload} className="upload-btn">
          Upload Avatar
        </button>

        {/* Close Popup */}
        <button onClick={onClose} className="close-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AvatarPopup;
