// src/context/LoaderContext.jsx
import { createContext, useState, useContext } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <FullScreenLoader />}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);

// Full-screen loader component
const FullScreenLoader = () => (
  <div className="fullscreen-loader">
    <div className="spinner" />
  </div>
);
