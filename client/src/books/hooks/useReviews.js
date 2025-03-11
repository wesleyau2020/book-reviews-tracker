import axios from "axios";
import { useState } from "react";

export const useReviews = () => {
  const [error, setError] = useState(null);

  const addReview = async (bookId, newReview) => {
    try {
      const token = localStorage.getItem("jwtToken");

      const reviewData = {
        content: newReview,
        reviewerName: "Wesley Au",
        book: { id: bookId },
      };

      const response = await axios.post(
        `http://localhost:8080/api/reviews`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      return response.data; // Return new review so Books.js can update state
    } catch (error) {
      setError(
        `Error adding review: ${error.response ? error.response.data : error.message}`,
      );
      return null;
    }
  };

  const updateReview = async (bookId, updatedReview, reviewId) => {
    try {
      const token = localStorage.getItem("jwtToken");

      const reviewData = {
        content: updatedReview,
        reviewerName: "Wesley Au",
        book: { id: bookId },
      };

      const response = await axios.put(
        `http://localhost:8080/api/reviews/${reviewId}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      return response.data; // Return updated review so Books.js can update state
    } catch (error) {
      setError(
        `Error updating review: ${error.response ? error.response.data : error.message}`,
      );
      return null;
    }
  };

  return { error, addReview, updateReview };
};
