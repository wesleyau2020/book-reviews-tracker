import axios from "axios";
import React, { useState, useEffect } from "react";
import { Typography, Box, Stack, CssBaseline } from "@mui/material";

// Components
import BookTable from "./BookTable";
import ReviewModal from "./ReviewModal";
import { useReviews } from "./useReviews";
import AppNavbar from "../dashboard/components/AppNavbar";
import Header from "../dashboard/components/Header";
import SideMenu from "../dashboard/components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";

export default function Books(props) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newReview, setNewReview] = useState("");
  const { reviews, fetchReviews, addReview } = useReviews();
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);

  // Fetch books when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/books")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, []);

  // Handle view reviews for a book
  const handleViewReviews = (bookId) => {
    fetchReviews(bookId);
  };

  // Handle adding a new review
  const handleAddReview = (book) => {
    setSelectedBook(book);
    setOpenModal(true);
  };

  const handleSubmitReview = () => {
    addReview(selectedBook.id, newReview);
    setNewReview("");
    setOpenModal(false);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
          <Stack spacing={2} sx={{ mx: 3, pb: 5, mt: { xs: 8, md: 0 } }}>
            <Header />
            {loading && <Typography variant="h6">Loading books...</Typography>}
            {error && (
              <Typography
                variant="h6"
                color="error"
              >{`Error: ${error}`}</Typography>
            )}
            {!loading && !error && (
              <>
                <BookTable
                  books={books}
                  onViewReviews={handleViewReviews}
                  onAddReview={handleAddReview}
                />
              </>
            )}
          </Stack>
        </Box>
      </Box>

      {/* Review Modal */}
      <ReviewModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmitReview}
        newReview={newReview}
        setNewReview={setNewReview}
      />
    </AppTheme>
  );
}
