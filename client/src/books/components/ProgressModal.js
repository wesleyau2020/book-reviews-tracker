import React, { useState } from "react";
import axios from "axios";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const ProgressModal = ({ open, onClose, bookId, currentProgress, onProgressUpdate }) => {
  const [newProgress, setNewProgress] = useState(currentProgress || 0);

  const handleSubmit = () => {
    if (newProgress < 0 || newProgress > 100) {
      alert("Progress must be between 0 and 100%");
      return;
    }

    const progressValue = newProgress;
    const token = localStorage.getItem("jwtToken");

    axios
      .put(`http://localhost:8080/api/books/${bookId}/progress`, progressValue, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Progress updated:", response.data);
        onProgressUpdate(bookId, progressValue); // Update progress in state
        onClose();
      })
      .catch((error) => {
        console.warn("Error updating progress: " + (error.response ? error.response.data : error.message));
      });
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="update-progress-modal">
      <Box
        sx={{
          width: 400,
          margin: "auto",
          padding: 3,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Update Progress
        </Typography>
        <TextField
          fullWidth
          type="number"
        //   label="Progress (%)"
          value={newProgress}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!isNaN(value) && value >= 0 && value <= 100) {
              setNewProgress(value);
            }
          }}
        />
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
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
