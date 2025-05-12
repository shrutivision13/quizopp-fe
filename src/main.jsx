import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LoaderProvider } from "./context/LoaderContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <LoaderProvider>
    <BrowserRouter>
      <App />
      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        closeOnClick={false}
        pauseOnHover
        draggable={false}
        theme="dark"
        style={{
          width: "25%",
          margin: "0 auto",
          zIndex: 9999,
        }}
      />
    </BrowserRouter>
  </LoaderProvider>
);
