import React, { useState, useEffect } from "react";
import "./index.css";

const TextAnalyst = () => {
  // State to manage user input and processing stats
  const [inputText, setInputText] = useState("");
  const [uniqueWords, setUniqueWords] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [modifiedText, setModifiedText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [replaceTerm, setReplaceTerm] = useState("");

  // Analyze the text whenever it changes
  useEffect(() => {
    analyzeTextContent();
  }, [inputText]);

  // Function to update the text as user types
  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  // Function to calculate the unique words and character count
  const analyzeTextContent = () => {
    // Extract words, make them lowercase, and count unique ones
    const wordsArray = inputText.toLowerCase().match(/\b\w+\b/g) || [];
    const wordSet = new Set(wordsArray);
    setUniqueWords(wordSet.size);

    // Remove all non-alphabet characters for character count
    const characterArray = inputText.replace(/[^\w]/g, "");
    setCharacterCount(characterArray.length);
  };

  // Function to replace all occurrences of a string with another
  const replaceWords = () => {
    if (searchTerm && replaceTerm) {
      const updatedText = inputText.replaceAll(searchTerm, replaceTerm);
      setModifiedText(updatedText);
      setInputText(updatedText);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Text Analyzer Tool</h1>

      <textarea
        value={inputText}
        onChange={handleTextChange}
        className="textarea"
        placeholder="Type your text here..."
      ></textarea>

      <div className="statistics">
        <p>
          Unique Words: <span>{uniqueWords}</span>
        </p>
        <p>
          Characters (excluding spaces): <span>{characterCount}</span>
        </p>
      </div>

      <div className="replacement">
        <input
          type="text"
          placeholder="Search for..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Replace with..."
          value={replaceTerm}
          onChange={(e) => setReplaceTerm(e.target.value)}
          className="input-field"
        />
        <button className="replace-btn" onClick={replaceWords}>
          Replace All
        </button>
      </div>

      {modifiedText && (
        <div className="modified-section">
          <h3>Modified Text</h3>
          <p>{modifiedText}</p>
        </div>
      )}
    </div>
  );
};

export default TextAnalyst;
