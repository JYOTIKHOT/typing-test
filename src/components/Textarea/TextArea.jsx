import React, { useEffect, useRef, useState } from "react";
import { Card, Stack, Typography } from "@mui/material";

import { longestCommonSubstring } from "../../utils";

const TextArea = ({ onFirstKeyDown, words, typedWords, handleTypedWord }) => {
  const [remainingWords, setRemainingWords] = useState(words);
  const [activeWord, setActiveWord] = useState("");
  const textAreaRef = useRef();

  const handleTyping = (e) => {
    onFirstKeyDown();
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

  useEffect(() => {
    setRemainingWords(words);
  }, [words]);

  const getRemainingWord = (word) => {
    const longestSubString = longestCommonSubstring([activeWord, word]);
    return word.substring(longestSubString.length);
  };

  const handleNextWord = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleTypedWord(activeWord, remainingWords[0].word);
      setRemainingWords(remainingWords.slice(1));
      setActiveWord("");
    }
  };

  useEffect(() => {
    textAreaRef?.current?.focus();
  });
  return (
    <Card
      variant="outlined"
      sx={{
        width: 1,
        height: "auto",
        borderRadius: 2,
        boxShadow: "0 9px 24px #0000001f, 0 9px 24px #0000001f",
      }}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        overflow="hidden"
        p={6}
        fontSize="48px"
        width={1}
        flexWrap="nowrap"
        className="textbox"
      >
        <Stack
          direction="row"
          justifyContent="flex-end"
          flexWrap="nowrap"
          width={0.5}
          spacing={1.5}
          color="GrayText"
        >
          {typedWords.map(({ word, actualWord }, i) => (
            <Typography
              variant="h4"
              key={`${word}-${i}`}
              sx={{
                textDecoration: word === actualWord ? "none" : "line-through",
              }}
            >
              {word}
            </Typography>
          ))}
          <Typography
            component="div"
            variant="h4"
            color="blue"
            ref={textAreaRef}
            contentEditable="true"
            autoCorrect={false}
            spellCheck={false}
            onInput={handleTyping}
            sx={{
              caretColor: "black",
              outline: "none",
              textDecoration:
                activeWord.length ===
                longestCommonSubstring([activeWord, remainingWords.at(0)?.word])
                  ?.length
                  ? "none"
                  : "line-through",
            }}
            onKeyDown={handleNextWord}
          >
            {activeWord}
          </Typography>
        </Stack>
        <Stack
          width={0.5}
          direction="row"
          justifyContent="space-between"
          spacing={1.5}
        >
          {remainingWords.map(({ word, id }, i) => (
            <Typography variant="h4" key={id}>
              {i === 0 ? getRemainingWord(word) : word}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

export default TextArea;
