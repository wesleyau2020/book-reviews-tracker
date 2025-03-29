import axios from "axios";

const useProgress = (onProgressUpdate) => {
  const updateProgress = async (bookId, newProgress, onClose) => {
    if (newProgress < 0 || newProgress > 100) {
      alert("Progress must be between 0 and 100%");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/api/books/${bookId}/progress`,
        newProgress,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("updateProgress:", response.data);
      onProgressUpdate(bookId, newProgress);
      onClose();
    } catch (err) {
      console.warn("Error updating progress:", err);
    } finally {
    }
  };

  return { updateProgress };
};

export default useProgress;
