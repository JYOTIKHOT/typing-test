import { Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";

const ActiveWord = ({ activeWord }) => {
  const [index, setIndex] = useState(0);
  return (
    <Stack direction="row">
      <Typography color="blue" variant="body1">
        {activeWord.slice(0, index)}
      </Typography>
      <Divider orientation="vertical" flexItem />
      <Typography variant="h5" fontWeight="bold">
        {activeWord.slice(index)}
      </Typography>
    </Stack>
  );
};

export default ActiveWord;
