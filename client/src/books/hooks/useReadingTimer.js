import axios from "axios";

const useReadingTimer = () => {
  const sendReadingTime = async (readingTime) => {
    try {
      const token = localStorage.getItem("token");
      const currentDate = new Date().toISOString().split("T")[0];
      const requestBody = {
        date: currentDate,
        minutesSpent: Math.floor(readingTime / 60),
      };

      await axios.post("http://localhost:8080/api/reading-time", requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("sendReadingTime:", requestBody);
    } catch (error) {
      console.error("Error saving reading time:", error);
    } finally {
      //
    }
  };

  return { sendReadingTime };
};

export default useReadingTimer;
