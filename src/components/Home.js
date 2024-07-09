import "../css/Home.css";
import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [plantInfo, setPlantInfo] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const onFileUpload = () => {
    if (!selectedFile) {
      setError("Please select a file before uploading.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://localhost:5000/predict", formData)
      .then((response) => {
        setPlantInfo(response.data);
        setError(null);
      })
      .catch((err) => {
        setError(
          err.response?.data?.error || "There was an error uploading the file!"
        );
        setPlantInfo(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPlantInfo(null); // Clear previous plant info
    setError(null); // Clear previous errors

    // Display image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const clear = () => {
    setPlantInfo(null);
    setSelectedFile(null);
    setError(null);
    setImagePreview(null);
  };

  return (
    <div className="container">
      <h2>Medicinal Plant Detection System</h2>
      <b>Please Upload your Image Here !!!</b>
      <div className="content">
        <form onSubmit={(e) => { e.preventDefault(); }}>
          <div className="image-upload">
            
            <label htmlFor="file-input">Upload Image</label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Selected" className="preview-image" />
            )}
          </div>
          <div className="buttons">
            <button type="button" onClick={clear}>
              Clear
            </button>
            <button onClick={onFileUpload} disabled={loading}>
              {loading ? "Uploading..." : "Upload!"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
          <br />
          {plantInfo && (
            <div>
              <div className="form-group">
                <label htmlFor="plantname">Name of Plant</label>
                <textarea value={plantInfo.Name} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea value={plantInfo.Description} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location Where it is mostly found</label>
                <textarea value={plantInfo.Location} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="usage">Usage</label>
                <textarea value={plantInfo.Medical_Usage} readOnly />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Home;
