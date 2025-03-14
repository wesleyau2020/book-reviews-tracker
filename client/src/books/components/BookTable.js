import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import ProgressCell from "./ProgressCell";

const BookTable = ({ books, onAddReview, setBooks }) => {
  const handleUpdateProgress = (id, newValue) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, progress: newValue } : book
      )
    );
  };

  // Columns
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "author", headerName: "Author", width: 150 },
    {
      field: "progress",
      headerName: "Progress",
      width: 200,
      renderCell: (params) => (
        <ProgressCell params={params} onUpdate={handleUpdateProgress} />
      ),
    },
    {
      field: "review",
      headerName: "Review",
      width: 150,
      renderCell: (params) =>
        params.value && params.value.content
          ? params.value.content
          : "No review available",
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      size: "small",
      renderCell: (params) => {
        const book = params.row;
        return (
          <Button
            variant="contained"
            size="small"
            sx={{ ml: 1 }}
            onClick={() => onAddReview(book, Boolean(book.review))}
          >
            {book.review ? "Update Review" : "Add Review"}
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <DataGrid
        rows={books}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        autoHeight
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        sx={{
          "& .MuiTablePagination-displayedRows": {
            display: "none",
          },
          "& .MuiTablePagination-selectLabel": {
            display: "none",
          },
        }}
      />
    </div>
  );
};

export default BookTable;
