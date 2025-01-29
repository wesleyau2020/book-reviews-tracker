import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F0F8FF",
    },
    secondary: {
      main: "#F5F5F5",
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "--DataGrid-containerBackground": "rgb(69,153,236)",
        },
      },
    },
  },
});

export default theme;
