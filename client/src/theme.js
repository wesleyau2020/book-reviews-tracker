import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {},
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "--DataGrid-containerBackground": "rgb(69,153,236)",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: "inherit", // Allow default colors
        },
      },
    },
  },
});

export default theme;
