import React, { useState } from "react";
import { Box, Button, Modal, Slider, Typography } from "@mui/material";
import useProgress from "../hooks/useProgress";

const ProgressModal = ({
  open,
  onClose,
  bookId,
  currentProgress,
  onProgressUpdate,
}) => {
  const [newProgress, setNewProgress] = useState(currentProgress || 0);
  const { updateProgress } = useProgress(onProgressUpdate);

  const handleSubmit = () => {
    updateProgress(bookId, newProgress, onClose);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="update-progress-modal"
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
        <Typography variant="h6" gutterBottom>
          Update Progress
        </Typography>
        <Slider
          value={newProgress}
          onChange={(e) => {
            const value = Number(e.target.value);
            setNewProgress(value);
          }}
          min={0}
          max={100}
          step={1}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}%`}
        />
        <Box
          sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProgressModal;
