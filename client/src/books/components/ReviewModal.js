import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const ReviewModal = ({
  open,
  onClose,
  onSubmit,
  selectedBook,
  newReview,
  setNewReview,
  isUpdate,
}) => {
  const handleSubmit = () => {
    if (newReview.trim() === "") {
      alert("Please enter a review!");
      return;
    }

    onSubmit();
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
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {isUpdate ? "Update Review" : "Add Review"}
        </Typography>
        <TextField
          fullWidth
          // label="Review"
          multiline
          rows={4}
          placeholder={selectedBook?.review?.content ?? ""}
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
