import { useCallback, useState } from "react";
import { generate } from "random-words";
import { Stack, Typography } from "@mui/material";

import Timer from "../Timer";
import ScoreCard from "../ScoreCard";
import TextArea from "../Textarea/TextArea";
import ReportCard from "../ReportCard";

const TypingSection = () => {
  const [triggerTimer, setTriggerTimer] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const [activeWord, setActiveWord] = useState("");
  const [words, setWords] = useState(() =>
    generate(500).map((word, i) => ({ word, id: i }))
  );
  const [showResult, setShowResult] = useState(false);
  const [typedWords, setTypedWords] = useState([]);
  const handleTypedWord = (word, actualWord) => {
    setTypedWords([
      ...typedWords,
      {
        actualWord,
        word,
      },
    ]);
    let newWpm = wpm;
    if (word === actualWord) {
      setCpm(cpm + actualWord.length);
      newWpm = wpm + 1;
      setWpm(newWpm);
    }
    setAccuracy(Math.round((newWpm / (typedWords.length + 1)) * 100));
  };
  const handleTestEnd = useCallback(() => {
    setTriggerTimer(false);
    setShowResult(true);
  }, []);

  const handleModalClose = () => {
    setShowResult(false);
    setWords(generate(500).map((word, i) => ({ word, id: i })));
    setTypedWords([]);
    setCpm(0);
    setWpm(0);
    setAccuracy(0);
    setActiveWord("");
  };

  return (
    <Stack direction="column" spacing={3} width={1} alignItems="center" pt={10}>
      <ReportCard
        open={showResult}
        wpm={wpm}
        cpm={cpm}
        accuracy={accuracy}
        handleClose={handleModalClose}
      />
      <Typography variant="body1" color="gray">
        TYPING SPEED TEST
      </Typography>
      <Typography variant="h3" fontWeight="bold">
        Test your typing skills
      </Typography>
      <Stack pt={5} direction="row" width={0.4} justifyContent="space-between">
        <Timer triggerTimer={triggerTimer} resetTrigger={handleTestEnd} />
        <ScoreCard unit="words/min" score={wpm} />
        <ScoreCard unit="chars/min" score={cpm} />
        <ScoreCard unit="% accuracy" score={accuracy} />
      </Stack>
      <Stack pt={5} direction="row" justifyContent="center" width={0.7}>
        <TextArea
          words={words}
          typedWords={typedWords}
          setTypedWords={setTypedWords}
          handleTypedWord={handleTypedWord}
          onFirstKeyDown={() => setTriggerTimer(true)}
          activeWord={activeWord}
          setActiveWord={setActiveWord}
        />
      </Stack>
    </Stack>
  );
};

export default TypingSection;
