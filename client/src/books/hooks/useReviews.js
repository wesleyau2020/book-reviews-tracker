import axios from "axios";
import { useState } from "react";

export const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  const addReview = (bookId, newReview) => {
    const reviewData = {
      content: newReview,
      reviewerName: "Wesley Au",
      book: { id: bookId },
    };

    axios
      .post(`http://localhost:8080/api/reviews`, reviewData, {
        auth: {
          username: "admin@local.com",
          password: "password",
        },
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setError(
          "Error adding review: " +
            (error.response ? error.response.data : error.message),
        );
      });
  };

  const updateReview = (bookId, updatedReview, reviewId) => {
    const reviewData = {
      content: updatedReview,
      reviewerName: "Wesley Au",
      book: { id: bookId },
    };

    axios
      .put(`http://localhost:8080/api/reviews/${reviewId}`, reviewData, {
        auth: {
          username: "admin@local.com",
          password: "password",
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setError(
          "Error updating review: " +
            (error.response ? error.response.data : error.message),
        );
      });
  };

  return { reviews, error, addReview, updateReview };
};
