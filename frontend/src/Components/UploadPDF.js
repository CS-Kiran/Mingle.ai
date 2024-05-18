import React, { useState } from "react";
import "../CSS/UploadPDF.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadPDF = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert("Please select a valid PDF file.");
    }
  };
  
  const handleUpload = async () => {
    if (selectedFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append("pdf_file", selectedFile);
  
      try {
        // Simulate loading for 3 seconds
        setTimeout(async () => {
          await axios.post("http://127.0.0.1:5000/extract_text", formData);
          setUploading(false);
          navigate("/QApdf");
        }, 3000);
      } catch (error) {
        console.error("Error uploading PDF:", error);
        alert("An error occurred while uploading the PDF.");
        setUploading(false);
      }
    } else {
      alert("Please select a PDF file before uploading.");
    }
  };
  

  return (
    <>
      <div className="container-upload-pdf">
        <h1 className="heading-upload-pdf">Upload PDF</h1>
        <input
          type="file"
          id="file-input"
          accept=".pdf"
          style={{ display: "none" }}
          onChange={handleFileInput}
        />
        <label
          htmlFor="file-input"
          className="upload-pdf-label"
          onClick={() => document.getElementById("file-input").click()}
        >
          Browse for PDF file
        </label>
        {selectedFile && (
          <p className="selected-file">Selected File: {selectedFile.name}</p>
        )}
        {!uploading && (
          <button className={`upload-btn`} onClick={handleUpload}>
            Upload
          </button>
        )}
        {uploading && (
          <div className="uploading-spinner">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadPDF;
