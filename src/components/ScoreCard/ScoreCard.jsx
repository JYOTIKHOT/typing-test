import { Card, Stack, Typography } from "@mui/material";

const ScoreCard = ({ score, unit }) => {
  return (
    <Stack height={1} spacing={1} width="100px" alignItems="center">
      <Card
        variant="outlined"
        sx={{ width: 1, borderRadius: 3, border: "none" }}
      >
        <Stack
          width={1}
          height={1}
          boxSizing="border-box"
          p={2}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h3">{score}</Typography>
        </Stack>
      </Card>
      <Typography variant="body2">{unit}</Typography>
    </Stack>
  );
};

export default ScoreCard;
