import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Card, CardContent, CircularProgress } from "@mui/material";

const ReadingGoalChecker = () => {
  const [hasAchievedGoal, setHasAchievedGoal] = useState(null);
  const [loading, setLoading] = useState(true);

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
        console.log("hasAchievedReadingGoal:", response);
        setHasAchievedGoal(response);
      } catch (error) {
        console.error("Error fetching reading goal:", error);
      } finally {
        setLoading(false);
      }
    };

    checkReadingGoal();
  }, []);

  // Show loading spinner while fetching
  if (loading) {
    return (
      <Card variant="outlined" sx={{ width: "100%" }}>
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      {hasAchievedGoal ? (
        <Alert severity="success">You Have Achieved Your Reading Goals!</Alert>
      ) : (
        <Alert severity="warning">
          You Have Not Achieved Your Reading Goals!
        </Alert>
      )}
    </div>
  );
};

export default ReadingGoalChecker;
