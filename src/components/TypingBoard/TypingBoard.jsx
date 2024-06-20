import { Card, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ActiveWord from "../ActiveWord";

const TypingBoard = ({ words = [] }) => {
  const [typedWords, setTypedWords] = useState([]);
  const [upcomingWords, setUpcomingWords] = useState([]);
  const [activeWord, setActiveWord] = useState("");
  const cardRef = useRef();
  useEffect(() => {
    if (words.length > 0) {
      const [firstWord, ...restWords] = words;
      setActiveWord(firstWord);
      setUpcomingWords(restWords);
    }
  }, [words]);
  const handleClick = () => {
    cardRef.current.focus();
  };

  return (
    <Card
      ref={cardRef}
      onClick={handleClick}
      sx={{ width: "100%", minHeight: "100px" }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        direction="row"
        spacing={0.5}
        width="100%"
        height="100%"
        minWidth={0}
      >
        <Stack
          minHeight="100px"
          minWidth={0}
          width="50%"
          direction="row"
          spacing={0.5}
        >
          {typedWords.map((typedWord) => (
            <Typography key={typedWord} variant="h6" color="GrayText">
              {typedWord}
            </Typography>
          ))}
        </Stack>

        <ActiveWord activeWord={activeWord} />

        <Stack minWidth={0} width="50%" direction="row" spacing={0.5}>
          {upcomingWords.map((upcomingWord) => (
            <Typography key={upcomingWord} variant="h5">
              {upcomingWord}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
};

export default TypingBoard;
