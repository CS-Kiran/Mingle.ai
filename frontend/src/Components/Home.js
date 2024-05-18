import React, { useState } from "react";
import "../CSS/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [showCards, setShowCards] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setShowCards(true);
  };

  const handleCardClick = (page) => {
    navigate(page);
  };

  return (
    <div className="App">
      <header className="Header">
        <div className="HeaderContent" onClick={() => handleCardClick("/")}>
          <img
            src={require("../Assets/asking.png")}
            alt="Logo"
            className="Logo"
          />
          <div>
            <h2>
              MiNGLE.ai<p className="PoweredBy">Powered by BERT</p>
            </h2>
          </div>
        </div>
      </header>
      {showCards ? (
        <section className="cardSection">
          <div className="UploadPDFTextScreen fade-in">
            <div className="card1" onClick={() => handleCardClick("/uploadPDF")}>
              <h2><b>Upload PDF</b></h2>
              <p>
                To begin, upload your PDF file. Our platform utilizes BERT, a
                powerful language model, to help you with Question Answering
                (QA).
              </p>
            </div>
            <div className="card1" onClick={() => handleCardClick("/QAtext")}>
              <h2><b>Text Q&A</b></h2>
              <p>
                To begin, paste your text. Our platform utilizes BERT, a
                powerful language model, to help you with Question Answering
                (QA).
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className={`Section ${showCards ? "fade-out" : ""}`}>
          <div className="LeftContent">
            <p className="WelcomeText">
              Welcome to MiNGLE.ai - Unleashing Insights from Your PDFs! Our
              innovative platform harnesses cutting-edge technology to help you
              extract valuable insights, answer questions, and gain a deeper
              understanding of your PDF content like never before. Whether
              you're a student, researcher, or professional, PDF Genius empowers
              you to uncover knowledge with ease and efficiency. Start exploring
              the limitless possibilities today!
            </p>
            <button className="GetStartedBtn" onClick={handleButtonClick}>
              Get Started
            </button>
          </div>
          <div className="RightContent">
            {/* eslint-disable-next-line */}
            <img
              src={require("../Assets/bot.png")}
              alt="Image"
              className="Image"
            />
          </div>
        </section>
      )}
      <footer className="Footer">
        <p className="Copyright">
          © 2023 by MiNGLE.ai Created by{" "}
          <a
            href="https://github.com/CS-Kiran"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "#000", fontWeight: "600" }}
          >
            Kiran
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Home;
