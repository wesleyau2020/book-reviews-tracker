import { useState, useEffect } from "react";
import axios from "axios";

const useReadingGoal = () => {
  const [hasAchievedGoal, setHasAchievedGoal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkReadingGoal = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          "http://localhost:8080/api/reading-time/exceeds-one-hour",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("hasAchievedReadingGoal:", response.data);
        setHasAchievedGoal(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching goal:", error);
      } finally {
        setLoading(false);
      }
    };

    checkReadingGoal();
  }, []);

  return { hasAchievedGoal, loading, error };
};

export default useReadingGoal;
