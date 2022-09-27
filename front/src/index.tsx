import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import "./index.scss";
import App from "./App";

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: [
      "Apple SD Gothic Neo",
      "Pretendard Variable",
      "Roboto"
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: 'pretendard variable'
        }
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'pretendard variable',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: 'pretendard variable',
          fontSize: "1rem",
          fontWeight: "bold",
        }
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'pretendard variable',
          "&:hover": { 
            color: "black",
            opacity: 1,
            transition: "all 0.5s"
          },
          "&:not(:hover)": { 
            transition: "all 0.5s"
          }
        },
      },
    },
  },
});


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
