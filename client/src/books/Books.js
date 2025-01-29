import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Stack,
  CssBaseline,
  Card,
  CardContent,
  Alert,
} from "@mui/material";

// Components
import BookTable from "./components/BookTable";
import ReviewModal from "./components/ReviewModal";
import BooksCompletedChart from "./components/BooksCompletedChart";
import { useReviews } from "./hooks/useReviews";
import AppNavbar from "../dashboard/components/AppNavbar";
import Header from "../dashboard/components/Header";
import SideMenu from "../dashboard/components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";

export default function Books(props) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [newReview, setNewReview] = useState("");
  const { reviews, addReview, updateReview } = useReviews();
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);

  // Fetch books when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    axios
      .get("http://localhost:8080/api/books", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        console.log(error.message);
      });
  }, []);

  // Handle adding a new review
  const handleAddReview = (book, isUpdate) => {
    setSelectedBook(book);
    setIsUpdate(isUpdate);
    setOpenModal(true);
  };

  const handleSubmitReview = () => {
    if (isUpdate) {
      updateReview(selectedBook.id, newReview, selectedBook.review.id);
    } else {
      addReview(selectedBook.id, newReview);
    }

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
            <Alert severity="error">
              You Have Not Acheived Your Reading Goals!
            </Alert>
            <Card variant="outlined" sx={{ width: "100%" }}>
              <CardContent>
                <BooksCompletedChart sx={{ height: "100%", width: "100%" }} />
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              sx={{ width: "100%", padding: loading || error ? 2 : 0 }}
            >
              <CardContent>
                {(loading || error) && (
                  <Typography variant="body1">Loading table...</Typography>
                )}
                {!loading && !error && (
                  <BookTable books={books} onAddReview={handleAddReview} />
                )}
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>

      <ReviewModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmitReview}
        newReview={newReview}
        setNewReview={setNewReview}
        setIsUpdate={setIsUpdate}
      />
    </AppTheme>
  );
}
