import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1E3A8A",
    },
    secondary: {
      main: "#D9E1F7",
    },
    text: {
      primary: "#292D32",
      secondary: "#667085",
      optional: "#54575B",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8, // Rounded corners
            "& fieldset": {
              borderColor: "#A1A1AA", // Primary border
            },
            "&:hover fieldset": {
              borderColor: "#D9E1F7", // Darker blue on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1E3A8A", // Focused state
            },
          },
          "& .MuiInputLabel-root": {
            color: "#292D3299", // Custom label color
            fontFamily: "Inter, sans-serif",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#0d47a1", // Label color when focused
            fontFamily: "Inter, sans-serif",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10, // Rounded corners
          textTransform: "none", // Disable uppercase text
          fontWeight: 400, // Make text bold
          fontFamily: "Inter, sans-serif",
          padding: "10px 20px", // Increase button padding
          transition: "all 0.3s ease-in-out",
          backgroundColor: "#1E3A8A",
          "&:hover": {
            backgroundColor: "#314e97", // Darker shade on hover
          },
          "&.Mui-disabled": {
            backgroundColor: "#7087bb",
            color: "#F7F7F7",
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bb86fc",
    },
    secondary: {
      main: "#03dac6",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
    },
  },
});
