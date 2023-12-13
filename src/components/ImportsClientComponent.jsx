"use client";
import { useEffect, useState } from "react";
import { QueryResultsContext } from "./context/QueryResultsContext";

// CSS
import "../styles/globals.css";

const ImportsComponent = ({ children }) => {
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min");
  }, []);
  return (
    <QueryResultsContext.Provider value={{ rowData, setRowData }}>
      {children}
    </QueryResultsContext.Provider>
  );
};
export default ImportsComponent;
