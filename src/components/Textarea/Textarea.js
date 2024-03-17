import { Card, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { generate } from "random-words";

export default function Textarea() {
  const [completedWords, setCompletedWords] = useState([]);
  const [pendingWords, setPendingWords] = useState(generate(300));
  const [activeWord, setActiveWord] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const cardRef = useRef(null);
  const handleClick = () => {
    const [firstWord, ...restWords] = pendingWords;
    setActiveWord(firstWord);
    setPendingWords(restWords);
    cardRef.current.focus();
  };
  const handleKey = (e) => {
    e.preventDefault();
    if (e.key === "Backspace" && currentWord !== "") {
      setCurrentWord(currentWord.substring(0, currentWord.length - 1));
    } else if (e.key === " " && currentWord !== "") {
      setCompletedWords([currentWord, ...completedWords]);
      setCurrentWord("");
      const [firstWord, ...restWords] = pendingWords;
      setActiveWord(firstWord);
      setPendingWords(restWords);
    } else if (new RegExp("^[a-zA-Z\\s\\W]$").test(e.key)) {
      setCurrentWord(currentWord + e.key);
    }
  };

  return (
    <Card
      variant="elevation"
      sx={{
        width: "calc(100vw - 400px)",
        height: "150px",
        zIndex: "100",
        borderRadius: "12px",
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px",
        cursor: "text",
      }}
      ref={cardRef}
      onClick={handleClick}
      onKeyDown={handleKey}
      tabIndex="0"
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        height="100%"
        width="100%"
      >
        <Stack
          direction="row-reverse"
          spacing={1}
          width="50%"
          sx={{ whiteSpace: "nowrap", overflow: "hidden" }}
        >
          {completedWords.map((word, index) => {
            return (
              <Typography color="rgb(171, 171, 176)" variant="h4" key={index}>
                {word}
              </Typography>
            );
          })}
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          width="50%"
          sx={{ whiteSpace: "nowrap", overflow: "hidden" }}
        >
          <Typography variant="h4">
            {activeWord.split("").map((char, i) => {
              return (
                <span
                  style={{
                    color:
                      !!currentWord[i] && currentWord[i] === char
                        ? "blue"
                        : "inherit",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </Typography>
          {pendingWords.map((word, index) => {
            return (
              <Typography variant="h4" key={index}>
                {word}
              </Typography>
            );
          })}
        </Stack>
        {/* <Typography textOverflow="clip" variant="h4" noWrap>
          {pendingWords.map((word, index) => {
            return (
              <Typography
                variant="span"
                component={"span"}
                color={index < 3 ? "primary" : "error"}
              >
                {word + " "}
              </Typography>
            );
          })}
        </Typography> */}
      </Stack>
    </Card>
  );
}
