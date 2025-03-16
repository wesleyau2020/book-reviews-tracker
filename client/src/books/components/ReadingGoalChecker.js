import React from "react";
import { Alert, Card, CardContent, CircularProgress } from "@mui/material";
import useReadingGoal from "../hooks/useReadingGoal";

const ReadingGoalChecker = () => {
  const { hasAchievedGoal, loading, error } = useReadingGoal();

  if (loading) {
    return (
      <Card variant="outlined" sx={{ width: "100%" }}>
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant="outlined" sx={{ width: "100%" }}>
        <CardContent>
          <Alert severity="error">
            Error! Please contact system administrator
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      {hasAchievedGoal ? (
        <Alert severity="success" icon={false}>
          🎉 Congratulations! You've achieved your reading goal!
        </Alert>
      ) : (
        <Alert severity="warning" icon={false}>
          📚 Keep Going! You have not achieved your reading goals!
        </Alert>
      )}
    </div>
  );
};

export default ReadingGoalChecker;
