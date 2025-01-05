import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, LinearProgress, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const BookTable = ({ books, onAddReview }) => {
  const theme = useTheme();

  // Columns
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "author", headerName: "Author", width: 150 },
    {
      field: "progress",
      headerName: "Progress",
      width: 150,
      renderCell: (params) => {
        const progressPercentage = Math.min(
          100,
          Math.max(0, params.value * 100),
        );
        return (
          <Tooltip title={`${progressPercentage}%`} arrow>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <LinearProgress
                variant="determinate"
                value={progressPercentage}
                sx={{ width: "100%" }}
              />
            </div>
          </Tooltip>
        );
      },
    },
    {
      field: "review",
      headerName: "Review",
      width: 200,
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
        );
      },
    },
  ];

  // Rows
  const rows = books.map((book, index) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    progress: book.progress,
    review: book.review,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
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
          border: 1,
          borderColor: '#ECECEC',
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: '#F0F8FF'
          },
          "& .MuiDataGrid-filler": {
            backgroundColor: '#F0F8FF'
          },
        }}
      />
    </div>
  );
};

export default BookTable;
