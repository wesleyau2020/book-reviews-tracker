import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Stack,
  CssBaseline,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

// Components
import BookTable from "./components/BookTable";
import BooksCompletedChart from "./components/BooksCompletedChart";
import ReadingGoalChecker from "./components/ReadingGoalChecker";
import ReadingTimer from "./components/ReadingTimer";
import ErrorAlert from "./components/ErrorAlert";
import AppNavbar from "../dashboard/components/AppNavbar";
import Header from "../dashboard/components/Header";
import SideMenu from "../dashboard/components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";

export default function Books(props) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch books when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
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
        console.log("Books fetched!", response.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        console.warn("Error fetching books:", error.message);
      });
  }, []);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
          <Stack spacing={2} sx={{ mx: 3, pb: 5, mt: { xs: 8, md: 0 } }}>
            <Header />
            <ReadingGoalChecker />
            <ReadingTimer duration={60 * 15} />
            <Card variant="outlined" sx={{ width: "100%" }}>
              <CardContent>
                <BooksCompletedChart
                  books={books}
                  sx={{ height: "100%", width: "100%" }}
                />
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              sx={{ width: "100%", padding: loading || error ? 2 : 0 }}
            >
              <CardContent>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <ErrorAlert />
                ) : (
                  <BookTable books={books} setBooks={setBooks} />
                )}
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
