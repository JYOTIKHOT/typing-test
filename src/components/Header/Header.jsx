import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Headers() {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #e01cd5 0%, #1CB5E0 100%)",
      }}
    >
      <Toolbar>
        <Typography fontFamily="cursive" fontWeight={600} variant="h5">
          HyperType
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
