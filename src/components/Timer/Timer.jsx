import { CircularProgress, Stack, Typography } from "@mui/material";
import React, { useState, useEffect, useRef, useCallback } from "react";

const Timer = ({ triggerTimer, resetTrigger }) => {
  const [time, setTime] = useState(60); // Start from 60 seconds
  const startTimeRef = useRef(null); // Reference to the triggerTimer time
  const requestRef = useRef(null); // Reference to store requestAnimationFrame

  // Function to reset the timer back to 60 seconds
  const resetTimer = useCallback(() => {
    setTime(60);
    resetTrigger();
  }, [resetTrigger]);

  // Callback function for countdown
  const countdown = useCallback(
    (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp; // Set initial timestamp
      }

      const elapsed = (timestamp - startTimeRef.current) / 1000; // Calculate elapsed time in seconds

      const newTime = 60 - Math.floor(elapsed); // Update remaining time

      if (newTime >= 0) {
        setTime(newTime); // Update time state
      } else {
        resetTimer(); // Reset timer when it reaches 0
        startTimeRef.current = timestamp; // Reset the triggerTimer timestamp
      }

      // Continue the loop
      requestRef.current = requestAnimationFrame(countdown);
    },
    [resetTimer]
  );

  useEffect(() => {
    if (triggerTimer) {
      startTimeRef.current = null; // Reset triggerTimer time
      requestRef.current = requestAnimationFrame(countdown); // Start countdown
    } else {
      cancelAnimationFrame(requestRef.current); // Stop the timer if 'triggerTimer' is false
    }

    return () => cancelAnimationFrame(requestRef.current); // Cleanup on unmount
  }, [triggerTimer, countdown]);

  return (
    <Stack
      position="relative"
      sx={{ backgroundColor: "white", borderRadius: "50%" }}
    >
      <CircularProgress
        variant="determinate"
        color={triggerTimer ? "success" : "error"}
        size="120px"
        thickness={2}
        value={Math.round((time * 5) / 3)}
        sx={{ animation: "all 1s smooth" }}
      />
      <Stack
        position="absolute"
        width={1}
        height={1}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" component="div" fontWeight={800}>
          {time}
        </Typography>
        <Typography variant="body2">seconds</Typography>
      </Stack>
    </Stack>
  );
};

export default Timer;
