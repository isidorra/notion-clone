import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { PageContextProvider } from "./context/PageContext.jsx";
import { PageDetailsContextProvider } from "./context/PageDetailsContext.jsx";

axios.defaults.baseURL = "http://localhost:8080";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <PageContextProvider>
          <PageDetailsContextProvider>
            <App />
          </PageDetailsContextProvider>
        </PageContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
