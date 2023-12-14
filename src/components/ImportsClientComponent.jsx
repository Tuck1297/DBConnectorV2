"use client";
import { useEffect, useState } from "react";
import { QueryResultsContext } from "./context/QueryResultsContext";
import { QueryBuilderContext } from "./context/QueryBuilderContext";
import { QueryExecuteContext } from "./context/QueryExecuteContext";

// CSS
import "../styles/globals.css";

const ImportsComponent = ({ children }) => {
  const [rowData, setRowData] = useState([]);
  const [builderData, setBuilderData] = useState("");
  const [executeData, setExecuteData] = useState({ querytoexecute: undefined });
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min");
  }, []);
  return (
    <QueryResultsContext.Provider value={{ rowData, setRowData }}>
      <QueryBuilderContext.Provider value={{ builderData, setBuilderData }}>
        <QueryExecuteContext.Provider value={{ executeData, setExecuteData }}>
          {children}
        </QueryExecuteContext.Provider>
      </QueryBuilderContext.Provider>
    </QueryResultsContext.Provider>
  );
};
export default ImportsComponent;
