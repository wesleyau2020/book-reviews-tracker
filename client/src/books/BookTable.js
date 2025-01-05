import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  LinearProgress,
  Tooltip,
} from "@mui/material";

const BookTable = ({ books, onViewReview, onAddReview }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, borderCollapse: "collapse" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ border: "1px solid black", fontWeight: "bold" }}>
              ID
            </TableCell>
            <TableCell sx={{ border: "1px solid black", fontWeight: "bold" }}>
              Title
            </TableCell>
            <TableCell sx={{ border: "1px solid black", fontWeight: "bold" }}>
              Author
            </TableCell>
            <TableCell sx={{ border: "1px solid black", fontWeight: "bold" }}>
              Progress
            </TableCell>
            <TableCell sx={{ border: "1px solid black", fontWeight: "bold" }}>
              Review
            </TableCell>
            <TableCell sx={{ border: "1px solid black", fontWeight: "bold" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book, index) => (
            <TableRow
              key={book.id}
              sx={{
                backgroundColor:
                  index % 2 === 0 ? "rgba(0, 0, 0, 0.05)" : "rgba(245, 240, 240, 0.05)",
              }}
            >
              <TableCell sx={{ border: "1px solid black" }}>
                {book.id}
              </TableCell>
              <TableCell sx={{ border: "1px solid black" }}>
                {book.title}
              </TableCell>
              <TableCell sx={{ border: "1px solid black" }}>
                {book.author}
              </TableCell>
              <TableCell sx={{ border: "1px solid black" }}>
                <Tooltip title={`${Math.min(100, Math.max(0, book.progress * 100))}%`} arrow>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(100, Math.max(0, book.progress * 100))}
                      sx={{ width: "100%" }}
                    />
                </Tooltip>
              </TableCell>
              <TableCell sx={{ border: "1px solid black" }}>
                {book.review && book.review.content ? book.review.content : "No review available"}
              </TableCell>
              <TableCell sx={{ border: "1px solid black" }}>
                {/* <Button
                  variant="contained"
                  onClick={() => onViewReview(book.id)}
                >
                  View Review
                </Button> */}
                <Button
                  variant="contained"
                  sx={{ ml: 1 }}
                  onClick={() => {
                    if (book.review) {
                      onAddReview(book, true);
                    } else {
                      onAddReview(book, false); 
                    }
                  }}
                >
                  {book.review ? "Update Review" : "Add Review"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookTable;
