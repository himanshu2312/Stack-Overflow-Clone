import { React, useState } from "react";
import { updateProfileImage } from "../../actions/user";
import { useDispatch } from "react-redux";

export default function UploadImage({ setUpload }) {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    }
    reader.onerror = (err) => {
      console.log(err);
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (image) {
        dispatch(updateProfileImage(image));
        setUpload(false);
      } else {
        alert("No image selected. Please select a Image to upload");
      }
    }
    catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <h1 className="edit-profile-title">Upload New Profile Picture</h1>
      <h2 className="edit-profile-title-2">Public Information</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        {image && (
          <>
            <div>
              <p>Selected Image: {image.name}</p>
              <img
                src={image}
                alt="Selected File"
                width="200"
                height="200"
              />
            </div>
            <button
              type="button"
              className="edit-profile-btn discard-btn"
              onClick={(e) => setImage(null)}
            >
              Discard Image
            </button>
          </>
        )}

        {!image && (
          <input
            type="file"
            id="image"
            accept="image/*"
            className="edit-profile-btn"
            onChange={(e) => handleImageChange(e)}
          />
        )}
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
