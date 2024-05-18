import React, { useState, useEffect } from "react";
import "../CSS/QA.css";
import axios from "axios";

const QA = () => {
  const [question, setQuestion] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchExtractedText = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/get-text");
        const { content } = response.data;
        console.log("Received text:", content);
        setExtractedText(content);
      } catch (error) {
        console.error("Error fetching extracted text:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExtractedText();
  }, []);

  const handleAskQuestion = async () => {
    if (question.trim() !== "") {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/question_answer",
          { extracted_text: extractedText, question }
        );
        const { answer } = response.data;
        setAnswer(answer);
      } catch (error) {
        console.error("Error fetching answer:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center",alignItems: "center"}}>
        <img
          src={require("../Assets/asking.png")}
          alt="Logo"
          className="Logo"
          style={{ width: "50px", marginRight: "10px" }}
        />
        <h1 style={{ textAlign: "center", marginTop: "10px" }}>MiNGLE.ai</h1>
      </div>
      <div className="QAContainer">
        <div className="ExtractedTextCard">
          <h2>Extracted Text</h2>
          {extractedText === "" ? (
            <p>Loading extracted text...</p>
          ) : (
            <textarea readOnly value={extractedText} />
          )}
        </div>
        <div className="AskQuestionCard">
          <h2>Ask a Question</h2>
          <div className="input-box">
            <input
              type="text"
              placeholder="Type your question..."
              value={question}
              onChange={handleQuestionChange}
            />
            <button className="btn btn-success" onClick={handleAskQuestion}>
              Ask
            </button>
          </div>
          {isLoading && <p>Loading answer...</p>}
          {answer !== "" && !isLoading && (
            <div className="AnswerCard">
              <h2>Answer</h2>
              <p>{answer}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QA;
