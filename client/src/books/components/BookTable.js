import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import ProgressCell from "./ProgressCell";
import ReviewModal from "./ReviewModal";
import { useReviews } from "../hooks/useReviews";

const BookTable = ({ books, setBooks }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [newReview, setNewReview] = useState("");
  const { addReview, updateReview } = useReviews();
  const [openModal, setOpenModal] = useState(false);

  const onAddReview = (book, isUpdate) => {
    setSelectedBook(book);
    setIsUpdate(isUpdate);
    setOpenModal(true);
  };

  const handleSubmitReview = async () => {
    if (!selectedBook) return;

    let updatedBook = selectedBook;

    if (isUpdate) {
      await updateReview(selectedBook.id, newReview, selectedBook.review.id);
      updatedBook = { ...selectedBook, review: { content: newReview } };
    } else {
      await addReview(selectedBook.id, newReview);
      updatedBook = { ...selectedBook, review: { content: newReview } };
    }

    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );

    setNewReview("");
    setOpenModal(false);
  };

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
            onClick={() => onAddReview(book, book.review)}
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

      <ReviewModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmitReview}
        selectedBook={selectedBook}
        newReview={newReview}
        setNewReview={setNewReview}
        isUpdate={isUpdate}
      />
    </div>
  );
};

export default BookTable;
