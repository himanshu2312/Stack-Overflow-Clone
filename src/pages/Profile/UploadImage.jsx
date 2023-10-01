import { React, useState } from "react";

export default function UploadImage({ setUpload }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (selectedImage) {
        // You can now send the selectedImage to your server or perform any necessary actions.
        console.log("Selected image:", selectedImage);
        setUpload(false);
      } else {
        alert("No image selected. Please select a Image to upload");
      }
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div>
      <h1 className="edit-profile-title">Upload New Profile Picture</h1>
      <h2 className="edit-profile-title-2">Public Information</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        {selectedImage && (
          <>
          <div>
            <p>Selected Image: {selectedImage.name}</p>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected File"
              width="200"
              height="200"
              />
          </div>
          <button type="button" className="edit-profile-btn discard-btn" onClick={(e)=>setSelectedImage(null)}>Discard Image</button>
          </>
        )}

        {!selectedImage && <input
          type="file"
          id="image"
          accept="image/*"
          className="edit-profile-btn"
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />}
        <br />
        <br />
        <input type="submit" value="Upload Image" className="user-submit-btn" />
        <button
          type="button"
          className="user-cancel-btn"
          onClick={() => setUpload(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
