import React, { useEffect, useState } from "react";
import Left from "../../assets/test-bg-left.png";
import Right from "../../assets/test-bg-right.png";
import Textarea from "../../components/Textarea/Textarea";
import Timer from "../../components/Timer/Timer";
import { Box, Stack, Typography } from "@mui/material";

function HomePage() {
  const [triggerTimer, setTriggerTimer] = useState(true);

  return (
    <>
      <Box>
        <Box
          sx={{
            backgroundImage: `url(${Left}), url(${Right})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: "#f6f6f7",
            backgroundSize: "auto",
            position: "absolute",
            zIndex: -1,
            minWidth: "100vw",
            minHeight: "100vh",
          }}
        >
          <img src={Left} alt="Left img" />
          <img src={Right} alt="Left img" />
        </Box>
        <Stack
          direction="column"
          spacing={4}
          width={"100%"}
          alignItems={"center"}
          pt={"40px"}
        >
          <Typography variant="h4" fontWeight={"regular"}>
            TYPING SPEED TEST
          </Typography>

          <Typography variant="h1" fontWeight={"bold"}>
            Test your typing skills
          </Typography>
          <Box>
            <Timer
              triggerTimer={triggerTimer}
              resetTrigger={() => setTriggerTimer(false)}
            />
          </Box>
          <Textarea />
        </Stack>
      </Box>
    </>
  );
}

export default HomePage;
