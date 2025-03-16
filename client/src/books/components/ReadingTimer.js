import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Card,
  CardContent,
  Typography,
  Modal,
} from "@mui/material";
import useReadingTimer from "../hooks/useReadingTimer";

const ReadingTimer = ({ duration = 60 }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [open, setOpen] = useState(false);
  const { sendReadingTime } = useReadingTimer();

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      sendReadingTime(duration);
      setOpen(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, duration, sendReadingTime]);

  const handleStart = () => {
    if (!isRunning) {
      setOpen(true);
    }
    setIsRunning(true);
  };

  const onClose = () => {
    setOpen(false);
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const handleRestart = () => {
    setTimeLeft(duration);
    setIsRunning(true);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          mt: 5,
          padding: 3,
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h6">
            Would you like to start reading today?
          </Typography>
          <Button
            variant="contained"
            color={isRunning ? "secondary" : "primary"}
            onClick={handleStart}
            sx={{ mt: 2 }}
          >
            {isRunning ? "Pause" : "Start Timer"}
          </Button>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="reading-timer-modal"
      >
        <Box
          sx={{
            width: 400,
            margin: "auto",
            padding: 3,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 3,
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Typography variant="h6">
            Time Left: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
          </Typography>
          <Box
            sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}
          >
            <Button
              variant="contained"
              color={isRunning ? "info" : "primary"}
              onClick={handleRestart}
              disabled={isRunning}
              size="small"
            >
              Restart
            </Button>
            <Button variant="outlined" onClick={onClose} size="small">
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ReadingTimer;
