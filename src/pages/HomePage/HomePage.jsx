import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TypingBoard from "../../components/TypingBoard/TypingBoard";
import { generate } from "random-words";

const HomePage = () => {
  const [words, setWords] = useState([]);
  useEffect(() => {
    setWords([...generate(500)]);
  }, []);
  useEffect(() => {
    console.log("Current words", words);
  });
  return (
    <Box>
      <Stack p={12} alignItems="center" spacing={12}>
        <Stack alignItems="center" spacing={1}>
          <Typography variant="body1" color="gray">
            TYPING SPEED TEST
          </Typography>
          <Typography variant="h3" fontWeight="bold">
            Test your typing skills
          </Typography>
          <Box>
            <Typography variant="h6">Clock will come here</Typography>
          </Box>
        </Stack>
        <TypingBoard words={words} />
      </Stack>
    </Box>
  );
};

export default HomePage;
