import React, { useEffect, useState } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

function Timer({ triggerTimer, resetTrigger }) {
  const [time, setTime] = useState(60);
  useEffect(() => {
    const timer =
      triggerTimer &&
      setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    if (triggerTimer && time === 0) {
      setTime(60);
      resetTrigger();
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [triggerTimer, time]);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        backgroundColor: "white",
        height: "120px",
        borderRadius: "50%",
      }}
    >
      <CircularProgress
        variant="determinate"
        color="warning"
        size="120px"
        value={Math.round((time * 5) / 3)}
      />
      <Box
        sx={{
          position: "absolute",
          top: 40,
          left: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" component="div" fontWeight={800}>
          {time}
        </Typography>
      </Box>
    </Box>
  );
}

export default Timer;
