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
      primary: "#292d32",
      secondary: "#667085",
      optional: "#54575B",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontFamily: "Inter, sans-serif",
          fontSize: 14,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 7, // Rounded corners
          "& fieldset": {
            borderColor: "#A1A1AA", // Primary border
            padding: "15px 10px",
          },
          "&:hover fieldset": {
            borderColor: "1E3A8A", // Darker blue on hover
            fontFamily: "Inter, sans-serif",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1E3A8A", // Focused state
            fontFamily: "Inter, sans-serif",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#292D3299", // Default color
          fontFamily: "Inter, sans-serif",
          fontSize: 15,
          "&.Mui-focused": {
            color: "#0d47a1", // Focused state
            fontFamily: "Inter, sans-serif",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px", // Ensuring string for consistency
          textTransform: "none", // Disable uppercase text
          fontWeight: 400, // Normal font weight
          fontFamily: "Inter, sans-serif",
          transition: "all 0.3s ease-in-out",
          backgroundColor: "#1E3A8A",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#314e97", // Darker shade on hover
            color: "#fff",
          },
          "&.Mui-disabled": {
            backgroundColor: "#7087bb",
            color: "#F7F7F7",
          },
          "&.MuiButton-sizeSmall": {
            padding: "3px 12px !important",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Inter, sans-serif", // Your preferred font
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "optimizeLegibility",
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
