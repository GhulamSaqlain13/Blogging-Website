import React, { createContext, useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({
  isAuthenticated: false,
});

const AddWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [blogs, setBlogs] = useState([]);
  const [mode, setMode] = useState();

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        mode,
        setMode,
        blogs,
        setBlogs,
      }}
    >
      <App />
    </Context.Provider>
  );
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AddWrapper />
  </StrictMode>
);
