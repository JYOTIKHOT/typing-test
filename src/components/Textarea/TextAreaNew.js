import React, { useRef, useState } from "react";
import "./TextAreaNew.css";

const TextAreaNew = () => {
  const [typedWords, setTypedWords] = useState([]);
  const [comingWords, setComingWords] = useState([
    "hello",
    "world",
    "dog",
    "cat",
    "mouse",
    "house",
    "tar",
    "car",
    "bar",
    "rat",
    "hat",
    "mat",
    "sophisticated",
  ]);
  const [activeWord, setActiveWord] = useState("");
  const textAreaRef = useRef();

  const handleTyping = (e) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const caretPosition = range.endOffset;

    // Update the state
    setActiveWord(e.target.textContent || "");

    // Once state is updated, move the caret to its previous position
    window.requestAnimationFrame(() => {
      const newRange = document.createRange();
      const newSelection = window.getSelection();
      if (e.target.childNodes[0]) {
        newRange.setStart(e.target.childNodes[0], caretPosition);
        newRange.collapse(true);
        newSelection.removeAllRanges();
        newSelection.addRange(newRange);
      }
    });
  };

  return (
    <div className="textbox">
      <div className="textbox__typed">
        {typedWords.map((word, i) => (
          <span key={`${word}-${i}`}>{word}</span>
        ))}
        <div
          ref={textAreaRef}
          className="textbox__active"
          contentEditable="true"
          autoCorrect={false}
          spellCheck={false}
          onInput={handleTyping}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              setTypedWords([...typedWords, comingWords[0]]);
              setComingWords(comingWords.slice(1));
              setActiveWord("");
            }
          }}
        >
          {activeWord}
        </div>
      </div>
      <div className="textbox__coming">
        {comingWords.map((word, i) => (
          <span key={word}>
            {word.includes(activeWord) && i === 0
              ? word.substring(word.indexOf(activeWord) + activeWord.length)
              : word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextAreaNew;
