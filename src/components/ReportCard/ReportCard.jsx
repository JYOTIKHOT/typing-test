import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import turtle from "../../assets/sad-turtle-final.png";
import octopus from "../../assets/octopus.jpeg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReportCard({
  open,
  handleClose,
  wpm = 50,
  cpm,
  accuracy,
}) {
  return (
    <>
      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={3}>
            <img
              width={250}
              height={225}
              src={wpm < 35 ? turtle : octopus}
              alt="Doodle"
            />
            <Stack spacing={3} p={3}>
              <Typography variant="h4" fontWeight="bold">
                U r {wpm < 35 ? "Turtle :(" : "Octopus:)"}
              </Typography>
              <DialogContentText id="alert-dialog-slide-description">
                {wpm < 35 ? "Well... " : "Awesome! "} You type with the speed of{" "}
                <b>
                  {wpm} WPM ({cpm} CPM)
                </b>
                . Your accuracy was <b>{accuracy}%</b>. Congratulations!
              </DialogContentText>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack pb={2} pr={3}>
            <Button
              sx={{
                background: "linear-gradient(90deg, #e01cd5 0%, #1CB5E0 100%)",
              }}
              variant="contained"
              onClick={handleClose}
              size="large"
            >
              Try Again
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
}
