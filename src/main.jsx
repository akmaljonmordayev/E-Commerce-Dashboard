import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import SaveLastPage from "./service/SaveRoute/SaveRoute.jsx";
import "./chartsetup";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SaveLastPage />
      <App />
    </BrowserRouter>
  </StrictMode>
);
