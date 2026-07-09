"use client";

import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { openSans } from "./ui/fonts";

export const theme = createTheme({
  cssVariables: true,

  typography: {
    fontFamily: openSans.style.fontFamily,

    h1: {
      fontWeight: 300,
      fontSize: "5rem",
      letterSpacing: "-0.05em",
    },

    h2: {
      fontWeight: 400,
    },

    h3: {
      fontWeight: 500,
    },

    body1: {
      fontWeight: 400,
      color: "#606060",
    },

    body2: {
      fontWeight: 300,
      color: "#8A8A8A",
    },
  },

  palette: {
    mode: "light",

    primary: {
      main: "#7B8C9F",
    },

    secondary: {
      main: "#D9D9D9",
    },

    background: {
      default: "#F5F5F3",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#222222",
      secondary: "#8A8A8A",
    },

    divider: "#ECECEC",

    success: {
      main: "#7CB342",
    },

    warning: {
      main: "#FFB74D",
    },

    error: {
      main: "#EF5350",
    },

    info: {
      main: "#64B5F6",
    },
  },

  shape: {
    borderRadius: 28,
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          boxShadow: "0 8px 30px rgba(0,0,0,.04)",
          backgroundImage: "none",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          boxShadow: "0 8px 30px rgba(0,0,0,.04)",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 18,
          textTransform: "none",
          fontWeight: 500,
          padding: "10px 24px",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          backgroundColor: "#FAFAFA",

          "& fieldset": {
            borderColor: "#ECECEC",
          },

          "&:hover fieldset": {
            borderColor: "#DADADA",
          },

          "&.Mui-focused fieldset": {
            borderColor: "#CFCFCF",
          },
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "32px",
          paddingRight: "32px",
        },
      },
    },
  },
});

export default function ThemeProviderComp({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
