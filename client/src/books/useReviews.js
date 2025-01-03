import axios from "axios";
import { useState } from "react";

export const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  const fetchReviews = (bookId) => {
    axios
      .get(`http://localhost:8080/api/reviews/${bookId}`)
      .then((response) => {
        console.log("Fetched reviews:", response.data);
        setReviews(response.data);
      })
      .catch((error) => {
        setError(
          "Error fetching reviews: " +
            (error.response ? error.response.data : error.message),
        );
      });
  };

  const addReview = (bookId, newReview) => {
    const reviewData = {
      content: newReview,
      reviewerName: "Wesley Au",
      book: { id: bookId },
    };

    axios
      .post(`http://localhost:8080/api/reviews`, reviewData, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => fetchReviews(bookId))
      .catch((error) => {
        setError(
          "Error adding review: " +
            (error.response ? error.response.data : error.message),
        );
      });
  };

  return { reviews, error, fetchReviews, addReview };
};
