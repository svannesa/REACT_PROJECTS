import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

const UploadForm = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastName", lastName);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully!");
      setName("");
      setLastName("");
      setImage(null);
    } catch (error) {
      alert("Error uploading file. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Upload Profile Picture</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Profile Picture:
          </label>
          <input
            type="file"
            id="image"
            className="form-control"
            accept="image/jpeg, image/jpg, image/png, image/gif, image/svg"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadForm;