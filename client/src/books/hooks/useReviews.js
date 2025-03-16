import axios from "axios";

export const useReviews = () => {
  const addReview = async (bookId, newReview) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const reviewData = {
        content: newReview,
        reviewerName: "Wesley Au",
        book: { id: bookId },
      };

      await axios.post(`http://localhost:8080/api/reviews`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.warn("Error adding review", error);
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

      await axios.put(
        `http://localhost:8080/api/reviews/${reviewId}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.warn("Error updating review", error);
      return null;
    }
  };

  return { addReview, updateReview };
};
