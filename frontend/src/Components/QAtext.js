import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QAtext = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const navigate = useNavigate();
  
  // Clean and convert text into a single string
  const cleanAndConvertToSingleString = (text) => {
    return text.replace(/\s+/g, ' ').trim().toString();
  };

  const handleTextChange = (e) => {
    const inputValue = e.target.value;
    setTextValue(inputValue);
    const words = inputValue.trim().split(/\s+/);
    setWordCount(words.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedText = cleanAndConvertToSingleString(textValue);
    if (wordCount > 100) {
      setIsLoading(true);
      try {
        await axios.post('http://localhost:5000/send-text', { cleanedText });
        console.log(cleanedText);
      } catch (error) {
        console.error('Error sending text:', error);
      } finally {
        setIsLoading(false);
        navigate("/QApdf");
      }
    } else {
      alert("Please enter more than 100 words.");
    }
  };


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        className="card"
        style={{
          width: "35rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "0px 10px",
        }}
      >
        <div className="card-body">
          <h5 className="card-title">Text Question & Answering</h5>
          <textarea
            className="card-text"
            placeholder="Enter your PDF content here [must be greater than 100 words]"
            value={textValue}
            onChange={handleTextChange}
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              background: "#fff",
            }}
          />
          <div style={{ marginTop: "5px", fontSize: "14px", color: "#888" }}>
            Word Count: {wordCount}
          </div>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            style={{ marginTop: "20px", width: "100%" }}
            disabled={isLoading || wordCount < 100}
          >
            {isLoading ? <span>Loading...</span> : <span>Submit</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QAtext;
