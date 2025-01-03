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
} from "@mui/material";

const BookTable = ({ books, onViewReviews, onAddReview }) => {
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
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book, index) => (
            <TableRow
              key={book.id}
              sx={{
                backgroundColor:
                  index % 2 === 0 ? "rgba(0, 0, 0, 0.05)" : "white",
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
                <Button
                  variant="contained"
                  onClick={() => onViewReviews(book.id)}
                >
                  View Reviews
                </Button>
                <Button
                  variant="outlined"
                  sx={{ ml: 1 }}
                  onClick={() => onAddReview(book)}
                >
                  Add Review
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
