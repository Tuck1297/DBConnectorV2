"use client";
import { useEffect, useState } from "react";
import { ConnectionContext } from "./context/ConnectionContext";

// CSS
import "../styles/globals.css";

const ImportsComponent = ({ children }) => {
  const [dbConnection, setDBConnection] = useState("");
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min");
  }, []);
  return (
    <ConnectionContext.Provider value={{ dbConnection, setDBConnection }}>
      {children}
    </ConnectionContext.Provider>
  );
};
export default ImportsComponent;
