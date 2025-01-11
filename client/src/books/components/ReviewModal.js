import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const ReviewModal = ({
  open,
  onClose,
  onSubmit,
  newReview,
  setNewReview,
  bookId,
}) => {
  const handleSubmit = () => {
    if (newReview.trim() === "") {
      alert("Please enter a review!");
      return;
    }
    onSubmit(bookId, newReview);
    setNewReview("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-review-modal"
      aria-describedby="add-review-modal-description"
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
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Review
        </Typography>
        <TextField
          fullWidth
          // label="Review"
          multiline
          rows={4}
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          sx={{
            "& .MuiInputBase-root": {
              display: "flex",
              flexDirection: "column",
            },
          }}
        />
        <Box
          sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
